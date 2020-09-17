---
title: "Deploying an MLFlow Remote Server with Docker, S3 and SQL"
date: 2020-9-8
categories:
- Guide
- MLOps
tags:
- Machine Learning
cover: https://www.mlflow.org/docs/latest/_static/MLflow-logo-final-black.png
thumbnail: https://www.mlflow.org/docs/latest/_static/MLflow-logo-final-black.png
---

[MLFlow](https://mlflow.org/) is an open-source platform for managing your machine learning lifecycle. You can either run MLFlow locally on your system, or host an [MLFlow Tracking server](https://www.mlflow.org/docs/latest/tracking.html), which allows for mutiple people to log models and store them remotely in a model repository for quick deployment/reuse.

In this article, I'll tell you how to deploy MLFlow on a remote server using [Docker](https://www.docker.com/), an S3 storage container of your choice ([Minio](https://min.io/) or ([Ceph](https://github.com/ceph/)) and SQL ([SQLite](https://www.sqlite.org/index.html) or [MySQL](https://www.mysql.com/).

<!--more-->

## Setting up the Server
- Login to your remote server. It should have docker installed. For docker installation, check their [official guide](https://docs.docker.com/get-started/).
- Create a new folder for your Mlflow server
  ```bash
  mkdir mlflow-server
  cd mlflow-server
  ```
- Open a new terminal on your server, go to your *mlflow-server* directory and create a virtual environment for MLFlow installation
  ```bash
  python3 -m venv env
  source env/bin/activate
  ``` 
- Install necessary packages
  ```bash
  pip3 install mlflow
  ```
### Setting up the Backend Store

MLFlow model parameters and run stats are all stored in a backend store which you can specify. By default, MLFlow uses the filesystem, but that is not an ideal setup for a remote tracking server. Here, I'll tell you how to set it up using either SQLite3 or MySQL -- whichever you may prefer. I would recommend using MySQL in a production environment.

#### Using SQLite3
  ```
- Install sqlite3 
  ```bash
  sudo apt install sqlite3
  ```
- Setup an SQLite database for your MLFlow server's *backend-uri*. Make sure that this file is in your *mlflow-server* folder.
  ```bash
  sqlite3 store.db
  # press cntrl+D to exit sqlite 
  # nothing else needs to be done
  ```
Note that yuor *backend-store-uri* would now be -- ```sqlite:///store.db```.

#### Using MySQL

- [Install mySQL](https://linuxize.com/post/how-to-install-mysql-on-ubuntu-18-04/)
- Install PyMySQL in your python envirionment which has MLFlow.
  ```bash
  pip3 install pymysql
  ```
- Sign in to you mysql shell and create a new database for MLFlow. Also create a new user/use an existing user and assign access to the MLFLow database.
  ```sql
  CREATE USER 'mlflow-user' IDENTIFIED BY 'password';
  CREATE DATABASE 'mlflowruns';
  GRANT ALL PRIVILEGES ON mlflowruns.* TO 'mlflow-user';
  ```
Note that your *backend-store-uri* would now be -- ```mysql+pymysql://'mlflow-user':'password'@localhost:3306/mlflowruns```

### Setting up the Artifact Store
The artifact store is where your model's files are stored. This includes your environment and other files that you can use to recreate and deploy your model instantly. By default your model's artifacts are also stored on the filesystem in a fodler named *mlruns*, but when deploying a remote tracking server this is not an option as your client needs to have read and write permissions to the artifact -- which is not possible for a filesystem path storage. Here, we'll use S3 buckets to store model artifacts -- the two options which we'll look at are Minio and Ceph. Minio is comparatively lightweight, though Ceph is much more powerful and easier to start with, thanks to [Ceph Nano](https://github.com/ceph/cn).

#### Using Minio

- Get Minio's latest docker image
  ```bash
  sudo docker pull minio/minio
  ```
- Run a Minio server and bind it to a server port that is exposed. The Minio server needs to run on a port that is exposed so that a remote client can upload model artifacts to it. Minio will serve as your *default artifact root*. You can run the following command. Note that you need to fill in an exposed port for minio, and any access/secret key pair of your choice.
  ```bash
  docker run -p <exposed_port_for_minio>:9000 --name minio1 \
  -e MINIO_ACCESS_KEY=<your_access_key_id> \
  -e MINIO_SECRET_KEY=<your_secret_key> \
  -v /mnt/data:/data \
  -v /mnt/config:/root/.minio \
  minio/minio server /data 
  ```
- Install necessary packages in your created environment.
  ```bash
  pip3 install minio
  pip3 install boto3
  ```
- Setup local environment variables:
  ```bash
  export MLFLOW_S3_ENDPOINT_URL=http://127.0.0.1:<exposed_port_for_minio>
  export AWS_ACCESS_KEY_ID=<your_access_key_id>
  export AWS_SECRET_ACCESS_KEY=<your_secret_key>
  ```
- Create a Minio bucket  -- in your *mlflow-server* folder, run the following:
  ```bash
  wget https://gist.githubusercontent.com/kaushalvivek/9f1905e25a28526dfeaaecf80ef5c361/raw/3bbb30954d8ee7144fe2ec183b78999518226040/create_bucket.py
  python3 create_bucket.py
  rm create_bucket.py
  ```
- Note that your *default-artifact-root* should now be **s3://mlflow/artifacts**


#### Using Ceph
- Install ceph nano locally. Based on which OS you are using, run the command listed [here](https://github.com/ceph/cn#installation).
- Create a Ceph nano cluster
  ```bash
  ./cn cluster start -d /tmp mlflow-cluster -f huge
  ```
- Note down the *ceph endpoint URL, AWS access key id and AWS secret key* that the cluster auto-generates and prints to shell.
- Cretae an S3 bucket
  ```bash
  ./cn s3 mb mlflow-cluster mlflow-buc
  ```
- Setup local environment variables:
  ```bash
  export MLFLOW_S3_ENDPOINT_URL=http://127.0.0.1:<ceph-endpoint-url>
  export AWS_ACCESS_KEY_ID=<your_access_key_id>
  export AWS_SECRET_ACCESS_KEY=<your_secret_key>
  ```
Note that your *default-artifact-root* should now be **s3://mlflow-buc**

### Starting the Server

- Start the MLFlow server -- run the following from you *mlflow-server* folder. You need to enter an exposed port that would be the MLFlow Server's port, for UI and logging. **This port needs to be different from your Artifacts endpoint port**.
  ```bash
  mlflow server -p <exposed_port_for_mlflow> \
  --host 0.0.0.0 \
  --backend-store-uri <enter_backend_store_uri> \
  --default-artifact-root <enter_deafult_artifact_root>
  ```

And that's it! your server is up and running. Note that while you're specifying the endpoint URL, do not use *localhost*. Stick to *http://127.0.0.1* with the *http*. Ceph is specific about the endpoint URL.

## Setting up the Client

- On your local system, create a new folder where you'll work with mlflow and create a local virtual environment
  ```bash
  mkdir mlflow-work
  cd mlflow-work

  python3 -m venv env
  source env/bin/activate

  pip3 install mlflow
  ```
- Setting up local environment variables -- you need to setup your environment for accessing MLFlow's remote tracking server and logging data to your remote minio artifact server
  ```bash
  export MLFLOW_TRACKING_URI=http://<remote_server_ip>:<exposed_port_for_mlflow>
  export MLFLOW_S3_ENDPOINT_URL=http://<remote_server_ip>:<exposed_port_for_artifact_root>

  export AWS_ACCESS_KEY_ID=<enter_aws_access_key_id>
  export AWS_SECRET_ACCESS_KEY=<enter_aws_secret_access_key>
  ```

And you're all set! You can download example code from [MLFlow examples](https://github.com/mlflow/mlflow/tree/master/examples), and start executing them directly in your *mlflow-work* directory. For more information about MLFlow checkout [MLFlow Documentation](https://www.mlflow.org/docs/latest/quickstart.html).
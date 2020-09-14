---
title: "Deploying an MLFlow Remote Server with Docker, Minio and SQLite or MySQL "
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

In this article, I'll tell you how to deploy MLFlow on a remote server using [Docker](https://www.docker.com/), [Minio](https://min.io/) and [SQLite](https://www.sqlite.org/index.html).

<!--more-->

## Setting up the Server
- Login to your remote server. It should have docker installed. For docker installation, check their [official guide](https://docs.docker.com/get-started/).
- Create a new folder for your Mlflow server
  ```bash
  mkdir mlflow-server
  cd mlflow-server
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
- Get Minio's latest docker image
  ```bash
  sudo docker pull minio/minio
  ```
- Run a Minio server and bind it to a server port that is exposed. The Minio server needs to run on a port that is exposed so that a remote client can upload model artifacts to it. Minio will serve as your *default artifact root*. You can run the following command. Note that you need to fill in an exposed port for minio, and any access/secret key pair of your choice.
  ```bash
  docker run -p <exposed_port_for_minio>:9000 --name minio1 \
  -e MINIO_ACCESS_KEY=minio_access_key \
  -e MINIO_SECRET_KEY=minio_secret_key \
  -v /mnt/data:/data \
  -v /mnt/config:/root/.minio \
  minio/minio server /data 
  ```
- Open a new terminal on your server, go to your *mlflow-server* directory and create a virtual environment for MLFlow installation
  ```bash
  python3 -m venv env
  source env/bin/activate
  ``` 
- Install necessary packages
  ```bash
  pip3 install mlflow
  pip3 install minio
  pip3 install boto3
  ```
- Setup local environment variables:
  ```bash
  export MLFLOW_S3_ENDPOINT_URL=http://127.0.0.1:<exposed_port_for_minio>
  export AWS_ACCESS_KEY_ID=minio_access_key
  export AWS_SECRET_ACCESS_KEY=minio_secret_key
  ```
- Create a Minio bucket  -- in your *mlflow-server* folder, run the following:
  ```bash
  wget https://gist.githubusercontent.com/kaushalvivek/9f1905e25a28526dfeaaecf80ef5c361/raw/3bbb30954d8ee7144fe2ec183b78999518226040/create_bucket.py
  python3 create_bucket.py
  rm create_bucket.py
  ```
- Start the MLFlow server -- run the following from you *mlflow-server* folder. You need to enter an exposed port that would be the MLFlow Server's port, for UI and logging. **This port needs to be different from your Minio exposed port**.
  ```bash
  mlflow server -p <exposed_port_for_mlflow> --host 0.0.0.0 --backend-store-uri sqlite:///store.db --default-artifact-root s3://mlflow/artifacts
  ```
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
  export MLFLOW_S3_ENDPOINT_URL=http://<remote_server_io>:<exposed_port_for_minio>

  export AWS_ACCESS_KEY_ID=minio_access_key
  export AWS_SECRET_ACCESS_KEY=minio_secret_key
  ```

## Using MySQL instead of SQLite
If you wish to use MySQL instead of SQLite, you'll need to setup your MySQL server up and create a database for MLFlow. The steps to do so are as follows:
- [Install mySQL](https://linuxize.com/post/how-to-install-mysql-on-ubuntu-18-04/)
- Install PyMySQL
  ```bash
  pip3 install pymysql
  ```
- Sign in to you mysql shell and create a new database for MLFlow. Also create a new user/use an existing user and assign access to the MLFLow database.
  ```sql
  CREATE USER 'mlflow-user' IDENTIFIED BY 'password';
  CREATE DATABASE 'mlflowruns';
  GRANT ALL ON mlflow.* TO 'mlflow-user';
  ```
- Now when you create your MLFlow server, use the following *backend-store-uri* instead:
  ```bash
  mlflow server -p <exposed_port_for_mlflow> \
  --host 0.0.0.0 \
  --backend-store-uri mysql+pymysql://'mlflow-user':'password'@localhost:3306/mlflowruns \
  --default-artifact-root s3://mlflow/artifacts
  ```

And you're all set! You can download example code from [MLFlow examples](https://github.com/mlflow/mlflow/tree/master/examples), and start executing them directly in your *mlflow-work* directory. For more information about MLFlow checkout [MLFlow Documentation](https://www.mlflow.org/docs/latest/quickstart.html).
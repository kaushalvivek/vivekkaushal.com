---
title: "Parallelization of Inference on GPUs for TFServing using Nginx"
date: 2021-1-17
categories:
- MLOps
tags:
- Tensorflow
- Docker
- Nginx
cover : https://www.nginx.com/wp-content/uploads/2017/09/NGINX-Plus-product-page_Load-Balancer@2x.png
thumbnail : https://www.nginx.com/wp-content/uploads/2017/09/NGINX-Plus-product-page_Load-Balancer@2x.png
---
A guiding to load balancing your TFServing Inference API over multiple GPUs.

<!-- more -->

This is a mini-project I worked upon a few months ago, but never got around to writing about. TF serving is used to serve Tensorflow models for inferencing. It provides a REST/gRPC API that can be used to send inference requests and get results from one's ML model. You can read more about TFServing here:

- [https://www.tensorflow.org/tfx/guide/serving](https://www.tensorflow.org/tfx/guide/serving)
- [https://github.com/tensorflow/serving](https://github.com/tensorflow/serving)

TFserving can either be run on GPUs or CPUs — it has two different docker images for these deployments — [https://hub.docker.com/r/tensorflow/serving](https://hub.docker.com/r/tensorflow/serving). One problem here is that TFserving doesn't allow for parallelization out of the box when you're running it on a system with multiple GPUs — [https://github.com/tensorflow/serving/issues/311](https://github.com/tensorflow/serving/issues/311). The internet is filled with half-solutions to this problem, but there really isn't a concrete way that this has been addressed. In this blog post, I'll share my solution with you. 

I created a script which looks at information from `nvidia-smi` to get the number of GPUs available in the system, alternatively it also accepts a user-input for the number of GPUs to use for deployment. Then this script does two things:

- it creates a docker-compose file to start an independent container of TFserving's GPU image on each GPU either available or entered as input by the user. So for example, if a system as 5 GPUs and the user doesn't provide the number of GPUs they want to use, then it would create and launch 5 containers of TFserving's GPU image on the GPUs — 0, 1, 2, 3 and 4. Note that each container has its own API endpoint which is exposed.
- It then creates an nginx configuration file which redirects request from an exposed API endpoint (*the endpoint where inference requests would be sent to*) to all the endpointssof created containers, and uses nginx load balancer to distribute incoming requests. *(I use round robin balancing here, but suit your architecture)*

```markdown
														   |---->[container0]--->[GPU_0]
[req]->[nginx load balancer]-->|---->[container1]--->[GPU_1]
														   |---->[container2]--->[GPU_2]
```

The end result is that we have n docker containers of TFserving running on your system where n is the number of GPUs (or a subset, depending on what you choose) and each of them are available for inference requests. Hence — partial distribution of workload is achieved. 

Note that this would still be useless if there is a single large inference request — as any given request would still be processed only by the core that the load balancer directs the request to.
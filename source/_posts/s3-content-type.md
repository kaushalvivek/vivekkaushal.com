---
title: "Changing S3 objects' metadata in bulk after upload, using boto3"
date: 2021-5-27
categories:
- Scripts
tags:
- AWS
- Python
cover : https://miro.medium.com/max/580/0*PQM2oxNUUceATC30
thumbnail : https://miro.medium.com/max/580/0*PQM2oxNUUceATC30
---

Due to an anomaly on our frontend, over 500k objects had been uploaded to an AWS bucket without the correct content-type. Keeping the non-mutable nature of S3 objects in mind, and constraint of retaining the same link, here's how I fixed this anomaly through a python script built on top of boto3.

<!-- more -->

In a nutshell, here's what this script does:
- fetches all objects in a bucket
- for each object:
  - fetches the metadata of the file
  - checks the intended content type of a file, based on file extension
  - updates the following in metadata:
    - sets access to 'public-read'
    - sets ContentDisposition to 'inline'
    - sets ContentType to the intended content type

The code, along with inline documentation, is as follows:

<script src="https://gist.github.com/kaushalvivek/ae97d94c2583721f8128e0be80b78f48.js"></script>

If you need any other help with this, feel free to reach out to me.
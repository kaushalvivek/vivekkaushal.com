---
title: "Use This to Communicate with Your Users"
date: 2021-3-28
categories:
- Project
tags:
- NodeJS
- Docker
cover : https://miro.medium.com/max/880/0*SQy-aKEXu_WSoRd-.png
thumbnail : https://miro.medium.com/max/880/0*SQy-aKEXu_WSoRd-.png
---
A highly scalable notification micro-service which can be configured within minutes to send notifications on WhatsApp, SMS and Email.

<!-- more -->

Constant communication is a key to staying in touch with and growing active users for any growing business. Automating notifications in a reliable manner is somewhat complicated as growth accelerates -- there are service provider rate-limits to take care of and it's necessary to keep your codebase service-provider agnostic to minimize the cost of switching to a different provider when the need arises -- it almost inevitably always does. Additionally, to ensure reliable delivery of notifications it is necessary to have a system in place to deal with failures.

To simplify these challenges while keeping your application's codebase separate from notification logic, I've worked on a micro-service which exposes REST endpoint where notifications can be scheduled, without worrying about any of the raised concerns. You can find the source code of the project here: [https://github.com/kaushalvivek/notification-microservice](https://github.com/kaushalvivek/notification-microservice). Feel free to build upon/add to the project!
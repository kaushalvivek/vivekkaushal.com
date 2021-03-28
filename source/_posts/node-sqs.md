---
title: "Setting up AWS SQS for Queuing and Consumption from NodeJS"
date: 2021-3-27
categories:
- Guide
- Setup & Installation
tags:
- AWS
- NodeJS
cover : https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/images/code-samples-sqs.png
thumbnail : https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/images/code-samples-sqs.png
---
[SQS](https://aws.amazon.com/sqs/) stands for Simple Queuing Service -- an offering from AWS which is simple to use, highly scalable to build upon and reliable. In this post, I'll walk through setting up SQS for queueing and consumption from NodeJS.

<!-- more -->

## Create AWS Account
Create and account on AWS, sign in to the console and find SQS.
![AWS home-screen](/images/sqs1.png)

## Create Queue
Click on the `Create Queue` button, choose a name -- we'll call our queue ***sample-queue*** -- and continue with the default pre-filled configurations. Click on the `Create Queue` button at the bottom of the page. Done! Your queue would be created and you'll see a screen like the one attached below.
![SQS screen](/images/sqs2.png)

## Create Queue User
It's not a good practice to use the root user of your AWS account as the owner of resources which are accessed by external applications, like here in this scenario. Hence, we'll create a new user specifically for our SQS queue and assign it to our newly created queue.
- Search for IAM on AWS search bar, click on it
- On the IAM dashboard, click on `Users` in the left panel, under `Access Management`.
![IAM screen](/images/sqs3.png)
- Click on `Add New User` Button
- On the screen that opens, set the user name -- we'll use `sqs-user` -- and provide Programmatic Access.
![Add User](/images/sqs4.png)
- On the permissions screen, choose `Attach existing policies directly` and choose the `AmazonSQSFullAccess` policy.
![Permission](/images/sqs5.png)
- Skip the `Add Tags (Optional)` page that opens.
- Click on `Create user`.
- Copy the `ACCESS KEY ID` and `SECRET ACCESS KEY` from the screen that opens. **Note: the secret access key will ONLY be visible on this screen.** 
- Click on `close`. In the screen that opens next, click on the created user and copy the `User ARN`.

## Assign User to Queue
- Go to SQS dashboard on AWS Console.
- Click on the queue you want to assign the created user to.
- Go to the `Access Policy` Tab and click on `Edit`.
- Replace the `Principal->AWS` value to the ARN you copied in the previous step, then click `SAVE`.

## Writing to Queue from NodeJS
You write to your newly created SQS queue from NodeJS by building upon the tiny sample shared in the code below:

```js
const aws = require('aws-sdk')
const uuid = require('uuid')
const splitArray = require('split-array')

const sqsConfig = {
  apiVersion: "2012-11-05",
  accessKeyId: "<sqs-user's ACCESS_KEY_ID here>",
  secretAccessKey: "<sqs-user's SECRET_ACCESS_KEY here>",
  region: "AWS REGION HERE" // you can see your AWS region in your queue ARN, like:
  // arn:aws:sqs:<AWS REGION>:user-id:queue-name   
}
aws.config.update(sqsConfig)

const sqs = new aws.SQS({ apiVersion: config.aws.apiVersion })

const queueMessages = async function (messages, queueUrl) {
  try {
    // only 10 messages can be queued to SQS at one time, hence
    // we break our messages into chunks of 10 messages.
    const splittedArray = splitArray(messages, 10)
    for (const arr of splittedArray) {
      const params = {
        QueueUrl: queueUrl,
        Entries: []
      }
      arr.forEach(message => {
        params.Entries.push({
        // Id is a unique ID assigned to each message
        // read more about how Id is used in AWS's documentation
          Id: uuid.v4(),
          MessageBody: JSON.stringify(message)
        })
      })
      await sqs.sendMessageBatch(params).promise()
    };
    return (201)
  } catch (e) {
    throw new Error(e.message)
  }
}

// Example usage of function:

const messages = [
    {
        "field1": "this is message 1", 
        "field2":"X"
    },
    {
        "field1":"this is message 2",
        "field2": "Y"
    }
]
const response = await queueMessage(messages, "https://<QUEUE_URL_HERE -- copy from SQS console>")
```

Note that there is no fixed format or structure that your message should follow. Choose whatever structure works best for your use-case.

## Consuming from Queue using NodeJS
You can write a program that consumes messages from your SQS queue as follows:

```js
const AWS = require('aws-sdk')
const https = require('https')

const sqsConfig = {
  apiVersion: "2012-11-05",
  accessKeyId: "<sqs-user's ACCESS_KEY_ID here>",
  secretAccessKey: "<sqs-user's SECRET_ACCESS_KEY here>",
  region: "AWS REGION HERE" // you can see your AWS region in your queue ARN, like:
  // arn:aws:sqs:<AWS REGION>:user-id:queue-name   
}

AWS.config.update(sqsConfig)

const createConsumer = function (queueUrl, batchSize, handler) {
  return Consumer.create({
    queueUrl: queueUrl,
    batchSize: batchSize,
    handleMessageBatch: handler,
    sqs: new AWS.SQS({
      httpOptions: {
        agent: new https.Agent({
          keepAlive: true
        })
      }
    })
  })
}

const doThisWithMessages(messages){
    // process messages in this function
    console.log(messages);
};

const sampleConsumer = createConsumer(
    "https://<QUEUE_URL_HERE -- copy from SQS console>", // URL of the queue to consume
    10, // batch size -- number of messages to consume at once, <=10
    doThisWithMessages // handler for messages
);

sampleConsumer.start()
```

And that's it! You're done. Your can also additionally add a `Dead-Letter Queue` for your created queue, which stores and re-tries messages which throw error upon consumption. Hope this article helps! 
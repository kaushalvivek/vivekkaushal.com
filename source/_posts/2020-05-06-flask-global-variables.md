---
title: "Handling Global Variables in Flask"
date: 2020-5-06
categories:
- Guide
- Full-Stack
tags:
- Flask
cover: images/flask.png
thumbnail: images/flask.png
---

The usage of the *global* keyword in pythonic development is discouraged, and for good reasons. It often becomes troublesome to keep track of global variable usage and assignment as the code file grows, and is almost  impossible in very large code files. This creates issues in debugging, reading and understanding the functionality of different code blocks and understanding the workflow of the application under consideration.

<!--more-->

Avoiding the usage of *global* variables is easy enough in day-to-day development work if you are smart about the architecture of your application and usage of object-oriented programming principles, and I've honestly never had much trouble doing so.

Though when it comes to development in Flask, I often found myself falling back to *global* variables for sharing data between the functionality of different routes. It seemed harmless enough as long as I was working on small apps deployed locally for limited users. Trouble started when an application with *global* variables in it's architecture was deployed by me in a production environment with dozens of concurrent users. The app started behaving erratically with frequent crashes. It took me an embarrassingly long amount of time to isolate the issue to the misuse of *global* variables and that prompted me to look for alternatives.

Here's what I found.

## Sessions

More often than not, what you're really trying to do, when you use *global* variables in Flask, is to save user entered or recorded information across different routes, while concurrently allowing for modifications to the same. As it happens, Flask has an inbuilt library for this functionality : *Flask Sessions*.

Flask Session saves data specific to a browser session initiated by a user and eliminates the need for global variables. Now a good questions would be, *Where is this information stored?* and the answer depends entirely on your implementation.

Session data can be stored on the client end in browsers, or your server in files, in database systems like MongoDB and SQLAlchemy, redis or in caches.

*session['keyword'] = "foo"* can be used to store anything into sessions.  
Stored values can be retrieved using *bar = session.get('keyword')*

An example:
```python
# import
from flask_session import Session

# session configuraiton -- filesystem interface
app = Flask(__name__)
SESSION_TYPE = 'filesystem'
app.config.from_object(__name__)
Session(app)

@app.route('/')
def index():
  # different keywords to store data in session
  session['articles_visited'] = []
  session['sequence'] = 0
  return render_template('index.html')

def headlines():
  # retrieving data from and modifying data in sessions
  sequence = session.get('sequence')
  session['articles_visited'].append(session.get('article_id'))
  return redirect('some_path')
```

For more information checkout : [https://flask-session.readthedocs.io/en/latest/](https://flask-session.readthedocs.io/en/latest/)  

You can also checkout an implementation of sessions in this app I created. Link : [https://github.com/kaushalvivek/attention-online-survey](https://github.com/kaushalvivek/attention-online-survey)
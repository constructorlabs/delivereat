# Delivereat

Let's create an app that allows customers to order food online.

A few notes before we get started

* Fork and clone repo at [https://github.com/constructorlabs/delivereat](https://github.com/constructorlabs/delivereat)
* Create a RESTful API for your service. Think about a good way to organise your API into **nouns** and **verbs**, which correspond to **resources** and **actions**
* Split your code into an API on the server and render data from server in browser
* Splitting out our application into an API and interface allows us to re-use the API. For example we could use it to create a native mobile app or allow third parties to place orders on our system
* Use unit tests where possible
* Commit frequently and push to Github
* Implement features one at a time
* Make sure your app is responsive, looks good and works well at different screen widths
* You may want to design the API first, before implementing the UI that uses and API

## Deployment

* Create a super basic express app that outputs "Hello World" from root path
* Create a free account with [Heroku](https://heroku.com). It is a fantastic hosting platform that makes deployment easy and fun
* Follow the steps at [https://devcenter.heroku.com/articles/getting-started-with-nodejs\#introduction](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

## Features

**Menu**

* Create an API endpoint that returns a menu of items with prices available to order
* Create a page that displays the menu to the user using the API

**Order**

* Update the menu page to make it an order page
* It should allow the user to specify quantities of items to order
* It should add a delivery charge and display the total order cost
* Create an API to receive and save the submitted order

**Admin**

* The restaurant owner wants to be able to see all orders coming in
* When an order is ready to ship the restaurant owner needs to be able to mark the order as sent
* Create an API endpoint to receive and update order status

**Extension**

* Design and implement an extension of your choosing

**Notification - extension**

* Send the user an SMS using Twilio when their order is ready

**Order history - extension**

* Allow the user to see their order history. You could story order history for each phone number or email address
* Allow the user to re-order same items again

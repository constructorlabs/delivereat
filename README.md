# Delivereat

Let's create an app that allows customers to order food online.

A few notes before we get started

* Fork and clone repo at [https://github.com/constructorlabs/delivereat](https://github.com/constructorlabs/delivereat)
* Start by building the simplest thing that works. Add to it as you go along. Test your application as frequently as possible to make sure it does what you expect
* Create a RESTful API for your service. Think about a good way to organise your API into **nouns** and **verbs**, which correspond to **resources** and **HTTP methods**
* Split your code into an API on the server and render data from server in browser using React.
* Splitting out our application into an API and interface allows us to re-use the API. For example we could use it to create a native mobile app or allow third parties to place orders on our system
* Commit frequently and push to Github
* Implement features one at a time
* Make sure your app is responsive
* You may want to design the API first, before implementing the UI that uses and API

## Features

**Menu**
* Design a menu for a restaurant such as food items, prices etc. By providing each item with an id we can refer to it later. The first item has already been created for you. Feel free to amend it.
* Create an API endpoint that returns a menu of items with prices available to order
* Create a page that displays the menu to the user using the API

**Order**

* Update the menu page to make it an order page
* It should allow the user to specify quantities of items to order
* It should add a delivery charge and display the total order cost
* Create an API to receive and save the submitted order

**Closures**

* Rather than storing all data in global scope on the server, try to implement data manipulation and retrieval functionality using closures.

**Order history**

* Allow the user to see their order history
* Allow the user to re-order same items again
* Allow users to delete items from order history

**Extension**

* Design and implement an extension of your choosing

## Stretch goals

**Admin**

* Create a new page for the restaurant owner to see all orders coming in
* When an order is ready to ship the restaurant owner needs to be able to mark the order as sent
* Create an API endpoint to receive and update order status

**Notification**

* Send the user an SMS using (Twilio)[https://www.twilio.com/] when their order is ready

## Technical notes

* Run `npm install` after cloning to download all dependencies
* Use `npm run dev -- --watch` to build React
* Use `node index.js` to run the Node server in another tab
* Place all static files such as images and CSS in the `static` folder. When requesting those files from the server use `/static` at the beginning of the URL. For example `<link rel="stylesheet" type="text/css" href="/static/styles.css">`
* `bundle.js` produced by webpack will be output in the `static` folder
* To send data server using a POST, PUT or PATCH request you can do something the example below, where `order` is an object we want to send to the server and `http://localhost:8080/api/order` is URL we want to send it to.

```js
fetch('http://localhost:8080/api/order', {
    method: 'post',
    body: JSON.stringify(order)
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    // handle response
  });
```

* Check out (Nodemon)[https://nodemon.io/] to automatically rebuild and restart your server when changes are saved.

## README

* Produce a README.md which explains
  * what the project does
  * what technologies it uses
  * how to build it and run it
  * any unresolved issues the user should be aware of

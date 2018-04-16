# FoodThing

An online food delivery service - made as a weekend project for week 4 of
[Constructor Labs](https://constructorlabs.com/).

The site presents a menu of food items and allows the user to select a
quantity of each to be selected for ordering. It keeps track of the subtotal
price and factors in the cost of delivery. When the user completes the order,
they are shown a confirmation screen and an SMS message is sent to their
phone using [Twilio](https://twilio.com/). The system is deployed on
[Heroku](https://heroku.com/).

The menu data is loaded from a JSON file and DOM elements constructed to build
the page shown to the user. The intention in creating it this way was to allow
for a page built of an arbitrary number of modules, which would make for the
possibility of displaying multiple menus from data without having to create a
fixed template for each.

To run the application, at the root directory type
`node application/server.js`, then browse to `http://localhost:8080`.

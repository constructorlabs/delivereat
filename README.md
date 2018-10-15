# Zing - An Online Coffee Delivery App

Zing is an online coffee delivery app that is developed using React.js for the front end and Node.js for the back end. 

<img src="/static/assets/readme-splash.jpg?raw=true" alt="Splash Page" width=200px height=400px>
<img src="/static/assets/readme-menu.jpg?raw=true" alt="Menu on mobile" width=200px height=400px>
<img src="/static/assets/readme-menu-ipad.jpg?raw=true" alt="Menu on tablet" width=200px height=400px>
<img src="/static/assets/readme-basket.jpg?raw=true" alt="Basket" width=200px height=400px>
<img src="/static/assets/readme-checkout.jpg?raw=true" alt="Checkout" width=200px height=400px>

## How to build

* Run `npm install` after cloning to download all dependencies
* Use `npm run dev -- --watch` to build React
* Use `node server.js` to run the Node server in another tab 
* Access `localhost:8080` in the browser

## How to use

* The app lands on the splash page, displaying the logo. The user can click anywhere on the screen to load the menu.
* The menu items have + and - buttons which allow the user to add and remove items to/from the basket.
* A basket summary appears at the bottom of the page when an item has been added to it.
* Clicking the basket summary expands the basket to display the items and the total amount to pay. 
* Clicking on the checkout button submits the order to the Zing API for further processing, and empties the basket in preparation for a new order. 

## Next steps

* The app is currently only supported on mobile devices. Desktop support is due to be integrated soon.

## Questions, comments, concerns?

Reach out to me by raising an issue on GitHub!
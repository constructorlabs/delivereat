## README

- Produce a README.md which explains

  - what the project does
  - what technologies it uses
  - how to build it and run it
  - any unresolved issues the user should be aware of

## unresolved issues:

- unable to fetch a post request (App.js line 84)

- i recieved error message"Failed to load http://localhost:8080/api/order: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://127.0.0.1:8080' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled."

- i have to change headers (this README file line 70) to header (App.js line 87) for the fetch to complete a post request.

- due to Acess control issue above I tested it with postman and i was able to creat a property under Object Orders. when i fetch post request via App.js it comes back blank

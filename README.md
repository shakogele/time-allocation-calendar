# Design specifications for calendar APP

## Converting Array into Object

As allocated slots are comming in array from backend, I thought it would be better to convert array into object, 
as filtering happens on click calendar day it would be quite expensive operation, so once I got data from backend
I converted it into following structure:

![Data from Backend](/documentation/assets/backend.png)
![Object on Frontend](/documentation/assets/frontend.png)

## Timezone issue

Second consideration was the timezone offset, as user relies on browser's date and UTZ/GMT (which can be easily changed on front from 
user's PC if PC is not synchronised to automatically set datetime/timezone offset) I thought it might be more reliable to retrive current user's timezone from API as user logs into system. Because we do not have user login I implemented a temporary solution to get currentUser's timezone
from publicly available API 

## Setting default timezone 

Each time user calls `new Date` function it generates a current PC datetime so I created a custom function to set current datetime with timezone;

## API specifications

![Swagger OpenAPI Specifications](/documentation/api/swagger) and ![Postmen Collection file with enviroment](/documentation/api/postman) were created
to see the API requirements and documentation.
If you prefer to use postman you can import the collection file and environment file into your postman.

## Testing

I created ![integration tests](/documentation/api/tests) using postman and implemented nodemon library as a dev dependency, changed package.json scripts to run nodemon tests.

## App itself

The demo verion of APP is uploaded at AWS S3 - it can be found [here](http://calendar-app-shakogele.s3-website.eu-central-1.amazonaws.com/)

## How to run locally

if you want to run this project just pull this repo and run `npm install` then `cd calendar` and `npm start` to run the APP on development mode
and visit [http://localhost:3000](http://localhost:3000).

## How to test

This project contains only integration tests to test with API integration. You can run `npm test` to run tests.

## How to build

If you want the production verion run `npm run build` which will generate the build folder and then upload it on web server.
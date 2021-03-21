# Design specifications for calendar APP

## Converting Array into Object

As allocated slots are comming in array from backend, I thought it would be better to convert array into object, 
as filtering happens on click calendar day it would be quite expensive operation, so once I got data from backend
I converted it into following structure as data arrives on frontend:

## timezone issue

Second consideration was the timezone offset, as user relies on browser's date and UTZ/GMT (which can be easily changed on front from 
user's PC if PC is not synchronised to automatically set datetime/timezone offset) I thought it might be more reliable to retrive current user's timezone from API as user logs into system. Because we do not have user login I implemented a temporary solution to get currentUser's timezone
from publicly available API 

## setting default timezone 

Each time user calls `new Date` function it generates a current PC datetime so I created a custom function to set current datetime with timezone;

## API specifications

I created a swagger openAPI specifications and postmen collection file with enviroment variable which can be found here

## Testing

I created integration tests using postman and implemented nodemon library as dev dependency also changed package.json scripts to 
run nodemon tests which can be found here

## App itself

I uploaded app at AWS S3 for demonstration purposes and it can be found [http://localhost:3000](http://calendar-app-shakogele.s3-website.eu-central-1.amazonaws.com/)

## How to run locally

if you want to run this project just pull this repo and run `npm install` then `cd calendar` and `npm start` the project will run on development mode
and it can be open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to test

As I said this project contains only integration tests which tests the API integration. You can run `npm test` to test the project

## How to build

If you want the production verion run `npm run build` which will generate the build folder and then upload it on web server.
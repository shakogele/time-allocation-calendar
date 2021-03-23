# Design specifications for calendar APP

## Converting Array into Object

As allocated slots are comming in array from backend, I thought it would be better to convert array into object, 
as filtering happens on click calendar day it would be quite expensive operation on each user click, so once I got data from backend
I converted it into following structure:

From Backend -------------------------------------------- 

![Data from Backend](/documentation/assets/backend.png) 

On Frontend ---------------------------------------------

![Object on Frontend](/documentation/assets/frontend.png)

## Timezone issue

Second consideration was the timezone offset, as user relies on browser's datetime and UTZ/GMT (which can be easily changed on front from 
user's PC if PC is not synchronised to automatically set datetime/timezone offset) I thought it might be more reliable to retrive current user's timezone from API as user logs into system based on User IP. Because we do not have user login - I thought it would be better to get User TimeZone
as separate API request.

## Setting default timezone 

Each time user calls `new Date()` function it generates a current Browser datetime as browser datetime is not reliable I decided to call an API and retrive current user timezone from public API `https://worldtimeapi.org/api/ip` so I created a custom function to set current datetime with timezone;

## Saving Allocations

As no backend API is ready I decided to store current user's allocations into Browsers LocalStorage. so each time user creates a new allocation,
it is stored in localstorage and then it gets loaded & merged into current timeslots received from backend.

## Redux

I used Redux state to store all appropriate info - like - userTimezone and timeSlots. Timeslots are stored into redux once user gets data from backend 
at that moment current user slots are retrived from localstorage and merged with backend data.

## ERROR Boundary 

Implemented ErrorBoundary Component to catch component error and wrapped App Component in it;

## Styling 

I implemented rem feature and tried to make APP responsive and as mobile friendly as possible; In project I used SCSS because I think for big projects
while working in a team SCSS and BEM methodology is good approach.

## API specifications

![Swagger OpenAPI Specifications](/documentation/api/swagger) and ![Postmen Collection file with enviroment](/documentation/api/postman) were created
to see the API requirements and documentation.
If you prefer to use postman you can import the collection file and environment file into your postman, check requests and test them. or you can find
published API documentation [here](https://documenter.getpostman.com/view/1335114/TzCFhr5f) 

## Testing

I wrote couple of ![integration tests](/documentation/api/postman) with schema checking and request status/body checking functionality, using postman and implemented newman library as a dev dependency, changed package.json scripts to run tests.

## App itself

The demo verion of APP is uploaded at AWS S3 - it can be found [here](http://calendar-app-shakogele.s3-website.eu-central-1.amazonaws.com/)

## How to run locally

if you want to run this project just pull this repo and run `npm install` then `cd calendar` and `npm start` to run the APP on development mode
and visit [http://localhost:3000](http://localhost:3000).

## How to test

This project contains only integration tests to test with API integration. You can run `npm test-post-deploy` to run postman API tests. As Backend APIs
are not available for testing it will echo out an error messages for 2 API endpoints for 1 endpoint (GET mentor/agenda) it should pass.

## How to build

If you want the production verion run `npm run build` which will generate the build folder and then upload it on web server.
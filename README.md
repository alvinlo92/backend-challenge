# backend-challenge

## Instructions

## To run code

From within the root directory:

```sh
npm install
npm run create
npm run server-dev
```

## Server URL

localhost:3000

## RESTful CRUD API

### GET: Retreives list of all doctors

URL: /api/doctors

### GET: Retreive list of all appointments for particular doctor and particular day

URL: /api/:doctor/:date/appointments

### PUT: Add new appointment to doctor's calendar

URL: /api/:doctor/:date/:appointment

### DELETE: Delete exisiting appointment to doctor's calendar

URL: /api/:doctor/:date/:appointment
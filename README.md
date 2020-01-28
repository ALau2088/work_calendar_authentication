# work_calendar: work calendar from 12/29/2019 to 1/2/2021

## Project Installation

1. Install dependencies

```bash
$ cd work_calendar
$ npm install
```

2. Run webpack bundler

- Development

  ```bash
  $ npm run dev
  ```

  - Production

  ```bash
  $ npm run build
  ```

## Run the application

1. Start server

   - Development

   ```bash
   $ npm run dev:server
   ```

   - Production

   ```bash
   $ npm run server
   ```

2. Go to http://localhost:3000/

## To Run Tests

```bash
$ npm run test
```

## API EndPoints

| Description                     | Method | Route       |
| ------------------------------- | ------ | ----------- |
| Get dates of current week       | GET    | /api/dates  |
| Get all events for specific day | GET    | /api/events |
| Get an event                    | GET    | /api/event  |
| Add an event                    | POST   | /api/event  |
| Edit an event                   | PUT    | /api/event  |
| Delete an event                 | DELETE | /api/event  |
| Get all users                   | GET    | /api/users  |
| Get an user                     | GET    | /api/user   |
| Add an user                     | POST   | /api/user   |

## Tech Stack

1. React/Bootstrap
   - Implemented UI with React and Bootstrap.
2. Redux
   - Implemented state manager with Redux to manage user state to eliminate passing down props thru multiple components and achieve constant time retrieval of user data.
3. NodeJs/ExpressJs
   - Implemented server and RESTFul API with NodeJs and ExpressJs.
4. SQLite3
   - Implemented database with SQLite3 to conveniently store data without a server to handle multirow transactions.
5. Axios
   - Utilized Axios to make http requests.
6. Miscellaneous Dev Tools
   - Utilized Nodemon for auto reloading.
   - Utilized Postman for API testing.
   - Utilized Jest and Enzyme for unit and integration tests.
   - Utlized babel and webpack for transpilation and build.

## Requirements

1. Be able to view events in a given time window
   - Events can be viewed on a weekly time window
   - Event details can be viewed by clicking on a scheduled event
2. Pick one view to implement: week view or month view
   - week view
3. Be able to add/delete/edit an event at a given time
   - Add an event by clicking on Available slot which will show a modal to add an event.
   - Edit or Delete an event by clicking a scheduled event on the week view which will show a modal with edit and delete options
4. Single event, with a start time and an end time
   - A start time and an end time can be set for a single event in the event modal
5. Repeated event, start time and end time of the first occurrence, and specify repeating conditions (weekly, monthly…)
   - Weekly and monthly repeat options can be selected in the event modal
6. Be able to set a regular working hours (e.g M-F 9am - 5pm)
   - work hours can be set when a new user is created via new user modal
7. Be able to display if a user is available or not at a given time ( in working hours and not booked by another event)
   - If there is no event scheduled during a work time, the slot will be shown as Available. Each work time slot is in 30min intervals. If there is an event already scheduled, the slot will be shown as Edit Event. Edit or delete the event by clicking on it.
8. This web app should be able to support multiple users, this is more on the storage/api part, no need to spend time doing any of the user authentication/login/signup flow
   - A user can be added by clicking the add user button and submitting add user modal. Users must have unique emails.

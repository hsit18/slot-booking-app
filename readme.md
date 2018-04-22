# SlotBookingApp

App show the the calendar view with summary of booked slots. User can book below list of slots as per the availability book slot page.

1. Meeting Room A at 10$ for 1 hour
2. Meeting Room B at 10$ for 1 hour
3. Meeting Point A at 15$ for 1 hour
4. Meeting Point A at 20$ for 1 hour
5. Meeting Point Full at 30$ for 1 hour
6. Meeting Basketball Court at 50$ for 2 hour

If user selects the Meeting Point Full then for the same time schedule user cannot book the Meeting Point A and Meeting Point B.


## To run this app

Git clone the repo or extract the zip. Navigate the project root folder.

Run `npm install` to install the project dependencies.

### For Server App (Api Support). Preferred in separate terminal.
Run `npm run server` for a api server support. Server runs at `http://localhost:3001/`.

### For client App
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

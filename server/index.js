const express = require('express');
const db = require('../database');

const app = express();
const port = 3000;

app.get('/api/doctors', (req, res) => {
  db.getAllDoctors((err, doctors) => {
    if (err) return err;
    res.send(doctors);
  });
});

app.get('/api/:doctor/:date/appointments', (req, res) => {
  db.getAllDoctorAppointments((err, appointments) => {
    if (err) return err;
    res.send(appointments);
  });
});

app.post('/api/:doctor/:date/:appointment', function (req, res) {
  db.postDoctorAppointment(doctor, date, appointment, req.body, (err) => {
    if (err) return err;
    res.send('Appointment has been saved');
  });
});

app.delete('/api/:doctor/:date/:appointment', function (req, res) {
  const { doctor, date, appointment } = req.params;
  db.deleteDoctorAppointment(doctor, date, appointment, (err) => {
    if (err) return err;
    res.send('Appointment has been deleted');
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

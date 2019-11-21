const { Pool } = require('pg')


const pool = new Pool()

const getAllDoctors = (cb) => {
  const query = 'SELECT * FROM doctors';
  pool.query(query, (err, doctors) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, doctors);
    }
  });
};

const getAllDoctorAppointments = (doctor, date, cb) => {
  let fullName = doctor.split(' ');
  let firstName = fullName[0];
  let lastName = fullName[1];
  const query = 'SELECT * FROM appointments WHERE doctor_id IN (SELECT id FROM doctors WHERE first_name = $1 AND last_name = $2) AND date = $3';
  pool.query(query, [firstName, lastName, date], (err, appointments) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, appointments);
    }
  });
};

const postDoctorAppointment = (doctor, date, appointment, body, cb) => {
  let patientFirstName = body.firstName;
  let patientLastName = body.lastName;
  let { kind }  = body;

  let fullName = doctor.split(' ');
  let firstName = fullName[0];
  let lastName = fullName[1];
  let doctorId;
  
  pool.query('SELECT id FROM doctors WHERE first_name = $1 AND last_name = $2', [firstName, lastName], (err, id) => {
    if (err) {
      return err;
    } else {
      doctorsId = id;
    }
  })

  const query = 'INSERT INTO appointments WHERE ($1, $2, $3, $4, $5, $6)';
  pool.query(query, [patientFirstName, patientLastName, date, appointment, kind, doctorId], (err) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  })
};

const deleteDoctorAppointment = (doctor, date, appointment, cb) => {
  let fullName = doctor.split(' ');
  let firstName = fullName[0];
  let lastName = fullName[1];
  const query = 'DELETE FROM appointments WHERE WHERE doctor_id IN (SELECT id FROM doctors WHERE first_name = $1 and last_name = $2) AND date = $3 AND time = $4';
  pool.query(query, [firstName, lastName, date, appointment], (err) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  })
};

module.exports = {
  getAllDoctors,
  getAllDoctorAppointments,
  postDoctorAppointment,
  deleteDoctorAppointment,
};

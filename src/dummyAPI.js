// eslint-disable-next-line
import moment from 'moment';
import { dumpDoctors, dumpPatients, dumpPeriods, dumpAppointed, dumpPrescriptions, dumpMedicines, dumpDiseases, dumpUsers, dumpDatasets, insertAppointment, dataAPI } from './dummyData';
import { Appointment } from './dummyClass';

const appointmentLimitPerPeriod = 2;
/*
  === Response Structure ===
  success flag (true, false)
  message text
  data (nullable)
*/
class Response {
  constructor(success, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

/*
  === Authentication ===
*/

function login(hn, password) {
  // Get all users
  const users = dumpUsers();
  // check if has user
  const resultUser = users.find(u => { console.log(u); return u.hospitalID === hn;});
  // error catching
  if (!resultUser) {
    return new Response(false, 'ไม่พบผู้ใช้งาน');
  }
  if (resultUser.password !== password) {
    return new Response(false, 'รหัสผ่านไม่ตรง');
  }
  // auth success
  return new Response(true, 'done', resultUser);
}

/*
  === Appointment ===
*/

function checkAppoint(doctorHospitalID, patientHospitalID, pickedDate, period) {
  // Get all appointments
  const allAppointments = dumpAppointed();

  // Check if patient has appointment at that time 
  const patientHasAppoint = allAppointments.find(a => {
    return a.patient.hospitalID === patientHospitalID
      && moment(a.datetime).isSame(pickedDate, 'day')
      && a.period.id === period.id;
  });
  if (patientHasAppoint) {
    return new Response(false, `ผู้ป่วยมีนัดแพทย์ในวันที่ ${moment(pickedDate).format('LL')} (${period.name}) แล้ว ไม่สามารถทำการนัดหมายได้`);
  }
  // Get appointment in the same day & period of this doctor
  const appointeds = allAppointments.filter(a => {
    return a.doctor.hospitalID === doctorHospitalID
      && moment(a.datetime).isSame(pickedDate, 'day')
      && a.period.id === period.id;
  });

  // If more than 6 appointments, rejects
  if (appointeds.length >= appointmentLimitPerPeriod) {
    return new Response(false, `ไม่สามารถนัดแพทย์ได้ในวันที่ ${moment(pickedDate).format('LL')} (${period.name})`);
  }
  return new Response(true, `สามารถนัดแพทย์ได้ในวันที่ ${moment(pickedDate).format('LL')} (${period.name}) - เหลืออีก ${appointmentLimitPerPeriod - appointeds.length} ตำแหน่ง`);
}

function insertAppoint(doctor, patient, pickedDate, period) {
  dataAPI.insertAppointment(new Appointment('id', patient, doctor, pickedDate, period));
  return new Response(true, `เพิ่มนัดระหว่างนายแพทย์${doctor.name} ${doctor.surename} และ ผู้ป่วย${patient.name} ${patient.surename} ในวันที่ ${moment(pickedDate).format('LL')} (${period.name}) เรียบร้อย`);
}

function reappoint(appointmentID, datetime) {
  if (!(datetime instanceof Date)) {
    return new Response(false, 'ไม่ใช่วันที่');
  }
  dataAPI.reappoint(appointmentID, datetime);
  return new Response(true, 'เลื่อนวันนัดเรียบร้อย');
}

export { login, checkAppoint, insertAppoint, reappoint };

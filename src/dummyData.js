import moment from 'moment';
import { User, Department, Medicine, Period } from './dummyClass';

/*
  === Department : Data===
*/
const departments = [
  new Department('1', 'ศัลยกรรม'),
  new Department('2', 'อายุรกรรม'),
];

const dumpDepartments = () => departments;
/*
  === Medicines : Data ===
*/
const medicines = [
  new Medicine('M0001', 'Aspirin', 'Aspirin, also known as acetylsalicylic acid (ASA), is a medication used to treat pain, fever, and inflammation.'),
  new Medicine('M0002', 'Bascopan', 'Buscopan is known as an anticholinergic medicine. It relieves the pain of stomach and bowel cramps by helping your digestive system to relax.'),
  new Medicine('M0003', 'Ranitidine', 'Ranitidine Tablets, USP are a competitive, reversible inhibitor of the action of histamine at the histamine H2-receptors, including receptors on the gastric cells. '),
  new Medicine('M0004', 'Paracetamol', 'Acetaminophen is used to treat minor aches and pain and to reduce fever. It may also help treat pain from mild forms of arthritis.'),
  new Medicine('M0005', 'Asafetida', 'Asafetida is known as an antidote for flatulence and is also prescribed for respiratory conditions like asthma, bronchitis and whooping cough.'),
];

const dumpMedicines = () => {
  return medicines;
};

/*
  === Users : Data & API ===
*/
const users = [
  new User('0', 'hn-doctor1', 'จิรัฐ', 'อยากเป็นหมอ1', 'doctor', 'อยากเป็นหมอคริๆๆ', '1160100439880', 'usernamedoctor1', 'passworddoctor', moment().subtract(Math.floor(Math.random() * 1000, 'days')), '77/6 ม.3', 'male', 'doctor1@gmail.com', '0906866563', [departments[0].name], null),
  new User('1', 'hn-doctor2', 'จิรัฐ', 'อยากเป็นหมอ2', 'doctor', 'อยากเป็นหมอคริๆๆ', '1160100439881', 'usernamedoctor2', 'passworddoctor', moment().subtract(Math.floor(Math.random() * 1000, 'days')), '77/6 ม.3', 'male', 'doctor2@gmail.com', '0906866563', [departments[1].name], null),
  new User('2', 'hn-patient1', 'จิรัฐ', 'อยากเป็นผู้ป่วย', 'patient', 'อยากเป็นผู้ป่วยคริๆๆ', '1160100439882', 'usernamepatient1', 'passwordpatient', moment().subtract(Math.floor(Math.random() * 1000, 'days')), '77/6 ม.3', 'female', 'patient1@gmail.com', '0906866563', null, [medicines[0]]),
  new User('3', 'hn-nurse1', 'จิรัฐ', 'อยากเป็นพยาบาล', 'nurse', 'อยากเป็นพยาบาลคริๆๆ', '1160100439883', 'usernamenurse', 'passwordnurse', moment().subtract(Math.floor(Math.random() * 1000, 'days')), '77/6 ม.3', 'female', 'nurse@gmail.com', '0906866563', [departments[0].name]),
  new User('4', 'hn-staff1', 'จิรัฐ', 'อยากเป็นเจ้าหน้าที่', 'staff', 'อยากเป็นเจ้าหน้าที่คริๆๆ', '1160100439884', 'usernamestaff', 'passwordstaff', moment().subtract(Math.floor(Math.random() * 1000, 'days')), '77/6 ม.3', 'male', 'staff@gmail.com', '0906866563', [departments[0].name]),
  new User('5', 'hn-pharmacist1', 'จิรัฐ', 'อยากเป็นเภสัชร', 'pharmacist', 'อยากเป็นเภสัชรคริๆๆ', '1160100439885', 'usernamepharmacist', 'passwordpharmacist', moment().subtract(Math.floor(Math.random() * 1000, 'days')), '77/6 ม.3', 'female', 'pharmacist@gmail.com', '0906866563', [departments[0].name]),
  new User('6', 'hn-admin1', 'จิรัฐ', 'อยากเป็นแอดมิน', 'admin', 'อยากเป็นแอดมินคริๆๆ', '1160100439886', 'usernameadmin', 'passwordadmin', moment().subtract(Math.floor(Math.random() * 1000, 'days')), '77/6 ม.3', 'female', 'admin@gmail.com', '0906866563'),
  new User('7', 'hn-patient2', 'จนิน', 'ชอบป่วย', 'patient', 'อยากเป็นผู้ป่วยคริๆๆ', '1160100439887', 'usernamepatient2', 'passwordpatient', moment().subtract(Math.floor(Math.random() * 1000, 'days')), '77/6 ม.3', 'male', 'patient2@gmail.com', '0906866563', null, [medicines[1]]),
  new User('8', 'hn-patient3', 'มิตสึฮะ', 'จัง', 'patient', 'อยากเป็นผู้ป่วยคริๆๆ', '1160100439888', 'usernamepatient3', 'passwordpatient', moment().subtract(Math.floor(Math.random() * 1000, 'days')), '77/6 ม.3', 'male', 'patient2@gmail.com', '0906866563', null, [medicines[1]]),
  new User('9', 'hn-doctor3', 'ทากิ', 'คุง', 'doctor', 'อยากเป็นหมอคริๆๆ', '1160100439889', 'usernamedoctor3', 'passworddoctor', moment().subtract(Math.floor(Math.random() * 1000, 'days')), '77/6 ม.3', 'male', 'doctor1@gmail.com', '0906866563', [departments[0].name], null),
  
];

const dumpUsers = () => {
  return users;
};

const dumpDoctors = () => {
  return users.filter((user) => {
    return user.role === 'doctor';
  });
};

function getDoctor(hospitalID) {
  return users.find(user => user.hospitalID === hospitalID);
}

const dumpPatients = () => {
  return users.filter((user) => {
    return user.role === 'patient';
  });
};

function getPatient(hospitalID) {
  return users.find(user => user.hospitalID === hospitalID);
}

/*
  === Periods : Data & API ===
*/
const periods = [
  new Period('1', 'ช่วงเช้า'),
  new Period('2', 'ช่วงบ่าย'),
];

const dumpPeriods = () => {
  return periods;
};

/*
  === Appointment : Data & API ===
*/
let appointmentIndex = 1;
const appointments = [
  // {
  //   id: '1',
  //   patient: users[2],
  //   doctor: users[0],
  //   datetime: moment().subtract(Math.floor(Math.random() * 10), 'days').format(),
  //   period: periods[0],
  // },
  // {
  //   id: '2',
  //   patient: users[7],
  //   doctor: users[1],
  //   datetime: moment().subtract(Math.floor(Math.random() * 10), 'days').format(),
  //   period: periods[1],
  // },
];

const dumpAppointed = () => {
  return appointments;
};

function getAppointment(appointmentID) {
  return appointments.find(a => a.id === appointmentID);
}

function insertAppointment(appointment) {
  appointment.id = appointmentIndex.toString();
  appointments.push(appointment);
  appointmentIndex += 1;
}

function reappoint(appointmentID, datetime) {
  for (let i = 0; i < appointments.length; i += 1) {
    if (appointments[i].id === appointmentID) {
      appointments[i].datetime = datetime;
      break;
    }
  }
}

/*
  === Prescription : Data ===
*/
const prescriptions = [
  {
    Doctor:{
      HN:users[9].hospitalID,
      name: users[9].name,
      surname: users[9].surename
      
    } ,
    patient: {
      HN:users[8].hospitalID,
      name: users[8].name,
      surname: users[8].surename
      
    } ,
    medicine: [medicines[0], medicines[1]],
    dose: ["1","2"],
    status: "waiting"
  },
  
];

const dumpPrescriptions = () => {
  return prescriptions;
};

/*
  === Disease : Data ===
*/
const diseases = [
  {
    id: '1',
    ICD10: '1234',
    name: 'โรคยาราไนก้า',
    info: 'ยาดี มีกำลัง พังพินาศ',
  },
  {
    id: '2',
    ICD10: '3432',
    name: 'โรคยาหมอมี',
    info: 'ยานี้หมอมี คนไข้ไม่มี',
  },
];

const dumpDiseases = () => {
  return diseases;
};

/*
  Report
*/
const dumpDatasets = () => {
  return [
    {
      label: 'ศัลยกรรม',
      data: [12, 19, 3, 17, 6, 3, 7],
      backgroundColor: 'rgba(153,255,51,0.4)',
    },
    {
      label: 'ทันตกรรม',
      data: [2, 29, 5, 5, 2, 3, 10],
      backgroundColor: 'rgba(255,153,0,0.4)',
    },
    {
      label: 'หัตถกรรม',
      data: [20, 1, 3, 3, 13, 8, 17],
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
    {
      label: 'จารกรรม',
      data: [10, 16, 3, 5, 13, 7, 18],
      backgroundColor: 'rgba(75, 192, 192, 1)',
    },
  ];
};

const dataAPI = { insertAppointment, getDoctor, getPatient, getAppointment, reappoint };

export { dumpDoctors, dumpPatients, dumpPeriods, dumpAppointed, dumpPrescriptions, dumpMedicines, dumpDiseases, dumpUsers, dumpDatasets, dumpDepartments, dataAPI };

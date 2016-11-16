import moment from 'moment';

// class Doctor {
//   constructor(hospitalID, name, surename, department) {
//     this.hospitalID = hospitalID;
//     this.name = name;
//     this.surename = surename;
//     this.department = department;
//   }
// }

// class Patient {
//   constructor(hospitalID, name, surename) {
//     this.hospitalID = hospitalID;
//     this.name = name;
//     this.surename = surename;
//   }
// }

// class Period {
//   constructor(id, name, surename)
// }

const dumpDoctors = () => {
  return [
    {
      hospitalID: '11',
      name: 'จนิน',
      surename: 'คูวิจิตร',
      department: 'ลมพัดลมเพ โอ่ละเห่',
    },
    {
      hospitalID: '12',
      name: 'จิรัฐ',
      surename: 'อ้นอารี',
      department: 'สบายสบายสไตล์คุณหมอ',
    },
  ];
};

const dumpPatients = () => {
  return [
    {
      hospitalID: '21',
      name: 'จนิน',
      surename: 'คูวิจิตร',
      allergy: [1],
    },
    {
      hospitalID: '22',
      name: 'จิรัฐ',
      surename: 'อ้นอารี',
      allergy: [2],
    },
  ];
};

const dumpPeriods = () => {
  return [
    {
      id: '1',
      name: 'ช่วงเช้า',
    },
    {
      id: '2',
      name: 'ช่วงบ่าย',
    },
  ];
};

const dumpAppointed = () => {
  return [
    {
      id: '123123',
      patient: {
        name: 'จนิน',
        surename: 'ควย',
        hospitalID: '21',
      },
      doctor: {
        hospitalID: '11',
        name: 'จิรัฐ',
        surename: 'ควย',
        department: 'แผนกโย่ๆหสดหกด',
      },
      datetime: moment().subtract(Math.floor(Math.random() * 10), 'days').format(),
      period: {
        id: '1',
        name: 'ช่วงเช้า',
      },
    },
    {
      id: '123124',
      patient: {
        name: 'จนิน',
        surename: 'ควย',
        hospitalID: '22',
      },
      doctor: {
        hospitalID: '12',
        name: 'จิรัฐกิกิ',
        surename: 'ควย',
        department: 'แผนกโย่ๆหสดหกด',
      },
      datetime: moment().subtract(Math.floor(Math.random() * 10), 'days').format(),
      period: {
        id: '2',
        name: 'ช่วงบ่าย',
      },
    },
  ];
};

const dumpPrescriptions = () => {
  return [
    {
      id: '1',
      patient: {
        hospitalID: '22',
        name: 'จิรัฐ',
        surename: 'อ้นอารี',
        allergy: [
          {
            id: 2,
            name: 'jirat แพ้',
          }
        ],
      },
      medicine: [
        {
          id: 1,
          name: 'janin แพ้',
        },
        {
          id: 2,
          name: 'jirat แพ้',
        },
      ],
    },
    {
      id: '2',
      patient: {
        hospitalID: '21',
        name: 'จนิน',
        surename: 'คูวิจิตร',
        allergy: [
          {
            id: 1,
            name: 'janin แพ้',
          }
        ],
      },
      medicine: [
        {
          id: 1,
          name: 'janin แพ้',
        },
        {
          id: 2,
          name: 'jirat แพ้',
        },
      ],
    },
  ];
};

const dumpMedicines = () => {
  return [
    {
      id: '1',
      name: 'ยาราไนก้า',
      info: 'ยาดี มีกำลัง พังพินาศ',
    },
    {
      id: '2',
      name: 'ยาหมอมี',
      info: 'ยานี้หมอมี คนไข้ไม่มี',
    },
  ];
};

const dumpDiseases = () => {
  return [
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
};

const dumpUsers = () => {
  return [
    {
      id: '1',
      hospitalID: '11',
      name: 'จนิน',
      surename: 'คูวิจิตร',
      department: 'ลมพัดลมเพ โอ่ละเห่',
      role: 'doctor',
      email: '123123@gmail.com',
      password: '1414324',
      telNo: '0906868564',
      gender: 'male',
      PID: '1160100439333',
      address: '77/6 m.3 t. bangpai',
      username: 'ads342sdf',
      birthdate: new Date(),
    },
    {
      id: '2',
      hospitalID: '12',
      name: 'จิรัฐ',
      surename: 'อ้นอารี',
      department: 'สบายสบายสไตล์คุณหมอ',
      role: 'doctor',
      email: '123123@gmail.com',
      password: '1414324',
      telNo: '0906868564',
      gender: 'female',
      PID: '1160100439333',
      address: '77/6 m.3 t. bangpai',
      username: 'adsfadf',
      birthdate: new Date(),
    },
  ];
};

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

export { dumpDoctors, dumpPatients, dumpPeriods, dumpAppointed, dumpPrescriptions, dumpMedicines, dumpDiseases, dumpUsers, dumpDatasets };

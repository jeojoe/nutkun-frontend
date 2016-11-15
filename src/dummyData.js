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
    },
    {
      hospitalID: '22',
      name: 'จิรัฐ',
      surename: 'อ้นอารี',
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

export { dumpDoctors, dumpPatients, dumpPeriods, dumpAppointed };

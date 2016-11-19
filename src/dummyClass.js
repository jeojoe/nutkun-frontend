class User {
  constructor(id, hospitalID, name, surename, role, info, PID, username, password, birthdate, address, gender, email, telNo, department, allergy) {
    this.id = id;
    this.hospitalID = hospitalID;
    this.name = name;
    this.surename = surename;
    this.role = role;
    this.info = info;
    this.PID = PID;
    this.username = username;
    this.password = 'qweasd';
    this.birthdate = birthdate;
    this.address = address;
    this.gender = gender;
    this.email = email;
    this.telNo = telNo;
    this.department = department;
    this.allergy = allergy;
    switch (role) {
      case 'patient':
        this.roleText = 'ผู้ป่วย';
        break;
      case 'doctor':
        this.roleText = 'แพทย์';
        break;
      case 'nurse':
        this.roleText = 'พยาบาล';
        break;
      case 'staff':
        this.roleText = 'เจ้าหน้าที่';
        break;
      case 'pharmacist':
        this.roleText = 'เภสัชกร';
        break;
      case 'admin':
        this.roleText = 'ผู้ดูแลระบบ';
        break;
      default:
        this.roleText = 'ไม่มี';
        break;
    }
  }
}

class Department {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Medicine {
  constructor(id, name, info) {
    this.id = id;
    this.name = name;
    this.info = info;
  }
}

class Period {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Appointment {
  constructor(id, patient, doctor, datetime, period) {
    this.id = id;
    this.patient = patient;
    this.doctor = doctor;
    this.datetime = datetime;
    this.period = period;
  }
}

class Prescription {
  constructor(id, patient, medicine) {
    this.id = id;
    this.patient = patient;
    this.medicine = medicine;
  }
}

class Disease {
  constructor(id, ICD10, name, info) {
    this.id = id;
    this.ICD10 = ICD10;
    this.name = name;
    this.info = info;
  }
}

export { User, Department, Medicine, Period, Appointment, Prescription, Disease };

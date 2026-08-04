export interface Patient {
  id: string;

  registrationDate: string;

  fullName: string;

  dateOfBirth: string;

  age: number;

  gender: string;

  phone: string;

  village: string;

  bloodGroup: string;

  occupation: string;

  maritalStatus: string;

  nextOfKin: string;

  relationship: string;

  nextOfKinPhone: string;
}

export const patients: Patient[] = [];
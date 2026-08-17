export interface Consultation {
  id?: string;

  consultationId: string;

  appointmentId: string;

  patientId: string;

  patientName: string;

  doctor: string;

  consultationDate: string;

  chiefComplaint: string;

  vitalSigns: string;

  diagnosis: string;

  prescription: string;

  laboratoryRequest: string;

  doctorsNotes: string;

  status: string;
}
export interface Appointment {

  appointmentId: string;

  patientId: string;

  department: string;

  doctor: string;

  appointmentDate: string;

  appointmentTime: string;

  reason: string;

  status: string;

}

export const appointments: Appointment[] = [];
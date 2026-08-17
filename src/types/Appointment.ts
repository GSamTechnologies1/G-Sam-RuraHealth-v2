export interface Appointment {
  id?: string;
  bookingId: string;
  patientId: string;
  department: string;
  doctor: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: string;
}
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointments.css";

type AppointmentStatus =
  | "requested"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface AppointmentRequest {
  id?: string;
  bookingId: string;
  patientId: string;
  facilityId: string;
  facilityName: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: AppointmentStatus;
}

export default function Appointments() {
  const navigate = useNavigate();

  const [showBookingForm, setShowBookingForm] = useState(false);

  const [facility, setFacility] = useState("");
  const [department, setDepartment] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");

  const [bookingMessage, setBookingMessage] = useState("");

  /*
   * TEMPORARY FACILITY DATA
   *
   * We will later connect this to the same
   * health-centre data used by the Services page.
   */

  const facilities = [
    {
      id: "facility-001",
      name: "Ibeno Primary Health Centre",
    },
    {
      id: "facility-002",
      name: "Ikot Abasi Primary Health Centre",
    },
    {
      id: "facility-003",
      name: "Ikono Primary Health Centre",
    },
    {
      id: "facility-004",
      name: "Ini Primary Health Centre",
    },
  ];

  const departments = [
    "General Consultation",
    "Maternal / Antenatal Care",
    "Child Health",
    "Laboratory",
    "Pharmacy",
    "Specialist Consultation",
    "Immunization",
    "Dental Care",
    "Other",
  ];

  /*
   * BOOK APPOINTMENT
   *
   * This currently prepares the appointment request.
   * Firebase connection will be added after the UI
   * and workflow are confirmed.
   */

  const handleBooking = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !facility ||
      !department ||
      !appointmentDate ||
      !appointmentTime ||
      !reason.trim()
    ) {
      setBookingMessage(
        "Please complete all appointment details."
      );

      return;
    }

    const selectedFacility = facilities.find(
      (item) => item.id === facility
    );

    if (!selectedFacility) {
      setBookingMessage(
        "Please select a valid health facility."
      );

      return;
    }

    const bookingId =
      `GSAM-${Date.now().toString().slice(-6)}`;

    const appointmentRequest: AppointmentRequest = {
      bookingId,
      patientId: "CURRENT_CITIZEN",
      facilityId: selectedFacility.id,
      facilityName: selectedFacility.name,
      department,
      appointmentDate,
      appointmentTime,
      reason: reason.trim(),
      status: "requested",
    };

    console.log(
      "Appointment Request:",
      appointmentRequest
    );

    setBookingMessage(
      `Appointment request ${bookingId} has been prepared successfully.`
    );

    setFacility("");
    setDepartment("");
    setAppointmentDate("");
    setAppointmentTime("");
    setReason("");

    setTimeout(() => {
      setShowBookingForm(false);
      setBookingMessage("");
    }, 2500);
  };

  return (
    <div className="appointments-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="appointments-header">

        <button
          type="button"
          className="appointments-back-btn"
          onClick={() =>
            navigate("/citizen-dashboard")
          }
        >
          ←
        </button>

        <div>
          <h1>Appointments</h1>

          <p>
            Request and manage your healthcare appointments.
          </p>
        </div>

      </header>


      <main className="appointments-main">

        {/* ===================================================
            BOOK APPOINTMENT HERO
        =================================================== */}

        <section className="appointment-hero">

          <div className="appointment-hero-icon">
            📅
          </div>

          <div className="appointment-hero-content">

            <h2>
              Need to see a healthcare provider?
            </h2>

            <p>
              Request an appointment at a health
              facility without visiting the facility first.
            </p>

            <button
              type="button"
              className="book-appointment-btn"
              onClick={() =>
                setShowBookingForm(true)
              }
            >
              ➕ Book New Appointment
            </button>

          </div>

        </section>


        {/* ===================================================
            BOOKING FORM
        =================================================== */}

        {showBookingForm && (

          <section className="appointment-form-section">

            <div className="form-section-header">

              <div>

                <h2>
                  Request an Appointment
                </h2>

                <p>
                  Select your preferred facility,
                  service, date and time.
                </p>

              </div>

              <button
                type="button"
                className="close-form-btn"
                onClick={() => {
                  setShowBookingForm(false);
                  setBookingMessage("");
                }}
              >
                ✕
              </button>

            </div>


            <form
              className="appointment-form"
              onSubmit={handleBooking}
            >

              {/* HEALTH FACILITY */}

              <div className="form-group">

                <label htmlFor="facility">
                  Health Facility
                </label>

                <select
                  id="facility"
                  value={facility}
                  onChange={(event) =>
                    setFacility(event.target.value)
                  }
                >

                  <option value="">
                    Select health facility
                  </option>

                  {facilities.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}

                </select>

              </div>


              {/* SERVICE / DEPARTMENT */}

              <div className="form-group">

                <label htmlFor="department">
                  Service / Department
                </label>

                <select
                  id="department"
                  value={department}
                  onChange={(event) =>
                    setDepartment(event.target.value)
                  }
                >

                  <option value="">
                    Select service
                  </option>

                  {departments.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}

                </select>

              </div>


              {/* DATE AND TIME */}

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="appointmentDate">
                    Preferred Date
                  </label>

                  <input
                    id="appointmentDate"
                    type="date"
                    value={appointmentDate}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(event) =>
                      setAppointmentDate(
                        event.target.value
                      )
                    }
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="appointmentTime">
                    Preferred Time
                  </label>

                  <input
                    id="appointmentTime"
                    type="time"
                    value={appointmentTime}
                    onChange={(event) =>
                      setAppointmentTime(
                        event.target.value
                      )
                    }
                  />

                </div>

              </div>


              {/* REASON */}

              <div className="form-group">

                <label htmlFor="reason">
                  Reason for Visit
                </label>

                <textarea
                  id="reason"
                  value={reason}
                  onChange={(event) =>
                    setReason(event.target.value)
                  }
                  placeholder="Briefly describe why you need the appointment..."
                  rows={4}
                  maxLength={300}
                />

                <small>
                  {reason.length}/300
                </small>

              </div>


              {/* INFORMATION */}

              <div className="appointment-form-notice">

                <span>
                  ℹ️
                </span>

                <p>
                  Your preferred time is a request.
                  The health facility may confirm the
                  time or assign another available time.
                  A healthcare provider will be assigned
                  by the facility.
                </p>

              </div>


              {/* MESSAGE */}

              {bookingMessage && (

                <div className="booking-success-message">
                  ✓ {bookingMessage}
                </div>

              )}


              {/* SUBMIT */}

              <button
                type="submit"
                className="submit-appointment-btn"
              >
                📅 Submit Appointment Request
              </button>

            </form>

          </section>

        )}


        {/* ===================================================
            UPCOMING APPOINTMENTS
        =================================================== */}

        <section className="appointments-section">

          <div className="section-heading">

            <div>

              <h2>
                Upcoming Appointments
              </h2>

              <p>
                Your confirmed and pending appointments.
              </p>

            </div>

            <span className="appointment-count">
              0
            </span>

          </div>


          <div className="empty-appointment-state">

            <div className="empty-appointment-icon">
              📅
            </div>

            <h3>
              No upcoming appointments
            </h3>

            <p>
              You don't currently have any upcoming
              appointments. Book an appointment when
              you need healthcare services.
            </p>

            <button
              type="button"
              onClick={() =>
                setShowBookingForm(true)
              }
            >
              Book an Appointment
            </button>

          </div>

        </section>


        {/* ===================================================
            APPOINTMENT STATUS
        =================================================== */}

        <section className="appointments-section">

          <div className="section-heading">

            <div>

              <h2>
                Appointment Status
              </h2>

              <p>
                Understand what happens after you submit
                an appointment request.
              </p>

            </div>

          </div>


          <div className="appointment-status-grid">

            <div className="status-card">

              <span>
                🟡
              </span>

              <strong>
                Requested
              </strong>

              <p>
                Your appointment request has been
                submitted to the facility.
              </p>

            </div>


            <div className="status-card">

              <span>
                🔵
              </span>

              <strong>
                Confirmed
              </strong>

              <p>
                The facility has accepted your request
                and confirmed your appointment.
              </p>

            </div>


            <div className="status-card">

              <span>
                🟠
              </span>

              <strong>
                Rescheduled
              </strong>

              <p>
                The facility has proposed a different
                appointment time.
              </p>

            </div>


            <div className="status-card">

              <span>
                🟢
              </span>

              <strong>
                Completed
              </strong>

              <p>
                Your appointment has been completed
                and can become part of your health record.
              </p>

            </div>

          </div>

        </section>


        {/* ===================================================
            HOW IT WORKS
        =================================================== */}

        <section className="appointments-section">

          <div className="section-heading">

            <div>

              <h2>
                How Appointments Work
              </h2>

              <p>
                Simple steps from request to consultation.
              </p>

            </div>

          </div>


          <div className="appointment-steps">

            <div className="appointment-step">

              <div className="step-number">
                1
              </div>

              <div>

                <strong>
                  Request
                </strong>

                <p>
                  Select a facility, service, date
                  and preferred time.
                </p>

              </div>

            </div>


            <div className="appointment-step">

              <div className="step-number">
                2
              </div>

              <div>

                <strong>
                  Facility Reviews
                </strong>

                <p>
                  Reception staff review your
                  appointment request.
                </p>

              </div>

            </div>


            <div className="appointment-step">

              <div className="step-number">
                3
              </div>

              <div>

                <strong>
                  Assignment
                </strong>

                <p>
                  The facility assigns an appropriate
                  healthcare provider.
                </p>

              </div>

            </div>


            <div className="appointment-step">

              <div className="step-number">
                4
              </div>

              <div>

                <strong>
                  Notification
                </strong>

                <p>
                  You receive confirmation and
                  appointment details.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            IMPORTANT NOTICE
        =================================================== */}

        <section className="appointments-notice">

          <span>
            🔐
          </span>

          <div>

            <h3>
              Your Healthcare Information
            </h3>

            <p>
              Appointment information belongs to your
              health profile. Only authorized healthcare
              facility staff should process, confirm or
              modify appointment requests.
            </p>

          </div>

        </section>

      </main>


      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}

      <nav className="appointments-bottom-nav">

        <button
          type="button"
          onClick={() =>
            navigate("/citizen-dashboard")
          }
        >
          🏠
          <span>
            Home
          </span>
        </button>


        <button
          type="button"
          onClick={() =>
            navigate("/health-education")
          }
        >
          ❤️
          <span>
            Health
          </span>
        </button>


        <button
          type="button"
          onClick={() =>
            navigate("/health-centres")
          }
        >
          🏥
          <span>
            Services
          </span>
        </button>


        <button
          type="button"
          className="active"
        >
          📅
          <span>
            Appointments
          </span>
        </button>


        <button
          type="button"
          onClick={() =>
            navigate("/notifications")
          }
        >
          🔔
          <span>
            Alerts
          </span>
        </button>

      </nav>

    </div>
  );
}
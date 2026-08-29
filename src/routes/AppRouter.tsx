import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// ===============================
// PAGES
// ===============================
import LandingPage from "../pages/LandingPage";
import PatientRegistration from "../pages/PatientRegistration";
import PatientRecords from "../pages/PatientRecords";
import BookAppointment from "../pages/BookAppointment";

import ReceptionistDashboard from "../pages/ReceptionistDashboard";
import DoctorsDashboard from "../pages/DoctorsDashboard";
import Consultation from "../pages/Consultation";
import AdminDashboard from "../pages/AdminDashboard";
import CitizenDashboard from "../pages/CitizenDashboard";
import Appointments from "../pages/Appointments";
import Immunization from "../pages/Immunization";
import Breastfeeding from "../features/health/Breastfeeding";
import BreastCancerAwareness from "../features/health/breast-cancer/Breast-CancerAwareness";
import AntenatalCare from "../pages/AntenatalCare";
import HealthCentres from "../pages/HealthCentres";
import Emergency from "../pages/Emergency";
import Notifications from "../pages/Notifications";
import HealthRecords from "../pages/HealthRecords";
import KidneyHealth from "../pages/KidneyHealth";
import CardiacArrest from "../pages/CardiacArrest";
import Referrals from "../pages/Referral";
import Profile from "../pages/Profile";
import ChildHealth from "../pages/ChildHealth";

// ===============================
// LANGUAGE & ONBOARDING
// ===============================
import LanguageScreen from "../features/language/LanguageScreen";
import Onboarding from "../features/onboarding/Onboarding";

// ===============================
// CITIZEN AUTHENTICATION
// ===============================
import AuthPage from "../features/auth/AuthPage";
import Register from "../features/auth/Register";

// ===============================
// CITIZEN FEATURES
// ===============================
import Home from "../features/home/Home";
import AIHealthAssistant from "../features/ai/AIHealthAssistant";

// ===============================
// STAFF
// ===============================
import StaffPortal from "../features/staff/StaffPortal";
import StaffLogin from "../features/staff/StaffLogin";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================
            LANDING PAGE
        ===================================== */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* =====================================
            LANGUAGE
        ===================================== */}
        <Route
          path="/language"
          element={<LanguageScreen />}
        />

        {/* =====================================
            ONBOARDING
        ===================================== */}
        <Route
          path="/onboarding"
          element={<Onboarding />}
        />

        {/* =====================================
            CITIZEN AUTHENTICATION
        ===================================== */}
        <Route
          path="/auth"
          element={<AuthPage />}
        />

        <Route
          path="/create-account"
          element={<Register />}
        />

        <Route
  path="/sign-in"
  element={<AuthPage />}
/>

        {/* =====================================
            CITIZEN DASHBOARD
        ===================================== */}
        <Route
          path="/citizen-dashboard"
          element={<CitizenDashboard />}
        />

<Route
  path="/immunization"
  element={<Immunization />}
/>

<Route
  path="/cardiac-arrest"
  element={<CardiacArrest />}
/>

        {/* =====================================
            CITIZEN HOME
        ===================================== */}
        <Route
          path="/home"
          element={<Home />}
        />

        {/* =====================================
            AI HEALTH ASSISTANT
        ===================================== */}
        <Route
          path="/ai"
          element={<AIHealthAssistant />}
        />

        {/* =====================================
            CITIZEN FEATURES
        ===================================== */}
        <Route
          path="/emergency"
          element={<Emergency />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/health-records"
          element={<HealthRecords />}
        />

        <Route
          path="/appointments"
          element={<Appointments />}
        />

        <Route
          path="/health-centres"
          element={<HealthCentres />}
        />

        <Route
  path="/health-education/kidney-health"
  element={<KidneyHealth />}
/>

<Route 
  path="/referrals" 
  element={<Referrals />} 
/>

<Route
  path="/profile"
  element={<Profile />}
/>

<Route
  path="/antenatal"
  element={<AntenatalCare />}
/>

<Route
  path="/child-health"
  element={<ChildHealth />}
  />
          {/* =====================================
            STAFF AUTHENTICATION
        ===================================== */}
        <Route
          path="/staff-login"
          element={<StaffLogin />}
        />

        {/* =====================================
            STAFF PORTAL
        ===================================== */}
        <Route
          path="/staff-portal"
          element={<StaffPortal />}
        />

        {/* =====================================
            PATIENT REGISTRATION
        ===================================== */}
        <Route
          path="/patient-registration"
          element={<PatientRegistration />}
        />

        {/* =====================================
            PATIENT RECORDS
        ===================================== */}
        <Route
          path="/patients"
          element={<PatientRecords />}
        />

        {/* =====================================
            BOOK APPOINTMENT
        ===================================== */}
        <Route
          path="/book-appointment"
          element={<BookAppointment />}
        />

        {/* =====================================
            RECEPTIONIST DASHBOARD
        ===================================== */}
        <Route
          path="/receptionist-dashboard"
          element={<ReceptionistDashboard />}
        />

        {/* =====================================
            DOCTOR DASHBOARD
        ===================================== */}
        <Route
          path="/doctor-dashboard"
          element={<DoctorsDashboard />}
        />

        {/* =====================================
            CONSULTATION
        ===================================== */}
        <Route
          path="/consultation/:appointmentId"
          element={<Consultation />}
        />

        {/* =====================================
            ADMIN DASHBOARD
        ===================================== */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        {/* =====================================
            HEALTH EDUCATION
        ===================================== */}
        <Route
          path="/breastfeeding"
          element={<Breastfeeding />}
        />

        <Route
          path="/health-education/breast-cancer"
          element={<BreastCancerAwareness />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
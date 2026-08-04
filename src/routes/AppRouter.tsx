import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SplashScreen from "../features/splash/SplashScreen";
import LanguageScreen from "../features/language/LanguageScreen";
import Onboarding from "../features/onboarding/Onboarding";
import AuthScreen from "../features/auth/AuthScreen";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import Home from "../features/home/Home";
import AIHealthAssistant from "../features/ai/AIHealthAssistant";
import PatientRegistration from "../pages/PatientRegistration";
import PatientRecords from "../pages/PatientRecords";
import BookAppointment from "../pages/BookAppointment";

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/splash" />} />

        <Route path="/splash" element={<SplashScreen />} />

        <Route path="/language" element={<LanguageScreen />} />

        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/auth" element={<AuthScreen />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/ai" element={<AIHealthAssistant />} />

<Route path="/patient-registration" element={<PatientRegistration />} />

<Route path="/patients" element={<PatientRecords />} />

<Route path="/book-appointment" element={<BookAppointment />} />
      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;
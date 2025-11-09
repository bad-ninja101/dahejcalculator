import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

// Import your pages — adjust paths if needed
import WelcomePage from "./pages/WelcomePage";
import GenderSelectionPage from "./pages/GenderSelectionPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import ResultsPage from "./pages/ResultsPage";

/**
 * Small wrapper that ensures a gender has been selected before
 * accessing the questionnaire route. If not present, redirects to /gender.
 */
function RequireGender({ selectedGender, children }) {
  if (!selectedGender) {
    return <Navigate to="/gender" replace />;
  }
  return children;
}

/**
 * Small wrapper that ensures formData exists before showing results.
 * If not present, redirect to welcome (or questionnaire) as you prefer.
 */
function RequireResults({ formData, children }) {
  if (!formData) {
    return <Navigate to="/" replace />;
  }
  return children;
}

/**
 * AppRouter component keeps top-level state and passes handlers down
 * so pages remain presentational (they only call props like onContinue, onNavigate, onComplete).
 */
export default function App() {
  // Top-level app state that persists across routes
  const [selectedGender, setSelectedGender] = useState(null);
  const [formData, setFormData] = useState(null);

  // Helpers to mutate state and navigate programmatically
  // We'll use a small inner component to access useNavigate hook.
  return (
    <BrowserRouter>
      <InnerRouter
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        formData={formData}
        setFormData={setFormData}
      />
    </BrowserRouter>
  );
}

/**
 * InnerRouter is separated so we can use hooks (useNavigate) easily.
 */
function InnerRouter({ selectedGender, setSelectedGender, formData, setFormData }) {
  const navigate = useNavigate();

  // Called from WelcomePage to go to gender selection
  const handleContinue = () => {
    // reset previous session data when starting again
    setSelectedGender(null);
    setFormData(null);
    navigate("/gender");
  };

  // Called from GenderSelectionPage with the chosen gender id (e.g. 'male'|'female'|'other')
  const handleGenderNavigate = (gender) => {
    setSelectedGender(gender);
    // navigate to questionnaire
    navigate("/questionnaire");
  };

  // Called from QuestionnairePage when form is complete: receives collected form data object
  const handleComplete = (data) => {
    // attach gender into the final form data (if not already present)
    const payload = { gender: selectedGender, ...data };
    setFormData(payload);
    navigate("/results");
  };

  // Called from ResultsPage to restart / recalculate
  const handleCalculateAgain = () => {
    // keep gender selected and go back to questionnaire, or reset as you prefer:
    setFormData(null);
    navigate("/questionnaire");
  };

  // Optional: "Start Over" — go to welcome and clear state
  const handleStartOver = () => {
    setSelectedGender(null);
    setFormData(null);
    navigate("/");
  };

  return (
    <Routes>
      {/* Home / Welcome */}
      <Route
        path="/"
        element={<WelcomePage onContinue={handleContinue} />}
      />

      {/* Gender selection */}
      <Route
        path="/gender"
        element={
          <GenderSelectionPage
            onNavigate={handleGenderNavigate}
            // optional: pass currently selected gender so the page can highlight it
            selectedGender={selectedGender}
          />
        }
      />

      {/* Questionnaire - protected: requires a gender selected */}
      <Route
        path="/questionnaire"
        element={
          <RequireGender selectedGender={selectedGender}>
            <QuestionnairePage
              gender={selectedGender}
              onComplete={handleComplete}
              onBack={() => navigate("/gender")}
            />
          </RequireGender>
        }
      />

      {/* Results - protected: requires formData to exist */}
      <Route
        path="/results"
        element={
          <RequireResults formData={formData}>
            <ResultsPage
              formData={formData}
              onCalculateAgain={handleCalculateAgain}
              onStartOver={handleStartOver}
            />
          </RequireResults>
        }
      />

      {/* Fallback / 404: redirect to home (you can change to a NotFound component) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

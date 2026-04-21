import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/landing";

const TeamsGettingStarted = lazy(() =>
  import("@/pages/teams-getting-started").then((m) => ({
    default: m.TeamsGettingStarted,
  }))
);

const PrivacyPage = lazy(() =>
  import("@/pages/privacy").then((m) => ({
    default: m.PrivacyPage,
  }))
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/teams/getting-started"
          element={
            <Suspense>
              <TeamsGettingStarted />
            </Suspense>
          }
        />
        <Route
          path="/privacy"
          element={
            <Suspense>
              <PrivacyPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { ComingSoonPage } from "@/pages/coming-soon";
import { TeamsGettingStarted } from "@/pages/teams-getting-started";

export default function App() {
  useTheme(); // Initialize theme detection (system preference + localStorage)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComingSoonPage />} />
        <Route
          path="/teams/getting-started"
          element={<TeamsGettingStarted />}
        />
      </Routes>
    </BrowserRouter>
  );
}

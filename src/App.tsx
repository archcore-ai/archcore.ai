import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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

const PluginPage = lazy(() =>
  import("@/pages/plugin").then((m) => ({
    default: m.PluginPage,
  }))
);

const CLIPage = lazy(() =>
  import("@/pages/cli").then((m) => ({
    default: m.CLIPage,
  }))
);

const HowToUsePage = lazy(() =>
  import("@/pages/how-to-use").then((m) => ({
    default: m.HowToUsePage,
  }))
);

/**
 * Belt and braces for public/install/index.html, which is what normally serves
 * /install — a static file GitHub Pages returns with a 200, so the app never
 * boots there. This runs only when the request reaches the SPA shell instead:
 * a client-side navigation, or a host that serves the extensionless path from
 * the 404 fallback rather than resolving the directory index. Without it such a
 * path matches no route and <Routes> renders an empty page.
 *
 * search and hash are carried over by hand because a bare `to="/cli"` drops
 * both — measured, not assumed. Losing them here would silently strip UTM
 * parameters on exactly the paths this fallback covers, so the two routes to
 * /cli would disagree about attribution.
 */
function InstallRedirect() {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: "/cli", search, hash }} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/install" element={<InstallRedirect />} />
        <Route
          path="/plugin"
          element={
            <Suspense>
              <PluginPage />
            </Suspense>
          }
        />
        <Route
          path="/cli"
          element={
            <Suspense>
              <CLIPage />
            </Suspense>
          }
        />
        <Route
          path="/how-to-use"
          element={
            <Suspense>
              <HowToUsePage />
            </Suspense>
          }
        />
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

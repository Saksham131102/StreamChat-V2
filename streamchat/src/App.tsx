import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/AuthPages/LoginPage/LoginPage";
import SignupPage from "./pages/AuthPages/SignupPage/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./pages/AppLayout/AppLayout";
import HomePage from "./pages/AppPages/HomePage";
import MoviesPage from "./pages/AppPages/MoviesPage";
import SeriesPage from "./pages/AppPages/SeriesPage";
import TvShowsPage from "./pages/AppPages/TvShowsPage";
import WatchPage from "./pages/WatchPage/WatchPage";

function App() {
  return (
    <main>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes — requires auth */}
        <Route element={<ProtectedRoute />}>
          <Route path="/browse" element={<AppLayout />}>
            {/* Redirect /app → /app/home */}
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="series" element={<SeriesPage />} />
            <Route path="tv-shows" element={<TvShowsPage />} />
            <Route path="watch/:id" element={<WatchPage />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;

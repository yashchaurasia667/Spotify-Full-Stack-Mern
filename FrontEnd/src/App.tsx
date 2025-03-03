import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomeMain from "./components/home/homeMain/HomeMain";
import Browse from "./pages/Browse";
import NotFound from "./pages/NotFound";
import SignupHero from "./components/signup/SignupHero";
import Profile from "./pages/Profile";
import Playlist from "./pages/Playlist";
import TrackPage from "./pages/TrackPage";
import LikedSongs from "./pages/LikedSongs";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import SignupLayout from "./layouts/SignupLayout";
import MainContextProvider from "./context/mainContext/MainContextProvider";

import "./App.css";
import YtTest from "./pages/YtTest";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="*" element={<NotFound />} />

        <Route
          path="/"
          element={
            <MainContextProvider>
              <MainLayout />
            </MainContextProvider>
          }
        >
          <Route index element={<HomeMain />} />
          <Route path="browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/likedsongs" element={<LikedSongs />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/track/:id" element={<TrackPage />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignupLayout />}>
          <Route index element={<SignUp />} />
          <Route path=":id" element={<SignupHero />} />
        </Route>
        <Route path="/yt" element={<YtTest />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

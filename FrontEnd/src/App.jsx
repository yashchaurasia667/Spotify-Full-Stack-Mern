import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomeMain from "./components/home/homeMain/HomeMain";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import SignupHero from "./components/signup/SignupHero";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import SignupLayout from "./layouts/SignupLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeMain />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignupLayout />}>
          <Route index element={<SignUp />} />
          <Route path=":id" element={<SignupHero />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

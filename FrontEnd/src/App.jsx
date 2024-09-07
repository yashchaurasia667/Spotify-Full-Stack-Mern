import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomeMain from "./components/home/homeMain/HomeMain";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import SignupLayout from "./layouts/SignupLayout";
import Step1 from "./components/signup/step1/Step1";
import Step2 from "./components/signup/step2/Step2";
import Step3 from "./components/signup/step3/Step3";
import Step4 from "./components/signup/step4/Step4";
import SignupHero from "./components/signup/SignupHero";

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
          {/* <Route path="1" element={<Step1 />} />
          <Route path="2" element={<Step2 />} />
          <Route path="3" element={<Step3 />} />
          <Route path="4" element={<Step4 />} /> */}
          <Route path=":id" element={<Hero/>} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

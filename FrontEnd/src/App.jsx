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

import HomeLayout from "./layouts/HomeLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomeMain />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

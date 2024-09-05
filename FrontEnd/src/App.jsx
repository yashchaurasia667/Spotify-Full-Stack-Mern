import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NotFound from "./pages/NotFound";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="*" element={<NotFound />} />

        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

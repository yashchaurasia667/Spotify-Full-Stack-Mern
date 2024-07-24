import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    )
  );

const App = () => {
  
  return <RouterProvider router={router} />;
};

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UnityPage from "../components/pages/UnityPage";
import Home from "../components/pages/Home";
import LogIn from "../components/pages/LogIn";
import SignUp from "../components/pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // errorElement: <NotFound/>,
  },
  {
    path: "/unitypage",
    element: <UnityPage />,
    // errorElement: <NotFound/>,
  },
  {
    path: "/login",
    element: <LogIn />,
    // errorElement: <NotFound/>,
  },
  {
    path: "/signup",
    element: <SignUp />,
    // errorElement: <NotFound/>,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

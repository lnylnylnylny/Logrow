import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Mystudy from "./pages/Mystudy";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "mystudy",
        Component: Mystudy,
      },

    ],
  },
  
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

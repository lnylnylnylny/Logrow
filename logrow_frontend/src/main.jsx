import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import addStudy from "./pages/addStudy";

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
        path: "addstudy",
        Component: addStudy,
      },

    ],
  },
  
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

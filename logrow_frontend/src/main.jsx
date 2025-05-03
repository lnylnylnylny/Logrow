import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Mystudy from "./pages/Mystudy";
import MystudyRoom from "./pages/Mystudy/components/MystudyRoom";
import Checklist from "./pages/Mystudy/components/Checklist";
import GrowUp from "./pages/Mystudy/components/GrowUp";
import Review from "./pages/Mystudy/components/Review";
import addStudy from "./pages/addStudy";
import Login from "./pages/Login";
import Join from "./pages/Join";

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
      {
        path: "login",
        Component: Login,
      },
      {
        path: "join",
        Component: Join,
      },
      {
        path: "mystudy",
        Component: Mystudy,
        children: [
          {
            index: true, 
            Component: MystudyRoom,
          },
          {
            path: "checklist",
            Component: Checklist,
          },
          {
            path: "growup",
            Component: GrowUp,
          },
          {
            path: "review",
            Component: Review,
          },
        ],
      },
    ],
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


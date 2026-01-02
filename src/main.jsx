import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import Home, { puzzlesLoader } from "./routes/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: puzzlesLoader,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

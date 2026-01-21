import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import Home, { puzzlesLoader } from "./routes/Home/Home";
import Puzzle, { puzzleByIdLoader } from "./routes/Puzzle/Puzzle";
import Root from "./routes/Root";
import Leaderboard from "./routes/Leaderboard/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        index: true,
        element: <Home />,
        loader: puzzlesLoader,
      },
      {
        path: "/puzzles/:puzzleId",
        element: <Puzzle />,
        loader: puzzleByIdLoader,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

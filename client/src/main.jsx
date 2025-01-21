import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router";
import Holdings from './pages/Holdings.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import { RouterProvider } from "react-router-dom";
import Search from "./pages/Search.jsx";
import AddStock from "./pages/AddStock.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/holdings",
        element: <Holdings />,
      },
      {
        path: "/add/holding",
        element: <AddStock />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ]
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)

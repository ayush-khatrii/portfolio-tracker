import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router";
import Holdings from './pages/Holdings.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Layout from "./layout.jsx";
import { RouterProvider } from "react-router-dom";
import Search from "./pages/Search.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        path: "/search",
        element: <Search />,
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)

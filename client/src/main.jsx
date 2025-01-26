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
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import EditHolding from "./pages/EditHolding.jsx";

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
        path: "/edit/holding/:id",
        element: <EditHolding />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ]
  },
]);
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <RouterProvider router={router} />
  </QueryClientProvider>
)

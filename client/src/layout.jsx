import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="sm:px-3 md:px-10 px-4 mb-10">
        <Outlet />
      </div>
    </div>
  )
}

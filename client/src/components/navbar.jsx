import { NavLink, useLocation } from "react-router-dom";
import { MdAdd, MdPlusOne, MdShowChart, MdMenu } from "react-icons/md";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const url = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-zinc-900">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <div className="ml-3 flex gap-1 justify-center items-center font-extrabold text-green-500">
              <MdShowChart size="25" />
              <span className="text-lg">TrackX</span>
            </div>
          </NavLink>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:opacity-75"
          >
            <MdMenu size="24" />
          </button>

          <div className="hidden md:flex items-center justify-between ml-10">
            <nav className="flex items-center text-base space-x-4">
              <NavLink
                to="/"
                className={`hover:text-green-500 transition-all duration-150 ${url === "/" ? "opacity-100" : "opacity-50"}`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/holdings"
                className={`hover:text-green-500 transition-all duration-150 ${url === "/holdings" ? "opacity-100" : "opacity-50"}`}
              >
                Holdings
              </NavLink>
              <NavLink to="/search"
                className={`hover:text-green-500 transition-all duration-150 ${url === "/search" ? "opacity-100" : "opacity-50"}`}
              >
                Search
              </NavLink>
            </nav>
          </div>
        </div>

        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col mt-4 space-y-4`}>
          <nav className="flex flex-col space-y-3">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`hover:text-green-500 transition-all duration-150 ${url === "/" ? "opacity-100" : "opacity-50"}`}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/holdings"
              onClick={() => setIsMenuOpen(false)}
              className={`hover:text-green-500 transition-all duration-150 ${url === "/holdings" ? "opacity-100" : "opacity-50"}`}
            >
              Holdings
            </NavLink>
            <NavLink to="/search"
              className={`hover:text-green-500 transition-all duration-150 ${url === "/holdings" ? "opacity-100" : "opacity-50"}`}
            >
              Search
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
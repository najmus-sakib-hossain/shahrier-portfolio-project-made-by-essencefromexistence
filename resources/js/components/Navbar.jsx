import { MenuIcon, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = { pathname: window.location.pathname };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const getTextColor = () => {
    if (location.pathname === "/") return "text-slate-950";
    if (location.pathname === "/home") return "text-black";
    if (location.pathname === "/aboutme") return "text-slate-950";
    if (location.pathname === "/life-events") return "text-slate-950";
    if (location.pathname === "/entrepreneurship") return "text-slate-950";
    if (location.pathname === "/technology") return "text-slate-950";
    if (location.pathname === "/donation") return "text-slate-950";
    if (location.pathname === "/contact") return "text-white";
    return "text-black";
  };

  const getIconColor = () => {
    if (location.pathname === "/") return "text-slate-950";
    if (location.pathname === "/aboutme") return "text-slate-950";
    if (location.pathname === "/life-events") return "text-slate-950";
    if (location.pathname === "/entrepreneurship") return "text-slate-950";
    if (location.pathname === "/technology") return "text-slate-950";
    if (location.pathname === "/donation") return "text-slate-900";
    if (location.pathname === "/contact") return "text-white";
    return "text-black";
  };

  return (
    <div className={``}>
      <div className={`py-6 w-11/12 mx-auto`}>
        <div className="flex items-center justify-between">
          <a href="/">
            <div className={`text-4xl special-text ${getTextColor()}`}>
              Shahriar Khan
            </div>
          </a>
          <div>
            <p
              className={`text-4xl cursor-pointer px-4 py-2 rounded-lg`}
              onClick={toggleDrawer}
            >
              <MenuIcon className={`h-8 w-8 ${getIconColor()}`} />
            </p>
          </div>
        </div>

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 w-3/4 lg:w-2/5 h-full bg-white text-slate-900 p-4 transform transition-transform ${drawerOpen ? "translate-x-0" : "translate-x-full"
            } z-50`}
        >
          <div className="flex justify-end">
            <button
              className="text-4xl text-slate-950 cursor-pointer"
              onClick={toggleDrawer}
            >
              <X className="h-8 w-8 text-black" />
            </button>
          </div>
          <div className="mt-10 text-3xl font-medium px-20">
            <ul>
              <a
                href="/home"
                onClick={toggleDrawer}
                className={
                  location.pathname === "/home"
                    ? "text-blue-500 font-bold"
                    : "text-black hover:text-blue-500"
                }
              >
                <li className="mb-6">Home</li>
              </a>
              <a
                href="/aboutme"
                onClick={toggleDrawer}
                className={
                  location.pathname === "/aboutme"
                    ? "text-blue-500 font-bold"
                    : "text-black hover:text-blue-500"
                }
              >
                <li className="mb-6">About Me</li>
              </a>
              <a
                href="/books"
                onClick={toggleDrawer}
                className={
                  location.pathname === "/books"
                    ? "text-blue-500 font-bold"
                    : "text-black hover:text-blue-500"
                }
              >
                <li className="mb-6">Books</li>
              </a>
              <a
                href="/entrepreneurship"
                onClick={toggleDrawer}
                className={
                  location.pathname === "/entrepreneurship"
                    ? "text-blue-500 font-bold"
                    : "text-black hover:text-blue-500"
                }
              >
                <li className="mb-6">Entepreneourship</li>
              </a>
              <a
                href="/events"
                onClick={toggleDrawer}
                className={
                  location.pathname === "/events"
                    ? "text-blue-500 font-bold"
                    : "text-black hover:text-blue-500"
                }
              >
                <li className="mb-6">Events</li>
              </a>
              <a
                href="/blogs"
                onClick={toggleDrawer}
                className={
                  location.pathname === "/blogs"
                    ? "text-blue-500 font-bold"
                    : "text-black hover:text-blue-500"
                }
              >
                <li className="mb-6">Blogs</li>
              </a>
              <a
                href="/technology"
                onClick={toggleDrawer}
                className={
                  location.pathname === "/technology"
                    ? "text-blue-500 font-bold"
                    : "text-black hover:text-blue-500"
                }
              >
                <li className="mb-6">Technology</li>
              </a>
              <a
                href="/donation"
                onClick={toggleDrawer}
                className={
                  location.pathname === "/donation"
                    ? "text-blue-500 font-bold"
                    : "text-black hover:text-blue-500"
                }
              >
                <li className="mb-6">Donation</li>
              </a>
              <a
                href="/videos"
                onClick={toggleDrawer}
                className={
                  location.pathname === "/videos"
                    ? "text-blue-500 font-bold"
                    : "text-black hover:text-blue-500"
                }
              >
                <li className="mb-6">Videos</li>
              </a>
              <a
                href="/life-events"
                onClick={toggleDrawer}
                className={
                  location.pathname === "/life-events"
                    ? "text-blue-500 font-bold"
                    : "text-black hover:text-blue-500"
                }
              >
                <li className="mb-6">Life Events</li>
              </a>
              <a
                href="/contact"
                onClick={toggleDrawer}
                className={
                  location.pathname === "/contact"
                    ? "text-blue-500 font-bold"
                    : "text-black hover:text-blue-500"
                }
              >
                <li className="mb-6">Contact</li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed w-screen z-999">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">VType</div>
          </div>

          <div className="hidden md:block">
            <ul className="flex space-x-6 text-gray-700 dark:text-gray-200">
              <li>
                <a href="#home" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</a>
              </li>
              <li>
                <a href="#practice" className="hover:text-indigo-600 dark:hover:text-indigo-400">Practice</a>
              </li>
              <li>
                <a href="#stats" className="hover:text-indigo-600 dark:hover:text-indigo-400">Stats</a>
              </li>
              <li>
                <a href="#settings" className="hover:text-indigo-600 dark:hover:text-indigo-400">Settings</a>
              </li>
            </ul>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-expanded={open}
            >
              <svg className={`h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Home</a>
          <a href="#practice" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Practice</a>
          <a href="#stats" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Stats</a>
          <a href="#settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Settings</a>
        </div>
      )}
    </nav>
  );
}

export default Nav;

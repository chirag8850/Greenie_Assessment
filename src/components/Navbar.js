import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-stone-200 p-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={'/'}>
          <h3 style={{ color: '#20b038' }} className=" text-4xl font-bold">Greenie</h3>
        </Link>
        <ul className="flex space-x-14">
          <li>
            <Link
              to={'/user-details'}
              style={{ color: '#20b038' }}
              className="text-3xl hover:text-gray-300 hover:border-b-2 hover:border-neutral-800 transition duration-300 ease-in-out"
            >
              User Details
            </Link>
          </li>
          <li>
            <Link
              to={'/create-account'}
              style={{ color: '#20b038' }}
              className="text-3xl hover:text-gray-300 hover:border-b-2 hover:border-neutral-800 transition duration-300 ease-in-out"
            >
              Account Creation
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
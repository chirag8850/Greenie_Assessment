import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 flex items-center text-xl">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Chirag Vaviya</p>
        <div className='m-1'>
            <p>Email: chiragvaviya98@gmail.com</p>
        </div>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="https://github.com/chirag8850/Greenie_Assessment.git" className="text-white hover:text-gray-400" target='_blank'>
            Github
          </a>
          <a href="https://www.linkedin.com/in/chiragvaviya" className="text-white hover:text-gray-400" target='_blank'>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

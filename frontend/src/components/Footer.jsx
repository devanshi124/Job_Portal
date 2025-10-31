import React from 'react'

export const Footer = () => {
 return (
    <footer className="border-t border-t-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Job Hunt</h2>
            <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" className="hover:text-gray-400" aria-label="Facebook">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 
                24h11.495v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 
                1.325 0 2.464.099 2.797.143v3.24h-1.919c-1.505 0-1.796.715-1.796 
                1.763v2.31h3.59l-.467 3.622h-3.123V24h6.116C23.407 24 24 23.407 
                24 22.676V1.324C24 .593 23.407 0 22.676 0z"/>
              </svg>
            </a>

            <a href="https://twitter.com" className="hover:text-gray-400" aria-label="Twitter">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 
                0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 
                4.916 4.916 0 00-8.384 4.482A13.95 13.95 0 011.671 
                3.149a4.916 4.916 0 001.523 6.573A4.897 4.897 0 01.964 
                9.1v.062a4.916 4.916 0 003.946 4.817 4.902 4.902 0 
                01-2.212.084 4.918 4.918 0 004.588 3.417A9.867 9.867 
                0 010 21.543a13.94 13.94 0 007.548 2.209c9.057 0 
                14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.637A10.012 
                10.012 0 0024 4.557z"/>
              </svg>
            </a>

            <a href="https://linkedin.com" className="hover:text-gray-400" aria-label="LinkedIn">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.86v-5.569c0-1.328-.025-3.037-1.849-3.037-1.851 
                0-2.134 1.445-2.134 2.939v5.667H9.28V9h3.431v1.561h.049c.478-.9 
                1.645-1.849 3.385-1.849 3.62 0 4.289 2.384 4.289 5.482v6.258zM5.337 
                7.433a1.993 1.993 0 110-3.987 1.993 1.993 0 010 3.987zM6.987 
                20.452H3.688V9h3.299v11.452zM22.225 0H1.771C.792 0 0 
                .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 
                24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

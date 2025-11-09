import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-6 footer footer-center text-gray-300 p-4 
      bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 
      backdrop-blur-md border-t border-white/10 shadow-inner rounded-t-lg">
      
      <aside>
        <p className="text-sm sm:text-base">
          Made by:{" "}
          <a
            className="font-bold text-white hover:text-pink-400 transition-colors duration-300"
            href="https://github.com/RohankumarReddy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nagaruru Rohankumar Reddy
          </a>
        </p>
      </aside>
    </footer>
  )
}

export default Footer

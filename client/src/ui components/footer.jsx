
function Footer() {
  return (
    <footer className="bg-hero text-white">
     <svg
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="black"
          fillOpacity="1"
          d="M0,224L40,208C80,192,160,160,240,165.3C320,171,400,213,480,213.3C560,213,640,171,720,144C800,117,880,107,960,128C1040,149,1120,203,1200,224C1280,245,1360,235,1400,229.3L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        />
      </svg>  
      {/* Footer content */}
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left side */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h2 className="text-2xl font-bold">
            <span className="text-purple-400">Spice</span>
            <span className="text-green-400">Shelf</span>
          </h2>
          <p className="text-gray-200 text-sm">
            Where the spice of stories flows.
          </p>
        </div>

        {/* Right side */}
        <div className="flex space-x-6 mt-6 md:mt-0 text-orange-600 font-bold">
          <a href="/books" className="hover:text-gray-400">
            Books
          </a>
          <a href="/login" className="hover:text-gray-400" >
            Login
          </a>
          <a href="/admin" className="hover:text-gray-400">
            Admin
          </a>
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center py-4 border-t border-gray-700 text-sm relative z-10">
        © {new Date().getFullYear()} SpiceShelf. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

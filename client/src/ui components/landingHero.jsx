/*For the wave (dune) SVGs https://getwaves.io/ */
function LandingHero() {
  return (
    <>
        <section className="bg-hero relative flex items-center justify-center h-[70vh] text-center pb-28 md:pb-60">
        <div className="px-6 z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-purple-400">Spice</span>
            <span className="text-green-400">Shelf</span>
          </h1>

          <p className="text-xl md:text-2xl mb-6">
          Your online bookstore.
          </p>
          <a href="/books" className="inline-block text-mint px-6 py-3 rounded-lg font-semibold border-2 border-text-mint hover:cursor-pointer hover:scale-105 transform transition-transform duration-300">
            Explore Books
          </a>
        </div>

        {/* SVG wave */}
        <svg
            className="absolute bottom-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
        >
            <path
            fill="black"
            fillOpacity="1"
            d="M0,0L20,37.3C40,75,80,149,120,192C160,235,200,245,240,218.7C280,192,320,128,360,133.3C400,139,440,213,480,229.3C520,245,560,203,600,160C640,117,680,75,720,96C760,117,800,203,840,218.7C880,235,920,181,960,160C1000,139,1040,149,1080,170.7C1120,192,1160,224,1200,240C1240,256,1280,256,1320,261.3C1360,267,1400,277,1420,282.7L1440,288L1440,320L0,320Z"
            />
        </svg>
        </section>
    </>
  )
}

export default LandingHero
import dune from '../assets/dune.jpg';
//Hardcoded feature book to display if fetch fails
function PlaceholderBook() {
  
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center p-12 bg-black">
      <img 
          src={dune} 
          alt="Dune" 
          className="w-64 rounded-xl shadow-lg mb-6 md:mb-0 md:mr-8"
      />
      <div className="max-w-md text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Featured Book: Dune</h2>
          <button onClick={() =>setModalOpen(true)} className="inline-block text-mint px-6 py-3 rounded-lg font-semibold border-2 border-text-mint hover:cursor-pointer hover:scale-105 transform transition-transform duration-300">
          View Book
          </button>
      </div>
      </section>  
    </>
  )
}

export default PlaceholderBook
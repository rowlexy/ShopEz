const Footer = () => {
  return (
    <>
      <hr className="border-gray-300 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-12 py-4 sm:py-6"/>
      <footer className="text-center px-4 py-6 bg-gray-100 text-sm sm:text-base md:text-lg">
        <div className="max-w-7xl mx-auto">
          All rights reserved
            &copy; ShopEz {new Date().getFullYear()}
        </div>
      </footer>
    </>
  )
}

export default Footer
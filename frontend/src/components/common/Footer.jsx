const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-gray-100 text-center border-t border-gray-300">
      <div className="max-w-full px-4">
        <div className="flex justify-center gap-4 mb-4 text-2xl text-gray-700">
          <a href="#" className="hover:text-gray-900 transition">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-gray-900 transition">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-gray-900 transition">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <div className="font-bold mb-2 text-gray-900">&copy; StayNest Private Limited</div>
        <div className="flex justify-center gap-6 text-sm">
          <a href="#" className="text-gray-700 no-underline hover:text-gray-900 transition">Privacy</a>
          <a href="#" className="text-gray-700 no-underline hover:text-gray-900 transition">Terms</a>
          <a href="#" className="text-gray-700 no-underline hover:text-gray-900 transition">Company Details</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

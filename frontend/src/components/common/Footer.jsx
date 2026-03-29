const Footer = () => {
  return (
    <footer className="f-info mt-auto py-3 bg-light text-center border-top">
      <div className="container">
        <div className="f-info-socials mb-2">
          <i className="fa-brands fa-facebook me-2"></i>
          <i className="fa-brands fa-instagram me-2"></i>
          <i className="fa-brands fa-linkedin"></i>
        </div>
        <div className="f-info-brand fw-bold mb-2">&copy; StayNest Private Limited</div>
        <div className="f-info-links">
          <a href="#" className="text-decoration-none text-dark me-3">Privacy</a>
          <a href="#" className="text-decoration-none text-dark me-3">Terms</a>
          <a href="#" className="text-decoration-none text-dark">Company Details</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

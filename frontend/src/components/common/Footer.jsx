const Footer = () => {
  return (
    <footer className="mt-auto py-5 bg-light text-center border-top border-secondary">
      <div className="w-100 px-3">
        <div className="d-flex justify-content-center gap-3 mb-3 fs-5 text-secondary">
          <a href="#" className="text-secondary text-decoration-none">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#" className="text-secondary text-decoration-none">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="text-secondary text-decoration-none">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <div className="fw-bold mb-2 text-dark">&copy; StayNest Private Limited</div>
        <div className="d-flex justify-content-center gap-4 small">
          <a href="#" className="text-secondary text-decoration-none">Privacy</a>
          <a href="#" className="text-secondary text-decoration-none">Terms</a>
          <a href="#" className="text-secondary text-decoration-none">Company Details</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

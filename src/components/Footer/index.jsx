import "./style.css";

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-dark text-muted">
      <section className>
        <div className="container text-center text-md-start pt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fab fa-kickstarter" /> KPHIM
              </h6>
              <p>
                Trang web xem phim sử dụng Reactjs, Expressjs và Bootstrap 5. 
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Sản phấm</h6>
              <p>
                <a href="#!" className="text-reset">
                  Template
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  ReactJS
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Liên kết</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Facebook
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
              <p>
                <i className="fa fa-envelope me-3" />
                info@example.com
              </p>
              <p>
                <i className="fa fa-phone me-3" /> + 01 234 567 88
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr />
      {/* <div className="pb-3 social-net d-flex justify-content-center">
        <a href className="me-4 text-reset ">
          <i className="fa fa-facebook-f" />
        </a>
        <a href className="me-4 text-reset">
          <i className="fa fa-twitter" />
        </a>
        <a href className="me-4 text-reset">
          <i className="fa fa-google" />
        </a>
        <a href className="me-4 text-reset">
          <i className="fa fa-instagram" />
        </a>
        <a href className="me-4 text-reset">
          <i className="fa fa-linkedin" />
        </a>
        <a href className="me-4 text-reset">
          <i className="fa fa-github" />
        </a>
      </div> */}
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright: &nbsp;
        <a className="text-reset fw-bold">KPHIM</a>
      </div>
    </footer>
  );
}

export default Footer;

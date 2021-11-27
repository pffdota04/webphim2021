import "./style.css";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-black text-muted">
      <section>
        <div className="container text-center text-md-start pt-3">
          <div className="row mt-3 text-white">
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <div className="logo-img"></div>
                {/* <i className="fab fa-kickstarter" /> KPHIM */}
              </h6>
              <p>
                KPHIM là trang web xem phim trực tuyến sử dụng công nghệ Reactjs (Bootstrap 5), server
                Expressjs.
              </p>
              <span>© 2021 Copyright: &nbsp;<a className="primary-color fw-bold link-color">KPHIM</a></span>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fs-5 fw-bold mb-4 primary-color">Giới thiệu</h6>
              <p>
                <Link to="#!" href="#!" className="text-reset link-color">
                  Quy chế dịch vụ
                </Link>
              </p>
              <p>
                <Link to="#!" className="text-reset link-color">
                  Chính sách bảo mật
                </Link>
              </p>
              <p>
                <Link to="#!" className="text-reset link-color">
                  Khuyến mãi
                </Link>
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fs-5 fw-bold mb-4 primary-color">Liên hệ</h6>
              <p>
                <Link to="#!" className="text-reset link-color">
                <i className="fa fa-instagram me-3" />Instagram
                </Link>
              </p>
              <p>
                <Link to="#!" className="text-reset link-color">
                <i className="fa fa-facebook me-3" />Facebook
                </Link>
              </p>
              <p>
                <Link to="#!" className="text-reset link-color">
                <i className="fa fa-youtube me-3" />Youtube
                </Link>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase fs-5 fw-bold mb-4 primary-color">Hỗ trợ</h6>
              <p className="link-color">
                <i className="fa fa-envelope me-3" />
                kphim.contact@gmail.com
              </p>
              <p className="link-color">
                <i className="fa fa-phone me-3" /> + 0123 456 789
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <hr /> */}
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
      {/* <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright: &nbsp;
        <a className="text-reset fw-bold">KPHIM</a>
      </div> */}
    </footer>
  );
}

export default Footer;

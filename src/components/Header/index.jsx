import "./style.css";
import brandLogo from "./../../assets/images/logo1.png";
import userLogo from "./../../assets/images/user-logo.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchValueTime, setSearchTimeValue] = useState("");

  const onSubmitSearch = (e) => {
    e.preventDefault();
    let Search = "/search/" + e.target.value;
    setSearchValue(Search);
  };

  const onSubmitYear = (e) => {
    e.preventDefault();
    let Search = "/phim/" + e.target.value;
    setSearchTimeValue(Search);
  };

  return (
    <header id="header">
      <nav
        className="navbar navbar-expand-md navbar-dark fixed-top bg-dark"
        id="header-real"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img className="NavLogo" src={brandLogo} alt="logo" width="80px" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0 mr-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  // href="/category/category.html"
                  to="/phim/tatca"
                >
                  TẤT CẢ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/phim/movie"
                >
                  PHIM LẺ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/phim/series"
                >
                  PHIM BỘ
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active"
                  data-toggle="dropdownyear"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  NĂM
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark usermenu"
                  aria-labelledby="dropdownyear"
                >
                  <li>
                    <Link className="dropdown-item" to="/phim/2022">
                      2022
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/2021">
                      2021
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/2020">
                      2020
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/2019">
                      2019
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/2018">
                      2018
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/2017">
                      2017
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/2016">
                      2016
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/2015">
                      2015
                    </Link>
                  </li>
                  <li>
                    <form action={searchValueTime} method="get">
                      <input
                        type="number"
                        placeholder={1975}
                        onChange={onSubmitYear}
                      />
                    </form>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link active d-block link-dark text-decoration-none dropdown-toggle"
                  data-toggle="dropdowntype"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  THỂ LOẠI
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark usermenu"
                  aria-labelledby="dropdowntype"
                >
                  <li>
                    <Link className="dropdown-item" to="/phim/hanhdong">
                      HÀNH ĐỘNG
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/vientuong">
                      VIỄN TƯỞNG
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/kinhdi">
                      KINH DỊ
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/hoathinh">
                      HOẠT HÌNH
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/chinhkich">
                      CHÍNH KỊCH
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/langman">
                      LÃNG MẠN
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/hai">
                      HÀI
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/toipham">
                      TỘI PHẠM
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/giadinh">
                      GIA ĐÌNH - TRẺ EM
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle active"
                  data-toggle="dropdowntype"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUỐC GIA
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark usermenu"
                  aria-labelledby="dropdowntype"
                >
                  <li>
                    <Link className="dropdown-item" to="/phim/phim-my">
                      PHIM MỸ
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/phim-nhat">
                      PHIM NHẬT
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/phim-han">
                      PHIM HÀN
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/phim-vietnam">
                      PHIM VIỆT NAM
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/phim-trung">
                      PHIM TRUNG
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/phim/quoc-gia-khac">
                      KHÁC...
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {/* <button type="button" class="btn btn-danger me-2 mb-2 mt-2" data-bs-toggle="modal"
      data-bs-target="#thongbao">What new?</button> */}
            {/* Dropdown user action */}
            <div className="dropdown nav-item  " id="userlogo">
              <a
                href="/"
                className="d-block nav-link dropdown-toggle active"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={userLogo}
                  alt="mdo"
                  width={32}
                  height={32}
                  className="rounded-circle"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark usermenu"
                aria-labelledby="dropdownUser1"
              >
                <li>
                  <a className="dropdown-item" href="/user">
                    <i className="fa fa-user" /> Bấm vào đây nè
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    <i className="fa fa-plus"></i> Phim đã lưu
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    <i className="fa fa-unlock" /> Phim Vip
                  </a>
                </li>

                {/* <li>
                  <a className="dropdown-item" href="./../voucher/voucher.html">
                    <i className="fa fa-gift" /> Voucher
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    <i className="fa fa-credit-card"></i> Nạp tiền
                  </a>
                </li>*/}
                <li>
                  <a
                    className="dropdown-item text-danger"
                    href="/login/login.html"
                  >
                    <i className="fa fa-sign-out" /> Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
            <form
              className="d-flex me-3 formsearch"
              action={searchValue}
              method="get"
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={onSubmitSearch}
              />
              <button className="btn btn-outline-light" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

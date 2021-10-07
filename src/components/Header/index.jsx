import "./style.css";
import brandLogo from "./../../assets/images/logo1.png";
import userLogo from "./../../assets/images/user-logo.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListSearch } from "./../../store/actions/listPhim_Action";
import axios from "axios";

const Header = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const data = useSelector((state) => state.listTatCa.searchData);
  const [searchValueTime, setSearchTimeValue] = useState("");
  const [calling, setcalling] = useState(false);

  const dispatch = useDispatch();

  const onSubmitSearch = (e) => {
    //  console.log("Searching... " + Object.keys(data).length);
    if (Object.keys(data).length == 0 && !calling) {
      setcalling(true);
      console.log("Calling Data...");
      axios.get(process.env.REACT_APP_API_LOCAL + "film/search").then((res) => {
        dispatch(setListSearch(res.data));
        setcalling(false);
        console.log("You got dat data");
      });
    }
    e.preventDefault();
    let Search = e.target.value;
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
        style={{ maxHeight: "62px" }}
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

          <div
            className="collapse navbar-collapse menu-header"
            id="navbarCollapse"
          >
            <ul className="navbar-nav me-auto mb-2 mb-md-0 mr-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active nv"
                  aria-current="page"
                  to="/phim/tatca"
                >
                  <strong>TẤT CẢ</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/phim/movie"
                >
                  <strong>PHIM LẺ</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/phim/series"
                >
                  <strong>PHIM BỘ</strong>
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
                    <Link
                      className="dropdown-item"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarCollapse"
                      onClick={() => history.push("/phim/2022")}
                    >
                      2022
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarCollapse"
                      onClick={() => history.push("/phim/2021")}
                    >
                      e 2021
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarCollapse"
                      onClick={() => history.push("/phim/2020")}
                    >
                      2020
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarCollapse"
                      onClick={() => history.push("/phim/2019")}
                    >
                      2019
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarCollapse"
                      onClick={() => history.push("/phim/2018")}
                    >
                      2018
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarCollapse"
                      onClick={() => history.push("/phim/2017")}
                    >
                      2017
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
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => history.push("/phim/action")}
                    >
                      HÀNH ĐỘNG
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => history.push("/phim/scifi")}
                    >
                      VIỄN TƯỞNG
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => history.push("/phim/horror")}
                    >
                      KINH DỊ
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => history.push("/phim/anime")}
                    >
                      HOẠT HÌNH
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => history.push("/phim/drama")}
                    >
                      CHÍNH KỊCH
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => history.push("/phim/romantic")}
                    >
                      LÃNG MẠN
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => history.push("/phim/comedy")}
                    >
                      HÀI
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => history.push("/phim/crime")}
                    >
                      TỘI PHẠM
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => history.push("/phim/family")}
                    >
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
                    <Link
                      className="dropdown-item"
                      // to="/phim/us"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarCollapse"
                      onClick={() => history.push("/phim/us")}
                    >
                      PHIM MỸ
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarCollapse"
                      onClick={() => history.push("/phim/ja")}
                    >
                      PHIM NHẬT
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarCollapse"
                      onClick={() => history.push("/phim/ko")}
                    >
                      PHIM HÀN
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarCollapse"
                      onClick={() => history.push("/phim/vi")}
                    >
                      PHIM VIỆT NAM
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarCollapse"
                      onClick={() => history.push("/phim/ch")}
                    >
                      PHIM TRUNG
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarCollapse"
                      onClick={() => history.push("/phim/es")}
                    >
                      TÂY BAN NHA
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

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
                className="dropdown-menu dropdown-menu-dark logomenu"
                aria-labelledby="dropdownUser1"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    onClick={() => history.push("/user")}
                  >
                    <i className="fa fa-user" /> Bấm vào đây nè
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item "
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    onClick={() => history.push("/mylist")}
                  >
                    <i className="fa fa-plus"></i> Phim đã lưu
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item  "
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    onClick={() => history.push("/unlock")}
                  >
                    <i className="fa fa-unlock" /> Phim Vip
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    onClick={() => history.push("/login")}
                  >
                    <i className="fa fa-sign-in" /> Đăng nhập
                  </Link>
                </li>
                <li>
                  <a
                    className="dropdown-item text-danger "
                    // href="/login/login.html"
                  >
                    <i className="fa fa-sign-out" /> Đăng xuất
                  </a>
                </li>
              </ul>
            </div>

            {/* Search */}
            <div
              className="d-flex me-3 formsearch"
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={onSubmitSearch}
              />
              {(searchValue.length === 0 && calling)? (
                <button className="btn btn-outline-light disable" disabled>
                  <i className="fa fa-search"></i>
                </button>
              ) : (
                <Link
                  className="btn btn-outline-light"
                  to={"/search/" + searchValue}
                >
                  <i className="fa fa-search"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

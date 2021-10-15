import "./style.css";
import brandLogo from "./../../assets/images/logo1.png";
import userLogo from "./../../assets/images/user-logo.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListSearch } from "./../../store/actions/listPhim_Action";
import axios from "axios";
import { auth } from "../../services/firebase";
import { setUserData, setUserDataDetail } from "./../../store/actions/user";

const Header = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const data = useSelector((state) => state.listTatCa.searchData);
  const [searchValueTime, setSearchTimeValue] = useState("");
  const [calling, setcalling] = useState(false);
  const [openHeader, setOpenHeader] = useState(false);
  // const [userInfo, setuserInfo] = useState(JSON.parse(localStorage.getItem("currentUser")))
  const [finalCheckToken, setfinalCheckToken] = useState(false);
  const userInfo = useSelector((state) => state.userData.curentUser);
  const userDetail = useSelector((state) => state.userData.userDetail);
  
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEff header")
    if (finalCheckToken === false) {
      setfinalCheckToken(true);
      auth().onAuthStateChanged((user) => {
        if (user == null) {
          dispatch(setUserData({ checkUser: "not" }));
          dispatch(setUserDataDetail({ checkUser: "not" }));
        } else {
          dispatch(setUserData(user));
          console.log(user.getIdToken(true))
          user.getIdToken(true).then(function (idToken) {
            console.log(idToken);
            axios
              .post(process.env.REACT_APP_API_LOCAL + "user/info", {
                // .post("http://localhost:5000/api/user/info", {
                token: idToken,
              })
              .then((res) => {
                let saveDetail = Object.values(res.data)[0];
                saveDetail.token = idToken;
                dispatch(setUserDataDetail(saveDetail));
              })
              .catch((e) => {
                console.log(e);
              });
          });
        }
      });
    }
  }, [finalCheckToken]);

  const onSubmitSearch = (e) => {
    if (Object.keys(data).length == 0 && !calling) {
      const local = JSON.parse(localStorage.getItem("search"));
      setcalling(true);
      console.log("Calling Data...");
      if (local == undefined || parseInt(local.time) + 1000 * 60 * 60 * 3 < Date.now())
        axios.get(process.env.REACT_APP_API_LOCAL + "film/search").then((res) => {
          dispatch(setListSearch(res.data));
          localStorage.setItem("search", JSON.stringify(res.data));
          setcalling(false);
          console.log("You got dat data");
        });
      else
       dispatch(setListSearch(local));
    }
    e.preventDefault();
    let Search = e.target.value;
    setSearchValue(Search);
  };

  const onSubmitYear = (e) => {
    e.preventDefault();
    setSearchTimeValue(e.target.value);
  };

  return (
    <header id="header">
      <nav
        className="navbar navbar-expand-md navbar-dark fixed-top header-nav-bar"
        id="header-real"
      >
        <div className="container-fluid bg-dark">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => setOpenHeader(false)}
          >
            <img className="NavLogo" src={brandLogo} alt="logo" width="80px" />
          </Link>
          <button
            className={
              "navbar-toggler " + (openHeader == false ? "collapsed" : "")
            }
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenHeader(!openHeader)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={
              "collapse navbar-collapse menu-header " +
              (openHeader ? " show" : " ")
            }
            id="navbarCollapse"
          >
            <ul className="navbar-nav me-auto mb-2 mb-md-0 mr-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active nv"
                  aria-current="page"
                  to="/phim/tatca"
                  onClick={() => setOpenHeader(false)}
                >
                  <strong>TẤT CẢ</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/phim/movie"
                  onClick={() => setOpenHeader(false)}
                >
                  <strong>PHIM LẺ</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/phim/series"
                  onClick={() => setOpenHeader(false)}
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
                      to="/phim/2022"
                      onClick={() => setOpenHeader(false)}
                    >
                      2022
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/2021"
                      onClick={() => setOpenHeader(false)}
                    >
                      2021
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/2020"
                      onClick={() => setOpenHeader(false)}
                    >
                      2020
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/2019"
                      onClick={() => setOpenHeader(false)}
                    >
                      2019
                    </Link>
                  </li>
                  <li>
                    <div>
                      <input
                        className="me-1 ms-1 mb-1"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={onSubmitYear}
                        style={{ width: "8rem" }}
                      />
                      <Link
                        className="btn btn-outline-light mx-auto d-block w-50"
                        to={"/phim/" + searchValueTime}
                        onClick={() => setOpenHeader(false)}
                      >
                        <i className="fa fa-search"></i>
                      </Link>
                    </div>
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
                    <Link
                      className="dropdown-item"
                      to="/phim/action"
                      onClick={() => setOpenHeader(false)}
                    >
                      HÀNH ĐỘNG
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/scifi"
                      onClick={() => setOpenHeader(false)}
                    >
                      VIỄN TƯỞNG
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/horror"
                      onClick={() => setOpenHeader(false)}
                    >
                      KINH DỊ
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/anime"
                      onClick={() => setOpenHeader(false)}
                    >
                      HOẠT HÌNH
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/drama"
                      onClick={() => setOpenHeader(false)}
                    >
                      CHÍNH KỊCH
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/romantic"
                      onClick={() => setOpenHeader(false)}
                    >
                      LÃNG MẠN
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/comedy"
                      onClick={() => setOpenHeader(false)}
                    >
                      HÀI
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/crime"
                      onClick={() => setOpenHeader(false)}
                    >
                      TỘI PHẠM
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/family"
                      onClick={() => setOpenHeader(false)}
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
                      to="/phim/us"
                      onClick={() => setOpenHeader(false)}
                    >
                      PHIM MỸ
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/ja"
                      onClick={() => setOpenHeader(false)}
                    >
                      PHIM NHẬT
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/ko"
                      onClick={() => setOpenHeader(false)}
                    >
                      PHIM HÀN
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/vi"
                      onClick={() => setOpenHeader(false)}
                    >
                      PHIM VIỆT NAM
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/ch"
                      onClick={() => setOpenHeader(false)}
                    >
                      PHIM TRUNG
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/phim/es"
                      onClick={() => setOpenHeader(false)}
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
                  src={
                    userInfo.photoURL == undefined
                      ? userLogo
                      : userInfo.photoURL
                  }
                  alt="mdo"
                  width={32}
                  height={32}
                  className="rounded-circle"
                />
              </a>

              {userInfo.checkUser == "init" ? (
                <ul
                  className="dropdown-menu dropdown-menu-dark logomenu"
                  aria-labelledby="dropdownUser1"
                >
                  <li>
                    <Link className="dropdown-item">
                      <i className="fa fa-sign-in" /> Kiểm tra đăng nhập...
                    </Link>
                  </li>
                </ul>
              ) : userInfo.checkUser == "not" ? (
                <ul
                  className="dropdown-menu dropdown-menu-dark logomenu"
                  aria-labelledby="dropdownUser1"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/login"
                      onClick={() => setOpenHeader(false)}
                    >
                      <i className="fa fa-sign-in" /> Đăng nhập
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul
                  className="dropdown-menu dropdown-menu-dark logomenu"
                  aria-labelledby="dropdownUser1"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/user"
                      onClick={() => setOpenHeader(false)}
                    >
                      <i className="fa fa-user" /> {userInfo.displayName}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item "
                      to="/mylist"
                      onClick={() => setOpenHeader(false)}
                    >
                      <i className="fa fa-plus"></i> Phim đã lưu
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item  "
                      to="/unlock"
                      onClick={() => setOpenHeader(false)}
                    >
                      <i className="fa fa-unlock" /> Phim Vip
                    </Link>
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger "
                      onClick={() => {
                        auth().signOut().then(alert("da dang xuat"));
                        setOpenHeader(false);
                      }}
                    >
                      <i className="fa fa-sign-out" /> Đăng xuất
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {/* Search */}
            <div className="d-flex me-3 formsearch">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={onSubmitSearch}
              />
              {searchValue.length === 0 && calling ? (
                <button className="btn btn-outline-light disable" disabled>
                  <i className="fa fa-search"></i>
                </button>
              ) : (
                <Link
                  className="btn btn-outline-light"
                  to={"/search/" + searchValue}
                  onClick={() => setOpenHeader(false)}
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

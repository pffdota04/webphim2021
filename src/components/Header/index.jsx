import "./style.css";
import brandLogo from "./../../assets/images/logo1.png";
import userLogo from "./../../assets/images/default_user.jpg";
import { Link, Redirect } from "react-router-dom";
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
    document.getElementById("search-input").addEventListener(
      "keyup",
      function (e) {
        e.stopPropagation();
      },
      false
    );
    document.getElementById("search-input").addEventListener(
      "keydown",
      function (e) {
        e.stopPropagation();
      },
      false
    );
    if (finalCheckToken === false) {
      setfinalCheckToken(true);
      auth().onAuthStateChanged((user) => {
        if (user == null) {
          dispatch(setUserData({ checkUser: "not" }));
          dispatch(setUserDataDetail({ checkUser: "not" }));
        } else {
          // if (!user.emailVerified) {
          //   dispatch(
          //     setUserData({
          //       checkUser: "not verified",
          //       email: user.email,
          //       displayName: user.displayName,
          //       photoURL: user.photoURL,
          //     })
          //   );
          //   user.getIdToken(true).then(function (idToken) {
          //     dispatch(
          //       setUserDataDetail({
          //         checkUser: "not verified",
          //         email: user.email,
          //         token: idToken,
          //       })
          //     );
          //   });
          // } else {
          let userinfo = user;
          userinfo.checkUser = user.emailVerified;
          dispatch(setUserData(userinfo));
          user.getIdToken(true).then(function (idToken) {
            console.log(idToken);

            axios
              .get(process.env.REACT_APP_API_DEPLOYED2 + "user/info", {
                headers: { Authorization: `${idToken}` },
              })
              .then((res) => {
                let saveDetail = Object.values(res.data)[0];
                saveDetail.token = idToken;
                saveDetail.checkUser = user.emailVerified;
                dispatch(setUserDataDetail(saveDetail));
              })
              .catch((e) => {
                console.log(e);
              });
          });
        }
        // }
      });
    }
  }, [finalCheckToken]);

  const onSubmitSearch = (e) => {
    e.stopPropagation();
    if (Object.keys(data).length == 0 && !calling) {
      const local = JSON.parse(localStorage.getItem("search"));
      setcalling(true);
      if (
        local == undefined ||
        parseInt(local.time) + 1000 * 60 * 60 * 3 < Date.now()
      )
        axios
          .get(process.env.REACT_APP_API_DEPLOYED2 + "film/all")
          .then((res) => {
            dispatch(setListSearch(res.data));
            localStorage.setItem("search", JSON.stringify(res.data));
            setcalling(false);
          });
      else dispatch(setListSearch(local));
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
        <div className="container-fluid bg-black">
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
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => setOpenHeader(false)}
          >
            <img className="NavLogo" src={brandLogo} alt="logo" width="80px" />
          </Link>
          <Link
            className="btn-search link-color show-search-tablet"
            to={"/search/a"}
            onClick={() => setOpenHeader(false)}
          >
            <i className="fa fa-search"></i>
          </Link>
          {/* <button
            className={
              "navbar-toggler " + (openHeader == false ? "collapsed" : "")
            }
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenHeader(!openHeader)}
          >
            <span className="navbar-toggler-icon" />
          </button> */}
          <div
            className={
              "collapse navbar-collapse menu-header " +
              (openHeader ? " show" : " ")
            }
            id="navbarCollapse"
          >
            {/* User action on small tablet and mobile*/}
            <div className="user-action">
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
              ) : userInfo.checkUser === "not" ? (
                <Link
                  className="btn_login text-white link-color"
                  to="/login"
                  onClick={() => setOpenHeader(false)}
                >
                  ĐĂNG NHẬP
                </Link>
              ) : userInfo.checkUser == false ? (
                <ul
                  className="navbar-nav me-auto mr-auto p-2"
                  aria-labelledby="dropdownUser1"
                >
                  <li className="user-item">
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/xacthuc"
                      onClick={() => setOpenHeader(false)}
                    >
                      <i className="fa fa-user" /> Xác thực email
                    </Link>
                  </li>
                  <li className="user-item">
                    <button
                      className="menu-dropdown-item primary-color"
                      onClick={() => {
                        auth().signOut();
                        setOpenHeader(false);
                      }}
                    >
                      <i className="fa fa-sign-out" /> Đăng xuất
                    </button>
                  </li>
                </ul>
              ) : (
                <ul
                  className="navbar-nav me-auto mr-auto p-2"
                  aria-labelledby="dropdownUser1"
                >
                  <li className="user-item">
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/user"
                      onClick={() => setOpenHeader(false)}
                    >
                      <img
                        src={
                          userInfo.photoURL == undefined
                            ? userLogo
                            : userInfo.photoURL
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src =
                            "https://suno.vn/blog/wp-content/uploads/2014/12/nike-lich-su-thiet-ke-logo.jpg";
                        }}
                        alt="user-avt"
                        width={32}
                        height={32}
                        className="rounded-circle"
                      />
                      <span className="text-white p-2 resps-ipad">
                        {userInfo.displayName}
                      </span>
                    </Link>
                  </li>
                  <li className="user-item">
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/mylist"
                      onClick={() => setOpenHeader(false)}
                    >
                      <i className="fa fa-plus"></i> Phim đã lưu
                    </Link>
                  </li>
                  <li className="user-item">
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/unlock"
                      onClick={() => setOpenHeader(false)}
                    >
                      <i className="fa fa-unlock" /> Phim Vip
                    </Link>
                  </li>
                  {/* <li className="user-item">
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/kitkot"
                      onClick={() => setOpenHeader(false)}
                    >
                      <i className="fa fa-hand-pointer-o"></i> Lướt KitKot
                    </Link>
                  </li>
                  <li className="user-item">
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/tintuc"
                      onClick={() => setOpenHeader(false)}
                    >
                      <i className="fa fa-hand-pointer-o"></i> Tin phim
                    </Link>
                  </li> */}
                  <li className="user-item">
                    <button
                      className="menu-dropdown-item primary-color"
                      onClick={() => {
                        auth().signOut();
                        setOpenHeader(false);
                      }}
                    >
                      <i className="fa fa-sign-out" /> Đăng xuất
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {/* Category */}
            <ul
              className="navbar-nav me-auto mb-2 mb-md-0 mr-auto p-2 hidden-ipad"
              id="category"
            >
              <li className="nav-item strong-three p-2 user-item">
                <Link
                  className="nav-link active nv"
                  aria-current="page"
                  to="/phim/tatca"
                  onClick={() => setOpenHeader(false)}
                >
                  <strong>TẤT CẢ</strong>
                </Link>
              </li>
              <li className="nav-item strong-three p-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/phim/movie"
                  onClick={() => setOpenHeader(false)}
                >
                  <strong>PHIM LẺ</strong>
                </Link>
              </li>
              <li className="nav-item strong-three p-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/phim/series"
                  onClick={() => setOpenHeader(false)}
                >
                  <strong>PHIM BỘ</strong>
                </Link>
              </li>

              <li className="nav-item dropdown-show strong-three p-2 hidden-small-tablet">
                <a
                  className="nav-link active nv"
                  // data-toggle="dropdownyear"
                  // data-bs-toggle="dropdown"
                  // aria-expanded="false"
                >
                  <strong>NĂM</strong>
                </a>
                <ul
                  className="menu-dropdown bg-black shadow-sm rounded"
                  aria-labelledby="dropdownyear"
                >
                  <li>
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/phim/2022"
                      onClick={() => setOpenHeader(false)}
                    >
                      2022
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/phim/2021"
                      onClick={() => setOpenHeader(false)}
                    >
                      2021
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/phim/2020"
                      onClick={() => setOpenHeader(false)}
                    >
                      2020
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/phim/2019"
                      onClick={() => setOpenHeader(false)}
                    >
                      2019
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/phim/2018"
                      onClick={() => setOpenHeader(false)}
                    >
                      2018
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/phim/2017"
                      onClick={() => setOpenHeader(false)}
                    >
                      2017
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="menu-dropdown-item text-white"
                      to="/phim/2016"
                      onClick={() => setOpenHeader(false)}
                    >
                      2016
                    </Link>
                  </li>
                  <li>
                    <div
                      class="input-group mx-auto p-2"
                      style={{ minWidth: "100px", maxWidth: "50vw" }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nhập năm của phim cần tìm"
                        onChange={onSubmitYear}
                        aria-describedby="button-addon2"
                      />
                      <Link
                        class="btn btn-outline-secondary"
                        style={{ minWidth: "40px" }}
                        type="button"
                        to={"/phim/" + searchValueTime}
                        onClick={() => setOpenHeader(false)}
                      >
                        Search
                      </Link>
                    </div>
                    {/* <div>
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
                    </div> */}
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown-show strong-three p-2 hidden-small-tablet">
                <a
                  className="nav-link active"
                  // data-toggle="dropdowntype"
                  // data-bs-toggle="dropdown"
                  // aria-expanded="false"
                >
                  <strong>THỂ LOẠI</strong>
                </a>
                <ul
                  className="menu-dropdown min-height-type bg-black col-12"
                  aria-labelledby="dropdowntype"
                >
                  <div className="row">
                    <div className="col-4">
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/action"
                          onClick={() => setOpenHeader(false)}
                        >
                          HÀNH ĐỘNG
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/scifi"
                          onClick={() => setOpenHeader(false)}
                        >
                          VIỄN TƯỞNG
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/horror"
                          onClick={() => setOpenHeader(false)}
                        >
                          KINH DỊ
                        </Link>
                      </li>
                    </div>
                    <div className="col-4">
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/anime"
                          onClick={() => setOpenHeader(false)}
                        >
                          HOẠT HÌNH
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/drama"
                          onClick={() => setOpenHeader(false)}
                        >
                          CHÍNH KỊCH
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/romantic"
                          onClick={() => setOpenHeader(false)}
                        >
                          LÃNG MẠN
                        </Link>
                      </li>
                    </div>
                    <div className="col-4">
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/comedy"
                          onClick={() => setOpenHeader(false)}
                        >
                          HÀI
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/crime"
                          onClick={() => setOpenHeader(false)}
                        >
                          TỘI PHẠM
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/family"
                          onClick={() => setOpenHeader(false)}
                        >
                          GIA ĐÌNH - TRẺ EM
                        </Link>
                      </li>
                    </div>
                  </div>
                </ul>
              </li>
              <li className="nav-item dropdown-show strong-three p-2 hidden-small-tablet">
                <a
                  className="nav-link active"
                  // data-toggle="dropdowntype"
                  // data-bs-toggle="dropdown"
                  // aria-expanded="false"
                >
                  <strong>QUỐC GIA</strong>
                </a>
                <ul
                  className="menu-dropdown min-height-type max-width-nation bg-black col-12"
                  aria-labelledby="dropdowntype"
                >
                  <div className="row">
                    <div className="col-6">
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/us"
                          onClick={() => setOpenHeader(false)}
                        >
                          PHIM MỸ
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/ja"
                          onClick={() => setOpenHeader(false)}
                        >
                          PHIM NHẬT
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/ko"
                          onClick={() => setOpenHeader(false)}
                        >
                          PHIM HÀN
                        </Link>
                      </li>
                    </div>
                    <div className="col-6">
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/vi"
                          onClick={() => setOpenHeader(false)}
                        >
                          PHIM VIỆT NAM
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/ch"
                          onClick={() => setOpenHeader(false)}
                        >
                          PHIM TRUNG
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="menu-dropdown-item text-white"
                          to="/phim/th"
                          onClick={() => setOpenHeader(false)}
                        >
                          PHIM THÁI LAN
                        </Link>
                      </li>
                    </div>
                  </div>
                </ul>
              </li>
            </ul>

            {/* Search */}
            <div className="hidden-small-tablet">
              <div className="d-flex me-3 search-container p-2" id="search">
                {/* {searchValue.length === 0 && calling ? (
                  <button className="btn btn-outline-light disable" disabled>
                    <i className="fa fa-search"></i>
                  </button>
                ) : (
                  <Link
                    className="btn-search link-color"
                    to={"/search/" + searchValue}
                    onClick={() => setOpenHeader(false)}
                  >
                    <i className="fa fa-search"></i>
                  </Link>
                )} */}
                <Link
                  className="btn-search link-color"
                  to={"/search/" + searchValue}
                  onClick={() => setOpenHeader(false)}
                >
                  <i className="fa fa-search"></i>
                </Link>
                <input
                  className="me-2 input_search"
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                  id="search-input"
                  onKeyPress={(e) => {
                    if (e.key == "Enter")
                      history.push("/search/" + searchValue);
                  }}
                  onChange={(e) => {
                    e.stopPropagation();
                    onSubmitSearch(e);
                  }}
                />
              </div>
            </div>

            {/* Dropdown user action */}
            <div
              className="nav-item dropdown-show hidden-small-tablet"
              id="userlogo"
            >
              {/* <a
                  href="/"
                  className="d-block nav-link dropdown-toggle"
                  id="hidden_login"
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
                </a> */}

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
              ) : userInfo.checkUser === "not" ? (
                <Link
                  className="dashbox__mores_user"
                  to="/login"
                  onClick={() => setOpenHeader(false)}
                >
                  Đăng nhập
                </Link>
              ) : // <ul
              //   className="dropdown-menu dropdown-menu-dark logomenu"
              //   aria-labelledby="dropdownUser1"
              // >
              //     <li>
              //       <Link
              //         className="dropdown-item"
              //         to="/login"
              //         onClick={() => setOpenHeader(false)}
              //       >
              //         <i className="fa fa-sign-in" /> Đăng nhập
              //       </Link>
              //     </li>
              //   </ul></>
              userInfo.checkUser == false ? (
                <>
                  <a
                    className="d-block nav-link user_info"
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
                    <span className="text-white p-2 resps-ipad">
                      {userInfo.displayName}
                    </span>
                  </a>
                  <ul
                    className="menu-dropdown max-width-user bg-black col-12 user__dropdown"
                    aria-labelledby="dropdownUser1"
                  >
                    <li className="user-item">
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/xacthuc"
                        onClick={() => setOpenHeader(false)}
                      >
                        <i className="fa fa-user" /> Xác thực email
                      </Link>
                    </li>
                    <li className="user-item">
                      <button
                        className="menu-dropdown-item primary-color"
                        onClick={() => {
                          auth().signOut();
                          setOpenHeader(false);
                        }}
                      >
                        <i className="fa fa-sign-out" /> Đăng xuất
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <a
                    href="/"
                    className="d-block nav-link"
                    id=""
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
                    <span className="text-white p-2 resps-ipad">
                      {userInfo.displayName}
                    </span>
                  </a>
                  <ul
                    className="menu-dropdown min-height-type max-width-user user__dropdown bg-black col-12"
                    aria-labelledby="dropdownUser1"
                  >
                    <li className="user-item">
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/user"
                        onClick={() => setOpenHeader(false)}
                      >
                        <i className="fa fa-user" /> {userInfo.displayName}
                      </Link>
                    </li>
                    <li className="user-item">
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/mylist"
                        onClick={() => setOpenHeader(false)}
                      >
                        <i className="fa fa-plus"></i> Phim đã lưu
                      </Link>
                    </li>
                    <li className="user-item">
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/unlock"
                        onClick={() => setOpenHeader(false)}
                      >
                        <i className="fa fa-unlock" /> Phim Vip
                      </Link>
                    </li>
                    {/* <li className="user-item">
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/kitkot"
                        onClick={() => setOpenHeader(false)}
                      >
                        <i className="fa fa-hand-pointer-o"></i> Lướt KitKot
                      </Link>
                    </li>
                    <li className="user-item">
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/tintuc"
                        onClick={() => setOpenHeader(false)}
                      >
                        <i className="fa fa-hand-pointer-o"></i> Tin phim
                      </Link>
                    </li> */}
                    <li className="user-item">
                      <button
                        className="menu-dropdown-item primary-color"
                        onClick={() => {
                          auth().signOut();
                          setOpenHeader(false);
                        }}
                      >
                        <i className="fa fa-sign-out" /> Đăng xuất
                      </button>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Category show on Ipad */}
      <div className="navbar navbar-expand-md navbar-dark header-nav-bar mt-5 show-category">
        <div className="container-fluid bg-black">
          <ul className="navbar-nav me-auto mb-2 mb-md-0 mx-auto p-2">
            <li className="nav-item strong-three p-2">
              <Link
                className="nav-link active nv"
                aria-current="page"
                to="/phim/tatca"
                onClick={() => setOpenHeader(false)}
              >
                <strong>TẤT CẢ</strong>
              </Link>
            </li>
            <li className="nav-item strong-three p-2">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/phim/movie"
                onClick={() => setOpenHeader(false)}
              >
                <strong>PHIM LẺ</strong>
              </Link>
            </li>
            <li className="nav-item strong-three p-2">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/phim/series"
                onClick={() => setOpenHeader(false)}
              >
                <strong>PHIM BỘ</strong>
              </Link>
            </li>

            <li className="nav-item dropdown-show strong-three p-2">
              <a
                className="nav-link active nv"
                // data-toggle="dropdownyear"
                // data-bs-toggle="dropdown"
                // aria-expanded="false"
              >
                <strong>NĂM</strong>
              </a>
              <ul
                className="menu-dropdown bg-black shadow-sm rounded"
                aria-labelledby="dropdownyear"
              >
                <li>
                  <Link
                    className="menu-dropdown-item text-white"
                    to="/phim/2022"
                    onClick={() => setOpenHeader(false)}
                  >
                    2022
                  </Link>
                </li>
                <li>
                  <Link
                    className="menu-dropdown-item text-white"
                    to="/phim/2021"
                    onClick={() => setOpenHeader(false)}
                  >
                    2021
                  </Link>
                </li>
                <li>
                  <Link
                    className="menu-dropdown-item text-white"
                    to="/phim/2020"
                    onClick={() => setOpenHeader(false)}
                  >
                    2020
                  </Link>
                </li>
                <li>
                  <Link
                    className="menu-dropdown-item text-white"
                    to="/phim/2019"
                    onClick={() => setOpenHeader(false)}
                  >
                    2019
                  </Link>
                </li>
                <li>
                  <Link
                    className="menu-dropdown-item text-white"
                    to="/phim/2018"
                    onClick={() => setOpenHeader(false)}
                  >
                    2018
                  </Link>
                </li>
                <li>
                  <Link
                    className="menu-dropdown-item text-white"
                    to="/phim/2017"
                    onClick={() => setOpenHeader(false)}
                  >
                    2017
                  </Link>
                </li>
                <li>
                  <Link
                    className="menu-dropdown-item text-white"
                    to="/phim/2016"
                    onClick={() => setOpenHeader(false)}
                  >
                    2016
                  </Link>
                </li>
                <li>
                  <div
                    class="input-group mx-auto p-2"
                    style={{ minWidth: "100px", maxWidth: "50vw" }}
                  >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nhập năm của phim cần tìm"
                      onChange={onSubmitYear}
                      aria-describedby="button-addon2"
                    />
                    <Link
                      class="btn btn-outline-secondary"
                      style={{ minWidth: "40px" }}
                      type="button"
                      to={"/phim/" + searchValueTime}
                      onClick={() => setOpenHeader(false)}
                    >
                      Search
                    </Link>
                  </div>
                  {/* <div>
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
                  </div> */}
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown-show strong-three p-2">
              <a
                className="nav-link active"
                // data-toggle="dropdowntype"
                // data-bs-toggle="dropdown"
                // aria-expanded="false"
              >
                <strong>THỂ LOẠI</strong>
              </a>
              <ul
                className="menu-dropdown min-height-type bg-black col-12"
                aria-labelledby="dropdowntype"
              >
                <div className="row">
                  <div className="col-4">
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/action"
                        onClick={() => setOpenHeader(false)}
                      >
                        HÀNH ĐỘNG
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/scifi"
                        onClick={() => setOpenHeader(false)}
                      >
                        VIỄN TƯỞNG
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/horror"
                        onClick={() => setOpenHeader(false)}
                      >
                        KINH DỊ
                      </Link>
                    </li>
                  </div>
                  <div className="col-4">
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/anime"
                        onClick={() => setOpenHeader(false)}
                      >
                        HOẠT HÌNH
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/drama"
                        onClick={() => setOpenHeader(false)}
                      >
                        CHÍNH KỊCH
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/romantic"
                        onClick={() => setOpenHeader(false)}
                      >
                        LÃNG MẠN
                      </Link>
                    </li>
                  </div>
                  <div className="col-4">
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/comedy"
                        onClick={() => setOpenHeader(false)}
                      >
                        HÀI
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/crime"
                        onClick={() => setOpenHeader(false)}
                      >
                        TỘI PHẠM
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/family"
                        onClick={() => setOpenHeader(false)}
                      >
                        GIA ĐÌNH - TRẺ EM
                      </Link>
                    </li>
                  </div>
                </div>
              </ul>
            </li>
            <li className="nav-item dropdown-show strong-three p-2">
              <a
                className="nav-link active"
                // data-toggle="dropdowntype"
                // data-bs-toggle="dropdown"
                // aria-expanded="false"
              >
                <strong>QUỐC GIA</strong>
              </a>
              <ul
                className="menu-dropdown min-height-type max-width-nation bg-black col-12"
                aria-labelledby="dropdowntype"
              >
                <div className="row">
                  <div className="col-6">
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/us"
                        onClick={() => setOpenHeader(false)}
                      >
                        PHIM MỸ
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/ja"
                        onClick={() => setOpenHeader(false)}
                      >
                        PHIM NHẬT
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/ko"
                        onClick={() => setOpenHeader(false)}
                      >
                        PHIM HÀN
                      </Link>
                    </li>
                  </div>
                  <div className="col-6">
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/vi"
                        onClick={() => setOpenHeader(false)}
                      >
                        PHIM VIỆT NAM
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/ch"
                        onClick={() => setOpenHeader(false)}
                      >
                        PHIM TRUNG
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="menu-dropdown-item text-white"
                        to="/phim/th"
                        onClick={() => setOpenHeader(false)}
                      >
                        PHIM THÁI LAN
                      </Link>
                    </li>
                  </div>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

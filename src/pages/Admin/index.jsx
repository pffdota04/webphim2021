import "./style.css";

import Footer from "../../components/Footer";
// import PopupFilm from "./../../components/PopupFilm";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { useSelector } from "react-redux";
import { auth } from "../../services/firebase";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import User from "./User";
import Links from "./Link";
import Phims from "./Phim";
import Vouchers from "./Voucher";
import Napcoins from "./Napcoin";
import Comments from "./Comment";
import Reports from "./Report";

import Dashboard from "./Dashboard";

const Admin = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state.userData.curentUser);
  const [adminToken, setAdminToken] = useState(null);
  const [dataDas, setDataDas] = useState({});
  const [char1, setChar1] = useState({});
  const [char2, setChar2] = useState({});
  const [dataAllF, setDataAllF] = useState([
    {
      id: 0,
      title: "Loading..",
      type: "Loading..",
      img: "Loading..",
      backimg: "Loading..",
      yttrailer: "Loading..",
      price: "Loading..",
      country: "Loading",
    },
  ]);
  const [dataAllUser, setDataAllUser] = useState([]);
  const [dataAllLink, setDataAllLink] = useState([]);
  const [dataAllVoucher, setDataAllVoucher] = useState([
    {
      id: 0,
      code: "FSDGKRIRFKF",
      point: 5,
      usedBy: "ksoeugg",
      usedDate: "1633930570999",
    },
    {
      id: 0,
      code: "FSDGKRIRFKF",
      point: 5,
      usedBy: "ksoeugg",
      usedDate: "1633930570999",
    },
    {
      id: 0,
      code: "FSDGKRIRFKF",
      point: 5,
      usedBy: "ksoeugg",
      usedDate: "1633930570999",
    },
  ]);
  const [dataAllNC, setDataAllNC] = useState([
    {
      id: 0,
      user: "ksoeugg",
      coin: 10,
      type: "airpay",
      mgd: "111111aaaaaaaaa",
      xuly: "none",
      note: "none",
    },
    {
      id: 0,
      user: "ksoeugg",
      coin: 10,
      type: "airpay",
      mgd: "111111aaaaaaaaa",
      xuly: "none",
      note: "none",
    },
    {
      id: 0,
      user: "ksoeugg",
      coin: 10,
      type: "airpay",
      mgd: "111111aaaaaaaaa",
      xuly: "none",
      note: "none",
    },
  ]);
  const [dataAllComment, setDataAllComment] = useState([
    {
      id: 0,
      uid: "Fcv7eRnefrNSX1988u4r4NbWCqp2",
      username: "A Nguyễn văn",
      content: "phim này có robot đánh nhau à?",
      timestamp: 1630910963760,
    },
    {
      id: 0,
      uid: "Fcv7eRnefrNSX1988u4r4NbWCqp2",
      username: "A Nguyễn văn",
      content: "phim này có robot đánh nhau à?",
      timestamp: 1630910963760,
    },
    {
      id: 0,
      uid: "Fcv7eRnefrNSX1988u4r4NbWCqp2",
      username: "A Nguyễn văn",
      content: "phim này có robot đánh nhau à?",
      timestamp: 1630910963760,
    },
  ]);
  const [dataAllReport, setDataAllReport] = useState([
    {
      id: 0,
      uid: "Fcv7eRnefrNSX1988u4r4NbWCqp2",
      username: "A Nguyễn văn",
      content: "phim này có robot đánh nhau à?",
      timestamp: 1630910963760,
    },
    {
      id: 0,
      uid: "Fcv7eRnefrNSX1988u4r4NbWCqp2",
      username: "A Nguyễn văn",
      content: "phim này có robot đánh nhau à?",
      timestamp: 1630910963760,
    },
    {
      id: 0,
      uid: "Fcv7eRnefrNSX1988u4r4NbWCqp2",
      username: "A Nguyễn văn",
      content: "phim này có robot đánh nhau à?",
      timestamp: 1630910963760,
    },
  ]);

  const [fetchPhim, setFetchPhim] = useState(true);
  const [fetchUser, setFetchUser] = useState(true);
  const [fetchLink, setFetchLink] = useState(true);
  const [fetchVoucher, setFetchVoucher] = useState(true);
  const [fetchCoin, setFetchCoin] = useState(true);
  const [fetchComment, setFetchComment] = useState(true);
  const [fetchReport, setFetchReport] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged((currentUser) => {
      currentUser
        .getIdTokenResult()
        .then((idTokenResult) => {
          if (!!idTokenResult.claims.admin) {
            // alert("You are admin!");
            getDataDashAndToken();
          } else {
            history.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  function getDataDashAndToken() {
    auth()
      .currentUser.getIdToken(true)
      .then((token) => {
        //set token
        setAdminToken(token);

        // set data chart && thong ke dasboard
        axios
          .post(process.env.REACT_APP_API_LOCAL + "admin/dashboard", {
            token: token,
          })
          .then((res) => {
            let char = new Object();
            char.labels = Object.keys(res.data.doanhthu);
            char.datasets = [
              {
                data: Object.values(res.data.doanhthu),
                fill: false,
                backgroundColor: "#D20000",
                borderColor: "#D20000",
                label: "REVENUE",
              },
            ];
            setChar1(char);

            let char2 = new Object();
            char2.labels = Object.keys(res.data.newuser);
            char2.datasets = [
              {
                data: Object.values(res.data.newuser),
                fill: false,
                backgroundColor: "#4889F4",
                borderColor: "#4889F4",
                label: "NEW USER",
              },
            ];
            setChar2(char2);
            let sum = 0;
            Object.values(res.data.doanhthu).map((e) => (sum = sum + e));
            res.data.sum = sum;

            setDataDas(res.data);
          });
      });
  }

  // có token thì lấy data các thứ còn lại
  useEffect(() => {
    if (adminToken != null) {
      getDataPhim();
      getDataUser();
      getDataLink();
      getDataVoucher();
      getDataCoin();
      getDataComment();
      getDataReport();
    }
  }, [adminToken]);

  useEffect(() => {
    if (fetchPhim) getDataPhim();
  }, [fetchPhim]);

  useEffect(() => {
    if (fetchUser) getDataUser();
  }, [fetchUser]);

  useEffect(() => {
    if (fetchLink) getDataLink();
  }, [fetchLink]);

  useEffect(() => {
    if (fetchVoucher) getDataVoucher();
  }, [fetchVoucher]);

  useEffect(() => {
    if (fetchCoin) getDataCoin();
  }, [fetchCoin]);

  useEffect(() => {
    if (fetchComment) getDataComment();
  }, [fetchComment]);

  useEffect(() => {
    if (fetchReport) getDataReport();
  }, [fetchReport]);

  function getDataPhim() {
    setFetchPhim(false);
    axios
      .get(process.env.REACT_APP_API_LOCAL + "film/search")
      .then((res) => {
        setDataAllF(Object.values(res.data));
      })
      .catch((e) => console.log(e));
  }

  function getDataUser() {
    // all user
    setFetchUser(false);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/alluser", {
        token: adminToken,
      })
      .then((res) => {
        setDataAllUser(res.data);
      })
      .catch((e) => console.log(e));
  }

  function getDataLink() {
    // all user
    setFetchLink(false);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/alllink", {
        token: adminToken,
      })
      .then((res) => {
        setDataAllLink(res.data);
      })
      .catch((e) => console.log(e));
  }

  function getDataVoucher() {
    // all user
    setFetchVoucher(false);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/allvoucher", {
        token: adminToken,
      })
      .then((res) => {
        setDataAllVoucher(res.data);
      })
      .catch((e) => console.log(e));
  }

  function getDataCoin() {
    // all user
    setFetchCoin(false);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/allcoin", {
        token: adminToken,
      })
      .then((res) => {
        setDataAllNC(res.data);
      })
      .catch((e) => console.log(e));
  }

  function getDataComment() {
    // all user
    setFetchComment(false);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/allcomment", {
        token: adminToken,
      })
      .then((res) => {
        setDataAllComment(res.data);
      })
      .catch((e) => console.log(e));
  }

  function getDataReport() {
    // all user
    setFetchReport(false);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/allreport", {
        token: adminToken,
      })
      .then((res) => {
        setDataAllReport(res.data);
      })
      .catch((e) => console.log(e));
  }

  return userInfo.checkUser == "init" ? (
    <h1>CHECKING...</h1>
  ) : userInfo.checkUser == "not" ? (
    <Redirect push to="/login" />
  ) : (
    <div>
      <section className="section container">
        {/* <Link className="btn btn-sm btn-danger ms-1 mt-1" to="/admin">
          Home admin
        </Link> */}
        <div className="container-fluid pt-1">
          {" "}
          <div className="row mt-4">
            <div class="col-sm-6 col-xl-3">
              <div class="stats">
                <h6 className="mb-10">
                  <Link
                      to="/admin"
                      className="btn btn-sm btn-link ms-1 mt-1"
                    >
                      {" "}
                      <i className="fa fa-dollar" /> Revenue
                  </Link>
                  {/* <div className="dashbox__more ms-1 mt-1"
                    to="/admin">
                    <i className="fa fa-dollar" /> Doanh thu
                  </div> */}
                </h6>
                <p className="text-bold mb-10">{dataDas.sum}K</p>
                <span className="text-sm text-success">
                  <i className="lni lni-arrow-up" /> +5.45%
                </span>
              </div>
				    </div>
            {/* <div className="col-xl-3  col-sm-6  border border-danger">
              <div className="icon-card mb-30">
                <div className="content">
                  <h6 className="mb-10">
                    <div
                      className="btn btn-sm btn-secondary ms-1 mt-1"
                      to="/admin/phim"
                    >
                      <i className="fa fa-dollar" /> Doanh thu
                    </div>
                  </h6>
                  <h3 className="text-bold mb-10">{dataDas.sum}k</h3>
                  <p className="text-sm text-success">
                    <i className="lni lni-arrow-up" /> +5.45%
                  </p>
                </div>
              </div>
            </div> */}
            <div className="col-xl-3  col-sm-6">
              <div className="icon-card mb-30">
                <div className="stats">
                  <h6 className="mb-10">
                    <Link
                      to="/admin/user"
                      className="btn btn-sm btn-link ms-1 mt-1"
                    >
                      {" "}
                      <i className="fa fa-user" /> User
                    </Link>
                  </h6>
                  <p className="text-bold mb-10">{dataDas.user}</p>
                  <span className="text-sm text-success">
                    <i className="lni lni-arrow-up" /> +2.00%
                  </span>
                </div>
              </div>
              {/* End Icon Cart */}
            </div>
            {/* End Col */}
            <div className="col-xl-3  col-sm-6">
              <div className="icon-card mb-30">
                <div className="icon primary">
                  <i className="lni lni-credit-cards" />
                </div>
                <div className="stats">
                  <h6 className="mb-10">
                    <Link
                      className="btn btn-sm btn-link ms-1 mt-1"
                      to="/admin/phim"
                    >
                      <i className="fa fa-film" /> Film
                    </Link>
                  </h6>
                  <p className="text-bold mb-10">{dataDas.phim}</p>
                  <span className="text-sm text-success">Total film </span>
                </div>
              </div>
            </div>
            <div className="col-xl-3  col-sm-6">
              <div className="icon-card mb-30">
                <div className="icon orange">
                  <i className="lni lni-user" />
                </div>
                <div className="stats">
                  <h6 className="mb-10">
                    {" "}
                    <Link
                      className="btn btn-sm btn-link ms-1 mt-1"
                      to="/admin/link"
                    >
                      <i className="fa fa-link" /> Link Film
                    </Link>
                  </h6>
                  <p className="text-bold mb-10">{dataDas.link}</p>
                  <span className="text-sm text-success">Total Link </span>
                </div>
              </div>
            </div>
            <div className="col-xl-3  col-sm-6">
              <div className="icon-card mb-30">
                <div className="icon orange">
                  <i className="lni lni-user" />
                </div>
                <div className="stats">
                  <h6 className="mb-10">
                    {" "}
                    <Link
                      className="btn btn-sm btn-link ms-1 mt-1"
                      to="/admin/voucher"
                    >
                      <i className="fa fa-gift" /> Voucher
                    </Link>
                  </h6>
                  <p className="text-bold mb-10">{dataDas.voucher}</p>
                  <span className="text-sm text-success">Total Voucher </span>
                </div>
              </div>
            </div>
            <div className="col-xl-3  col-sm-6">
              <div className="icon-card mb-30">
                <div className="icon orange">
                  <i className="lni lni-user" />
                </div>
                <div className="stats">
                  <h6 className="mb-10">
                    {" "}
                    <Link
                      className="btn btn-sm btn-link ms-1 mt-1"
                      to="/admin/napcoin"
                    >
                      <i className="fa fa-gift" /> Nạp Coin
                    </Link>
                  </h6>
                  <p className="text-bold mb-10">{dataDas.napcoin}</p>
                  <span className="text-sm text-success">+2.00% </span>
                </div>
              </div>
            </div>
            <div className="col-xl-3  col-sm-6">
              <div className="icon-card mb-30">
                <div className="icon orange">
                  <i className="lni lni-user" />
                </div>
                <div className="stats">
                  <h6 className="mb-10">
                    {" "}
                    <Link
                      className="btn btn-sm btn-link ms-1 mt-1"
                      to="/admin/comment"
                    >
                      <i className="fa fa-gift" /> Comment
                    </Link>
                  </h6>
                  <p className="text-bold mb-10">{dataDas.comment}</p>
                  <span className="text-sm text-success">Total Comment </span>
                </div>
              </div>
            </div>
            <div className="col-xl-3  col-sm-6">
              <div className="icon-card mb-30">
                <div className="icon orange">
                  <i className="lni lni-user" />
                </div>
                <div className="stats">
                  <h6 className="mb-10">
                    {" "}
                    <Link
                      className="btn btn-sm btn-link ms-1 mt-1"
                      to="/admin/report"
                    >
                      <i className="fa fa-gift" /> Report
                    </Link>
                  </h6>
                  <p className="text-bold mb-10">{dataDas.report}</p>
                  <span className="text-sm text-success">Total Report </span>
                </div>
              </div>
            </div>
            {/* End Col */}
          </div>
          <Switch>
            <Route
              path={"/admin/user"}
              component={() => (
                <User
                  dataU={dataAllUser}
                  setFetchUser={setFetchUser}
                  token={adminToken}
                />
              )}
            />
            <Route
              path={"/admin/phim"}
              component={() => (
                <Phims
                  dataF={dataAllF}
                  setFetchPhim={setFetchPhim}
                  token={adminToken}
                />
              )}
            />
            <Route
              path={"/admin/link"}
              component={() => (
                <Links
                  dataL={dataAllLink}
                  token={adminToken}
                  setFetchLink={setFetchLink}
                />
              )}
            />
            <Route
              path={"/admin/voucher"}
              component={() => (
                <Vouchers
                  dataV={dataAllVoucher}
                  setFetchVoucher={setFetchVoucher}
                  token={adminToken}
                />
              )}
            />
            <Route
              path={"/admin/napcoin"}
              component={() => (
                <Napcoins
                  dataNC={dataAllNC}
                  setFetchCoin={setFetchCoin}
                  token={adminToken}
                />
              )}
            />
            <Route
              path={"/admin/comment"}
              component={() => (
                <Comments
                  dataComment={dataAllComment}
                  setFetchComment={setFetchComment}
                  token={adminToken}
                />
              )}
            />
            <Route
              path={"/admin/report"}
              component={() => (
                <Reports
                  dataReport={dataAllReport}
                  setFetchReport={setFetchReport}
                  token={adminToken}
                />
              )}
            />
            <Route
              path={"/admin"}
              component={() => <Dashboard char1={char1} char2={char2} />}
            />
          </Switch>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Admin;

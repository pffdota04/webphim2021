import "./style.css";

import Footer from "../../components/Footer";
// import PopupFilm from "./../../components/PopupFilm";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { useSelector } from "react-redux";
import { auth, db } from "../../services/firebase";
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
import Loading from "../../components/Loading";
import SoanTin from "../SoanTin";
import KitKotAd from "./KitKot";
import LinkPhim from "./LinkPhim";

const Admin = () => {
  const history = useHistory();
  const [onLoading, setonLoading] = useState(1);

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
  const [dataAllLink, setDataAllLink] = useState([
    // {
    //   id: 0,
    //   film_id: 0,
    //   link: "loading",
    //   server: 0,
    //   chap: 0,
    // },
    {
      film_id: 0,
      chap: 0,
      link: {},
      sub: {},
    },
  ]);
  const [dataAllKitkot, setDataAllKitkot] = useState([
    {
      id: 0,
      title: "Loading",
      year: "...",
      yttrailer: "",
    },
  ]);
  const [dataAllVoucher, setDataAllVoucher] = useState([
    {
      id: 0,
      code: "Loading..",
      point: 0,
      usedBy: "Loading",
      usedDate: "Loading",
    },
  ]);
  const [dataAllNC, setDataAllNC] = useState([
    {
      id: 0,
      user: "Loading",
      coin: 0,
      type: "Loading",
      mgd: "Loading",
      xuly: "Loading",
      note: "Loading",
    },
  ]);

  const [dataAllKnews, setdataAllKnews] = useState([
    {
      id: 0,
      content: "Loading",
      title: "Loading",
    },
  ]);
  const [dataAllReport, setDataAllReport] = useState([
    {
      user: "Loading",
      status: "Loading",
      content: "Loading",
      timestamp: 0,
    },
  ]);

  const [fetchPhim, setFetchPhim] = useState(false);
  const [fetchUser, setFetchUser] = useState(false);
  const [fetchLink, setFetchLink] = useState(false);
  const [fetchKitkot, setFetchKikot] = useState(false);
  const [fetchVoucher, setFetchVoucher] = useState(false);
  const [fetchCoin, setFetchCoin] = useState(false);
  const [fetchComment, setFetchComment] = useState(false);
  const [fetchReport, setFetchReport] = useState(false);

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
            console.log(res.data);

            setDataDas(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      });
  }

  // có token thì lấy data các thứ còn lại
  useEffect(() => {
    if (adminToken != null) {
      getDataPhim();
      getDataUser();
      getDataLink();
      getDataKitkot();
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
    if (fetchKitkot) getDataKitkot();
  }, [fetchKitkot]);

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
    if (adminToken != null)
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
    if (adminToken != null)
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
    if (adminToken != null)
      axios
        .post(process.env.REACT_APP_API_LOCAL + "admin/linkdefaul", {
          token: adminToken,
        })
        .then((res) => {
          console.log(res.data);
          let holdLink = res.data;
          setDataAllLink(holdLink);
        })
        .catch((e) => console.log(e));
  }

  function getDataKitkot() {
    setFetchLink(false);
    if (adminToken != null)
      db.ref()
        .child("/kitkot")
        .get()
        .then((res) => {
          let holdLink = res.val();
          console.log(holdLink);
          setDataAllKitkot(holdLink);
        })
        .catch((e) => console.log(e));
    // axios
    //   .post(process.env.REACT_APP_API_LOCAL + "admin/kitkot", {
    //     token: adminToken,
    //   })
    //   .then((res) => {
    //     let holdLink = res.data;
    //     setDataAllKitkot(holdLink);
    //   })
    //   .catch((e) => console.log(e));
  }

  function getDataVoucher() {
    // all user
    setFetchVoucher(false);
    if (adminToken != null)
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
    if (adminToken != null)
      axios
        .post(process.env.REACT_APP_API_LOCAL + "admin/allnap", {
          token: adminToken,
        })
        .then((res) => {
          setDataAllNC(res.data);
        })
        .catch((e) => console.log(e));
  }

  function getDataComment() {
    setFetchComment(false);
    db.ref()
      .child("newscontent")
      .get()
      .then((snap) => setdataAllKnews(Object.values(snap.val()).reverse()));
    // if (adminToken != null)
    //   axios
    //     .post(process.env.REACT_APP_API_LOCAL + "admin/allstk", {
    //       token: adminToken,
    //     })
    //     .then((res) => {
    //       setdataAllKnews(res.data);
    //     })
    //     .catch((e) => console.log(e));
  }

  function getDataReport() {
    // all user
    setFetchReport(false);
    if (adminToken != null)
      axios
        .post(process.env.REACT_APP_API_LOCAL + "admin/allreport", {
          token: adminToken,
        })
        .then((res) => {
          setDataAllReport(res.data);
          setonLoading(0);
        })
        .catch((e) => {
          console.log(e);
          setonLoading(0);
        });
  }

  return userInfo.checkUser == "init" ? (
    <h1>CHECKING...</h1>
  ) : userInfo.checkUser == "not" ? (
    <Redirect push to="/login" />
  ) : (
    <div className="all-admin">
      <section className="section container">
        <div className="container-fluid pt-1">
          <div className="row mt-4">
            <div class="col-6 col-lg-3">
              <div class="stats">
                <p className="text-bold mb-10 d-none d-sm-block">
                  {dataDas.sum}K
                </p>
                <h6 className=" mx-auto ms-sm-0 ">
                  <Link to="/admin" className="btn btn-sm btn-link ms-1 mt-1 ">
                    <i className="fa fa-dollar  d-none d-sm-block" /> Revenue
                  </Link>
                </h6>
              </div>
            </div>
            <div className="col-lg-3  col-6">
              <div className="icon-card mb-30">
                <div className="stats">
                  <p className="text-bold mb-10 d-none d-sm-block">
                    {dataAllUser.length}
                  </p>
                  <h6 className=" mx-auto ms-sm-0 ">
                    <Link
                      to="/admin/user"
                      className="btn btn-sm btn-link ms-1 mt-1"
                    >
                      <i className="fa fa-user  d-none d-sm-block" /> User
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="icon-card mb-30">
                <div className="icon primary">
                  <i className="lni lni-credit-cards" />
                </div>
                <div className="stats">
                  <p className="text-bold mb-10 d-none d-sm-block">
                    {Object.keys(dataAllF).length}
                  </p>{" "}
                  <h6 className=" mx-auto ms-sm-0 ">
                    <Link
                      className="btn btn-sm btn-link ms-1 mt-1"
                      to="/admin/phim"
                    >
                      <i className="fa fa-film  d-none d-sm-block" /> Film
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3  col-6">
              <div className="icon-card mb-30">
                <div className="icon orange">
                  <i className="lni lni-user" />
                </div>
                <div className="stats">
                  <p className="text-bold mb-10 d-none d-sm-block">
                    {dataAllLink.length}
                  </p>
                  <h6 className=" mx-auto ms-sm-0 ">
                    <Link
                      className="btn btn-sm btn-link ms-1 mt-1"
                      to="/admin/link"
                    >
                      <i className="fa fa-link  d-none d-sm-block" /> Link Film
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3  col-6">
              <div className="icon-card mb-30">
                <div className="icon orange">
                  <i className="lni lni-user" />
                </div>
                <div className="stats">
                  <p className="text-bold mb-10 d-none d-sm-block">
                    {dataAllVoucher.length}
                  </p>{" "}
                  <h6 className=" mx-auto ms-sm-0 ">
                    <Link
                      className="btn btn-sm btn-link ms-1 mt-1"
                      to="/admin/voucher"
                    >
                      <i className="fa fa-gift  d-none d-sm-block" /> Voucher
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3  col-6">
              <div className="icon-card mb-30">
                <div className="icon orange">
                  <i className="lni lni-user" />
                </div>
                <div className="stats">
                  <p className="text-bold mb-10 d-none d-sm-block">
                    {dataAllNC.length}
                  </p>{" "}
                  <h6 className=" mx-auto ms-sm-0 ">
                    <Link
                      className="btn btn-sm btn-link ms-1 mt-1"
                      to="/admin/napcoin"
                    >
                      <i className="fa fa-money  d-none d-sm-block" /> Nạp Coin
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3  col-6">
              <div className="icon-card mb-30">
                <div className="icon orange">
                  <i className="lni lni-user" />
                </div>
                <div className="stats">
                  <p className="text-bold mb-10 d-none d-sm-block">
                    {Object.keys(dataAllKnews).length}
                  </p>
                  <h6 className=" mx-auto ms-sm-0 ">
                    <Link
                      className="btn btn-sm btn-link ms-1 mt-1"
                      to="/admin/soantin"
                    >
                      <i className="fa fa-newspaper-o d-none d-sm-block" />{" "}
                      KNews
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3  col-6">
              <div className="icon-card mb-30">
                <div className="icon orange">
                  <i className="lni lni-user" />
                </div>
                <div className="stats">
                  <p className="text-bold mb-10 d-none d-sm-block">
                    {Object.keys(dataAllReport).length}
                  </p>
                  <h6 className=" mx-auto ms-sm-0 ">
                    <Link
                      className="btn btn-sm btn-link ms-1 mt-1"
                      to="/admin/report"
                    >
                      <i className="fa fa-bullhorn   d-none d-sm-block" />
                      Report
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
            {/* End Col */}
          </div>
          {onLoading == 1 ? (
            <Loading />
          ) : (
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
                  <LinkPhim
                    // dataL={dataAllLink}
                    dataL={dataAllF}
                    token={adminToken}
                    setFetchLink={setFetchLink}
                  />
                  // <Links
                  //   dataL={dataAllLink}
                  //   token={adminToken}
                  //   setFetchLink={setFetchLink}
                  // />
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
              {/* <Route
                path={"/admin/stk"}
                component={() => (
                  <Comments
                    dataComment={dataAllKnews}
                    setFetchComment={setFetchComment}
                    token={adminToken}
                  />
                )}
              /> */}
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
                path={"/admin/soantin"}
                component={() => (
                  <SoanTin
                    token={adminToken}
                    dataNew={dataAllKnews}
                    setFetch={setFetchComment}
                  />
                )}
              />
              <Route
                path={"/admin/kitkot"}
                component={() => (
                  <KitKotAd
                    dataL={dataAllKitkot}
                    token={adminToken}
                    setFetchLink={setFetchKikot}
                  />
                )}
              />
              <Route
                path={"/admin"}
                component={() => <Dashboard char1={char1} char2={char2} />}
              />
              )
            </Switch>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Admin;

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

import Dashboard from "./Dashboard";

const Admin = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state.userData.curentUser);
  const [dataDas, setDataDas] = useState({});
  const [char1, setChar1] = useState({});
  const [char2, setChar2] = useState({});
  const [dataAllF, setDataAllF] = useState([{
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
  useEffect(() => {
    auth().onAuthStateChanged((currentUser) => {
      currentUser
        .getIdTokenResult()
        .then((idTokenResult) => {
          if (!!idTokenResult.claims.admin) {
            // alert("You are admin!");
            getDataAdmin();
          } else {
            history.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  function getDataAdmin() {
    auth()
      .currentUser.getIdToken(true)
      .then((token) => {
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
                label: "Doanh thu",
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
                label: "Người dùng mới",
              },
            ];
            setChar2(char2);
            let sum = 0;
            Object.values(res.data.doanhthu).map((e) => (sum = sum + e));
            res.data.sum = sum;
            setDataDas(res.data);

          axios
            .get(process.env.REACT_APP_API_LOCAL + "film/search")
            .then((res) => {
              setDataAllF(Object.values(res.data));
            })
            .catch((e) => console.log(e));

          });
      });
  }

  return userInfo.checkUser == "init" ? (
    <h1>CHECKING...</h1>
  ) : userInfo.checkUser == "not" ? (
    <Redirect push to="/login" />
  ) : (
    <div>
      <section className="section">
        <Link className="btn btn-sm btn-danger ms-1 mt-1" to="/admin">
          Home admin
        </Link>
        <div className="container-fluid pt-1">
          {" "}
          <div className="row">
            <div className="col-xl-3  col-sm-6  border border-danger">
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
              {/* End Icon Cart */}
            </div>
            <div className="col-xl-3  col-sm-6  border border-danger">
              <div className="icon-card mb-30">
                <div className="content">
                  <h6 className="mb-10">
                    <Link
                      to="/admin/user"
                      className="btn btn-sm btn-danger ms-1 mt-1"
                    >
                      {" "}
                      <i className="fa fa-user" /> User
                    </Link>
                  </h6>
                  <h3 className="text-bold mb-10">{dataDas.user}</h3>
                  <p className="text-sm text-success">
                    <i className="lni lni-arrow-up" /> +2.00%
                  </p>
                </div>
              </div>
              {/* End Icon Cart */}
            </div>
            {/* End Col */}
            <div className="col-xl-3  col-sm-6  border border-danger">
              <div className="icon-card mb-30">
                <div className="icon primary">
                  <i className="lni lni-credit-cards" />
                </div>
                <div className="content">
                  <h6 className="mb-10">
                    <Link
                      className="btn btn-sm btn-danger ms-1 mt-1"
                      to="/admin/phim"
                    >
                      <i className="fa fa-film" /> Phim
                    </Link>
                  </h6>
                  <h3 className="text-bold mb-10">{dataDas.phim}</h3>
                  <p className="text-sm text-success">Tổng số phim </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3  col-sm-6  border border-danger">
              <div className="icon-card mb-30">
                <div className="icon orange">
                  <i className="lni lni-user" />
                </div>
                <div className="content">
                  <h6 className="mb-10">
                    {" "}
                    <Link
                      className="btn btn-sm btn-danger ms-1 mt-1"
                      to="/admin/link"
                    >
                      <i className="fa fa-link" /> Link phim
                    </Link>
                  </h6>
                  <h3 className="text-bold mb-10">{dataDas.link}</h3>
                  <p className="text-sm text-success">Tổng số link </p>
                </div>
              </div>
            </div>
            {/* End Col */}
          </div>
          <Switch>
            <Route path={"/admin/user"} component={User} />
            <Route path={"/admin/phim"} component={()=> <Phims dataF={dataAllF}/>} />
            <Route path={"/admin/link"} component={Links} />
            <Route
              path={"/admin"} component={() => <Dashboard char1={char1} char2={char2} />}
            />
          </Switch>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Admin;

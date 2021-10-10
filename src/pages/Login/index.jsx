import "./style.css";
import Footer from "../../components/Footer";

import axios from "axios";

// firebase
import withFirebaseAuth from "react-with-firebase-auth";
import { StyledFirebaseAuth } from "react-firebaseui";
import { auth } from "../../services/firebase";
import firebase from "firebase/app";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserDataDetail } from "./../../store/actions/user";

const firebaseAppAuth = auth();
const providers = {
  googleProvider: new auth.GoogleAuthProvider(),
};

const Login = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.curentUser);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user == null) {
        dispatch(setUserData({ checkUser: "not" }));
        dispatch(setUserDataDetail({ checkUser: "not" }));
      } else {
        dispatch(setUserData(user));
        auth()
          .currentUser.getIdToken(true)
          .then(function (idToken) {
            axios
              .post(process.env.REACT_APP_API_LOCAL + "user/info", {
                token: idToken,
              })
              .then((res) => {
                dispatch(setUserDataDetail(res.data));
              })
              .catch((e) => {
                console.log(e);
              });
          });
      }
    });
  }, [auth().currentUser]);


  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  return (
    <div>
      <main id="main">
        <div>
          <div className="container container-login">
            {userInfo.checkUser === "init" ? (
              <h1>CHECKING...</h1>
            ) : userInfo.checkUser === "not" ? (
              <div className="row login-page text-light ">
                <div className="col-12 col-md-8 sign-in text-center ">
                  <h2 className="text-center mt-2 mb-2 text-light fw-bold ">
                    ĐĂNG NHẬP{" "}
                  </h2>

                  <div>
                    <StyledFirebaseAuth
                      uiConfig={uiConfig}
                      firebaseAuth={firebase.auth()}
                    />
                  </div>

                  <hr className="w-50 mx-auto pd-1" />
                  <strong className="text-light">
                    Hoặc bằng tài khoản của bạn
                  </strong>
                  <form className="">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control w-50 mx-auto"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control w-50 mx-auto"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-50 mb-3">
                      Đăng nhập
                    </button>
                  </form>
                </div>
                <div className="col-12 col-md-4 p-2 sign-up text-center">
                  <h2 className="text-center  mt-2 mb-2 text-light fw-bold fst-italics">
                    Đăng kí
                  </h2>
                  <form className="pb-2">
                    <div className="mb-3">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control w-50 mx-auto"
                        id="exampleInputEmail1"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-3">
                      <label>Password:</label>
                      <input
                        type="password"
                        className="form-control w-50 mx-auto"
                        placeholder="Password"
                      />
                    </div>
                    <div className="mb-3">
                      <label>Xác nhận password:</label>
                      <input
                        type="password"
                        className="form-control w-50 mx-auto"
                        placeholder="Password again"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-50 ">
                      Đăng kí
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div>
                <h3>Xin chào, {userInfo.displayName}</h3>
                <button
                  className="w-40 h-30 btn btn-sm btn-danger"
                  onClick={() =>
                    firebase.auth().signOut().then(alert("Sign out!!!"))
                  }
                >
                  Đăng xuất <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

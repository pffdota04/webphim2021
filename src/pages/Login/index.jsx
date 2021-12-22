import "./style.css";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import MetaTags from "react-meta-tags";

// firebase
import withFirebaseAuth from "react-with-firebase-auth";
import { StyledFirebaseAuth } from "react-firebaseui";
import { auth } from "../../services/firebase";
import firebase from "firebase/app";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserDataDetail } from "./../../store/actions/user";
import XacThuc from "../XacThuc";
import { Redirect } from "react-router";
import Register from "../Register";

const firebaseAppAuth = auth();
const providers = {
  googleProvider: new auth.GoogleAuthProvider(),
};

const Login = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.curentUser);
  const [emailLogin, setEmailLogin] = useState("");
  const [passLogin, setPassLogin] = useState("");
  const [errorLogin, setErrorLogin] = useState(null);

  // useEffect(() => {
  //   auth().onAuthStateChanged((user) => {
  //     if (user == null) {
  //       dispatch(setUserData({ checkUser: "not" }));
  //       dispatch(setUserDataDetail({ checkUser: "not" }));
  //     } else {
  //       dispatch(setUserData(user));
  //       auth()
  //         .currentUser.getIdToken(true)
  //         .then(function (idToken) {
  //           axios
  //             .post(process.env.REACT_APP_API_LOCAL + "user/info", {
  //               token: idToken,
  //             })
  //             .then((res) => {
  //               dispatch(setUserDataDetail(res.data));
  //             })
  //             .catch((e) => {
  //               console.log(e);
  //             });
  //         });
  //     }
  //   });
  // }, [auth().currentUser]);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  const Login = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailLogin === "" && passLogin == "") {
      setErrorLogin("Vui lòng nhập Email và Mật khẩu!");
    }
    else if (! re.test(emailLogin)) {
      setErrorLogin("Email không hợp lệ!");
    }
    else if (emailLogin === "") {
      setErrorLogin("Vui lòng nhập Email!");
    }
    else if (passLogin == "") {
      setErrorLogin("Vui lòng nhập Mật khẩu!");
    }
    else
      auth()
        .signInWithEmailAndPassword(emailLogin, passLogin)
        .then((userCredential) => {
          // alert(
          //   "Xin chào " +
          //     userCredential.user.displayName +
          //     ", bạn đã đăng nhập thành công!"
          // );
          window.location = "/";
        })
        .catch((error) => {
          // var errorMessage = error.message;
          // setErrorLogin("Lỗi: " + errorMessage);
          setErrorLogin("Email hoặc mật khẩu không đúng!");
        });
  };

  return userInfo.checkUser === false ? (
    <Redirect to="/xacthuc" />
  ) : (
    <div>
      <MetaTags>
        <title>Đăng nhập</title>
        <meta
          name="description"
          content={
            "Đăng nhập ngay để xem thêm nhiều phim hay cập nhật liên tục tại Kphim.xyz với chất lượng cao HD, fullHD, 4K, Bluray,.. với tốc độ cực mạnh!"
          }
        />
      </MetaTags>
      <main id="main">
        <div>
          <div className="container">
            {userInfo.checkUser === "init" ? (
              <h1 className="primary-color">ĐANG KIỂM TRA...</h1>
            ) : userInfo.checkUser === "not" ? (
              <div className="">
                <div className="text-center sign__form">
                  <div className="row ps-4 pe-4 ps-sm-2 pe-sm-2">
                    <div className="col-12">
                      <div className="logo-img"></div>
                    </div>

                    <div className="col-12 mx-auto">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      ></label>
                      <input
                        type="email"
                        className="sign__input"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        value={emailLogin}
                        onChange={(e) => setEmailLogin(e.target.value)}
                      />
                    </div>
                    <div className="col-12 mx-auto">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      ></label>
                      <input
                        type="password"
                        className="sign__input"
                        id="exampleInputPassword1"
                        placeholder="Mật khẩu"
                        value={passLogin}
                        onChange={(e) => setPassLogin(e.target.value)}
                      />
                    </div>
                    {errorLogin === null ? (
                      <p></p>
                    ) : (
                      <p className="primary-color">{errorLogin}</p>
                    )}
                    <div className="col-12">
                      <button className="sign__btn" onClick={() => Login()}>
                        ĐĂNG NHẬP
                      </button>
                      <hr className="w-50 mx-auto" />
                    </div>
                    <div className="col-12">
                      <strong className="text-light">HOẶC</strong>
                    </div>
                    <div className="col-12">
                      <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                      />
                      <hr className="w-50 mx-auto pd-1" />
                    </div>
                    <div className="col-12">
                      <span class="sign__text">
                        Bạn chưa có tài khoản?
                        <Link to="/register">ĐĂNG KÝ!</Link>
                      </span>
                      {/* <span class="sign__text">
                        <Link to="/forgotpw">Forgot password?</Link>
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // <div className="text-center sign__form">
              //   <h3 className="text-white">
              //     Chào mừng{" "}
              //     <span className="primary-color">{userInfo.displayName}</span>{" "}
              //     đến với KPHIM
              //   </h3>
              //   <Link
              //     className="w-40 h-30 btn btn-sm mt-3 background-primary"
              //     to="/home"
              //   >
              //     Xem phim ngay!
              //   </Link>
              // </div>
              window.location = "/"
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

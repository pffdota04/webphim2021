import "./style.css";
import Footer from "../../components/Footer";
import { Link } from 'react-router-dom';
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

const firebaseAppAuth = auth();
const providers = {
  googleProvider: new auth.GoogleAuthProvider(),
};

const Register = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.curentUser);

  const [emailSignup, setEmailSignup] = useState("");
  const [passSignup, setPassSignup] = useState("");
  const [repassSignup, setRePassSignup] = useState("");
  const [nameSignup, setNameSignup] = useState("");
  const [imgSignup, setImgSignup] = useState("");
  const [errorSignup, setErrorSignup] = useState(null);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  const Signup = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailSignup === "" || passSignup === "" || nameSignup === "")
      setErrorSignup("Vui lòng nhập đủ các trường!");
    else if (! re.test(emailSignup))
      setErrorSignup("Email không hợp lệ!");
    else if (nameSignup.length <= 6)
      setErrorSignup("Tên tài khoản phải dài hơn 6 kí tự");
    else if (passSignup !== repassSignup)
      setErrorSignup("Mật khẩu xác nhận không chính xác");
    else if (passSignup.length <= 6)
      setErrorSignup("Mật khẩu phải dài hơn 6 kí tự");
    else
      axios
        .post(process.env.REACT_APP_API_LOCAL + "user/signup", {
          newmail: emailSignup,
          newpassword: passSignup,
          name: nameSignup,
          img: imgSignup,
        })
        .then((res) => {
          if (res.data == "okok") {
          //   var add = document.getElementById('toast');
          //   var move = document.getElementById('main');
          //   add.classList.add('show');
          //   window.setTimeout(function () {
          //     move.removeChild(add);
          // }, 2000)
            alert("Đăng ký thành công !");
            setEmailSignup("");
            setPassSignup("");
            setRePassSignup("");
            setImgSignup("");
          } else if (res.data == "exist") {
            setErrorSignup("Email đã được đăng ký!");
          }
        })
        .catch((e) => alert(e));
  };

  return userInfo.checkUser === false ? (
    <Redirect to="/xacthuc" />
  ) : (
    <div>
      <MetaTags>
        <title>Đăng kí</title>
        <meta
          name="description"
          content={
            "Đăng kí ngay để xem nhiều phim hay cập nhật liên tục tại Kphim.xyz với chất lượng cao HD, fullHD, 4K, Bluray,.. với tốc độ cực mạnh!"
          }
        />
      </MetaTags>
      <main id="main">
        {/* <div id="toast" class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex align-items-center alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 ms-3" viewBox="0 0 16 16" role="img" aria-label="Warning:">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
            <div class="toast-body">
              Đăng ký thành công!
            </div>
            <button type="button" class="btn-close btn-close-dark me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div> */}
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
                      <label htmlFor="nameSignup"></label>
                      <input
                        type="text"
                        className="sign__input"
                        id="nameSignup"
                        placeholder="Tên tài khoản"
                        value={nameSignup}
                        onChange={(e) => setNameSignup(e.target.value)}
                      />
                    </div>
                    {/* <div className="col-12 mx-auto">
                      <label htmlFor="imgSignup"></label>
                      <input
                        type="text"
                        className="sign__input"
                        id="imgSignup"
                        placeholder="Link avatar"
                        value={imgSignup}
                        onChange={(e) => setImgSignup(e.target.value)}
                      />
                    </div> */}
                    <div className="col-12 mx-auto">
                      <label
                        htmlFor="emailSignup"
                        className="form-label"
                      ></label>
                      <input
                        type="email"
                        className="sign__input"
                        id="emailSignup"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        value={emailSignup}
                        onChange={(e) => setEmailSignup(e.target.value)}
                      />
                    </div>
                    <div className="col-12 mx-auto">
                      <label
                        htmlFor="passSignup"
                        className="form-label"
                      ></label>
                      <input
                        type="password"
                        className="sign__input"
                        id="passSignup"
                        placeholder="Mật khẩu"
                        value={passSignup}
                        onChange={(e) => setPassSignup(e.target.value)}
                      />
                    </div>
                    <div className="col-12 mx-auto">
                      <label
                        htmlFor="repassSignup"
                        className="form-label"
                      ></label>
                      <input
                        type="password"
                        className="sign__input"
                        id="repassSignup"
                        placeholder="Nhập lại mật khẩu"
                        value={repassSignup}
                        onChange={(e) => setRePassSignup(e.target.value)}
                      />
                    </div>
                    {errorSignup === null ? (
                      <p></p>
                    ) : (
                      <p className="primary-color">{errorSignup}</p>
                    )}
                    <div className="col-12">
                      <button className="sign__btn" onClick={() => Signup()}>
                        ĐĂNG KÝ
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
                        Bạn đã có tài khoản?
                        <Link to="/login">ĐĂNG NHẬP!</Link>
                      </span>
                    </div>
                  </div>
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

export default Register;

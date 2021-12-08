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
    if (emailSignup === "" || passSignup === "" || nameSignup === "")
      setErrorSignup("Không được để trống");
    else if (passSignup !== repassSignup)
      setErrorSignup("Password xác nhận không chính xác");
    else if (passSignup.length <= 6)
      setErrorSignup("Password phải dài hơn 6 kí tự");
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
            alert("Đăng kí thành công!");
            setEmailSignup("");
            setPassSignup("");
            setRePassSignup("");
            setImgSignup("");
          } else if (res.data == "exist") alert("Email đã được đăng kí");
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
        <div>
          <div className="container">
            {userInfo.checkUser === "init" ? (
              <h1>CHECKING...</h1>
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
                        placeholder="Name"
                        value={nameSignup}
                        onChange={(e) => setNameSignup(e.target.value)}
                      />
                    </div>
                    <div className="col-12 mx-auto">
                      <label htmlFor="imgSignup"></label>
                      <input
                        type="text"
                        className="sign__input"
                        id="imgSignup"
                        placeholder="Link avatar"
                        value={imgSignup}
                        onChange={(e) => setImgSignup(e.target.value)}
                      />
                    </div>
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
                        placeholder="Password"
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
                        placeholder="Password again"
                        value={repassSignup}
                        onChange={(e) => setRePassSignup(e.target.value)}
                      />
                    </div>
                    {errorSignup === null ? (
                      <p></p>
                    ) : (
                      <p className="text-danger">{errorSignup}</p>
                    )}
                    <div className="col-12">
                      <button className="sign__btn" onClick={() => Signup()}>
                        SIGN UP
                      </button>
                      <hr className="w-50 mx-auto" />
                    </div>
                    <div className="col-12">
                      <strong className="text-light">OR</strong>
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
                        Already have an account?
                        <Link to="/login">Sign in!</Link>
                      </span>
                    </div>
                  </div>
                </div>

                {/* <div className="col-12 col-md-4 p-2 sign-up text-center">
                  <div className="row ps-4 pe-4 ps-sm-2 pe-sm-2">
                    <h2 className="col-12">Đăng kí (sắp có)</h2>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="emailSignup">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailSignup"
                        placeholder="Email"
                        value={emailSignup}
                        onChange={(e) => setEmailSignup(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="nameSignup">Tên hiển thị</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nameSignup"
                        placeholder="Tên hiển thị"
                        value={nameSignup}
                        onChange={(e) => setNameSignup(e.target.value)}
                      />
                    </div>
                    <div className="col-12 mt-2 mb-2">
                      <label htmlFor="imgSignup">Ảnh đại diện</label>
                      <input
                        type="text"
                        className="form-control"
                        id="imgSignup"
                        placeholder="Link ảnh"
                        value={imgSignup}
                        onChange={(e) => setImgSignup(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-sm-6 ">
                      <label htmlFor="passSignup">Password:</label>
                      <input
                        type="password"
                        className="form-control "
                        placeholder="Password"
                        id="passSignup"
                        value={passSignup}
                        onChange={(e) => setPassSignup(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-sm-6 ">
                      <label htmlFor="repassSignup">Xác nhận password:</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password again"
                        id="repassSignup"
                        value={repassSignup}
                        onChange={(e) => setRePassSignup(e.target.value)}
                      />
                    </div>
                    <div className="col-12 mt-3">
                      <p className="text-danger">{errorSignup}</p>
                      <button
                        type="submit"
                        className="btn btn-primary w-50 mx-auto d-block"
                        onClick={() => Signup()}
                      >
                        Đăng kí
                      </button>
                    </div>
                    <hr className="w-50 mx-auto" />
                  </div>
                </div> */}
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

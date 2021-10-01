import Footer from "../../components/Footer";
import "./style.css"

// firebase auth
// import withFirebaseAuth from "react-with-firebase-auth";
// import { StyledFirebaseAuth } from "react-firebaseui";
// import { auth } from "../../services/firebase";
// import { db } from "../../services/firebase";
// import firebase from "firebase/app";

// const firebaseAppAuth = auth();
// const providers = {
//   googleProvider: new auth.GoogleAuthProvider(),
// };

// const uiConfig = {
//   signInFlow: "popup",
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//   ],
//   callbacks: {
//     signInSuccess: () => false,
//   },
// };
  

const Login = () => {
    return (
      <div>
        <main id="main">
          <div>
            <div className="container container-login">
              <div className="row login-page text-light ">
                <div className="col-12 col-md-8 sign-in text-center ">
                  <h2 className="text-center mt-2 mb-2 text-light fw-bold ">
                    ĐĂNG NHẬP
                  </h2>
                  <label
                    htmlFor="buttongg"
                    className="form-label text-light fw-bold"
                  >
                    Đăng nhập bằng google
                  </label>
                  <button
                    className="btn-danger mb-2 w-50 form-control w-50 mx-auto"
                    id="buttongg"
                  >
                    Đăng nhập với google
                  </button>
                  {/* <button
                    className="btn-primary mb-1 w-50 form-control w-50 mx-auto"
                    id="buttongg"
                  >
                    Đăng nhập với facebook
                  </button> */}

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
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Xác nhận password:
                      </label>
                      <input
                        type="password"
                        className="form-control w-50 mx-auto"
                        id="exampleInputPassword1"
                        placeholder="Password again"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-50 ">
                      Đăng kí
                    </button>
                  </form>
              </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
}

export default Login
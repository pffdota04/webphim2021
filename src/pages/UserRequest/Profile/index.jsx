import userProfile from "./../../../assets/images/user-profile.jpg";
import { useState } from "react";
import axios from "axios";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
const Profile = (props) => {
  const { userInfo, coin, token } = props;
  const [report, setReport] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendReport = () => {
    setIsLoading(true);
    if (!!report && report !== "")
      axios
        .post(process.env.REACT_APP_API_DEPLOYED2 + "user/report", {
          token: token,
          content: report,
        })
        .then((res) => {
          if (res.data === "okok") {
            alert("Đã ghi nhận phản hồi của bạn!");
            setReport("");
            setIsLoading(false);
          }
        })
        .catch(setIsLoading(false));
  };
  return (
    <div className="container mt-4 mb-5">
      {isLoading && <Loading />}
      <div className="row" id="container-ipad">
        <div className="col-4 background-content p-4">
          <h1 className="primary-color">Lời cảm ơn!</h1>
          <p className="lead">
            Cảm ơn bạn đã sử dụng trang web! Trang web hiện đang trong giai đoạn
            phát triển và liên tục cập nhật các tính năng mới. Nếu bạn đọc được
            dòng này thì bạn là một trong những người đầu tiên sử dụng bản Beta
            của trang web, chân thành cảm ơn bạn! <br></br>- Kphim -
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button
              type="button"
              className="sign__btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Liên hệ / Báo lỗi
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered text-black">
                <div className="modal-content ">
                  <div className="modal-header">
                    <h5 className="ms-2 modal-title fw-bold primary-color text-uppercase" id="exampleModalLabel">
                      Liên hệ
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body col-10 mx-auto">
                      <h5 className="mb-4">Bạn có thể liên hệ qua:</h5>
                      <div className="d-flex justify-content-between">
                        <p>
                          <a href="https://www.facebook.com/websitexemphimtructuyenKphim" target="_blank" className="text-reset link-color">
                          <i className="fa fa-facebook me-3" />Facebook
                          </a>
                        </p>
                      </div>
                      <input
                    className="w-100 mx-auto mb-3 p-1"
                    placeholder="Hoặc gửi tin nhắn ở đây"
                    onChange={(e) => setReport(e.target.value)}
                  />
                    {/* <ul>
                      <li>Facebook: click</li>
                      <li>Email: click</li>
                      <li>Discord: click</li>
                    </ul> */}
                  </div>
                  
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() => sendReport()}
                    >
                      Gửi
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="col-1"></span>
        <div className="col-7 background-content p-4">
          <img
            className="d-block mx-auto mb-4 rounded-circle"
            src={userInfo.photoURL == undefined ? userProfile : userInfo.photoURL}
            alt=""
            width={100}
            height={100}
          />
          <h1 className="display-5 fw-bold text-center">{userInfo.displayName} </h1>
          <br />
          <div className="col-9 mx-auto w-respon">
            <div classNam="col-4">
              <div className="background-item row p-2">
                <i className="fa fa-envelope col-2 d-flex align-items-center justify-content-center icon-user text-item"></i>
                <div className="row col-10">
                  <p className="m-0 text-item w-100">
                    Email
                  </p>
                  <p className="m-0">
                    <strong className="fw-bold">
                    {userInfo.email + " "}
                    {userInfo.checkUser ? (
                      <i className="fa fa-check-circle text-primary"></i>
                    ) : (
                      <Link to="/xacthuc"> Xác thực ngay</Link>
                    )}
                    </strong>{" "}
                  </p>
                </div>
              </div>
            </div>
            <br />
            <div classNam="col-4">
              <div className="background-item row p-2">
                <i className="fa fa-money col-2 d-flex align-items-center justify-content-center icon-user text-item"></i>
                <div className="row col-10">
                  <p className="m-0 text-item w-100">
                    Số dư
                  </p>
                  <p className="m-0">
                    <strong className="fw-bold">
                      {" "}
                      {coin} KOIN
                    </strong>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;

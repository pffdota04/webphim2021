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
        .post(process.env.REACT_APP_API_LOCAL + "user/report", {
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
    <div className="container my-2">
      {isLoading && <Loading />}
      <img
        className="d-block mx-auto mb-4 rounded-circle"
        src={userInfo.photoURL == undefined ? userProfile : userInfo.photoURL}
        alt=""
        width={100}
        height={100}
      />
      <h1 className="display-5 fw-bold text-center">{userInfo.displayName} </h1>
      <h5 className="text-center">
        {userInfo.email + " "}
        {userInfo.checkUser ? (
          <i className="fa fa-check-circle text-primary"></i>
        ) : (
          <Link to="/xacthuc"> Xác thực ngay</Link>
        )}
      </h5>
      <h4 className="text-center">
        Số dư:
        <strong className="display-6 fw-bold fst-italic ">
          {" "}
          {coin} KOIN
        </strong>{" "}
      </h4>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Cảm ơn bạn đã sử dụng trang web! Trang web hiện đang tron giai đoạn
          phát triển và liên tục cập nhật các tính năng mới. Nếu bạn đọc được
          dòng này thì bạn là một trong những người đầu tiên sử dụng bản Beta
          của trang web, chân thành cảm ơn bạn! <br></br>Kphim.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg px-4"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Liên hệ/Báo lỗi
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content ">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Bạn muốn nói gì đó với chúng tôi?
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <ul>
                    <li>Facebook: click</li>
                    <li>Email: click</li>
                    <li>Discord: click</li>
                  </ul>
                </div>
                <input
                  className="w-75 mx-auto mb-3 p-1"
                  placeholder="Hoặc gửi tin nhắn ở đây"
                  onChange={(e) => setReport(e.target.value)}
                />
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
    </div>
  );
};
export default Profile;

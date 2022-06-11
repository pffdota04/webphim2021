import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import Loading from "../../components/Loading";
import { setUserData, setUserDataDetail } from "./../../store/actions/user";
import "./style.css";

const XacThuc = () => {
  const userInfo = useSelector((state) => state.userData.curentUser);
  const userDetail = useSelector((state) => state.userData.userDetail);

  const [maxacthuc, setmaxacthuc] = useState("");
  const dispatch = useDispatch();

  const xacthuc = () => {
    axios
      .post(process.env.REACT_APP_API_DEPLOYED2 + "user/checkverifcode", {
        token: userDetail.token,
        code: maxacthuc,
      })
      .then((res) => {
        if (res.data === "okok") {
          window.location.reload();
        } else alert("Sai mã xác thực");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const resend = () => {
    axios
      .post(process.env.REACT_APP_API_DEPLOYED2 + "user/resendmail", {
        token: userDetail.token,
      })
      .then((res) => {
        if (res.data === "okok")
          alert(
            "Đã gửi một mã khác, hãy kiểm tra kỹ email của bạn, (kể cả thư mục spam)"
          );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return userDetail.checkUser == "init" ? (
    <Loading />
  ) : userDetail.checkUser == "not" ? (
    <Redirect push to="/login" />
  ) : (
    <div>
      <main id="main" className="container-background">
        <div>
          <div className="container mt-4 mb-5 text-white container-mb">
            <h4 className="primary-color">
              Xin chào,
              {userInfo.displayName}
            </h4>
            {userInfo.checkUser === false ? (
              <div>
                <h1>Có vẻ email này chưa được xác thực...</h1>
                <h5>Chúng tôi đã gửi một email cho bạn kèm theo mã xác thực</h5>
                <label htmlFor="maxacthuc"> Mã xác thực: </label>
                <input
                  className="maxacthuc"
                  id="maxacthuc"
                  type="text"
                  onChange={(e) => setmaxacthuc(e.target.value)}
                ></input>
                <button
                  className="btn btn-sm btn-primary ms-2 btn_xacnhan"
                  onClick={() => xacthuc()}
                >
                  Xác nhận
                </button>
                <hr />
                <h5>
                  Không tìm thấy mail?
                  <button
                    className="btn btn-sm btn-primary ms-2"
                    onClick={() => resend()}
                  >
                    Gửi lại
                  </button>{" "}
                </h5>
                <span className="text-muted">
                  (Đảm bảo bạn đã kiểm tra kỹ hộp thư, kể cả thư mục spam)
                </span>
              </div>
            ) : (
              <div>
                <h1>
                  Tài khoản của bạn đã được xác thực, giờ đây bạn có thể khám phá nhiều hơn về trang web, chúc bạn xem phim vui vẻ!{" "}
                </h1>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default XacThuc;

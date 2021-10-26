import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import Loading from "../../components/Loading";
import { setUserData, setUserDataDetail } from "./../../store/actions/user";

const XacThuc = () => {
  const userInfo = useSelector((state) => state.userData.curentUser);
  const userDetail = useSelector((state) => state.userData.userDetail);

  const [maxacthuc, setmaxacthuc] = useState("");
  const dispatch = useDispatch();

  const xacthuc = () => {
    axios
      .post(process.env.REACT_APP_API_LOCAL + "user/checkverifcode", {
        token: userDetail.token,
        code: maxacthuc,
      })
      .then((res) => {
        if (res.data === "okok") {
          window.location.reload();
        }else alert("Sai mã xác thực");
      })
      .catch((e) => {
        console.log(e);
      });
  };

    const resend = () => {
      axios
        .post(process.env.REACT_APP_API_LOCAL + "user/resendmail", {
          token: userDetail.token,
        })
        .then((res) => {
          if (res.data === "okok") 
             alert("Đã gửi một mã khác, hãy kiểm tra kỹ email của bạn, (kể cả thư mục spam)");
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
      <main id="main">
        <div>
          <div className="container container-login">
            <h4>
              Xin chào,
              {userInfo.displayName}
            </h4>
            {userInfo.checkUser === false ? (
              <div>
                <h1>Có vẻ email này chưa được xác thực...</h1>
                <h4>Chúng tôi đã gửi một email cho bạn kèm theo mã xác thực</h4>
                <label htmlFor="maxacthuc"> Mã xác thực: </label>
                <input
                  id="maxacthuc"
                  type="text"
                  onChange={(e) => setmaxacthuc(e.target.value)}
                ></input>
                <button
                  className="btn btn-sm btn-primary ms-2"
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
                  Tài khoản của bạn đã được xác thực, chúc bạn xem phim vui vẻ!{" "}
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

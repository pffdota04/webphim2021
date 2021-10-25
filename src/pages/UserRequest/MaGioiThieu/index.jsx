import axios from "axios";
import { useState } from "react";
import "./style.css";
import Loading from "../../../components/Loading";

const MaGioiThieu = (props) => {
  const [inputCode, setInputCode] = useState("");
  const { userDetail, change } = props;
  const [isLoading, setIsLoading] = useState(false);

  function sendMaGioiThieu() {
    setIsLoading(true);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "user/usecode", {
        token: userDetail.token,
        code: inputCode,
      })
      .then((res) => {
        if (res.data.complete == true) {
          alert("Thành công, nhận 20 Koin!");
          let newDetail = userDetail;
          newDetail.coin = newDetail.coin + 20;
          change(newDetail);
        } else alert(res.data.complete);
        setIsLoading(false);
      })
      .catch((e) => {
        alert(e.response.data.message);
        setIsLoading(false);
      });
  }

  return (
    <div className="container my-2 mb-3">
      {isLoading && <Loading/>}
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            Nhập mã nhận
            <strong className="display-6 fw-bold fst-italic ">
              {" "}
              20 KOIN
            </strong>{" "}
          </h4>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Ai đã giới thiệu bạn đến với Kphim, hãy nhập mã của họ để cả 2
              cùng nhập 20 Koin.
              <br /> Ngoài ra bạn có thể chia sẽ cho người khác mã của mình để
              nhận Koin giống như cách bạn đã nhận từ người khác. Chương trình
              này nhằm tri ân đến những người dùng đầu tiên của Kphim!
            </p>
          </div>
        </div>
        <hr className="mt-3 mb-3" style={{ height: "2px" }} />
        <div className="col-12 mx-auto ps-5 pe-5">
          <label
            for="muycode"
            className="form-label mx-auto d-block text-center"
          >
            Đây là mã của bạn
          </label>
          <span
            className="input-group-text mycode mx-auto d-block"
            id="muycode"
          >
            {userDetail.code}
          </span>
        </div>
        <hr className="mt-3 mb-3" style={{ height: "2px" }} />

        <div className="col-12 col-md-6 mx-auto">
          <label for="magiaodich" className="form-label">
            Mã giới thiệu<span className="text-muted"> </span>&nbsp;
          </label>
          <input
            type="text"
            name="magiaodich"
            id="magiaodich"
            className="w-100 form-control"
            onChange={(e) => {
              setInputCode(e.target.value);
            }}
            //   value={this.state.type}
          ></input>
        </div>
        <div className="col-12 ">
          <button
            className="btn-lg w-25 btn-secondary mx-auto d-block mt-3"
            onClick={() => sendMaGioiThieu()}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};
export default MaGioiThieu;

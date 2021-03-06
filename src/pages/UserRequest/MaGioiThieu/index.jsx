import axios from "axios";
import { useState } from "react";
import "./style.css";
import Loading from "../../../components/Loading";
import ModalAlert from "./../../../components/ModalAlart/ModalAlert";

const MaGioiThieu = (props) => {
  const [inputCode, setInputCode] = useState("");
  const { userDetail, change } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(null);

  function sendMaGioiThieu() {
    if (inputCode == "") setOpenModal("Nhập vào trống!");
    else {
      setIsLoading(true);
      axios
        .post(process.env.REACT_APP_API_DEPLOYED2 + "user/usecode", {
          token: userDetail.token,
          code: inputCode,
        })
        .then((res) => {
          if (res.data.complete == true) {
            setOpenModal("Chúc mừng bạn nhận được 20 coin!");
            let newDetail = userDetail;
            newDetail.coin = newDetail.coin + 20;
            change(newDetail);
          } else setOpenModal(res.data.complete);
          setIsLoading(false);
        })
        .catch((e) => {
          setOpenModal(e.response.data.message);
          setIsLoading(false);
        });
    }
  }

  return (
    <div className="container mt-4 mb-5">
      {isLoading && <Loading />}
      {openModal && (
        <ModalAlert close={() => setOpenModal(null)} content={openModal} />
      )}
      <div className="row" id="container-ipad">
        <div className="col-4 background-content p-4">
          <h4 className="text-center primary-color">
            Nhập mã nhận
            <strong className="display-7 fw-bold fst-italic ">
              {" "}
              20 COIN
            </strong>{" "}
          </h4>
          <div className="lead pt-3">
            <p>
              Ai đã giới thiệu bạn đến với Kphim, hãy nhập mã của họ để cả 2
              cùng nhận 20 Coin.
              <br /> Ngoài ra bạn có thể chia sẽ cho người khác mã của mình để
              nhận Coin giống như cách bạn đã nhận từ người khác. Chương trình
              này nhằm tri ân đến những người dùng đầu tiên của Kphim!
            </p>
          </div>
        </div>
        <span className="col-1"></span>
        <div className="col-7 background-content p-4">
          <div className="col-12 col-md-8 mx-auto mb-4 mt-voucher">
            <label for="muycode" className="form-label">
              Đây là mã của bạn
            </label>
            <span className="input-group-text" id="muycode">
              {userDetail.code}
            </span>
          </div>
          <div className="col-12 col-md-8 mx-auto mb-4">
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
              onKeyPress={(e) => {
                if (e.key == "Enter") sendMaGioiThieu();
              }}
            ></input>
          </div>
          <div className="col-12 col-md-8 mx-auto mb-4">
            <button className="sign__btn" onClick={() => sendMaGioiThieu()}>
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MaGioiThieu;

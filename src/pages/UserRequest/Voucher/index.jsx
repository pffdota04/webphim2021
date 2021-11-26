import axios from "axios";
import { useState } from "react";
import "./style.css";
import Loading from "../../../components/Loading";

const Voucher = (props) => {
  const [inputCode, setInputCode] = useState("");
  const { userDetail, change } = props;
  const [isLoading, setIsLoading] = useState(false);

  const sendVoucher = () => {
    setIsLoading(true);

    axios
      .post(process.env.REACT_APP_API_LOCAL + "user/voucher", {
        token: userDetail.token,
        code: inputCode,
      })
      .then((res) => {
        if (res.data.complete == true) {
          alert("Thanhf coong: nhan duoc " + res.data.voucherPoint);
          let newDetail = userDetail;
          newDetail.coin = newDetail.coin + res.data.voucherPoint;
          change(newDetail);
        } else alert(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        alert(e.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="container mt-4 mb-5">
      {isLoading && <Loading/>}
      <div className="row" id="container-ipad">
        <div className="col-4 background-content p-4">
          <h4 className="text-center primary-color">
            <strong className="display-7 fw-bold fst-italic ">
              {" "}
              VOUCH KOIN
            </strong>{" "}
          </h4>
          <div className="lead pt-3">
            <p>
              Có mã thì xài liền cho nóng, để lâu nó nguội mất ngon.
              <br /> Theo dõi Facebook của Kphim để săn thêm Vouch qua những
              event của bọn mình nhé!
            </p>
          </div>
        </div>
        <span className="col-1"></span>
        <div className="col-7 background-content p-4">
          <div className="col-12 col-md-8 mx-auto mb-4 mt-voucher">
            <label for="magiaodich" className="form-label">
              Mã Voucher<span className="text-muted"> </span>&nbsp;
            </label>
            <input
              type="text"
              name="magiaodich"
              id="magiaodich"
              className="w-100 form-control"
              onChange={(e) => setInputCode(e.target.value)}
            ></input>
          </div>
          <div className="col-12 col-md-8 mx-auto mb-4">
            <button
              className="sign__btn"
              onClick={() => sendVoucher()}
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Voucher;

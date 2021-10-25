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
    <div className="container my-2 mb-3">
      {isLoading && <Loading/>}
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">
              {" "}
              VOUCH KOIN
            </strong>{" "}
          </h4>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Có mã thì xài liền cho nóng, để lâu nó nguội mất ngon.
              <br /> Theo dõi Facebook của Kphim để săn thêm Vouch qua những
              event của bọn mình nhé!
            </p>
          </div>
        </div>
        <hr className="mt-3 mb-3" style={{ height: "2px" }} />
        <div className="col-12 col-md-6 mx-auto">
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
        <div className="col-12 ">
          <button
            className="btn-lg w-25 btn-secondary mx-auto d-block mt-3"
            onClick={() => sendVoucher()}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};
export default Voucher;

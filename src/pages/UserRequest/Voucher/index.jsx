import axios from "axios";
import { useState } from "react";
import "./style.css";
import Loading from "../../../components/Loading";
import ModalAlert from "./../../../components/ModalAlart/ModalAlert";

const Voucher = (props) => {
  const [inputCode, setInputCode] = useState("");
  const { userDetail, change } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(null);

  const sendVoucher = () => {
    setIsLoading(true);

    axios
      .post(process.env.REACT_APP_API_DEPLOYED2 + "user/voucher", {
        token: userDetail.token,
        code: inputCode,
      })
      .then((res) => {
        if (res.data.complete == true) {
          setOpenModal("Nhận thành công " + res.data.voucherPoint);
          let newDetail = userDetail;
          newDetail.coin = newDetail.coin + res.data.voucherPoint;
          change(newDetail);
        } else setOpenModal(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setOpenModal(e.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="container mt-4 mb-5">
      {isLoading && <Loading />}
      {openModal && (
        <ModalAlert
          close={() => setOpenModal(null)}
          content={openModal}
          title="Thông báo"
        />
      )}
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
              onKeyPress={(e) => {
                if (e.key == "Enter") sendVoucher();
              }}
            ></input>
          </div>
          <div className="col-12 col-md-8 mx-auto mb-4">
            <button className="sign__btn" onClick={() => sendVoucher()}>
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Voucher;

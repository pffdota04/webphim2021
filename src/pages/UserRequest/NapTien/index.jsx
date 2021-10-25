import { useState } from "react";
import axios from "axios";

import Loading from "../../../components/Loading";
const NapTien = (props) => {
  const [inputCode, setInputCode] = useState("");
  const [soLuong, setSoLuong] = useState(10);
  const [phuongThuc, setPhuongthuc] = useState("momo");
  const [ghiChu, setGhiChu] = useState("");
  const { userDetail, stk } = props;
  const [isLoading, setIsLoading] = useState(false);

  function sendRequest() {
        setIsLoading(true);

    axios
      .post(process.env.REACT_APP_API_LOCAL + "user/napkoin", {
        token: userDetail.token,
        mgd: inputCode,
        type: phuongThuc,
        coin: soLuong,
        note: ghiChu,
      })
      .then((res) => {
        if (res.data.complete == true) {
          alert("Đã ghi nhận, yêu cầu sẽ sớm được xử lý");
        } else alert(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        alert(e.response.data.message);
        setIsLoading(false);
      });
  }

  return (
    <div className="container mb-3 my-2">
      {isLoading && <Loading />}
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            Tỷ lệ:
            <strong className="display-6 fw-bold fst-italic ">
              {" "}
              1000 đồng = 1 KOIN
            </strong>{" "}
          </h4>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Nhập chính xác số tiền bạn muốn nạp, chọn phương thức nạp tiền phù
              hợp, chuyển tiền theo thông tin hiển thị. Lấy mã giao dịch nhập
              vào và bấm gửi. <br />
              Thông tin nạp của bạn sẽ được kiểm tra và cập nhật (trong vòng
              24h).
            </p>
            <h6 className="text-center">Thông tin chuyển khoản</h6>
            <p className="text-uppercase text-center">
              {stk[phuongThuc] !== undefined ? (
                <div>
                  {phuongThuc}
                  <i class="fa fa-arrow-right me-1 ms-1" /> {stk[phuongThuc]}
                </div>
              ) : (
                <div>
                  {phuongThuc} <i class="fa fa-arrow-right me-1 ms-1" /> Bảo
                  trì...
                </div>
              )}
            </p>
          </div>
        </div>
        <hr className="mt-3 mb-3" style={{ height: "2px" }} />

        <div className="col-12 col-md-6">
          <label for="menhgia" className="form-label">
            Mệnh giá <span className="text-muted">(Bắt buộc) </span>&nbsp;
          </label>
          <select
            name="type"
            id="menhgia"
            className="w-100 form-control"
            onChange={(e) => setSoLuong(e.target.value)}
            value={soLuong}
          >
            <option value="100">10k = 100 Koin</option>
            <option value="200">20k= 200 Koin</option>
            <option value="500">50k= 500 Koin </option>
            <option value="1000">100k= 1000 Koin</option>

            {/* <option value="100">10k = 100 Koin</option>
            <option value="200">20k= 200 Koin</option>
            <option value="500">50k= 500 + 20 Koin </option>
            <option value="1000">100k= 1000 + 100 Koin</option> */}
          </select>{" "}
        </div>
        <div className="col-12 col-md-6">
          <label for="phuongthuc" className="form-label">
            Phương thức: <span className="text-muted">(Bắt buộc) </span>&nbsp;
          </label>
          <select
            type="select"
            name="coin"
            id="phuongthuc"
            className="w-100 form-control"
            onChange={(e) => setPhuongthuc(e.target.value)}
            value={phuongThuc}
          >
            <option value="momo">Momo</option>
            <option value="airpay">Airpay</option>
            <option value="bank">Chuyển Khoản</option>
          </select>
        </div>
        <hr className="mt-3 mb-3" style={{ height: "2px" }} />

        <div className="col-12 col-md-6 mx-auto">
          <label for="magiaodich" className="form-label">
            Mã giao dịch <span className="text-muted">(Bắt buộc) </span>&nbsp;
          </label>
          <input
            type="text"
            name="magiaodich"
            id="magiaodich"
            className="w-100 form-control"
            onChange={(e) => setInputCode(e.target.value)}
          ></input>
        </div>
        <div className="col-12 col-md-6 mx-auto">
          <label for="magiaodich" className="form-label">
            Ghi chú &nbsp;
          </label>
          <input
            type="text"
            name="magiaodich"
            id="magiaodich"
            className="w-100 form-control"
            onChange={(e) => setGhiChu(e.target.value)}
          ></input>
        </div>
        <hr className="mt-3 mb-3" style={{ height: "2px" }} />
        <div className="col-12 ">
          <button
            className="btn-lg w-25 btn-secondary mx-auto d-block"
            onClick={() => sendRequest()}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};
export default NapTien;

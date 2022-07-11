import { useState } from "react";
import { useRef, useEffect } from "react";
import axios from "axios";
import Loading from "../../../components/Loading";
import ModalAlert from "./../../../components/ModalAlart/ModalAlert";

const NapTien = (props) => {
  const [inputCode, setInputCode] = useState("");
  //const [soLuong, setSoLuong] = useState(10);
  const [phuongThuc, setPhuongthuc] = useState("momo");
  const [ghiChu, setGhiChu] = useState("");
  const { userDetail, stk } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [checkout, setCheckOut] = useState(false);
  const [soLuong, setSoLuong] = useState(1);
  const [openModal, setOpenModal] = useState(null);

  const PayPal = () => {
    const paypal = useRef();

    useEffect(() => {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Cool looking table",
                  amount: {
                    currency_code: "CAD",
                    value: soLuong,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    }, []);

    return (
      <div>
        <div ref={paypal}></div>
        <button
          className="sign__btn"
          onClick={() => {
            setCheckOut(false);
          }}
        >
          Close
        </button>
      </div>
    );
  };

  function sendRequest() {
    if (inputCode == "") setOpenModal("Mã giao dịch trống!");
    else {
      setIsLoading(true);
      axios
        .post(process.env.REACT_APP_API_DEPLOYED2 + "user/napkoin", {
          token: userDetail.token,
          mgd: inputCode,
          type: phuongThuc,
          coin: soLuong,
          note: ghiChu,
        })
        .then((res) => {
          if (res.data.complete == true) {
            setOpenModal("Đã ghi nhận, yêu cầu sẽ sớm được xử lý");
          } else setOpenModal(res.data);
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
            Tỷ lệ:
            <strong className="display-7 fw-bold fst-italic ">
              {" "}
              1000 VNĐ = 5 COIN
            </strong>{" "}
          </h4>
          <div className="lead pt-3">
            <h4>HƯỚNG DẪN:</h4>
            <p>- Chọn mệnh giá cần nạp</p>
            <p>- Chọn phương thức thanh toán</p>
            <p>- Nhập mã giao dịch</p>
            <p>- Ghi chú (nếu có)</p>
            <p>- Nhấn "Gửi"</p>
            <hr />
            <h6>
              Thông tin nạp của bạn sẽ được kiểm tra và cập nhật (trong vòng
              24h)
            </h6>
            <hr />
            <h6 className="text-center">Thông tin chuyển khoản</h6>
            <p className="text-uppercase text-center primary-color">
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
        <span className="col-1"></span>
        <div className="col-7 background-content p-4">
          {checkout ? (
            <PayPal />
          ) : (
            <div>
              <div className="col-12 col-md-8 mx-auto mb-4">
                <label for="phuongthuc" className="form-label">
                  Phương thức: <span className="text-muted">(Bắt buộc) </span>
                  &nbsp;
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
                  <option value="paypal">PayPal</option>
                  <option value="bank">Chuyển Khoản</option>
                </select>
              </div>
              <div>
                {phuongThuc === "paypal" ? (
                  <div>
                    <div className="col-12 col-md-8 mx-auto mb-4">
                      <label for="menhgia" className="form-label">
                        Mệnh giá <span className="text-muted">(Bắt buộc) </span>
                        &nbsp;
                      </label>
                      <select
                        name="type"
                        id="menhgia"
                        className="w-100 form-control"
                        onChange={(e) => setSoLuong(e.target.value)}
                        value={soLuong}
                      >
                        <option value="1">1$ = 110 Coin</option>
                        <option value="2">2$= 220 Coin</option>
                        <option value="5">5$= 550 Coin </option>
                        <option value="10">10$= 1100 Coin</option>
                      </select>{" "}
                    </div>
                    <div className="col-12 col-md-8 mx-auto">
                      <button
                        className="sign__btn"
                        onClick={() => {
                          setCheckOut(true);
                        }}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="col-12 col-md-8 mx-auto mb-4">
                      <label for="menhgia" className="form-label">
                        Mệnh giá <span className="text-muted">(Bắt buộc) </span>
                        &nbsp;
                      </label>
                      <select
                        name="type"
                        id="menhgia"
                        className="w-100 form-control"
                        onChange={(e) => setSoLuong(e.target.value)}
                        value={soLuong}
                      >
                        <option value="100">10k = 50 Coin</option>
                        <option value="200">20k= 100 Coin</option>
                        <option value="500">50k= 250 Coin </option>
                        <option value="1000">100k= 500 Coin</option>
                      </select>{" "}
                    </div>
                    <div className="col-12 col-md-8 mx-auto mb-4">
                      <label for="magiaodich" className="form-label">
                        Mã giao dịch{" "}
                        <span className="text-muted">(Bắt buộc) </span>&nbsp;
                      </label>
                      <input
                        type="text"
                        name="magiaodich"
                        id="magiaodich"
                        className="w-100 form-control"
                        onChange={(e) => setInputCode(e.target.value)}
                      ></input>
                    </div>
                    <div className="col-12 col-md-8 mx-auto mb-5">
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
                    <div className="col-12 col-md-8 mx-auto">
                      <button
                        className="sign__btn"
                        onClick={() => sendRequest()}
                      >
                        Gửi
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NapTien;

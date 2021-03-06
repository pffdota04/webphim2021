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
  const { userDetail, stk, change } = props;
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
          onApprove: function(data, actions) {
            return actions.order.capture().then(congtienPaypal(soLuong * 24));
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

  function congtienPaypal(sotien) {
    setIsLoading(true);
    axios
      .put(
        process.env.REACT_APP_API_DEPLOYED2 + "user/naptienpaypal",
        { coin: sotien },
        {
          headers: { Authorization: userDetail.token },
        }
      )
      .then((res) => {
        setIsLoading(false);
        setOpenModal("B???n nh???n ???????c " + sotien + " Coin");
        let newDetail = userDetail;
        newDetail.coin = newDetail.coin + sotien;
        change(newDetail);
      })
      .catch(() => {
        setIsLoading(false);
        setOpenModal("???? x???y ra l???i");
      });
  }

  function sendRequest() {
    if (inputCode == "") setOpenModal("M?? giao d???ch tr???ng!");
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
            setOpenModal("???? ghi nh???n, y??u c???u s??? s???m ???????c x??? l??");
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
            T??? l???:
            <strong className="display-7 fw-bold fst-italic ">
              {" "}
              1000 VN?? = 1 COIN
            </strong>{" "}
          </h4>
          <div className="lead pt-3">
            <h4>H?????NG D???N:</h4>
            <p>- Ch???n m???nh gi?? c???n n???p</p>
            <p>- Ch???n ph????ng th???c thanh to??n</p>
            <p>- Nh???p m?? giao d???ch</p>
            <p>- Ghi ch?? (n???u c??)</p>
            <p>- Nh???n "G???i"</p>
            <hr />
            <h6>
              Th??ng tin n???p c???a b???n s??? ???????c ki???m tra v?? c???p nh???t (trong v??ng
              24h)
            </h6>
            <hr />
            <h6 className="text-center">Th??ng tin chuy???n kho???n</h6>
            <p className="text-uppercase text-center primary-color">
              {stk[phuongThuc] !== undefined ? (
                <div>
                  {phuongThuc}
                  <i class="fa fa-arrow-right me-1 ms-1" /> {stk[phuongThuc]}
                </div>
              ) : (
                <div>
                  {phuongThuc} <i class="fa fa-arrow-right me-1 ms-1" /> B???o
                  tr??...
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
                  Ph????ng th???c: <span className="text-muted">(B???t bu???c) </span>
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
                  <option value="bank">Chuy???n Kho???n</option>
                </select>
              </div>
              <div>
                {phuongThuc === "paypal" ? (
                  <div>
                    <div className="col-12 col-md-8 mx-auto mb-4">
                      <label for="menhgia" className="form-label">
                        M???nh gi?? <span className="text-muted">(B???t bu???c) </span>
                        &nbsp;
                      </label>
                      <select
                        name="type"
                        id="menhgia"
                        className="w-100 form-control"
                        onChange={(e) => setSoLuong(e.target.value)}
                        value={soLuong}
                      >
                        <option value="1">1$ = 24 Coin</option>
                        <option value="2">2$= 48 Coin</option>
                        <option value="5">5$= 120 Coin </option>
                        <option value="10">10$= 240 Coin</option>
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
                        M???nh gi?? <span className="text-muted">(B???t bu???c) </span>
                        &nbsp;
                      </label>
                      <select
                        name="type"
                        id="menhgia"
                        className="w-100 form-control"
                        onChange={(e) => setSoLuong(e.target.value)}
                        value={soLuong}
                      >
                        <option value="10">10k = 10 Coin</option>
                        <option value="20">20k= 20 Coin</option>
                        <option value="50">50k= 50 Coin </option>
                        <option value="100">100k= 100 Coin</option>
                      </select>{" "}
                    </div>
                    <div className="col-12 col-md-8 mx-auto mb-4">
                      <label for="magiaodich" className="form-label">
                        M?? giao d???ch{" "}
                        <span className="text-muted">(B???t bu???c) </span>&nbsp;
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
                        Ghi ch?? &nbsp;
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
                        G???i
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

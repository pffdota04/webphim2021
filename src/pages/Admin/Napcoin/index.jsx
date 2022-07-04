import axios from "axios";
import { useState } from "react";
import Loading from "../../../components/Loading";
import Comments from "../Comment";
import "./style.css";
import ModalAlert from "./../../../components/ModalAlart/ModalAlert";

const Napcoins = (props) => {
  const { dataNC, token, setFetchCoin } = props;
  const [dataNapCoin, setdataNapCoin] = useState(dataNC);
  const [openModal, setOpenModal] = useState(null);
  const [onLoading, setonLoading] = useState(false);

  function Refresh() {
    setFetchCoin(true);
  }

  function deleteRequest(rm_e) {
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_DEPLOYED2 + "admin/deletenap", {
        token: token,
        mgdtype: rm_e.mgd + rm_e.type,
      })
      .then((res) => {
        if (res.data === "okok") {
          setOpenModal("Đã xóa thành công!");
          setdataNapCoin([...dataNapCoin].filter((e) => e.mgd !== rm_e.mgd));
        } else setOpenModal(res.data);
        setonLoading(false);
      })
      .catch((e) => {
        setOpenModal(e);
        setonLoading(false);
      });
  }

  function deleteOld() {
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_DEPLOYED2 + "admin/deleteoldnap", {
        token: token,
      })
      .then((res) => {
        if (res.data === "okok") {
          setOpenModal("Đã xóa thành công!");
          setFetchCoin(true);
        } else setOpenModal(res.data);
        setonLoading(false);
      })
      .catch((e) => {
        setOpenModal(e);
        setonLoading(false);
      });
  }

  function xuly(xuly_e, action) {
    //setOpenModal(action);
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_DEPLOYED2 + "admin/xulynapkoin", {
        token: token,
        mgdtype: xuly_e.mgd + xuly_e.type,
        action: action,
      })
      .then((res) => {
        if (res.data == "okok1") setOpenModal("Đã cộng coin vào tài khoản này");
        else setOpenModal("Đã từ chối yêu cầu thanh toán!");
        dataNapCoin.some((e, i) => {
          if (xuly_e.mgd == e.mgd) {
            dataNapCoin[i].xuly = action ? "true" : "false";
          }
        });
        // }
        setonLoading(false);
      })
      .catch((e) => {
        setOpenModal(e);
        setonLoading(false);
      });
  }
  const formatTime = (timestamp) => {
    if (timestamp == undefined) return;
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  };

  const searching = (keySearch) => {
    if (keySearch == undefined || keySearch == "") {
      setdataNapCoin([...dataNC]);
      return;
    }
    let a = Object.values([...dataNC]).filter((item) => {
      return item.mgd.toLowerCase().includes(keySearch.toLowerCase());
    });
    setdataNapCoin(a);
  };

  return (
    <div className="container my-2 pb-3">
      {onLoading && <Loading />}
      {openModal && (
        <ModalAlert
          close={() => setOpenModal(null)}
          content={openModal}
        />
      )}
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic text-uppercase">Request Payment Management</strong>{" "}
            <div className="dashboxs_coin">
              {/* <button
                className="dashbox__mores_coin"
                onClick={() => deleteOld()}
              >
                Delete Old
              </button> */}
              <button className="dashbox__mores_coin" onClick={() => Refresh()}>
                Refresh Data
              </button>
            </div>
          </h4>
        </div>

        <div className="col-12  mt-2">
          <label htmlFor="timkiem">Tìm kiếm: </label>
          <input
            id="timkiem"
            className="ms-1 ps-2"
            onChange={(e) => searching(e.target.value)}
            placeholder="Mã giao dịch"
          />
          {
            dataNapCoin != undefined && (
              <div className="table-responsive-xl table-nap mt-3">
                <table class="table table-hover table-striped table-dark">
                  <thead>
                    <tr className="text-center">
                      <th>CreatDay</th>
                      <th>User</th>
                      <th>Coin</th>
                      <th>Payment</th>
                      <th>Trading Code</th>
                      <th>Handle</th>
                      <th>Note</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dataNapCoin.map((e, i) => (
                      <tr className="text-center">
                        <td>{formatTime(e.createDay)}</td>
                        <td>{e.user}</td>
                        <td>{e.coin}</td>
                        <td>{e.type}</td>
                        <td>{e.mgd}</td>
                        <td>
                          {e.xuly == "none" ? (
                            <i class="fa fa-ellipsis-h " aria-hidden="true"></i>
                          ) : e.xuly == "false" ? (
                            <i
                              class="fa fa-times text-danger bg-light"
                              aria-hidden="true"
                            ></i>
                          ) : (
                            <i
                              class="fa fa-check text-success bg-light"
                              aria-hidden="true"
                            ></i>
                          )}
                        </td>
                        <td>{e.note}</td>
                        <td>
                          {e.xuly != "none" ? (
                            <button
                              className="btn btn-sm ms-1 main__table_cmt-btn--delete"
                              onClick={() => {
                                deleteRequest(e);
                              }}
                            >
                              Delete
                            </button>
                          ) : (
                            <div>
                              <button
                                className="btn btn-sm btn-danger ms-1"
                                onClick={() => {
                                  xuly(e, false);
                                }}
                              >
                                Refuse
                              </button>
                              <button
                                className="btn btn-sm btn-success ms-1"
                                onClick={() => {
                                  xuly(e, true);
                                }}
                              >
                                Agree
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
            // <ReactTable data={dataF} columns={columns} defaultPageSize={5} />
          }
        </div>
      </div>
      <Comments token={token}/>
    </div>
  );
};
export default Napcoins;

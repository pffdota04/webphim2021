import axios from "axios";
import { data } from "jquery";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../../components/Loading";
import "./style.css";

const Vouchers = (props) => {
  const { dataV, token, setFetchVoucher } = props;
  const [dataVoucher, setdataVoucher] = useState(dataV);

  const [onLoading, setonLoading] = useState(false);

  const [choseV, setChoseV] = useState(0);
  const [code, setCode] = useState("");
  const [point, setPoint] = useState(1);

  function Refresh() {
    setonLoading(true);
    setFetchVoucher(true);
  }

  const addNew = () => {
    let isBreak = false;
    dataVoucher.some((e) => {
      if (e.code == code) {
        alert("code exit!");
        isBreak = true;
        return true;
      }
    });

    if (!isBreak) {
      setonLoading(true);
      axios
        .post(process.env.REACT_APP_API_DEPLOYED2 + "admin/addvoucher", {
          token: token,
          code: code,
          point: point,
        })
        .then((res) => {
          alert(res.data);
          if (res.data === "okok") {
            alert("Đã thêm voucher1");
            dataVoucher.push({ code: code, point: point });
          }
          setonLoading(false);
        })
        .catch((e) => {
          alert(e);
          setonLoading(false);
        });
    }
  };

  const removeVoucher = (rmCode) => {
    let isBreak = false;
    dataVoucher.some((e) => {
      if (e.code == rmCode) {
        isBreak = true;
        return true;
      }
    });
    if (isBreak) {
      setonLoading(true);
      axios
        .post(process.env.REACT_APP_API_DEPLOYED2 + "admin/deletevoucher", {
          token: token,
          code: rmCode,
        })
        .then((res) => {
          alert(res.data);
          if (res.data === "okok") {
            alert("Đã xóa voucher");
            dataVoucher.some((e, i) => {
              if (e.code == rmCode) dataVoucher.splice(i, 1);
            });
          }
          setonLoading(false);
        })
        .catch((e) => {
          alert(e);
          setonLoading(false);
        });
    } else alert("something wrong!");
  };

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
      setdataVoucher([...dataV]);
      return;
    }
    let a = Object.values([...dataV]).filter((item) => {
      return item.code.toLowerCase().includes(keySearch.toLowerCase());
    });
    // console.log(a);
    setdataVoucher(a);
  };

  return (
    <div className="container my-2 mb-3">
      {onLoading && <Loading />}
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic "> Vouchers</strong>{" "}
            <div className="dashboxs_voucher">
              <button
                className="dashbox__mores_voucher"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Voucher
              </button>
              <button
                className="dashbox__mores_voucher"
                onClick={() => Refresh()}
              >
                Refresh Data
              </button>
            </div>
          </h4>
          <div className="col-12 col-xl-12 mt-4">
            {/* Modal Add New Film*/}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content bg-dark">
                  <div className="modal-header">
                    <h5 className="modal-title fw-bold" id="exampleModalLabel">
                      ADD NEW VOUCHER
                    </h5>
                    <button
                      type="button"
                      className="btn_close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i className="fa fa-close" />
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-4 mt-2">
                        <label htmlFor="lastName" className="form-label">
                          Coin
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="lastName"
                          onChange={(e) => setPoint(parseInt(e.target.value))}
                        />
                      </div>
                      <div className="col-8 mt-2">
                        <label className="form-label">Voucher Code</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn-primarys"
                      onClick={() => addNew()}
                    >
                      Save changes
                    </button>
                    <button
                      type="button"
                      className="btn-secondarys"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-2">
          <label htmlFor="timkiem">Tìm kiếm: </label>
          <input
            id="timkiem"
            className="ms-1"
            onChange={(e) => searching(e.target.value)}
            placeholder="code voucher"
          />
          {dataVoucher != undefined && (
            <div className="table-responsive-xl table-voucher mt-3">
              <table class="table table-hover table-striped table-dark">
                <thead>
                  <tr className="text-center">
                    <th>STT</th>
                    <th>Code</th>
                    <th>Point</th>
                    <th>Used By</th>
                    <th>Used Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataVoucher.map((e, i) => (
                    <tr className="text-center">
                      <td>{i}</td>
                      <td>{e.code}</td>
                      <td>{e.point}</td>
                      <td>{e.usedBy}</td>
                      <td>{formatTime(e.usedDate)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-link ms-1 main__table_voucher-btn--delete"
                          onClick={() => {
                            removeVoucher(e.code);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Vouchers;

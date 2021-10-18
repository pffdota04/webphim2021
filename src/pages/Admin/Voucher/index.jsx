import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const Vouchers = (props) => {
  const { dataV, token, setFetchVoucher } = props;
  const [choseV, setChoseV] = useState(0);
  const [currentVoucher, setCurrentVoucher] = useState(dataV[choseV]); // mặc định là voucher  đầu tiên

  function Refresh() {
    setFetchVoucher(true);
  }

  function updateVoucher() {
    // LObject là một object chứa thông tin User sau khi cập nhật

    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/updatevoucher", {
        token: token,
        LObject: currentVoucher,
      })
      .then((res) => {
        alert(res.data);
        // bấm nút refresh để update data sau khi cập nhâtk
      })
      .catch((e) => alert(e));
  }

  return (
    <div className="container my-2 mb-3">
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic "> Vouchers</strong>{" "}
            <div className="dashboxs_voucher">
            <button className="dashbox__mores_voucher" onClick={() => Refresh()}>Refresh Data</button>
            <button className="dashbox__mores_voucher" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Voucher</button>
            </div>
          </h4>
          <div className="col-12 col-xl-12 mt-4">
          {/* Modal Add New Film*/}
          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold" id="exampleModalLabel">ADD NEW VOUCHER</h5>
                  <button type="button" className="btn_close" data-bs-dismiss="modal" aria-label="Close">
                    <i className="fa fa-close" />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-sm-2 mt-2">
                      <label htmlFor="firstName" className="form-label">
                        ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        // placeholder
                        // value={currentPhim.id}
                      />
                    </div>
                    <div className="col-sm-2 mt-2">
                      <label htmlFor="lastName" className="form-label">
                        Coin
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        // placeholder
                        // value={currentPhim.price}
                        // required
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     price: parseInt(e.target.value),
                        //   }))
                        // }
                      />
                    </div>
                    <div className="col-sm-2 mt-2">
                      <label className="form-label">Point</label>
                      <input
                        type="text"
                        className="form-control"
                        // value={currentPhim.year}
                        // required
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     year: e.target.value,
                        //   }))
                        // }
                      />
                    </div>
                    <div className="col-sm-3 mt-2">
                      <label className="form-label">Used By</label>
                      <input
                        type="text"
                        className="form-control"
                        // value={currentPhim.length}
                        // required
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     length: e.target.value,
                        //   }))
                        // }
                      />
                    </div>
                    <div className="col-sm-3 mt-2">
                      <label className="form-label">Used Date</label>
                      <input
                        type="text"
                        className="form-control"
                        // value={currentPhim.director}
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     director: e.target.value,
                        //   }))
                        // }
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-primarys">Save changes</button>
                  <button type="button" className="btn-secondarys" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        
        <div className="col-12 col-xl-8 mt-2">
          {
            dataV != undefined && (
              <div className="main__table_voucher-wrap">
                <table className="main__table_voucher">
                  <thead>
                  <tr>
                    <th>STT
                    </th>
                    <th>Code
                    </th>
                    <th>Point
                    </th>
                    <th>Used By
                    </th>
                    <th>Used Date
                    </th>
                    <th>Action</th>
                  </tr>
                  </thead>

                  <tbody>
                  {dataV.map((e, i) => (
                    <tr>
                      <td><div class="main__table_voucher-text">{i}</div></td>
                      <td><div class="main__table_voucher-text">{e.code}</div></td>
                      <td><div class="main__table_voucher-text">{e.point}</div></td>
                      <td><div class="main__table_voucher-text">{e.usedBy}</div></td>
                      <td><div class="main__table_voucher-text">{e.usedDate}</div></td>
                      <td><div class="main__table_voucher-text">
                        <button
                          className="btn btn-sm btn-link ms-1 main__table_voucher-btn--delete"
                          onClick={() => {
                            
                          }}
                        >
                          Delete
                        </button>
                      </div>
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
    </div>
  );
};
export default Vouchers;
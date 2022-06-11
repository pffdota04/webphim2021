import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const Comments = (props) => {
  const { token } = props;
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [DataFetch, setDâtFetch] = useState(undefined);

  // const [choseComment, setChoseComment] = useState(0);
  // const [currentStk, setCurrentStk] = useState(dataComment[choseComment]); // mặc định là voucher  đầu tiên

  function Refresh() {
    axios
      .post(process.env.REACT_APP_API_DEPLOYED2 + "admin/allstk", {
        token: token,
      })
      .then((res) => {
        setDâtFetch(res.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    Refresh();
  }, []);

  const edit = () => {
    axios
      .post(process.env.REACT_APP_API_DEPLOYED2 + "admin/update/stk", {
        token: token,
        stk: { [name]: number },
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((e) => alert(e));
  };

  return (
    // <div className="container my-2 mb-3">
    <div className="row">
      <div className="col-12 mx-auto ps-5 pe-5">
        <h4 className="text-center">
          <strong className="display-6 fw-bold fst-italic ">
            {" "}
            Thông tin tài khoản
          </strong>{" "}
          <div className="dashboxs_cmt">
            <button className="dashbox__mores_cmt" onClick={() => Refresh()}>
              Refresh Data
            </button>
          </div>
        </h4>
      </div>

      <div className="col-12 col-xl-12 mt-2">
        {
          DataFetch != undefined && (
            <div className="table-responsive-xl  mt-3">
              <table class="table table-hover table-striped table-dark">
                <thead>
                  <tr className>
                    <th>STT</th>
                    <th>Tên phương thức</th>
                    <th>Thông tin chuyển khoản</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {Object.keys(DataFetch).map((e, i) => (
                    <tr>
                      <td>{i}</td>
                      <td>{e}</td>
                      <td>{DataFetch[e]}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-link ms-1 main__table_cmt-btn--delete"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            setName(e);
                            setNumber(DataFetch[e]);
                          }}
                        >
                          Edit
                        </button>
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
                Edit
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
                    Tên phương thức
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-8 mt-2">
                  <label className="form-label">Thông tin chuyển khoản</label>
                  <input
                    type="text"
                    className="form-control"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-primarys"
                onClick={() => edit()}
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
    // </div>
  );
};
export default Comments;

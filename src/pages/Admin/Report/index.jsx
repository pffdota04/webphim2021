import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const Reports = (props) => {
  const { dataReport, token, setFetchReport } = props;
  const [onLoading, setonLoading] = useState(false);

  function Refresh() {
    setFetchReport(true);
  }
  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  };

  const deleteReport = (key) => {
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/delet111ereport", {
        token: token,
        key: key,
      })
      .then((res) => {
        if (res.data === "okok") {
          alert("Cập nhật thành công");
          // setFetchReport(true)
        }
        setonLoading(false);
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  };

  return (
    <div className="container my-2 mb-3">
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">Report</strong>{" "}
            <div className="dashboxs_rp">
              <button className="dashbox__mores_rp" onClick={() => Refresh()}>
                Refresh Data
              </button>
            </div>
          </h4>
        </div>

        <div className="col-12 col-xl-12 mt-2">
          {dataReport != undefined && (
            <div className="table-responsive-xl table-report mt-3">
              <table class="table table-hover table-striped table-dark">
                <thead>
                  <tr className="text-center">
                    <th>STT</th>
                    <th>User</th>
                    <th>Content</th>
                    <th>Timestamp</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(dataReport).map((e, i) => (
                    <tr className="text-center">
                      <td>{i}</td>
                      <td>{e.user}</td>
                      <td>{e.content}</td>
                      <td>{formatTime(e.timestamp)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-link ms-1 main__table_rp-btn--delete"
                          onClick={() => {
                            deleteReport(Object.keys(dataReport)[i]);
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
export default Reports;

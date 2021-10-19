import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const Reports = (props) => {
  const { dataReport, token, setFetchReport } = props;
  const [choseReport, setChoseReport] = useState(0);
  const [currentReport, setCurrentReport] = useState(dataReport[choseReport]); // mặc định là voucher  đầu tiên

  function Refresh() {
    setFetchReport(true);
  }

  return (
    <div className="container my-2 mb-3">
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">Report</strong>{" "}
            <div className="dashboxs_rp">
            <button className="dashbox__mores_rp" onClick={() => Refresh()}>Refresh Data</button>
            </div>
          </h4>
        </div>
        
        <div className="col-12 col-xl-12 mt-2">
          {
            dataReport != undefined && (
              <div className="main__table_rp-wrap">
                <table className="main__table_rp">
                  <thead>
                  <tr>
                    <th>STT
                    </th>
                    <th>User ID
                    </th>
                    <th>Username
                    </th>
                    <th>Content
                    </th>
                    <th>Timestamp
                    </th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  
                  <tbody>
                  {dataReport.map((e, i) => (
                    <tr>
                      <td><div class="main__table_rp-text">{i}</div></td>
                      <td><div class="main__table_rp-text">{e.uid}</div></td>
                      <td><div class="main__table_rp-text">{e.username}</div></td>
                      <td><div class="main__table_rp-text">{e.content}</div></td>
                      <td><div class="main__table_rp-text">{e.timestamp}</div></td>
                      <td><div class="main__table_rp-text">
                        <button
                          className="btn btn-sm btn-link ms-1 main__table_rp-btn--delete"
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
          }
        </div>
      </div>
    </div>
  );
};
export default Reports;
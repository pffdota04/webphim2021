import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const Napcoins = (props) => {
  const { dataNC, token, setFetchCoin } = props;
  const [choseNC, setChoseNC] = useState(0);
  const [currentCoin, setCurrentCoin] = useState(dataNC[choseNC]); // mặc định là voucher  đầu tiên

  function Refresh() {
    setFetchCoin(true);
  }

  function updateCoin() {
    // LObject là một object chứa thông tin User sau khi cập nhật

    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/updatecoin", {
        token: token,
        LObject: currentCoin,
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
            <strong className="display-6 fw-bold fst-italic "> Nạp Coin</strong>{" "}
            <div className="dashboxs_coin">
            <button className="dashbox__mores_coin" onClick={() => Refresh()}>Refresh Data</button>
            </div>
          </h4>
        </div>
        
        <div className="col-12 col-xl-9 mt-2">
          {
            dataNC != undefined && (
              <div className="main__table_coin-wrap">
                <table className="main__table_coin">
                  <thead>
                  <tr>
                    <th>STT
                    </th>
                    <th>User
                    </th>
                    <th>Coin
                    </th>
                    <th>Payment
                    </th>
                    <th>Trading Code
                    </th>
                    <th>Handle
                    </th>
                    <th>Note
                    </th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  
                  <tbody>
                  {dataNC.map((e, i) => (
                    <tr>
                      <td><div class="main__table_coin-text">{i}</div></td>
                      <td><div class="main__table_coin-text">{e.user}</div></td>
                      <td><div class="main__table_coin-text">{e.coin}</div></td>
                      <td><div class="main__table_coin-text">{e.type}</div></td>
                      <td><div class="main__table_coin-text">{e.mgd}</div></td>
                      <td><div class="main__table_coin-text">{e.xuly}</div></td>
                      <td><div class="main__table_coin-text">{e.note}</div></td>
                      <td><div class="main__table_coin-text">
                        <button
                          className="btn btn-sm btn-link ms-1 main__table_coin-btn--delete"
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
export default Napcoins;
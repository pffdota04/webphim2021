import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const Comments = (props) => {
  const { dataComment, token, setFetchComment } = props;
  const [choseComment, setChoseComment] = useState(0);
  const [currentComment, setCurrentComment] = useState(dataComment[choseComment]); // mặc định là voucher  đầu tiên

  function Refresh() {
    setFetchComment(true);
  }

  function updateComment() {
    // LObject là một object chứa thông tin User sau khi cập nhật

    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/updatecomment", {
        token: token,
        LObject: currentComment,
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
            <strong className="display-6 fw-bold fst-italic "> Comment</strong>{" "}
            <div className="dashboxs_cmt">
            <button className="dashbox__mores_cmt" onClick={() => Refresh()}>Refresh Data</button>
            </div>
          </h4>
        </div>
        
        <div className="col-12 col-xl-12 mt-2">
          {
            dataComment != undefined && (
              <div className="main__table_cmt-wrap">
                <table className="main__table_cmt">
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
                  {dataComment.map((e, i) => (
                    <tr>
                      <td><div class="main__table_cmt-text">{i}</div></td>
                      <td><div class="main__table_cmt-text">{e.uid}</div></td>
                      <td><div class="main__table_cmt-text">{e.username}</div></td>
                      <td><div class="main__table_cmt-text">{e.content}</div></td>
                      <td><div class="main__table_cmt-text">{e.timestamp}</div></td>
                      <td><div class="main__table_cmt-text">
                        <button
                          className="btn btn-sm btn-link ms-1 main__table_cmt-btn--delete"
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
export default Comments;
import axios from "axios";
import { useState } from "react";
import "./style.css"

const User = (props) => {
  const { dataU, token, setFetchUser } = props;
  const [choseU, setChoseU] = useState(0);
  const [currentUser, setCurrentUser] = useState(dataU[choseU]); // giá trị mặc định là user đầu tiên, update gì thì lưu vào đây

  function Refresh() {
    setFetchUser(true);
  }

  const formUser = (currentUser, setNew) => {
    return (
      <div className="row g-3" id="editFilm">
        <div className="col-sm-6">
          <label htmlFor="code" className="form-label">
            Code
          </label>
          <input
            type="text"
            className="form-control"
            id="code"
            placeholder
            value={currentUser.code}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                code: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="coin" className="form-label">
            Coin
          </label>
          <input
            type="text"
            className="form-control"
            id="coin"
            placeholder
            value={currentUser.coin}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                coin: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="usedCode" className="form-label">Usedcode</label>
          <input
            type="checkbox"
            class="form-check-input ms-2"
            id="isvip"
            checked={currentUser.usedCode == "true" || currentUser.usedCode == true}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                usedCode: !currentUser.usedCode,
              }))
            }
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="createDay" className="form-label">
            CreateDay
          </label>
          <input
            type="text"
            className="form-control"
            id="createDay"
            value={currentUser.createDay}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                createDay: e.target.value,
              }))
            }
            disabled
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="email" className="form-label">
          Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={currentUser.email}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            required
            disabled
          />
        </div>
      </div>
    );
  };

  // update user thì gọi cái này
  function updateUser() {
    // UObject là một object chứa thông tin User sau khi cập nhật. example:
    //
    // UObject =
    //  {
    //     "code": "5ez522b",
    //     "coin": 456,
    //     "createDay": 1634180235794,
    //     "email": "maivanluong0458@gmail.com",
    //     "usedCode": false
    //  }

    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/updateuser", {
        token: token,
        UObject: currentUser,
      })
      .then((res) => {
        alert(res.data);
        // bấm nút refresh để update all data user sau khi cập nhât thnah cong
      })
      .catch((e) => alert(e));
  }

  return (
    <div className="my-2 mb-3">
      <div className="row">
        {/* {console.log(dataU)} */}
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">User</strong>
            <div className="dashboxs_user">
            <button className="dashbox__mores_user" onClick={() => Refresh()}>Refresh Data</button>
            </div>
          </h4>
          {/* <div className="col-8">
            {dataU.map((e, i) => {
              return (
                <div>
                  {e.code}: {e.email}
                </div>
              );
            })}
          </div>
          <div className="col-6"></div> */}
        </div>
        <div className="col-12 col-xl-3 mt-2">
          {formUser(currentUser, setCurrentUser)}
          <hr className="my-4" />
          <button
            className="w-100 btn btn-primary btn-lg mt-2"
            onClick={() => updateUser()}
          >
            UPDATE
          </button>
        </div>
        <div className="col-12 col-xl-9 mt-2">
          {
            dataU != undefined && (
              <div className="main__table_user-wrap">
                <table className="main__table_user">
                  <thead>
                  <tr>
                    <th>
                      STT
                    </th>
                    <th>
                      Code
                    </th>
                    <th>
                      Coin
                    </th>
                    <th>
                      CreateDay
                    </th>
                    <th>
                      Email
                    </th>
                    <th>
                      UsedCode
                    </th>
                    <th>
                      Action
                    </th>
                  </tr>
                  </thead>

                  <tbody>
                  {dataU.map((e, i) => (
                    <tr>
                      <td><div class="main__table_user-text">{i}</div></td>
                      <td><div class="main__table_user-text">{e.code}</div></td>
                      <td><div class="main__table_user-text">{e.coin}</div></td>
                      <td><div class="main__table_user-text">{e.createDay}</div></td>
                      <td><div class="main__table_user-text">
                        <input value={e.email} readOnly /></div></td>
                      <td><div class="main__table_user-text">{e.usedCode}</div></td>
                      <td><div class="main__table_user-text"><button
                          className="btn btn-sm btn-link main__table-btn--edit"
                          onClick={() => {
                            setChoseU(e.code);
                            setCurrentUser(dataU[i]);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-link ms-1 main__table-btn--delete"
                          onClick={() => {}}
                        >
                          Delete
                        </button></div>
                        
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
export default User;

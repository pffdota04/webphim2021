import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

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

        <div className="col-md-8">
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
        <div className="col-md-4">
          <label htmlFor="usedCode" className="form-label">
            Usedcode
          </label>
          <input
            type="text"
            className="form-control"
            id="usedCode"
            value={currentUser.usedCode}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                usedCode: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-12">
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

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className="container my-2 mb-3">
      <div className="row">
        {/* {console.log(dataU)} */}
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">User</strong>
            <button onClick={() => Refresh()}>Test refresh data user</button>
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
        <div className="col-12 col-xl-4">
          {currentUser!=undefined && formUser(currentUser, setCurrentUser)}
          <button
            className="w-100 btn btn-primary btn-lg mt-2"
            onClick={() => updateUser()}
          >
            Cập nhật
          </button>
          <hr className="my-4" />
        </div>
        <div className="col-12 col-xl-8">
          {
            dataU != undefined && (
              <div className="table-test">
                <table className="table-phim ">
                  <tr>
                    <th>
                      <div>STT</div>
                    </th>
                    <th>
                      <div>Code</div>
                    </th>
                    <th>
                      <div>Coin</div>
                    </th>
                    <th>
                      <div>CreateDay</div>
                    </th>
                    <th>
                      <div>Email</div>
                    </th>
                    <th>
                      <div>UsedCode</div>
                    </th>
                    <th>
                      <div>Action</div>
                    </th>
                  </tr>

                  {dataU.map((e, i) => (
                    <tr>
                      <td>{i}</td>
                      <td>{e.code}</td>
                      <td>{e.coin}</td>
                      <td>{e.createDay}</td>
                      <td>{e.email}</td>
                      <td>{e.usedCode}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setChoseU(e.code);
                            setCurrentUser(dataU[i]);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
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

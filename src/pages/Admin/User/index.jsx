import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import "./style.css";

const User = (props) => {
  const { dataU, token, setFetchUser } = props;
  const [dataUser, setUser] = useState(dataU);
  const [choseU, setChoseU] = useState(0);
  const [currentUser, setCurrentUser] = useState(dataU[choseU]); // giá trị mặc định là user đầu tiên, update gì thì lưu vào đây
  const [onLoading, setonLoading] = useState(false);

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
            type="number"
            className="form-control"
            id="coin"
            placeholder
            value={currentUser.coin}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                coin: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="usedCode" className="form-label">
            Usedcode
          </label>
          <input
            type="checkbox"
            class="form-check-input ms-2"
            id="isvip"
            checked={
              currentUser.usedCode == "true" || currentUser.usedCode == true
            }
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
            value={formatTime(currentUser.createDay)}
            required
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
  function updateUser() {
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/update/user", {
        token: token,
        UObject: currentUser,
      })
      .then((res) => {
        alert(res.data);
        if (res.data === "okok") {
          alert("Cập nhật thành công");
          let b = dataUser;
          b.map((e, i) => {
            if (e.email === currentUser.email) dataUser[i] = currentUser;
          });
        }
        setonLoading(false);
      })
      .catch((e) => {
        alert(e);
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

  function disabledUser(email) {
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/banuser", {
        token: token,
        email: email,
      })
      .then((res) => {
        alert(res.data);
        if (res.data === "okok") {
          alert("Đã ban User");
          let b = dataUser;
          b.map((e, i) => {
            if (e.email === email) dataUser[i].disabled = true;
          });
        }
        setonLoading(false);
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  function enableUser(email) {
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/unbanuser", {
        token: token,
        email: email,
      })
      .then((res) => {
        alert(res.data);
        if (res.data === "okok") {
          alert("Đã mở khóa user");
          let b = dataUser;
          b.map((e, i) => {
            if (e.email === email) dataUser[i].disabled = null;
          });
        }
        setonLoading(false);
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  const searching = (keySearch) => {
    if (keySearch == undefined || keySearch == "") {
      setUser([...dataU]);
      return;
    }
    let a = Object.values([...dataU]).filter((item) => {
      // console.log(item);
      return (
        item.email.toLowerCase().includes(keySearch.toLowerCase()) ||
        item.code.toLowerCase().includes(keySearch.toLowerCase())
      );
    });
    setUser(a);
  };

  return (
    <div className="my-2 mb-3">
      {onLoading && <Loading />}
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">User</strong>
            <div className="dashboxs_user">
              <button className="dashbox__mores_user" onClick={() => Refresh()}>
                Refresh Data
              </button>
            </div>
          </h4>
        </div>

        <div className="col-12 col-lg-8 col-xl-9 ">
          <label htmlFor="timkiem">Tìm kiếm: </label>
          <input
            id="timkiem"
            className="ms-1"
            onChange={(e) => searching(e.target.value)}
            placeholder="email or code  "
          />
          {dataUser != undefined && (
            <div className="mt-2 table-responsive-xl table-user">
              <table class="table table-hover table-striped table-dark">
                <thead>
                  <tr className="text-center">
                    <th>STT</th>
                    <th>Code</th>
                    <th>Coin</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataUser.map((e, i) => (
                    <tr className="text-center">
                      <th scope="row">{i}</th>
                      <td>{e.code}</td>
                      <td>{e.coin}</td>
                      <td>
                        <input
                          value={e.email}
                          readOnly
                          className={
                            e.disabled ? "text-decoration-line-through" : ""
                          }
                        />
                      </td>

                      <td>
                        <button
                          className="btn btn-sm btn-primary ps-3 pe-3"
                          onClick={() => {
                            setChoseU(e.code);
                            setCurrentUser(dataUser[i]);
                            window.scrollTo({
                              top:
                                document
                                  .getElementById("edituser")
                                  .getBoundingClientRect().top +
                                window.pageYOffset +
                                -62,
                              behavior: "smooth",
                            });
                          }}
                        >
                          Edit
                        </button>
                        {e.disabled ? (
                          <button
                            className="ms-2 btn btn-sm btn-success"
                            onClick={() => {
                              enableUser(e.email);
                            }}
                          >
                            Enable
                          </button>
                        ) : (
                          <button
                            className="ms-2 btn btn-sm ms-1 btn-danger"
                            onClick={() => {
                              disabledUser(e.email);
                            }}
                          >
                            Disable
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="col-12 col-lg-4 col-xl-3 mt-2">
          <h4 className="text-center">
            <strong id="edituser" className="display-6 fw-bold fst-italic ">
              Edit User
            </strong>
          </h4>
          <hr className="my-4" />
          {currentUser !== undefined && formUser(currentUser, setCurrentUser)}
          <hr className="my-4" />
          <button
            className="w-100 btn btn-primary btn-lg mt-2"
            onClick={() => updateUser()}
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};
export default User;

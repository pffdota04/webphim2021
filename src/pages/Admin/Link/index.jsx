import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const Links = (props) => {
  const { dataL, token, setFetchLink } = props;
  const [choseL, setChoseL] = useState(0);
  const [currentLink, setCurrentLink] = useState(dataL[choseL]); // mặc định là link  đầu tiên

  function Refresh() {
    setFetchLink(true);
  }

  const formLink = (currentLink, setNew) => {
    return (
      <div className="row g-3" id="editFilm">
        <div className="col-sm-4">
          <label htmlFor="firstName" className="form-label">
            Id link
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder
            value={currentLink.id}
            disabled
          />
        </div>
        <div className="col-sm-4">
          <label htmlFor="firstName" className="form-label">
            Id phim
          </label>
          <input
            type="number"
            className="form-control"
            id="firstName"
            placeholder
            value={currentLink.film_id}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                film_id: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="col-sm-4">
          <label htmlFor="lastName" className="form-label">
            Chap
          </label>
          <input
            type="number"
            className="form-control"
            id="lastName"
            placeholder
            value={currentLink.chap}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                chap: parseInt(e.target.value),
              }))
            }
          />
        </div>

        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Link
          </label>
          <input
            type="email"
            className="form-control"
            id="text"
            value={currentLink.link}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                link: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">
            Server
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder
            value={currentLink.server}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                server: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">
            Vip
          </label>
          <input
            type="checkbox"
            class="form-check-input"
            id="isvip"
            checked={currentLink.vip == "true" || currentLink.vip == true}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                vip: !currentLink.vip,
              }))
            }
          />
        </div>
      </div>
    );
  };

  function updateLink() {
    // LObject là một object chứa thông tin User sau khi cập nhật

    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/updatelink", {
        token: token,
        LObject: currentLink,
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
            <strong className="display-6 fw-bold fst-italic "> Links</strong>{" "}
            <button onClick={() => Refresh()}>refresh data link</button>
          </h4>
          {/* <div className="col-6">
            {dataL.map((e, i) => {
              return (
                <div>
                  {e.film_id}: <input value={e.link} readOnly />
                </div>
              );
            })}
          </div> */}
        </div>
        <div className="col-12 col-xl-4">
          {currentLink != undefined && formLink(currentLink, setCurrentLink)}
          <button
            className="w-100 btn btn-primary btn-lg mt-2"
            onClick={() => updateLink()}
          >
            Cập nhật
          </button>
          <hr className="my-4" />
        </div>
        <div className="col-12 col-xl-8">
          {
            dataL != undefined && (
              <div className="table-test">
                <table className="table-phim ">
                  <tr>
                    <th>
                      <div>STT</div>
                    </th>
                    <th>
                      <div>ID Link</div>
                    </th>
                    <th>
                      <div>ID Film</div>
                    </th>
                    <th className="max-5x">
                      <div>CHAP</div>
                    </th>
                    <th>
                      <div>LINK</div>
                    </th>
                    <th>
                      <div>SERVER</div>
                    </th>
                    <th>
                      <div>VIP</div>
                    </th>
                    <th>
                      <div>Action</div>
                    </th>
                  </tr>

                  {dataL.map((e, i) => (
                    <tr>
                      <td>{i}</td>
                      <td>{e.id}</td>
                      <td>{e.film_id}</td>
                      <td>{e.chap}</td>
                      <td>
                        <input value={e.link} readOnly />
                      </td>
                      <td>{e.server}</td>
                      <td>{e.vip}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setChoseL(e.id);
                            setCurrentLink(dataL[e.id]);
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
export default Links;

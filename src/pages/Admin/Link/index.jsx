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
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">
            ID Link

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
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">
            ID Film

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
        <div className="col-sm-6">

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
            Vip
          </label>
          <input
            type="checkbox"
            class="form-check-input ms-2"

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
    <div className="my-2 mb-3">
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic "> Links</strong>{" "}
            <div className="dashboxs_link">
            <button className="dashbox__mores_link" onClick={() => Refresh()}>Refresh Data</button>
            </div>
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
        <div className="col-12 col-xl-3 mt-2">
          {currentLink != undefined && formLink(currentLink, setCurrentLink)}
          <hr className="my-4" />

          <button
            className="w-100 btn btn-primary btn-lg mt-2"
            onClick={() => updateLink()}
          >
            UPDATE
          </button>
        </div>
        <div className="col-12 col-xl-9 mt-2">
          {
            dataL != undefined && (
              <div className="main__table_link-wrap">
                <table className="main__table_link">
                  <thead>
                  <tr>
                    <th>STT
                    </th>
                    <th>ID Link
                    </th>
                    <th>ID Film
                    </th>
                    <th>CHAP
                    </th>
                    <th>LINK
                    </th>
                    <th>SERVER
                    </th>
                    <th>VIP
                    </th>
                    <th>Action
                    </th>
                  </tr>
                  </thead>
                  
                  <tbody>
                  {dataL.map((e, i) => (
                    <tr>
                      <td><div class="main__table_link-text">{i}</div></td>
                      <td><div class="main__table_link-text">{e.id}</div></td>
                      <td><div class="main__table_link-text">{e.film_id}</div></td>
                      <td><div class="main__table_link-text">{e.chap}</div></td>
                      <td>
                        <div class="main__table_link-text"><input value={e.link} readOnly /></div>
                        {/* <input value={e.link} readOnly /> */}
                      </td>
                      <td><div class="main__table_link-text">{e.server}</div></td>
                      <td><div class="main__table_link-text">{e.vip}</div></td>
                      <td><div class="main__table_link-text">
                      <button
                          className="btn btn-sm btn-link main__table_link-btn--edit"
                          onClick={() => {
                            //setChoseL(e.id);
                            setCurrentLink(dataL[i]);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-link ms-1 main__table_link-btn--delete"
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
export default Links;

import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../../components/Loading";
import "./style.css";

const Links = (props) => {
  const { dataL, token, setFetchLink } = props;
  const [choseL, setChoseL] = useState(0);
  const [dataL2, setdataL] = useState(dataL);

  const [onLoading, setonLoading] = useState(false);
  const [currentLink, setCurrentLink] = useState(dataL[choseL]); // mặc định là link  đầu tiên
  const [adddataLink, setAddLink] = useState({}); // mặc định là link  đầu tiên

  function Refresh() {
    setFetchLink(true);
  }

  function updateLink() {
    // LObject là một object chứa thông tin User sau khi cập nhật
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_DEPLOYED2 + "admin/update/link", {
        token: token,
        LObject: currentLink,
      })
      .then((res) => {
        if (res.data === "okok") {
          alert("Cập nhật thành công");
          dataL.map((e, i) => {
            if (e.id === currentLink.id) {
              let b = dataL;
              b[i] = currentLink;
              setdataL(b);
            }
          });
        }
        setonLoading(false);
        // bấm nút refresh để update data sau khi cập nhâtk
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  function addLink() {
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_DEPLOYED2 + "admin/addlink", {
        token: token,
        LObject: adddataLink,
      })
      .then((res) => {
        if (res.data === "okok") {
          alert("Thêm thành công");
          adddataLink.id = [...dataL][[...dataL].length - 1].id + 1;
          setdataL([...dataL, adddataLink]);
          setAddLink({});
        }
        setonLoading(false);
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  function removeLink(lid) {
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_DEPLOYED2 + "admin/deletelink", {
        token: token,
        lid: lid,
      })
      .then((res) => {
        alert(res.data);
        if (res.data === "okok") {
          let a = [...dataL];
          a.map((e, i) => {
            if (e.id == lid) a.splice(i, 1);
          });
          setdataL(a);
        }
        // if (res.data === "okok") {
        // adddataLink.id = [...dataL][[...dataL].length - 1].id + 1;
        // setdataL([...dataL, adddataLink]);
        setAddLink({});
        // }
        setonLoading(false);
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  const sortData = (sortBy) => {
    setonLoading(true);
    let hold = [...dataL2];
    if (sortBy == "fid") {
      hold.sort(function (a, b) {
        return a.film_id < b.film_id ? 1 : b.film_id < a.film_id ? -1 : 0;
      });
      setdataL(hold);
    } else if (sortBy == "lid") {
      hold.sort(function (a, b) {
        return a.id < b.id ? 1 : b.id < a.id ? -1 : 0;
      });
      setdataL(hold);
    }
    setonLoading(false);
  };

  const searching = (keySearch) => {
    if (keySearch == undefined || keySearch == "") {
      setdataL([...dataL]);
      return;
    }
    let a = Object.values([...dataL]).filter((item) => {
      return item.film_id == keySearch;
    });
    setdataL(a);
  };
  
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
            value={currentLink.id === undefined ? "auto" : currentLink.id}
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
            value={currentLink.film_id === undefined ? "" : currentLink.film_id}
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
            value={currentLink.chap === undefined ? "" : currentLink.chap}
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
            value={currentLink.server === undefined ? "" : currentLink.server}
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
          <textarea
            type="email"
            className="form-control pd-link"
            id="text"
            value={currentLink.link === undefined ? "" : currentLink.link}
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
  return (
    <div className="my-2 mb-3">
      {onLoading && <Loading />}
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic "> Links</strong>{" "}
            <div className="dashboxs">
              <button
                className="dashbox__mores me-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Link
              </button>
              <button className="dashbox__mores_link" onClick={() => Refresh()}>
                Refresh Data
              </button>
            </div>
          </h4>
        </div>

        <div className="col-12 col-lg-8 col-xl-9 mt-2">
          <label htmlFor="timkiem">Tìm kiếm: </label>
          <input
            id="timkiem"
            className="ms-1"
            onChange={(e) => searching(e.target.value)}
            placeholder="id phim"
          />
          {dataL2 != undefined && (
            <div className="table-responsive-xl table-link">
              <table class="table table-hover table-dark">
                <thead>
                  <tr className="text-center">
                    <th>STT</th>
                    <th>
                      ID Link
                      <button
                        className="btn btn-sm mt-0"
                        onClick={() => {
                          sortData("lid");
                        }}
                      >
                        <i class="fa fa-sort-down text-light"></i>
                      </button>
                    </th>
                    <th>
                      ID Film{" "}
                      <button
                        className="btn btn-sm mt-0"
                        onClick={() => {
                          sortData("fid");
                        }}
                      >
                        <i class="fa fa-sort-down text-light"></i>
                      </button>
                    </th>
                    <th>CHAP</th>
                    <th>SERVER</th>
                    <th>VIP</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {dataL2.map((e, i) => (
                    <tr className="text-center">
                      <td>{i}</td>
                      <td>{e.id}</td>
                      <td>
                        <div
                          className={
                            " " +
                            (parseInt(e.film_id) % 2 === 0
                              ? "text-danger"
                              : "text-light")
                          }
                        >
                          <strong>{e.film_id}</strong>
                        </div>
                      </td>
                      <td>{e.chap}</td>
                      <td>{e.server}</td>
                      <td>{e.vip == true && <i className="fa fa-check" />}</td>
                      <td>
                        <button
                          className="btn btn-sm  main__table_link-btn--edit"
                          onClick={() => {
                            setCurrentLink(dataL2[i]);
                            window.scrollTo({
                              top:
                                document
                                  .getElementById("editlink")
                                  .getBoundingClientRect().top +
                                window.pageYOffset +
                                -62,
                              behavior: "smooth",
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm ms-1 main__table_link-btn--delete"
                          data-bs-toggle="modal"
                          data-bs-target="#warningModel"
                          onClick={() => {
                            setChoseL(e.id);
                            // removeLink(e.id);
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
        <div className="col-12 col-lg-4 col-xl-3 mt-2">
          <h4 className="text-center">
            <strong id="editlink" className="display-6 fw-bold fst-italic ">
              Edit Link
            </strong>
          </h4>
          <hr className="my-4" />
          {currentLink != undefined && formLink(currentLink, setCurrentLink)}
          <hr className="my-4" />

          <button
            className="w-100 btn btn-primary btn-lg mt-2"
            onClick={() => updateLink()}
          >
            UPDATE
          </button>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-dialog-centered ">
            <div className="modal-content bg-dark border-warning">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  ADD NEW FILM
                </h5>
                <button
                  type="button"
                  className="btn_close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id=""
                >
                  <i className="fa fa-close" />
                </button>
              </div>
              <div className="modal-body">
                {formLink(adddataLink, setAddLink)}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-primarys"
                  data-bs-dismiss="modal"
                  onClick={() => addLink()}
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
        <div
          className="modal fade"
          id="warningModel"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-centered ">
            <div className="modal-content bg-dark border-warning">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  Are you sure?
                </h5>
                <button
                  type="button"
                  className="btn_close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id=""
                >
                  <i className="fa fa-close" />
                </button>
              </div>
              <div className="modal-body">
                <h2> Remove link id = {choseL}</h2>
                <button
                  className="btn btn-outline-danger mx-auto d-block"
                  data-bs-dismiss="modal"
                  onClick={() => removeLink(choseL)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Links;

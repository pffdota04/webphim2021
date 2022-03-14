import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../../components/Loading";
import "./style.css";

const KitKotAd = (props) => {
  const { dataL, token, setFetchLink } = props;
  const [choseL, setChoseL] = useState(0);
  const [dataL2, setdataL] = useState(dataL);

  const [onLoading, setonLoading] = useState(false);
  const [currentLink, setCurrentLink] = useState(dataL[choseL]); // mặc định là link  đầu tiên
  const [adddataLink, setAddLink] = useState({}); // mặc định là link  đầu tiên

  function Refresh() {
    setFetchLink(true);
  }

  const formLink = (currentLink, setNew) => {
    return (
      <div className="row g-3" id="editFilm">
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">
            Fid
          </label>
          <input
            type="number"
            className="form-control"
            id="firstName"
            placeholder
            value={currentLink.id === undefined ? "auto" : currentLink.id}
          />
        </div>

        <div className="col-sm-6">
          <label htmlFor="lastName" className="form-label">
            Year
          </label>
          <input
            type="number"
            className="form-control"
            id="lastName"
            placeholder
            value={currentLink.year === undefined ? "" : currentLink.year}
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
            Youtube
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder
            value={
              currentLink.yttrailer === undefined ? "" : currentLink.yttrailer
            }
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
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder
            value={currentLink.title === undefined ? "" : currentLink.title}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                server: e.target.value,
              }))
            }
          />
        </div>
      </div>
    );
  };

  function updateLink() {
    // LObject là một object chứa thông tin User sau khi cập nhật
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/update/link", {
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
      .post(process.env.REACT_APP_API_LOCAL + "admin/addlink", {
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
      .post(process.env.REACT_APP_API_LOCAL + "admin/deletelink", {
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
        // console.log(...dataL)
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


  const searching = (keySearch) => {
    if (keySearch == undefined || keySearch == "") {
      setdataL(dataL);
      return;
    }
    let a = Object.values([...dataL]).filter((item) => {
      if (item !== undefined) return item.id == keySearch;
    });
    setdataL(a);
  };

  return (
    <div className="my-2 mb-3">
      {onLoading && <Loading />}
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic "> Kitkot</strong>{" "}
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
                    {/* <th>STT</th> */}
                    <th>
                      Fid
                     
                    </th>
                    <th>
                      Title
                    
                    </th>
                    <th>Youtube</th>
                    <th>Year</th>
                  </tr>
                </thead>

                <tbody>
                  {dataL2.map((e, i) => (
                    <tr className="text-center">
                      {/* <td>{i}</td> */}
                      <td>{e.id}</td>
                      <td>{e.title}</td>
                      <td>{e.yttrailer}</td>
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
export default KitKotAd;

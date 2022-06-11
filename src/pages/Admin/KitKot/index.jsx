import axios from "axios";
import { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import Loading from "../../../components/Loading";
import { db } from "../../../services/firebase";
import "./style.css";

const KitKotAd = (props) => {
  const { dataK, token, setFetchKikot } = props;
  const [choseL, setChoseL] = useState(0);
  const [choseDelete, setChoseDelete] = useState(undefined);
  const [dataK2, setdataK] = useState(Object.values(dataK));
  const [searchFilm, setSearchFilm] = useState("");

  const [onLoading, setonLoading] = useState(false);
  const [currentLink, setCurrentLink] = useState(dataK[0]); // mặc định là link  đầu tiên
  const [adddataKink, setAddLink] = useState({}); // mặc định là link  đầu tiên
  const [editKitkot, setEditKitKot] = useState(dataK[0]); // mặc định là link  đầu tiên

  function Refresh() {
    setFetchKikot(true);
  }

  const formLink = (currentLink, setEditKitKot) => {
    return (
      <div className="row g-3" id="editFilm">
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">
            Film Id
          </label>
          <DebounceInput
            debounceTimeout={1500}
            type="number"
            className="form-control"
            id="firstName"
            placeholder
            value={currentLink._id === undefined ? "auto" : currentLink._id}
            onChange={(e) => {
              setEditKitKot((prevState) => ({
                ...prevState,
                _id: parseInt(e.target.value),
              }));
              axios
                .get(
                  process.env.REACT_APP_API_DEPLOYED2 +
                    "film/info/" +
                    e.target.value
                )
                .then((res) => {
                  setSearchFilm(res.data ? res.data.title : "Not Found");
                  setEditKitKot((prevState) => ({
                    ...prevState,
                    title: res.data.title,
                    year: res.data.year,
                  }));
                })
                .catch(() => setSearchFilm("Not Found"));
            }}
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
              setEditKitKot((prevState) => ({
                ...prevState,
                year: parseInt(e.target.value),
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
              setEditKitKot((prevState) => ({
                ...prevState,
                yttrailer: e.target.value,
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
              setEditKitKot((prevState) => ({
                ...prevState,
                title: e.target.value,
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
    let key = "";
    Object.values(dataK).map((e, i) => {
      if (e._id == choseL) key = Object.keys(dataK)[i];
    });
    db.ref()
      .child("/kitkot/" + key)
      .update(editKitkot)
      .then(() => {
        Refresh();
        setonLoading(false);
        alert("Cập nhật thành công");
      })
      .catch((e) => alert(e));
  }

  function addLink() {
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_DEPLOYED2 + "kitkot", {
        data: adddataKink,
      })
      .then((res) => {
        if (res.data === "okok") {
          alert("Thêm thành công");
        }
        Refresh();
        setonLoading(false);
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  function removeLink(current) {
    setonLoading(true);
    let key = "";
    Object.values(dataK).map((e, i) => {
      if (e._id == current._id) key = Object.keys(dataK)[i];
    });

    db.ref()
      .child("/kitkot/" + key)
      .remove()
      .then(() => {
        setonLoading(false);
        alert("Đã xóa");

        Refresh();
      })

      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  const searching = (keySearch) => {
    if (keySearch == undefined || keySearch == "") {
      setdataK(dataK);
      return;
    }
    let a = Object.values([...dataK]).filter((item) => {
      if (item !== undefined) return item.id == keySearch;
    });
    setdataK(a);
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
          {dataK2 != undefined && (
            <div className="table-responsive-xl table-link">
              <table class="table table-hover table-dark">
                <thead>
                  <tr className="text-center">
                    {/* <th>STT</th> */}
                    <th>Fid</th>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {dataK2.map((e, i) => (
                    <tr className="text-center">
                      {/* <td>{i}</td> */}
                      <td>{e._id}</td>
                      <td>{e.title}</td>
                      <td>
                        <button
                          className="btn btn-sm  main__table_link-btn--edit"
                          onClick={() => {
                            setChoseL(e._id);
                            setEditKitKot(e);
                            setCurrentLink(dataK2[i]);
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
                            setChoseDelete(e);
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
          {currentLink != undefined && formLink(editKitkot, setEditKitKot)}
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
                  ADD NEW KITKOT
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
                {formLink(adddataKink, setAddLink)}
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
              {choseDelete !== undefined && (
                <div className="modal-body">
                  <h2> Remove kitkot id = {choseDelete._id}</h2>
                  <button
                    className="btn btn-outline-danger mx-auto d-block"
                    data-bs-dismiss="modal"
                    onClick={() => removeLink(choseDelete)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default KitKotAd;

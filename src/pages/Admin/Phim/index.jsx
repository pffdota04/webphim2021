import { findByLabelText } from "@testing-library/dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import Loading from "../../../components/Loading";
import { db } from "../../../services/firebase";
import "./style.css";

const Phims = (props) => {
  // token --> để gửi đi chung post (xác thực admin bên api),
  // dataFilm --> là all Data Phim,
  // setFetchPhim --> để gọi lại api lấy dataFilm mới
  const { token, dataF, setFetchPhim } = props;
  const [dataFilm, setDataFilm] = useState(dataF);

  const [onLoading, setonLoading] = useState(false);
  const [onTrend, setOnTren] = useState(false);
  const [onRecom, setOnRecom] = useState(false);

  const [choseF, setChoseF] = useState(0); // id phim đang chọn, mặc định 0
  const [currentPhim, setCurrentPhim] = useState(dataFilm[choseF]); // lưu thông tin phim đang chọn
  const [addPhim, setaddPhim] = useState({}); // lưu thông tin phim đang chọn

  // just convert tiếng việt ra viết tắt để lưu trong dababase
  const theloai = [
    "Phim lẻ",
    "Phim bộ",
    "Hành động",
    "Viễn tưởng",
    "Hài",
    "Hoạt hình",
    "Phiêu lưu",
    "Tài liệu",
    "Kỳ ảo",
    "Lịch sử",
    "Kinh dị",
    "Lãng mạn",
    "Chiến tranh",
    "Chính kịch",
    "Tội phạm",
    "Gia đình",
  ];
  const params_theloai = [
    "movie",
    "series",
    "action",
    "scifi",
    "comedy",
    "anime",
    "adventure",
    "document",
    "fantasy",
    "history",
    "horror",
    "romance",
    "war",
    "drama",
    "crime",
    "family",
  ];

  const changeTrending = (id, e) => {
    setonLoading(true);
    let hold = [...dataF];

    // setDataFilm(hold);

    if (e.target.value == "-1") {
      db.ref()
        .child("phiminfo2/" + id + "/trending")
        .remove()
        .then(() => setonLoading(false));
      hold[id].trending = undefined;
    } else {
      db.ref()
        .child("phiminfo2/" + id)
        .update({ trending: parseInt(e.target.value) })
        .then(() => setonLoading(false));
      hold[id].trending = parseInt(e.target.value);
    }
  };

  const changeRecom = (id, e) => {
    setonLoading(true);
    let hold = [...dataF];
    hold[id].recommend = parseInt(e.target.value);
    // setDataFilm(hold);

    if (e.target.value == "-1")
      db.ref()
        .child("phiminfo2/" + id + "/recommend")
        .remove()
        .then(() => setonLoading(false));
    else
      db.ref()
        .child("phiminfo2/" + id)
        .update({ recommend: parseInt(e.target.value) })
        .then(() => setonLoading(false));
  };

  // Form input, hiển thị current và thay đổi state bằng setNew
  const formPhim = (currentPhim, setNew) => {
    return (
      <div className="row g-3" id="editFilm">
        <div className="col-6 col-md-1">
          <label htmlFor="firstName" className="form-label">
            ID
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder
            value={currentPhim.id === undefined ? "" : currentPhim.id}
            disabled
          />
        </div>
        <div className="col-6 col-md-2">
          <label htmlFor="lastName" className="form-label">
            Giá Vip
          </label>
          <input
            type="number"
            className="form-control"
            id="lastName"
            placeholder
            value={currentPhim.price === undefined ? "" : currentPhim.price}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                price: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="col-6 col-md-2">
          <label className="form-label">Năm</label>
          <input
            type="text"
            className="form-control"
            value={currentPhim.year === undefined ? "" : currentPhim.year}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                year: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-6  col-md-2">
          <label className="form-label">Độ dài</label>
          <input
            type="text"
            className="form-control"
            value={currentPhim.length === undefined ? "" : currentPhim.length}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                length: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-6 col-md-2">
          <label htmlFor="country" className="form-label">
            Quốc gia
          </label>
          <select
            className="form-select"
            id="country"
            required
            value={currentPhim.country !== undefined && currentPhim.country}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                country: e.target.value,
              }))
            }
          >
            <option defaultChecked>Chose...</option>
            <option value="us">Mỹ</option>
            <option value="ja">Nhật</option>
            <option value="ko">Hàn</option>
            <option value="vi">Việt</option>
            <option value="ch">Trung</option>
          </select>
        </div>
        <div className="col-6 col-md-3">
          <label htmlFor="address2" className="form-label">
            Youtube (
            <a
              target="_blank"
              href={
                currentPhim.yttrailer != undefined
                  ? "https://www.youtube.com/watch?v=" + currentPhim.yttrailer
                  : undefined
              }
            >
              Xem
            </a>
            )
          </label>
          <input
            type="text"
            className="form-control"
            id="address2"
            value={!currentPhim.yttrailer ? "" : currentPhim.yttrailer}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                yttrailer: e.target.value,
              }))
            }
          />
        </div>

        <div className="col-sm-6">
          <label htmlFor="email" className="form-label">
            Tên phim <span className="text-muted">(Tiếng Việt)</span>
          </label>
          <input
            type="email"
            className="form-control"
            id="text"
            value={currentPhim.title === undefined ? "" : currentPhim.title}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="address" className="form-label">
            Tên phim <span className="text-muted">(Gốc)</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={
              currentPhim.title_origin === undefined
                ? ""
                : currentPhim.title_origin
            }
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                title_origin: e.target.value,
              }))
            }
            required
          />
        </div>

        <div className="col-sm-6">
          <label className="form-label">
            Poster<span className="text-muted"> (Link)</span>{" "}
            <a target="_blank" href={currentPhim.img}>
              Xem
            </a>
          </label>
          <input
            type="text"
            className="form-control"
            value={!currentPhim.img ? "" : currentPhim.img}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                img: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label">
            Background
            <span className="text-muted"> (Link)</span>{" "}
            <a target="_blank" href={currentPhim.backimg}>
              Xem
            </a>
          </label>
          <input
            type="text"
            className="form-control"
            value={!currentPhim.backimg ? "" : currentPhim.backimg}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                backimg: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-6">
          <label className="form-label">Đạo diễn</label>
          <input
            type="text"
            className="form-control"
            value={
              currentPhim.director === undefined ? "" : currentPhim.director
            }
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                director: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-6">
          <label className="form-label">Diễn viên</label>
          <input
            type="text"
            className="form-control"
            value={currentPhim.actor === undefined ? "" : currentPhim.actor}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                actor: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="address2" className="form-label">
            Mô tả
          </label>
          <textarea
            type="text"
            className="form-control pd"
            value={
              currentPhim.description === undefined
                ? ""
                : currentPhim.description
            }
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-12">
          <label className="form-label">Thể loại</label>
          <div className="row ms-2">
            {theloai.map((e, i) => {
              return (
                <div className="form-check col-6 col-sm-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={params_theloai[i]}
                    id={params_theloai[i]}
                    checked={
                      !!currentPhim.type &&
                      Object.values(currentPhim.type).includes(
                        params_theloai[i]
                      )
                    }
                    onChange={(e) => {
                      if (
                        currentPhim.type == undefined ||
                        !Object.values(currentPhim.type).includes(
                          params_theloai[i]
                        )
                      )
                        setNew((prevState) => ({
                          ...prevState,
                          type: {
                            ...prevState.type,
                            [params_theloai[i]]: params_theloai[i],
                          },
                        }));
                      else {
                        let a = currentPhim;
                        delete a.type[params_theloai[i]];
                        setNew((prevState) => ({
                          ...prevState,
                          type: a.type,
                        }));
                      }
                    }}
                  />
                  <label className="form-check-label" for={params_theloai[i]}>
                    {e}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Bấm vào nút cập nhật thì lấy currentPhim gửi đi.
  function updatePhim() {
    if (JSON.stringify(dataFilm[choseF]) == JSON.stringify(currentPhim))
      alert("Not thing change!");
    else {
      setonLoading(true);
      axios
        .post(process.env.REACT_APP_API_LOCAL + "admin/update/phim", {
          token: token,
          FObject: currentPhim,
        })
        .then((res) => {
          alert(res.data);
          if (res.data === "okok") {
            alert("Cập nhật thành công");
            let b = dataFilm;
            b.map((e, i) => {
              if (e.id === currentPhim.id) dataFilm[i] = currentPhim;
            });
          }
          setonLoading(false);
        })
        .catch((e) => {
          alert(e);
          setonLoading(false);
        });
    }
  }

  function addnewPhim() {
    let hold = [...dataF];
    setonLoading(true);
    if (
      !addPhim.title ||
      !addPhim.title_origin ||
      !addPhim.type ||
      !addPhim.yttrailer ||
      !addPhim.year ||
      !addPhim.img ||
      !addPhim.backimg ||
      !addPhim.price ||
      !addPhim.description ||
      !addPhim.country
    ) {
      setonLoading(false);
      alert("Điền đầy đủ thông tin để tiếp tục");
      return;
    }
    addPhim.id = dataFilm[dataFilm.length - 1].id + 1;
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/addphim", {
        token: token,
        FObject: addPhim,
      })
      .then((res) => {
        if (res.data == "okok") {
          alert("Đã thêm thành công");
          hold.push(addPhim);
          setDataFilm(hold);
          setaddPhim({});
          setonLoading(false);
        }
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  function disablePhim(fid) {
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/disablephim", {
        token: token,
        fid: fid,
      })
      .then((res) => {
        if (res.data == "okok") {
          alert("Đã disable phim");
          let hold = [...dataF];
          hold.forEach((e, i) => {
            if (e.id == fid) hold[i].disabled = true;
          });
          setDataFilm(hold);
          setonLoading(false);
        }
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  function enablePhim(fid) {
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/enablephim", {
        token: token,
        fid: fid,
      })
      .then((res) => {
        if (res.data == "okok") {
          alert("Đã Enable phim");
          let hold = [...dataF];
          hold.forEach((e, i) => {
            if (e.id == fid) hold[i].disabled = null;
          });
          setDataFilm(hold);
          setonLoading(false);
        }
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  // nút refresh --> call api để lấy new dataFilm
  function Refresh() {
    setFetchPhim(true);
  }

  const searching = (keySearch) => {
    if (keySearch == undefined || keySearch == "") {
      setDataFilm([...dataF]);
      return;
    }
    let a = Object.values([...dataF]).filter((item) => {
      return (
        (item.title !== undefined &&
          item.title.toLowerCase().includes(keySearch.toLowerCase())) ||
        (item.title_origin !== undefined &&
          item.title_origin.toLowerCase().includes(keySearch.toLowerCase()))
      );
    });
    setDataFilm(a);
  };

  const onlyTren = () => {
    if (onTrend) {
      setOnTren(false);
      setDataFilm([...dataF]);
      return;
    }

    let a = Object.values([...dataF]).filter((item) => {
      return item.trending !== undefined;
    });
    setDataFilm(a);
    setOnTren(true);
    setOnRecom(false);
  };

  const onlyRecom = () => {
    if (onRecom) {
      setOnRecom(false);
      setDataFilm([...dataF]);
      return;
    }

    let a = Object.values([...dataF]).filter((item) => {
      return item.recommend !== undefined;
    });
    setDataFilm(a);
    setOnTren(false);
    setOnRecom(true);
  };

  return (
    <div className="container my-2 mb-3">
      {" "}
      {onLoading && <Loading />}
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">
              {" "}
              Film Managerment
            </strong>{" "}
            <div className="dashboxs">
              <button
                className="dashbox__mores"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Film
              </button>
              <button className="dashbox__mores" onClick={() => Refresh()}>
                Refresh Data
              </button>
            </div>
          </h4>
        </div>

        <div className="col-12 col-xl-7 mt-2">
          <label htmlFor="timkiem">Tìm kiếm: </label>
          <DebounceInput
            debounceTimeout={300}
            id="timkiem"
            className="ms-1"
            onChange={(e) => searching(e.target.value)}
            placeholder="tên phim"
          />
          {dataFilm != undefined && (
            <div className="table-responsive-xl table-phim mt-2">
              <table class="table table-hover table-striped table-dark">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th onClick={() => onlyTren()}>Trend</th>
                    <th onClick={() => onlyRecom()}>Recom</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {dataFilm.map((e, i) => (
                    <tr>
                      <td>{e.id}</td>
                      <td className="w-50">{e.title}</td>
                      <td>
                        <select
                          value={e.trending == undefined ? -1 : e.trending}
                          onChange={(event) => changeTrending(e.id, event)}
                        >
                          <option selected value={-1}>
                            NO
                          </option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                          <option value={9}>9</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={e.recommend == undefined ? -1 : e.recommend}
                          onChange={(event) => changeRecom(e.id, event)}
                        >
                          <option selected value={-1}>
                            NO
                          </option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                          <option value={9}>9</option>
                        </select>
                      </td>
                      <td>{e.price}</td>
                      <td className="w-25">
                        <a
                          className="btn btn-sm btn-primary ms-1 me-2 mx-auto"
                          onClick={() => {
                            setChoseF(e.id);
                            setCurrentPhim(dataFilm[i]);
                            //scroll to edit
                            // document.getElementById("editfilm").scrollIntoView({
                            //   behavior: "smooth",
                            // });
                            window.scrollTo({
                              top:
                                document
                                  .getElementById("editfilm")
                                  .getBoundingClientRect().top +
                                window.pageYOffset +
                                -62,
                              behavior: "smooth",
                            });
                            // fix header che mat 62px
                          }}
                        >
                          <i class="fa fa-pencil mb-1" />
                        </a>{" "}
                        {e.disabled == true ? (
                          <button
                            className="btn btn-sm btn-success "
                            onClick={() => {
                              setChoseF(e.id);
                              enablePhim(e.id);
                            }}
                          >
                            Enable
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-danger "
                            data-bs-toggle="modal"
                            data-bs-target="#warningModel"
                            onClick={() => {
                              setChoseF(e.id);
                              // disablePhim(e.id);
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
        <div className="col-12 col-xl-5 mt-2">
          <h4 className="text-center">
            <strong id="editfilm" className="display-6 fw-bold fst-italic ">
              Edit Film
            </strong>
          </h4>
          <hr className="my-4" />

          {formPhim(currentPhim, setCurrentPhim)}
          <hr className="my-4" />
          <button
            className="w-100 btn btn-primary btn-lg"
            onClick={() => updatePhim()}
          >
            UPDATE
          </button>
        </div>
        {/*  */}

        <div className="col-12 col-xl-12 mt-4">
          {/* Modal Add New Film*/}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl modal-dialog-centered ">
              <div className="modal-content border-warning bg-dark">
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
                  {formPhim(addPhim, setaddPhim)}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-primarys"
                    data-bs-dismiss="modal"
                    onClick={() => addnewPhim()}
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
                <h2> Disable film id = {choseF}</h2>
                <button
                  className="btn btn-outline-danger mx-auto d-block"
                  data-bs-dismiss="modal"
                  onClick={() => disablePhim(choseF)}
                >
                  DISABLE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Phims;

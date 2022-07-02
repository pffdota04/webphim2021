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
  const [dataFilm, setDataFilm] = useState(Object.values(dataF));

  const [onLoading, setonLoading] = useState(false);
  const [onTrend, setOnTren] = useState(false);
  const [onRecom, setOnRecom] = useState(false);
  const [onTop, setOnTop] = useState(false);
  const [homeId, setHomeId] = useState(undefined);
  const [detaitFilm, setDetaitFilm] = useState({});

  const [choseF, setChoseF] = useState(0); // id phim đang chọn, mặc định 0
  const [currentPhim, setCurrentPhim] = useState(dataFilm[choseF]); // lưu thông tin phim đang chọn
  const [addPhim, setaddPhim] = useState({}); // lưu thông tin phim đang chọn
  const [addPhimDetail, setaddPhimDetail] = useState({}); // lưu thông tin phim đang chọn

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

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_DEPLOYED2 + "film/homeId")
      .then((res) => {
        setHomeId(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_DEPLOYED2 + "film/detail/" + choseF)
      .then((res) => {
        setDetaitFilm(res.data);
      });
  }, [choseF]);

  const changeTrending = (id, e) => {
    setonLoading(true);
    let hold = [...Object.values(dataF)];

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
    let hold = [...Object.values(dataF)];
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
  const formPhim = (currentPhim, setNew, detaitFilm, setDetaitFilm) => {
    return (
      <div className="row g-3" id="editFilm">
        <div className="col-6 col-md-2">
          <label htmlFor="firstName" className="form-label">
            ID
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder
            value={currentPhim._id === undefined ? "" : currentPhim._id}
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
            value={detaitFilm.price === undefined ? "" : detaitFilm.price}
            required
            onChange={(e) =>
              setDetaitFilm((prevState) => ({
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
        <div className="col-6  col-md-3">
          <label className="form-label">Độ dài</label>
          <input
            type="text"
            className="form-control"
            value={detaitFilm.length === undefined ? "" : detaitFilm.length}
            required
            onChange={(e) =>
              setDetaitFilm((prevState) => ({
                ...prevState,
                length: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-6 col-md-3">
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
            <a target="_blank" href={detaitFilm.backimg}>
              Xem
            </a>
          </label>
          <input
            type="text"
            className="form-control"
            value={!detaitFilm.backimg ? "" : detaitFilm.backimg}
            onChange={(e) =>
              setDetaitFilm((prevState) => ({
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
            value={detaitFilm.director === undefined ? "" : detaitFilm.director}
            onChange={(e) =>
              setDetaitFilm((prevState) => ({
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
            value={detaitFilm.actor === undefined ? "" : detaitFilm.actor}
            onChange={(e) =>
              setDetaitFilm((prevState) => ({
                ...prevState,
                actor: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-6">
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
            value={!detaitFilm.yttrailer ? "" : detaitFilm.yttrailer}
            onChange={(e) =>
              setDetaitFilm((prevState) => ({
                ...prevState,
                yttrailer: e.target.value,
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
              detaitFilm.description === undefined ? "" : detaitFilm.description
            }
            onChange={(e) =>
              setDetaitFilm((prevState) => ({
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
      alert("Notthing change!");
    else {
      let keyInfo = "xx";
      try {
        Object.values(dataF).forEach(function (e, i) {
          if (e._id == currentPhim._id) {
            keyInfo = Object.keys(dataF)[i];
            throw "a";
          }
        });
      } catch (e) {}
      setonLoading(true);
      axios
        .put(
          process.env.REACT_APP_API_DEPLOYED2 + "film",
          {
            phimdetail: detaitFilm,
            phiminfo: { ...currentPhim, key: keyInfo },
          },
          { headers: { Authorization: `${token}` } }
        )
        .then((res) => {
          if (res.data === "ok") {
            alert("Cập nhật thành công");
          } else alert(res.data);
          setonLoading(false);
        })
        .catch((e) => {
          alert(e);
          setonLoading(false);
        });
    }
  }

  function addnewPhim() {
    let hold = [...Object.values(dataF)];
    setonLoading(true);
    if (
      !addPhim.title ||
      !addPhim.title_origin ||
      !addPhim.type ||
      !addPhimDetail.yttrailer ||
      !addPhim.year ||
      !addPhim.img ||
      !addPhimDetail.backimg ||
      !addPhimDetail.price ||
      !addPhimDetail.description ||
      !addPhim.country
    ) {
      setonLoading(false);
      alert("Điền đầy đủ thông tin để tiếp tục");
      return;
    }
    addPhim._id = dataFilm[dataFilm.length - 1]._id + 1;
    axios
      .post(
        process.env.REACT_APP_API_DEPLOYED2 + "film",
        {
          phimdetail: addPhimDetail,
          phiminfo: addPhim,
        },
        { headers: { Authorization: `${token}` } }
      )
      .then((res) => {
        if (res.data == "ok") {
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
      .put(
        process.env.REAREACT_APP_API_DEPLOYED2 + "film/disable",
        {
          fid: fid,
        },
        { headers: { Authorization: `${token}` } }
      )
      .then((res) => {
        if (res.data == "ok") {
          alert("Đã disable phim");
          let hold = [...Object.values(dataF)];
          hold.forEach((e, i) => {
            if (e._id == fid) hold[i].disable = true;
          });
          setDataFilm(hold);
        }
        setonLoading(false);
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  function enablePhim(fid) {
    setonLoading(true);
    axios
      .put(
        process.env.REACT_APP_API_DEPLOYED2 + "film/enable",
        {
          fid: fid,
        },
        { headers: { Authorization: `${token}` } }
      )
      .then((res) => {
        if (res.data == "ok") {
          alert("Đã Enable phim");
          let hold = [...Object.values(dataF)];
          hold.forEach((e, i) => {
            if (e._id == fid) delete hold[i].disable;
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
      setDataFilm([...Object.values(dataF)]);
      return;
    }
    let a = Object.values([...Object.values(dataF)]).filter((item) => {
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
      setDataFilm([...Object.values(dataF)]);
      return;
    }

    let a = [];
    [...Object.values(dataF)].map((e) => {
      if (homeId.trending.indexOf(e._id) != -1) {
        a.push(e);
      }
    });
    setDataFilm(a);
    setOnTren(true);
    setOnTop(false);
    setOnRecom(false);
  };

  const onlyRecom = () => {
    if (onRecom) {
      setOnRecom(false);
      setDataFilm([...Object.values(dataF)]);
      return;
    }

    let a = [];
    [...Object.values(dataF)].map((e) => {
      if (homeId.recommend.indexOf(e._id) != -1) {
        a.push(e);
      }
    });
    setDataFilm(a);
    setOnTren(false);
    setOnTop(false);
    setOnRecom(true);
  };

  const onlyTop = () => {
    if (onTop) {
      setOnTop(false);
      setDataFilm([...Object.values(dataF)]);
      return;
    }

    let a = [];
    [...Object.values(dataF)].map((e) => {
      if (homeId.top.indexOf(e._id) != -1) {
        a.push(e);
      }
    });
    setDataFilm(a);
    setOnTren(false);
    setOnRecom(false);
    setOnTop(true);
  };
  return (
    <div className="container my-2 mb-3">
      {/* {" "}
      {JSON.stringify(currentPhim)}
      <hr />
      {JSON.stringify(detaitFilm)} */}
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
                    <th
                      onClick={() => onlyTren()}
                      className={onTrend ? "text-danger" : ""}
                    >
                      Trend
                    </th>
                    <th
                      onClick={() => onlyRecom()}
                      className={onRecom ? "text-danger" : ""}
                    >
                      Recom
                    </th>
                    <th
                      onClick={() => onlyTop()}
                      className={onTop ? "text-danger" : ""}
                    >
                      Top
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {dataFilm.map((e, i) => (
                    <tr>
                      <td>{e._id}</td>
                      <td className="w-50">
                        {e.title}{" "}
                        <a
                          target="_blank"
                          href={
                            window.location.origin +
                            "/detailfilm/" +
                            e._id +
                            "/" +
                            e.title
                          }
                        >
                          <i class="fa fa-external-link   mb-1" />
                        </a>
                      </td>
                      <td>
                        <select
                          value={
                            homeId != undefined &&
                            homeId.trending.indexOf(e._id)
                          }
                          onChange={(event) => changeTrending(e._id, event)}
                        >
                          <option selected value={-2}>
                            NO
                          </option>
                          <option value={0}>1</option>
                          <option value={1}>2</option>
                          <option value={2}>3</option>
                          <option value={3}>4</option>
                          <option value={4}>5</option>
                          <option value={5}>6</option>
                          <option value={6}>7</option>
                          <option value={7}>8</option>
                          <option value={8}>9</option>
                          <option value={9}>10</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={
                            homeId != undefined &&
                            homeId.recommend.indexOf(e._id)
                          }
                          onChange={(event) => changeRecom(e._id, event)}
                        >
                          <option selected value={-1}>
                            NO
                          </option>
                          <option value={0}>1</option>
                          <option value={1}>2</option>
                          <option value={2}>3</option>
                          <option value={3}>4</option>
                          <option value={4}>5</option>
                          <option value={5}>6</option>
                          <option value={6}>7</option>
                          <option value={7}>8</option>
                          <option value={8}>9</option>
                          <option value={9}>10</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={
                            homeId != undefined && homeId.top.indexOf(e._id)
                          }
                          onChange={(event) => changeRecom(e._id, event)}
                        >
                          <option selected value={-1}>
                            NO
                          </option>
                          <option value={0}>1</option>
                          <option value={1}>2</option>
                          <option value={2}>3</option>
                          <option value={3}>4</option>
                        </select>
                      </td>
                      <td className="w-25">
                        <a
                          className="btn btn-sm btn-primary ms-1 me-2 mx-auto"
                          onClick={() => {
                            setChoseF(e._id);
                            setCurrentPhim(dataFilm[i]);
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
                        {e.disable == true ? (
                          <button
                            className="btn btn-sm btn-success "
                            onClick={() => {
                              setChoseF(e._id);
                              enablePhim(e._id);
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
                              setChoseF(e._id);
                              // disablePhim(e._id);
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

          {formPhim(currentPhim, setCurrentPhim, detaitFilm, setDetaitFilm)}
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
                  {formPhim(
                    addPhim,
                    setaddPhim,
                    addPhimDetail,
                    setaddPhimDetail
                  )}
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

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const Phims = (props) => {
  // token --> để gửi đi chung post (xác thực admin bên api),
  // dataF --> là all Data Phim,
  // setFetchPhim --> để gọi lại api lấy dataF mới
  const { token, dataF, setFetchPhim } = props;

  const [choseF, setChoseF] = useState(0); // id phim đang chọn, mặc định 0
  const [currentPhim, setCurrentPhim] = useState(dataF[choseF]); // lưu thông tin phim đang chọn

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

  // Form input, hiển thị current và thay đổi state bằng setNew
  const formPhim = (currentPhim, setNew) => {
    return (
      <div className="row g-3" id="editFilm">
        <div className="col-sm-1">
          <label htmlFor="firstName" className="form-label">
            ID Phim
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder
            value={currentPhim.id}
            disabled
          />
        </div>
        <div className="col-sm-1">
          <label htmlFor="lastName" className="form-label">
            Giá Vip
          </label>
          <input
            type="number"
            className="form-control"
            id="lastName"
            placeholder
            value={currentPhim.price}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                price: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="col-sm-1">
          <label className="form-label">Năm</label>
          <input
            type="text"
            className="form-control"
            value={currentPhim.year}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                year: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-sm-2">
          <label className="form-label">Thời lượng</label>
          <input
            type="text"
            className="form-control"
            value={currentPhim.length}
            required
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                length: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-sm-2">
          <label htmlFor="country" className="form-label">
            Quốc gia
          </label>
          <select
            className="form-select"
            id="country"
            required
            value={currentPhim.country}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                country: e.target.value,
              }))
            }
          >
            <option value="us">Mỹ</option>
            <option value="ja">Nhật</option>
            <option value="ko">Hàn</option>
            <option value="vi">Việt</option>
            <option value="ch">Trung</option>
          </select>
        </div>
        <div className="col-sm-2">
          <label className="form-label">Đạo diễn</label>
          <input
            type="text"
            className="form-control"
            value={currentPhim.director}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                director: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-sm-3">
          <label className="form-label">Diễn viên</label>
          <input
            type="text"
            className="form-control"
            value={currentPhim.actor}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                actor: e.target.value,
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
            value={currentPhim.title}
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
            value={currentPhim.title_origin}
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
            Poster<span className="text-muted"> (Link ảnh)</span>{" "}
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
            Background imgage
            <span className="text-muted"> (Link ảnh)</span>{" "}
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
        <div className="col-sm-6">
          <label htmlFor="address2" className="form-label">
            Mô tả
          </label>
          <textarea
            type="text"
            className="form-control pd"
            value={currentPhim.description}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-sm-3">
          <label className="form-label">Thể loại</label>
          <div className="row ms-2">
            {theloai.map((e, i) => {
              return (
                <div className="form-check  col-6">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={params_theloai[i]}
                    id={params_theloai[i]}
                    checked={Object.values(currentPhim.type).includes(
                      params_theloai[i]
                    )}
                    onChange={(e) =>
                      setNew((prevState) => ({
                        ...prevState,
                        type: !Object.values(currentPhim.type).includes(
                          params_theloai[i]
                        )
                          ? {
                              ...prevState.type,
                              [params_theloai[i]]: params_theloai[i],
                            }
                          : {
                              ...prevState.type,
                              [params_theloai[i]]: null,
                            },
                      }))
                    }
                  />
                  <label className="form-check-label" for={params_theloai[i]}>
                    {e}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-sm-3">
          <label htmlFor="address2" className="form-label">
            Youtube trailer
            <span className="text-muted"> (Id only)</span>{" "}
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
      </div>
    );
  };

  // Bấm vào nút cập nhật thì lấy currentPhim gửi đi.
  function updatePhim() {
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/updatephim", {
        token: token,
        FObject: currentPhim,
      })
      .then((res) => {
        alert(res.data);
        //setFetchPhim(true); // gọi api lấy data mới sau khi đã edit.
        //tắt call api sau khi edit --> sử dụng button Refresh() để call api lấy new data khi nhấn (((đỡ tốn time và băng thông Firebase vì get all data hơi nặng)))
      })
      .catch((e) => alert(e));
  }

  // nút refresh --> call api để lấy new dataF
  function Refresh() {
    setFetchPhim(true);
  }

  return (
    <div className="container my-2 mb-3">
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">
              {" "}
              Film Managerment
            </strong>{" "}
            <div className="dashboxs">
            <button className="dashbox__mores" onClick={() => Refresh()}>Refresh Data</button>
            <button className="dashbox__mores" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Film</button>
            </div>
          </h4>
        </div>
        <div className="col-12 col-xl-12 mt-2">
          {
            dataF != undefined && (
              <div className="main__table-wrap">
                <table className="main__table">
                  <thead>
                  <tr>
                    <th>STT
                    </th>
                    <th>ID
                    </th>
                    <th>Title
                    </th>
                    <th>
                      Imgage
                    </th>
                    <th>
                      Backimg
                    </th>
                    <th>
                      Trailer
                    </th>
                    <th>
                      Price
                    </th>
                    <th>
                      Action
                    </th>
                  </tr>
                  </thead>
                  
                  <tbody>
                  {dataF.map((e, i) => (
                    <tr>
                      <td><div class="main__table-text">{i}</div></td>
                      <td><div class="main__table-text">{e.id}</div></td>
                      <td><div class="main__table-text">{e.title}</div></td>
                      <td>
                        <div class="main__table-text">
                          <a target="_blank" href={e.img} class="main__table-text">
                            Xem
                          </a>
                        </div>
                      </td>
                      <td>
                        <div class="main__table-text">
                          <a target="_blank" href={e.backimg} class="main__table-text">
                            Xem
                          </a>
                        </div>
                      </td>
                      <td>
                        <div class="main__table-text">
                          <a target="_blank"
                          href={
                            e.yttrailer != undefined
                              ? "https://www.youtube.com/watch?v=" + e.yttrailer
                              : undefined
                          }
                          >
                            Xem
                          </a>
                        </div>
                      </td>
                      <td><div class="main__table-text">{e.price}</div></td>
                      <td>
                      <div class="main__table-text">
                        <a
                          className="btn btn-sm btn-link main__table-btn--edit"
                          onClick={() => {
                            setChoseF(e.id);
                            setCurrentPhim(dataF[e.id]);
                          }}
                        >
                          Edit
                        </a>
                        <button
                          className="btn btn-sm btn-link ms-1 main__table-btn--delete"
                          onClick={() => Refresh()}
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
          }
        </div>
        <div className="col-12 col-xl-12 mt-4">
          {/* Modal Add New Film*/}
          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold" id="exampleModalLabel">ADD NEW FILM</h5>
                  <button type="button" className="btn_close" data-bs-dismiss="modal" aria-label="Close">
                    <i className="fa fa-close" />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-sm-1 mt-2">
                      <label htmlFor="firstName" className="form-label">
                        ID Phim
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        // placeholder
                        // value={currentPhim.id}
                      />
                    </div>
                    <div className="col-sm-1 mt-2">
                      <label htmlFor="lastName" className="form-label">
                        Giá Vip
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="lastName"
                        // placeholder
                        // value={currentPhim.price}
                        // required
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     price: parseInt(e.target.value),
                        //   }))
                        // }
                      />
                    </div>
                    <div className="col-sm-1 mt-2">
                      <label className="form-label">Năm</label>
                      <input
                        type="text"
                        className="form-control"
                        // value={currentPhim.year}
                        // required
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     year: e.target.value,
                        //   }))
                        // }
                      />
                    </div>
                    <div className="col-sm-2 mt-2">
                      <label className="form-label">Thời lượng</label>
                      <input
                        type="text"
                        className="form-control"
                        // value={currentPhim.length}
                        // required
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     length: e.target.value,
                        //   }))
                        // }
                      />
                    </div>
                    <div className="col-sm-2 mt-2">
                      <label htmlFor="country" className="form-label">
                        Quốc gia
                      </label>
                      <select
                        className="form-select"
                        id="country"
                        // required
                        // value={currentPhim.country}
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     country: e.target.value,
                        //   }))
                        // }
                      >
                        <option value="us">Mỹ</option>
                        <option value="ja">Nhật</option>
                        <option value="ko">Hàn</option>
                        <option value="vi">Việt</option>
                        <option value="ch">Trung</option>
                      </select>
                    </div>
                    <div className="col-sm-2 mt-2">
                      <label className="form-label">Đạo diễn</label>
                      <input
                        type="text"
                        className="form-control"
                        // value={currentPhim.director}
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     director: e.target.value,
                        //   }))
                        // }
                      />
                    </div>
                    <div className="col-sm-3 mt-2">
                      <label className="form-label">Diễn viên</label>
                      <input
                        type="text"
                        className="form-control"
                        // value={currentPhim.actor}
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     actor: e.target.value,
                        //   }))
                        // }
                      />
                    </div>

                    <div className="col-sm-6 mt-2">
                      <label htmlFor="email" className="form-label">
                        Tên phim <span className="text-muted">(Tiếng Việt)</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="text"
                        // value={currentPhim.title}
                      />
                    </div>
                    <div className="col-sm-6 mt-2">
                      <label htmlFor="address" className="form-label">
                        Tên phim <span className="text-muted">(Gốc)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        // value={currentPhim.title_origin}
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     title_origin: e.target.value,
                        //   }))
                        // }
                        // required
                      />
                    </div>

                    <div className="col-sm-6 mt-2">
                      <label className="form-label">
                        Poster<span className="text-muted"> (Link ảnh)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        // value={!currentPhim.img ? "" : currentPhim.img}
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     img: e.target.value,
                        //   }))
                        // }
                      />
                    </div>
                    <div className="col-sm-6 mt-2">
                      <label className="form-label">
                        Background imgage
                        <span className="text-muted"> (Link ảnh)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        // value={!currentPhim.backimg ? "" : currentPhim.backimg}
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     backimg: e.target.value,
                        //   }))
                        // }
                      />
                    </div>
                    <div className="col-sm-6 mt-2">
                      <label htmlFor="address2" className="form-label">
                        Mô tả
                      </label>
                      <textarea
                        type="text"
                        className="form-control pd"
                        // value={currentPhim.description}
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     description: e.target.value,
                        //   }))
                        // }
                      />
                    </div>
                    <div className="col-sm-3 mt-2">
                      <label className="form-label">Thể loại</label>
                      <div className="row ms-2">
                        {theloai.map((e, i) => {
                          return (
                            <div className="form-check  col-6">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                // value={params_theloai[i]}
                                // id={params_theloai[i]}
                                // checked={Object.values(currentPhim.type).includes(
                                //   params_theloai[i]
                                // )}
                                // onChange={(e) =>
                                //   setNew((prevState) => ({
                                //     ...prevState,
                                //     type: !Object.values(currentPhim.type).includes(
                                //       params_theloai[i]
                                //     )
                                //       ? {
                                //           ...prevState.type,
                                //           [params_theloai[i]]: params_theloai[i],
                                //         }
                                //       : {
                                //           ...prevState.type,
                                //           [params_theloai[i]]: null,
                                //         },
                                //   }))
                                // }
                              />
                              <label className="form-check-label" for={params_theloai[i]}>
                                {e}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-sm-3 mt-2">
                      <label htmlFor="address2" className="form-label">
                        Youtube trailer
                        <span className="text-muted"> (Id only)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        // value={!currentPhim.yttrailer ? "" : currentPhim.yttrailer}
                        // onChange={(e) =>
                        //   setNew((prevState) => ({
                        //     ...prevState,
                        //     yttrailer: e.target.value,
                        //   }))
                        // }
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-primarys">Save changes</button>
                  <button type="button" className="btn-secondarys" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 line--primary" />
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong id="editfilm" className="display-6 fw-bold fst-italic ">
              {" "}
              Edit Film
            </strong>
          </h4>
        </div>
        <div className="col-12 col-xl-12 mt-4">
          {formPhim(currentPhim, setCurrentPhim)}
          <hr className="my-4" />
          <button
            className="w-100 btn btn-primary btn-lg"
            onClick={() => updatePhim()}
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};
export default Phims;

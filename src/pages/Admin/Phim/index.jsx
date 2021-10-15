import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const Phims = (props) => {
  const { token, dataF, setFetchPhim } = props;
  const [choseF, setChoseF] = useState(0);
  const [currentPhim, setCurrentPhim] = useState(dataF[choseF]);

  const theloai = [
    "phim lẻ",
    "phim bộ",
    "hành động",
    "viễn tưởng",
    "hài",
    "hoạt hình",
    "phiêu lưu",
    "tài liệu",
    "kì ảo",
    "lịch sử",
    "kinh dị",
    "lãng mạn",
    "chiến tranh",
    "chính kịch",
    "tội phạm",
    "gia đình",
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


  const formPhim = (currentPhim, setNew) => {
    return (
      <div className="row g-3" id="editFilm">
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">
            Id phim
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
        <div className="col-sm-6">
          <label htmlFor="lastName" className="form-label">
            Giá vip
          </label>
          <input
            type="text"
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

        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Tên phim <span className="text-muted">(Tiếng việt)</span>
          </label>
          <input
            type="email"
            className="form-control"
            id="text"
            value={currentPhim.title}
          />
        </div>
        <div className="col-12">
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
        <div className="col-md-5">
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
        <div className="col-md-4">
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
        <div className="col-md-3">
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

        <div className="col-12">
          <label className="form-label">
            Poster<span className="text-muted">(link ảnh)</span>{" "}
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
        <div className="col-12">
          <label className="form-label">
            Background imgage
            <span className="text-muted">(link ảnh)</span>{" "}
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
        <div className="col-12">
          <label htmlFor="address2" className="form-label">
            Youtube trailer
            <span className="text-muted">(id only)</span>{" "}
            <a
              target="_blank"
              href={
                currentPhim.yttrailer != undefined
                  ? "https://www.youtube.com/watch?v=" + currentPhim.yttrailer
                  : undefined
              }
            >
              xem
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
        <div className="col-12">
          <label className="form-label">Thể loại</label>
          <div className="row">
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

        <div className="col-12">
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
        <div className="col-12">
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

        <div className="col-12">
          <label htmlFor="address2" className="form-label">
            Mô tả
          </label>
          <textarea
            type="text"
            className="form-control"
            value={currentPhim.description}
            onChange={(e) =>
              setNew((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
        </div>
      </div>
    );
  };

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
              Quản lí Phim
            </strong>{" "}
            <button onClick={() => Refresh()}>Làm mới data phim</button>
          </h4>
        </div>
        <div className="col-12 col-xl-4">
          {formPhim(currentPhim, setCurrentPhim)}
          <button
            className="w-100 btn btn-primary btn-lg mt-2"
            onClick={() => updatePhim()}
          >
            Cập nhật
          </button>
          <hr className="my-4" />
        </div>
        <div className="col-12 col-xl-8">
          {
            dataF != undefined && (
              <div className="table-test">
                <table className="table-phim ">
                  <tr>
                    <th>
                      <div>stt</div>
                    </th>
                    <th>
                      <div>ID</div>
                    </th>
                    <th className="max-5x">
                      <div>Title</div>
                    </th>
                    <th>
                      <div>Imgage</div>
                    </th>
                    <th>
                      <div>Backimg</div>
                    </th>
                    <th>
                      <div>Trailer</div>
                    </th>
                    <th>
                      <div>Price</div>
                    </th>
                    <th>
                      <div>Action</div>
                    </th>
                  </tr>

                  {dataF.map((e, i) => (
                    <tr>
                      <td>{i}</td>
                      <td>{e.id}</td>
                      <td className="max-5x">{e.title}</td>
                      <td>
                        <a target="_blank" href={e.img}>
                          xem
                        </a>
                      </td>
                      <td>
                        <a target="_blank" href={e.backimg}>
                          xem
                        </a>
                      </td>
                      <td>
                        <a
                          target="_blank"
                          href={
                            e.yttrailer != undefined
                              ? "https://www.youtube.com/watch?v=" + e.yttrailer
                              : undefined
                          }
                        >
                          xem
                        </a>
                      </td>
                      <td>{e.price}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setChoseF(e.id);
                            setCurrentPhim(dataF[e.id]);
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
export default Phims;

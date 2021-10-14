import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const Phims = (props) => {
  const { dataF } = props;
  // const [dataF, setDataF] = useState([
  //   {
  //     id: 0,
  //     title: "Loading..",
  //     type: "Loading..",
  //     img: "Loading..",
  //     backimg: "Loading..",
  //     yttrailer:"Loading..",
  //     price:"Loading..",
  //     country:"Loading",
  //   },
  // ]);
  const [choseF, setChoseF] = useState(0);
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

  // useEffect(() => {
  //   axios
  //     .get(process.env.REACT_APP_API_LOCAL + "film/search")
  //     .then((res) => {
  //       setDataF(Object.values(res.data));
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  return (
    <div className="container my-2 mb-3">
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">
              {" "}
              Quản lí Phim
            </strong>{" "}
          </h4>
        </div>
        <div className="col-12 col-xl-4">
          <form className="needs-validation" noValidate>
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
                  value={dataF[choseF].id}
                  required
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
                  value={dataF[choseF].price}
                  required
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
                  value={dataF[choseF].title}
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
                  value={dataF[choseF].title_origin}
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
                  value={dataF[choseF].country}
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
                  value={dataF[choseF].year}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Thời lượng</label>
                <input
                  type="text"
                  className="form-control"
                  value={dataF[choseF].length}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Poster<span className="text-muted">(link ảnh)</span>{" "}
                  <a target="_blank" href={dataF[choseF].img}>
                    Xem
                  </a>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={!dataF[choseF].img ? "" : dataF[choseF].img}
                />
              </div>
              <div className="col-12">
                <label className="form-label">
                  Background imgage
                  <span className="text-muted">(link ảnh)</span>{" "}
                  <a target="_blank" href={dataF[choseF].backimg}>
                    Xem
                  </a>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={!dataF[choseF].backimg ? "" : dataF[choseF].backimg}
                />
              </div>
              <div className="col-12">
                <label htmlFor="address2" className="form-label">
                  Youtube trailer
                  <span className="text-muted">(id only)</span>{" "}
                  <a
                    target="_blank"
                    href={
                      dataF[choseF].yttrailer != undefined
                        ? "https://www.youtube.com/watch?v=" +
                          dataF[choseF].yttrailer
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
                  value={
                    !dataF[choseF].yttrailer ? "" : dataF[choseF].yttrailer
                  }
                />
              </div>
              <div className="col-12">
                <label className="form-label">Thể loại</label>
                <div className="row">
                  {/* {console.log()} */}
                  {theloai.map((e, i) => {
                    return (
                      <div class="form-check  col-6">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value={params_theloai[i]}
                          id={params_theloai[i]}
                          checked={Object.values(dataF[choseF].type).includes(
                            params_theloai[i]
                          )}
                        />
                        <label class="form-check-label" for={params_theloai[i]}>
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
                  value={dataF[choseF].director}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Diễn viên</label>
                <input
                  type="text"
                  className="form-control"
                  value={dataF[choseF].actor}
                />
              </div>

              <div className="col-12">
                <label htmlFor="address2" className="form-label">
                  Mô tả
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  value={dataF[choseF].description}
                />
              </div>
            </div>

            <hr className="my-4" />
            <button className="w-100 btn btn-primary btn-lg">Cập nhật</button>
          </form>
        </div>
        <div className="col-12 col-xl-8">
          {
            // actor: "Leonardo Dicaprio"
            // country: "us"
            // createDay: "2021-07-24"
            // description: "Bộ phim dựa trên câu chuyện có thật về con tàu xấu số Titanic và một trong những mối tình nổi tiếng nhất lịch sử điện ảnh."
            // director: "James cmaerum"
            // id: 0

            // length: "3h30p"
            // level: "P"
            // recommend: 5
            // status: 1
            // title: "phim này là phim đầu tiên luôn á!"
            // title_origin: "FISRT FLIM IN KPHIM"
            // trending: 0
            // type: {action: 'action', drama: 'drama', history: 'history', movie: 'movie', romance: 'romance'}
            // year: "1998"

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
                          onClick={() => setChoseF(e.id)}
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

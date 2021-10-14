import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import meo from "./../../assets/images/hinhmeo.png";
import "./style.css";

const PopupFilm = (props) => {
  const { data, click } = props;

  const params_theloai = [
    "action",
    "movie",
    "series",
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
  const theloai = [
    "hành động",
    "phim lẻ",
    "phim bộ",
    "khoa học viễn tưởng",
    "hài",
    "anime",
    "phiêu lưu",
    "tài liệu",
    "kì ảo",
    "lịch sử",
    "kinh dị",
    "lãng mạn",
    "chiến tranh",
    "chính kịch",
    "tội phạm",
    "gia đình - trẻ em",
  ];
  const params_quocgia = ["us", "ja", "ko", "ch", "vi", "es"];
  const quocgia = [
    "Mỹ",
    "Nhật",
    "Hàn Quốc",
    "Trung Quốc",
    "Việt Nam",
    "Tây Ban Nha",
  ];

  const [dataState, setDataState] = useState(data);
  const [showYoutube, setShowYoutube] = useState(false);

  useEffect(() => {
    if (data != null) {
      if (params_quocgia.indexOf(data.country) != -1)
        data.country = quocgia[params_quocgia.indexOf(data.country)];

      Object.keys(data.type).map((e) => {
        if (params_theloai.indexOf(e) != -1)
          data.type[e] = theloai[params_theloai.indexOf(e)];
      });
      setShowYoutube(false);
      setDataState(data);
    }
  }, [data]);

  return (
    data != null && (
      <div>
        <div
          className="modal fade popup-none-in-first bd-example-modal-sm show "
          id="ItemModal7"
          aria-modal="true"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="Invisible" onClick={() => click(null)}></div>
          <div className="modal-dialog modal-dialog-centered  modal-xl ">
            <div className="modal-content text-light trailer-ytb bg-secondary">
              <div className="modal-header p-2" id="header-popup">
                <h5 className="modal-title" id="exampleModalLabel">
                  {data.title} ({data.year})
                </h5>
                <button
                  type="button"
                  className="btn-close me-1"
                  onClick={() => click(null)}
                  id="bt-close"
                />
              </div>
              {showYoutube == true && data.yttrailer != undefined ? (
                <div className="youtube-player">
                  <iframe
                    loading="lazy"
                    src={
                      "https://www.youtube.com/embed/" +
                      data.yttrailer +
                      "?autoplay=1"
                    }
                    frameborder="0"
                    allowfullscreen="1"
                    width="100"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              ) : (
                <div className="position-relative">
                  <img
                    src={
                      data.backimg == undefined
                        ? "https://i.imgur.com/sLwEvjw.jpg"
                        : data.backimg
                    }
                    alt="youtube thumnail image"
                    className="w-100 img-trailer"
                    loading="lazy"
                  ></img>
                  <div className="play" onClick={() => setShowYoutube(true)}>
                    <p className=" text-light pt-4 mt-5 text-center">Trailer</p>
                  </div>
                </div>
              )}

              <div className=" mx-auto text-ten-line ">
                <p className="text-center mb-0">
                  <strong>
                    {data.id}: {data.title} ({data.title_origin})
                  </strong>
                </p>
                <p className="text-center mb-0">
                  Diễn viên:
                  <div className="the-loai-popup">{data.actor}</div> | Đạo diễn:
                  <div className="the-loai-popup">{data.director}</div>
                </p>

                <p className="text-center mb-0">
                  Thể loại:
                  {Object.values(data.type).map((e) => (
                    <div className="the-loai-popup">{e}</div>
                  ))}
                </p>
                <p className="text-center mb-0">
                  Quốc gia:
                  <div className="the-loai-popup">{data.country}</div>| Thời
                  lượng:
                  <div className="the-loai-popup">{data.length}</div>
                </p>

                <p className="text-center">
                  Năm:
                  <div className="the-loai-popup">{data.year}</div>| Giá vip
                  <div className="the-loai-popup">{data.price}</div>
                </p>
                <p className="text-left ps-3 pe-2">
                  &nbsp;&nbsp;{data.description}
                </p>
              </div>
              <div className="modal-footer p-1">
                <Link
                  className="w-100 p-0 m-0 mt-1 mb-1 btn btn-danger text-center pb-1"
                  aria-label="Close"
                  to={"/watch/" + data.id + "/" + data.title}
                >
                  Xem ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PopupFilm;

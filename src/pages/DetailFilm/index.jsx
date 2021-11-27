import "./style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Carousel from "react-multi-carousel";
import "../../../node_modules/react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import FilmCard from "./../../components/FilmCard";
import axios from "axios";
import { setListHome } from "../../store/actions/listPhim_Action";

const responsive_multi_carsousel = {
  superLargeDesktop: {
    breakpoint: { max: 9999, min: 2048 },
    items: 8,
  },
  largeDesktop: {
    breakpoint: { max: 2048, min: 1440 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1440, min: 768 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 768, min: 0 },
    items: 3,
  },
};

const ButtonGroup = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="carousel-button-group btn-group-detail">
      <button
        className={"left"}
        disabled={currentSlide === 0 ? true : false}
        hidden={currentSlide === 0 ? true : false}
        onClick={() => previous()}
      >
        <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            style={{ fill: '#d1d5db' }}
        >
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
        </svg>
      </button>
      <button
        className={"right"}
        disabled={
          rest.carouselState.currentSlide + rest.carouselState.slidesToShow ===
          10
            ? true
            : false
        }
        hidden={
          rest.carouselState.currentSlide + rest.carouselState.slidesToShow ===
          10
            ? true
            : false
        }
        onClick={() => next()}
      >
        <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            style={{ fill: '#d1d5db' }}
        >
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
      </button>
    </div>
  );
};

const DetailFilm = () => {
  const homeData = useSelector((state) => state.listTatCa.homeData);
  const [popupId, setPopupID] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const local= JSON.parse(localStorage.getItem("home"));
    if (Object.keys(homeData).length === 0)
      if (local == undefined || parseInt(local.time) + 1000 * 60 * 60 * 3 < Date.now()) // call new api sau 3 tieng
        axios.get(process.env.REACT_APP_API_LOCAL + "film/home").then((res) => {
          dispatch(setListHome(res.data));
          res.data.time = Date.now();
          localStorage.setItem("home", JSON.stringify(res.data));
        });
      else dispatch(setListHome(local));
  }, []);

  const loadLoading = (numberItems, withNumber) => {
    if (withNumber)
      return [...Array(numberItems)].map((e, i) => (
        <FilmCard numberTrend={i + 1} loading={true} />
      ));
    else
      return [...Array(numberItems)].map((e, i) => <FilmCard loading={true} />);
  };

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

  const recommendFilm = () => {
    return (
      <section className="container mt-5">
        <div className="mb-3">
          <h3 className="primary-color mb-4 pb-2">Phim Đề xuất</h3>
          <div className="item mg-card">
            <Carousel
              responsive={responsive_multi_carsousel}
              customButtonGroup={<ButtonGroup />}
              arrows={false}
            >
              {Object.keys(homeData).length == 0
                ? loadLoading(6, false)
                : Object.keys(homeData.recommend).map((e, i) => (
                    <div className="">
                    <FilmCard
                      data={homeData.recommend[e]}
                      key={homeData.recommend[e].id + "recom"}
                      click={setPopupID}
                    />
                    </div>
                  ))}
            </Carousel>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div>
      <div
        className="details"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original//cinER0ESG0eJ49kXlExM0MEWGxW.jpg)`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="details-container">
            <div className="details-poster">
              <img
                className="details-poster-img"
                src={'https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg'}
                alt="poster"
              />
            </div>
            <div className="details-info">
              <h1 className="details-info-title">Tên phim</h1>
              <p className="details-info-overview">Mô tả</p>
              <p className="genres">Thể loại</p>
              <p className="nation">Quốc gia</p>
              <p className="time-film">Thời lượng</p>
              <p className="year-film">Năm</p>
              <div className="watch mb-4">
                <Link className="background-primary btn btn-go-film" to={"/home"}>Xem phim</Link>
                <a className="background-primary btn ms-4 btn-go-trailer" href="#title-video-trailer">Xem Trailer</a>
              </div>
              <div className="save">
                <button className="btn text-white btn_save"><i class="fa fa-plus"></i> Thêm vào danh sách</button>
                <button className="btn text-white btn_save ms-4"><i class="fa fa-unlock-alt"></i> Mở khóa vip</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-background p-5" id="title-video-trailer">
        <div className="container">
          <h2 className="primary-color text-center mt-4">TRAILER</h2>
          <div className="video-trailer background-item mt-4">
            <p className="text-white text-center">Video trailer</p>
          </div>
          {recommendFilm()}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default DetailFilm;
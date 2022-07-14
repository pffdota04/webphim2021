import "./style.css";
import Carousel from "react-multi-carousel";
import "../../../node_modules/react-multi-carousel/lib/styles.css";
import ModalAlert from "../../components/ModalAlart/ModalAlert";

import Footer from "../../components/Footer";
// import PopupFilm from "./../../components/PopupFilm";
import FilmCard from "./../../components/FilmCard";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setListHome } from "../../store/actions/listPhim_Action";
import { Link } from "react-router-dom";
import PopupFilm from "../../components/PopupFilm";
import MetaTags from "react-meta-tags";

// Sick
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.min.css";
// import 'swiper/swiper.scss'; // core Swiper
import "./../../../node_modules/swiper/swiper.scss";
import "./../../../node_modules/swiper/modules/navigation/navigation.scss";
import "./../../../node_modules/swiper/modules/pagination/pagination.scss";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper";
// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);

const responsive_multi_carsousel = {
  superLargeDesktop: {
    breakpoint: { max: 9999, min: 1440 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1000 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1000, min: 0 },
    items: 3,
  },
};

const ButtonGroup = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="carousel-button-group">
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
          style={{ fill: "#d1d5db" }}
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
          style={{ fill: "#d1d5db" }}
        >
          <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
      </button>
    </div>
  );
};

const Home = () => {
  const homeData = useSelector((state) => state.listTatCa.homeData);

  const [popupId, setPopupID] = useState(null);
  // const [lis, listTrending] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const local = JSON.parse(localStorage.getItem("home"));
    if (Object.keys(homeData).length === 0)
      // axios.get(process.env.REACT_APP_API_DEPLOYED2 + "film/home").then((res) => {
      axios
        .get(process.env.REACT_APP_API_DEPLOYED2 + "film/homepage")
        .then((res) => {
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

  //TOP PHIM RECOMEMD (with a beutiful backgroup mlem mlem...)
  const topFilm = () => {
    return Object.keys(homeData).length == 0 ? (
      <div className="Swiper-loading-top">
        <svg
          className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
          style={{ width: "100%", height: "60vh" }}
          role="img"
          aria-label="Placeholder: First slide"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Đang tải</title>
          <rect width="100%" height="100%" fill="#555" />
        </svg>
        <div className="carousel-caption text-start">
          <h1> Loading...</h1>
        </div>
      </div>
    ) : (
      <Swiper
        style={{ background: "black" }}
        effect={"coverflow"}
        grabCursor={false}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {homeData.top.map((e, i) => (
          <SwiperSlide className="slide-top">
            {/* <<<<<<< HEAD
            <div className="carousel-caption text-start">
              <h1>{e.title}</h1>
              <p className="mota">{homeData.topdetail[i].description}</p>
              <Link
                className="btn btn-lg background-primary res-btn"
                to={"/detailfilm/" + e._id + "/" + e.title}
              >
                Xem ngay!
              </Link>
======= */}
            {/* <div> */}
            <div className="carousel-caption text-start shadowContent">
              <div className="bannerHome">
                <h1>{e.title}</h1>
                <p className="mota">{homeData.topdetail[i].description}</p>
                <Link
                  className="btn btn-lg background-primary res-btn"
                  to={"/detailfilm/" + e._id + "/" + e.title}
                >
                  Xem ngay!
                </Link>
              </div>
            </div>
            <img
              style={{
                width: "100%",
                height: "90vh",
                objectFit: "cover",
              }}
              className="img-info-film mx-auto  d-block"
              src={homeData.topdetail[i].backimg}
              alt="ảnh top"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  const trendingFilm = () => {
    return (
      <section className="container">
        <div className="trending mb-3">
          <h3 className="pb-2 primary-color mb-4">Phim Hot</h3>
          <div className="item mg-card">
            <Carousel
              responsive={responsive_multi_carsousel}
              customButtonGroup={<ButtonGroup />}
              arrows={false}
            >
              {Object.keys(homeData).length == 0
                ? loadLoading(6, true)
                : // Object.keys(homeData.trending).map((e, i) => (
                  Object.values(homeData.trending)
                    .sort((a, b) => {
                      return a.trending - b.trending;
                    })
                    .map((e, i) => (
                      <div className="">
                        <FilmCard
                          key={i + "trend"}
                          numberTrend={i + 1}
                          // data={homeData.trending[e]}
                          data={e}
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
                : homeData.recommend.map((e, i) => (
                    <div className="">
                      <FilmCard
                        data={e}
                        key={e._id + "recom"}
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

  const lastFilm = () => {
    return (
      <section className="container mt-5">
        <div className="mb-3">
          <h3 className="primary-color mb-4 pb-2">Phim Mới Cập Nhật</h3>
          <div className="item mg-card">
            <Carousel
              responsive={responsive_multi_carsousel}
              customButtonGroup={<ButtonGroup />}
              arrows={false}
            >
              {Object.keys(homeData).length == 0
                ? loadLoading(6, false)
                : Object.values(homeData.last).reverse().map((e, i) => (
                    <div className="">
                      <FilmCard
                        data={e}
                        key={e._id + "recom"}
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
    <div className="container-home">
      <MetaTags>
        <title>Trang chủ Kphim</title>
        <meta
          name="description"
          content={
            "Xem nhiều phim hay cập nhật liên tục tại Kphim.xyz với chất lượng cao HD, fullHD, 4K, Bluray,.. với tốc độ cực mạnh!"
          }
        />
      </MetaTags>
      {topFilm()}
      <div className="container-fluid container-background pt-5 pb-5">
        {/* <h4 className="text-warning text-center">
          Free vip now! Đăng nhập để xem tất cả quality!
          <span className="text-muted">
            (real film in quality '1080p VIP1')
          </span>
        </h4> */}
        {trendingFilm()}
        {recommendFilm()}
        {lastFilm()}
      </div>
      <PopupFilm data={popupId} click={setPopupID} />

      <Footer />
      <Link
        to="/kitkot"
        className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center btn-all-screen fsbtnNews"
      >
        Kitkot
      </Link>
      <Link
        to="/tintuc"
        className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center btn-all-screen btn-all-2 fsbtnNews"
      >
        News
      </Link>
      <a
        class="d-flex align-items-center justify-content-center btn-all-screen btn-all-3"
        href="https://www.facebook.com/websitexemphimtructuyenKphim/posts/103204582455101"
        target="_blank"
      >
        <img
          src="https://shoptam113.com/upload-usr/tam113/qua-tang.gif"
          alt=""
          className="imgGift"
        />
      </a>
    </div>
  );
};

export default Home;

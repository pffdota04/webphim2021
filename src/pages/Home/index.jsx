import "./style.css";
import Carousel from "react-multi-carousel";
import "../../../node_modules/react-multi-carousel/lib/styles.css";

import Footer from "../../components/Footer";
import PopupFilm from "./../../components/PopupFilm";
import FilmCard from "./../../components/FilmCard";

import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setListHome } from "../../store/actions/listPhim_Action";
import { Link } from "react-router-dom";

const responsive_multi_carsousel = {
  superLargeDesktop: {
    breakpoint: { max: 8000, min: 1200 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1200, min: 768 },
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
    <div className="carousel-button-group">
      <button
        className={"left"}
        disabled={currentSlide === 0 ? true : false}
        hidden={currentSlide === 0 ? true : false}
        onClick={() => previous()}
      ></button>
      <button
        className="right"
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
      ></button>
    </div>
  );
};

const Home = () => {
  const homeData = useSelector((state) => state.listTatCa.homeData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(homeData).length === 0)
      axios.get(process.env.REACT_APP_API_LOCAL + "film/home").then((res) => {
        dispatch(setListHome(res.data));
      });
  }, []);

  //TOP PHIM RECOMEMD (with a beutiful backgroup mlem mlem...)
  const topFilm = () => {
    return (
      <section
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {Object.keys(homeData).length == 0 ? (
            <div className="carousel-item active backimg">
              <svg
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                style={{ width: "100%", height: "60vh" }}
                xmlns="http://www.w3.org/2000/svg"
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
                <p className="mota">Loading...</p>
                <p>
                  <button className="btn btn-lg btn-danger">Loading...</button>
                </p>
              </div>
            </div>
          ) : (
            Object.keys(homeData.top).map((e, i) => (
              <div
                className={"carousel-item backimg" + (i == 0 ? " active " : "")}
              >
                <img
                  style={{
                    width: "100%",
                    height: "60vh",
                    objectFit: "cover",
                  }}
                  className=" mx-auto  d-block"
                  src={homeData.top[e].backimg}
                  alt="ảnh top"
                ></img>
                <div className="carousel-caption text-start">
                  <h1>{homeData.top[e].title}</h1>
                  <p className="mota">{homeData.top[e].description}</p>
                  <p>
                    <button
                      className="btn btn-lg btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={"#ItemModal" + homeData.top[e].id}
                    >
                      Xem ngay!
                    </button>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </section>
    );
  };

  const trendingFilm = () => {
    return (
      <section>
        <div className="trending mb-3">
          <h1 className="text-center pb-2">TRENDING</h1>
          <div className="item">
            <Carousel
              responsive={responsive_multi_carsousel}
              customButtonGroup={<ButtonGroup />}
              arrows={false}
            >
              {Object.keys(homeData).length == 0
                ? [...Array(6)].map((e, i) => (
                    <FilmCard
                      key={i + "xtren1d"}
                      numberTrend={i + 1}
                      loading={true}
                    />
                  ))
                : Object.keys(homeData.trending).map((e, i) => (
                    <div>
                      <FilmCard
                        key={i + "trend"}
                        numberTrend={i + 1}
                        data={homeData.trending[e]}
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
      <section>
        <div className="mb-3">
          <h1 className="text-center pb-2">RECOMMEND</h1>
          <div className="item">
            <Carousel
              responsive={responsive_multi_carsousel}
              customButtonGroup={<ButtonGroup />}
              arrows={false}
            >
              {Object.keys(homeData).length == 0
                ? [...Array(6)].map((e, i) => <FilmCard loading={true} />)
                : Object.keys(homeData.recommend).map((e, i) => (
                    <FilmCard
                      data={homeData.recommend[e]}
                      key={homeData.recommend[e].id + "recom"}
                    />
                  ))}
            </Carousel>
          </div>
        </div>
      </section>
    );
  };

  const lastFilm = () => {
    return (
      <section>
        <div className="mb-3">
          <h1 className="text-center pb-2">LAST UPDATE</h1>
          <div
            className="row justify-content-md-center last-update-list mx-auto"
            style={{ justifyContent: "center !important" }}
          >
            {Object.keys(homeData).length == 0
              ? [...Array(12)].map((e, i) => (
                  <div className="col-4 col-md-3 col-xl-2 ps-0 pe-1">
                    <FilmCard key={i + 1} loading={true} />
                  </div>
                ))
              : Object.keys(homeData.last).map((e, i) => (
                  <div className="col-4 col-md-3 col-xl-2 ps-0 pe-1">
                    <FilmCard
                      key={homeData.last[e].id + "last"}
                      data={homeData.last[e]}
                    />
                  </div>
                ))}
          </div>
        </div>
        <div className="text-center mx-auto pb-5 pt-3">
          <Link to="/phim/tatca">Xem thêm</Link>
        </div>
      </section>
    );
  };

  useEffect(() => {}, [homeData]);
  return (
    <div>
      {topFilm()}
      <div className="container-fluid">
        <hr className="mt-5 mb-2" />
        {trendingFilm()}
        <hr className="mt-5 mb-2" />
        {recommendFilm()}
        <hr className="mt-5 mb-2" />
        {lastFilm()}
      </div>
      {/* POPUP ITEM FOR ALL*/}
      {Object.keys(homeData).map((e, i) => {
        return Object.keys(homeData[e]).map((ee, ii) => {
          return (
            <PopupFilm
              key={homeData[e][ee].id + e + ee}
              data={homeData[e][ee]}
              numberTrend={i + 1}
            />
          );
        });
      })}
      <Footer />
    </div>
  );
};
export default Home;

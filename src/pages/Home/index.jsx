import "./style.css";
import Carousel from "react-multi-carousel";
import "../../../node_modules/react-multi-carousel/lib/styles.css";

import Footer from "../../components/Footer";
// import PopupFilm from "./../../components/PopupFilm";
import FilmCard from "./../../components/FilmCard";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setListHome } from "../../store/actions/listPhim_Action";
import { Link } from "react-router-dom";
import PopupFilm from "../../components/PopupFilm";

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

  const [popupId, setPopupID] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
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
                <p className="mota">. . .</p>
                <button className="btn btn-lg btn-danger">Loading...</button>
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

                  <button
                    className="btn btn-lg btn-danger"
                    onClick={() => setPopupID(homeData.top[e])}
                  >
                    Xem ngay!
                  </button>
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
          <h1 className="text-center pb-2">TRENDING </h1>
          <div className="item">
            <Carousel
              responsive={responsive_multi_carsousel}
              customButtonGroup={<ButtonGroup />}
              arrows={false}
            >
              {Object.keys(homeData).length == 0
                ? loadLoading(6, true)
                : Object.keys(homeData.trending).map((e, i) => (
                    <div>
                      <FilmCard
                        key={i + "trend"}
                        numberTrend={i + 1}
                        data={homeData.trending[e]}
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
                ? loadLoading(6, false)
                : Object.keys(homeData.recommend).map((e, i) => (
                    <FilmCard
                      data={homeData.recommend[e]}
                      key={homeData.recommend[e].id + "recom"}
                      click={setPopupID}
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
      <section className="container">
        <div className="mb-3">
          <h1 className="text-center pb-2">LAST UPDATE</h1>
          <div className="row justify-content-md-center last-update-list mx-auto overflow-hidden">
            {Object.keys(homeData).length == 0
              ? [...Array(12)].map((e, i) => (
                  <div className="col-4 col-xl-3 pb-2 mx-auto ps-0 pe-1">
                    <FilmCard loading={true} />
                  </div>
                ))
              : Object.keys(homeData.last).map((e, i) => (
                  <div className="col-4 col-xl-3 pb-2 mx-auto ps-0 pe-1">
                    <FilmCard
                      key={homeData.last[e].id + "last"}
                      data={homeData.last[e]}
                      click={setPopupID}
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
      <PopupFilm data={popupId} click={setPopupID} />
      {/* {popupId != null && (
        <div>
          <div
            className="modal fade popup-none-in-first bd-example-modal-sm  show"
            id="ItemModal7"
            aria-modal="true"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="Invisible" onClick={() => setPopupID(null)}></div>
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content bg-light text-dark  trailer-ytb">
                <div className="modal-header p-2" id="header-popup">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {popupId.title} ({popupId.year})
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setPopupID(null)}
                    id="bt-close"
                  />
                </div>
                <div className="position-relative">
                  <img
                    src={
                      popupId.backimg == undefined
                        ? "https://i.imgur.com/sLwEvjw.jpg"
                        : popupId.backimg
                    }
                    alt="youtube thumnail image"
                    className="w-100 img-trailer"
                    loading="lazy"
                  ></img>
                  <div className="play">
                    <p className=" text-light pt-4 mt-5 text-center">Trailer</p>
                  </div>
                </div>

                <div className=" mx-auto text-ten-line ">
                  <p className="text-center mb-0">
                    <strong>
                      {popupId.title} ({popupId.title_origin})
                    </strong>
                  </p>
                  <p className="text-center mb-0">
                    Diễn viên:
                    <div className="the-loai-popup">{popupId.actor}</div> | Đạo
                    diễn:
                    <div className="the-loai-popup">{popupId.director}</div>
                  </p>

                  <p className="text-center">
                    Thể loại:
                    {Object.values(popupId.type).map((e) => (
                      <div className="the-loai-popup">{e}</div>
                    ))}
                  </p>
                  <hr className="w-50 mx-auto" />
                  <p className="text-left ps-3 pe-2">
                    &nbsp;&nbsp;{popupId.description}
                  </p>
                  <p className="text-center">
                    Được phát hành vào năm {popupId.year}
                  </p>
                </div>
                <div className="modal-footer p-1">
                  <Link
                    className="w-100 p-0 m-0 mb-1 btn btn-danger text-center pb-1"
                    aria-label="Close"
                    to={"/watch/" + popupId.id + "/" + popupId.title}
                  >
                    Xem ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
      <Footer />
    </div>
  );
};
export default Home;

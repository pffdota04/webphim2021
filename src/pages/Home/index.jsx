import PopupFilm from "./../../components/PopupFilm";
import FilmCard from "./../../components/FilmCard";

import "./style.css";

import Carousel from "react-multi-carousel";
import "../../../node_modules/react-multi-carousel/lib/styles.css";
import Footer from "../../components/Footer";
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
  return (
    <div>
      {/* HOT PHIM RECOMEMD with a beutiful backgroup mlem mlem... */}
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active backimg">
            <svg
              className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
              width={800}
              height={500}
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: First slide"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#555" />
              <text x="50%" y="50%" fill="#333" dy=".3em">
                First Image
              </text>
            </svg>
            <div className="carousel-caption text-start">
              <h1>Avenger: Start game</h1>
              <p className="mota">
                Sau những sự kiện tàn khốc của Avengers: Infinity War (2018), vũ
                trụ đang dần tàn lụi. Với sự giúp đỡ của các đồng minh còn lại,
                các Avengers tập hợp một lần nữa để đảo ngược hành động của
                Thanos và khôi phục lại sự cân bằng cho vũ trụ. Trận chiến cuối
                cùng của các siêu anh hùng trước thế lực mạnh mẽ của Thanos.
              </p>
              <p>
                <button
                  className="btn btn-lg btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#ItemModalTop24"
                >
                  Xem ngay!
                </button>
              </p>
            </div>
          </div>
          <div className="carousel-item backimg">
            <svg
              className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
              width={800}
              height={500}
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: Second slide"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#777" />
              <text x="50%" y="50%" fill="#555" dy=".3em">
                Second Image
              </text>
            </svg>
            <div className="carousel-caption text-start">
              <h1>Avenger: Mid game</h1>
              <p className="mota">
                Sau những sự kiện tàn khốc của Avengers: Infinity War (2018), vũ
                trụ đang dần tàn lụi. Với sự giúp đỡ của các đồng minh còn lại,
                các Avengers tập hợp một lần nữa để đảo ngược hành động của
                Thanos và khôi phục lại sự cân bằng cho vũ trụ. Trận chiến cuối
                cùng của các siêu anh hùng trước thế lực mạnh mẽ của Thanos.
              </p>
              <p>
                <button
                  className="btn btn-lg btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#ItemModalTop24"
                >
                  Xem ngay!
                </button>
              </p>
            </div>
          </div>
          <div className="carousel-item backimg">
            <svg
              className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
              width={800}
              height={500}
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: First slide"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#555" />
              <text x="50%" y="50%" fill="#333" dy=".3em">
                Thỉd Image
              </text>
            </svg>
            <div className="carousel-caption text-start">
              <h1>Avenger: End game</h1>
              <p className="mota">
                Sau những sự kiện tàn khốc của Avengers: Infinity War (2018), vũ
                trụ đang dần tàn lụi. Với sự giúp đỡ của các đồng minh còn lại,
                các Avengers tập hợp một lần nữa để đảo ngược hành động của
                Thanos và khôi phục lại sự cân bằng cho vũ trụ. Trận chiến cuối
                cùng của các siêu anh hùng trước thế lực mạnh mẽ của Thanos.
              </p>
              <p>
                <button
                  className="btn btn-lg btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#ItemModalTop24"
                >
                  Xem ngay!
                </button>
              </p>
            </div>
          </div>
          <div className="carousel-item backimg">
            <svg
              className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
              width={800}
              height={500}
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: Second slide"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#777" />
              <text x="50%" y="50%" fill="#555" dy=".3em">
                Last Image
              </text>
            </svg>
            <div className="carousel-caption text-start">
              <h1>Avenger: Last game</h1>
              <p className="mota">
                Sau những sự kiện tàn khốc của Avengers: Infinity War (2018), vũ
                trụ đang dần tàn lụi. Với sự giúp đỡ của các đồng minh còn lại,
                các Avengers tập hợp một lần nữa để đảo ngược hành động của
                Thanos và khôi phục lại sự cân bằng cho vũ trụ. Trận chiến cuối
                cùng của các siêu anh hùng trước thế lực mạnh mẽ của Thanos.
              </p>
              <p>
                <button
                  className="btn btn-lg btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#ItemModalTop24"
                >
                  Xem ngay!
                </button>
              </p>
            </div>
          </div>
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
      </div>
      <div className="container-fluid">
        <hr className="mt-5 mb-2" />
        {/* POPUP ITEM */}
        {[...Array(32)].map((e, i) => (
          <PopupFilm key={i + 1} title="Tựa phim" year={2021} id={i + 1} />
        ))}

        {/* TRENDING LIST */}
        <section>
          <div className="trending mb-3">
            <h1 className="text-center pb-2">TRENDING</h1>
            <div className="item">
              <Carousel
                responsive={responsive_multi_carsousel}
                customButtonGroup={<ButtonGroup />}
                arrows={false}
              >
                {[...Array(10)].map((e, i) => (
                  <FilmCard
                    key={i + 1}
                    numberTrend={i + 1}
                    title={"Tựa phim"}
                    year={2021}
                    id={i + 1}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </section>
        <hr className="mt-5 mb-2" />
        {/* RECOMMEND LIST */}
        <section>
          <div className="mb-3">
            <h1 className="text-center pb-2">RECOMMEND</h1>
            <div className="item">
              <Carousel
                responsive={responsive_multi_carsousel}
                customButtonGroup={<ButtonGroup />}
                arrows={false}
              >
                {[...Array(10)].map((e, i) => (
                  <FilmCard
                    key={i + 10}
                    title={"Tựa phim"}
                    year={2021}
                    id={i + 11}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </section>

        <hr className="mt-5 mb-2" />
        {/* Last update LIST */}
        <section>
          <div className="mb-3">
            <h1 className="text-center pb-2">LAST UPDATE</h1>
            <div
              className="row justify-content-md-center last-update-list mx-auto"
              style={{ justifyContent: "center !important" }}
            >
              {[...Array(12)].map((e, i) => (
                <div className="col-4 col-md-3 col-xl-2">
                  <FilmCard
                    key={i + 21}
                    title={"Tựa phim"}
                    year={2021}
                    id={i + 21}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mx-auto pb-5 pt-3">
            <a href="/">Xem thêm</a>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
};
export default Home;

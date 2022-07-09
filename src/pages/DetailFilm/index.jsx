import "./style.css";
import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import Footer from "../../components/Footer";
import Carousel from "react-multi-carousel";
import "../../../node_modules/react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataDetail } from "./../../store/actions/user";
import FilmCard from "./../../components/FilmCard";
import axios from "axios";
import { setListHome } from "../../store/actions/listPhim_Action";
import backdetail from "./../../assets/images/backdetail.jpg";
import MetaTags from "react-meta-tags";
import ModalAlert from "./../../components/ModalAlart/ModalAlert";

const responsive_multi_carsousel = {
  superLargeDesktop: {
    breakpoint: { max: 9999, min: 1440 },
    items: 5,
  },
  // largeDesktop: {
  //   breakpoint: { max: 2048, min: 1440 },
  //   items: 4,
  // },
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

const DetailFilm = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [popupVip, setPopupVip] = useState(null);
  const userDetail = useSelector((state) => state.userData.userDetail);
  const homeData = useSelector((state) => state.listTatCa.homeData);
  const [showAlert, setShowAlert] = useState(null);
  const [data, setData] = useState({ init: true });

  const [iconSave, setIconSave] = useState(0);
  const [iconUnlock, setIconUnlock] = useState(0);
  const dispatch = useDispatch();

  // new:
  const [info, setInfo] = useState({});
  const [detail, setDetail] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state === undefined) {
      //call api lay data
      // axios.get(process.env.REACT_APP_API_DEPLOYED2 + "film/" + id).then((res) => {
      //   if (res.data == null) setData(false);
      //   else {
      //     convert(res.data[0]);
      //   }
      // });

      axios
        .get(process.env.REACT_APP_API_DEPLOYED2 + "film/info/" + id)
        .then((res) => {
          setInfo(res.data);
        })
        .catch(setInfo(undefined));

      axios
        .get(process.env.REACT_APP_API_DEPLOYED2 + "film/detail/" + id)
        .then((res) => {
          let a = res.data;
          if (res.data.backimg === undefined) a.backimg = backdetail;
          setDetail(a);
        })
        .catch(setDetail(undefined));
    } else {
      // convert(location.state.data);
    }

    //  get recommend
    const local = JSON.parse(localStorage.getItem("home"));
    if (Object.keys(homeData).length === 0)
      if (
        local == undefined ||
        parseInt(local.time) + 1000 * 60 * 60 * 3 < Date.now()
      )
        // call new api sau 3 tieng
        axios
          .get(process.env.REACT_APP_API_DEPLOYED2 + "film/home")
          .then((res) => {
            dispatch(setListHome(res.data));
            res.data.time = Date.now();
            localStorage.setItem("home", JSON.stringify(res.data));
          });
      else dispatch(setListHome(local));
  }, [location.pathname]);

  useEffect(() => {
    if (userDetail.checkUser == "not") {
      setIconUnlock(-1);
      setIconSave(-1);
    } else if (
      userDetail.checkUser != "init" &&
      userDetail.checkUser != "not"
    ) {
      if (
        userDetail.saveFilm == undefined ||
        userDetail.saveFilm[id] == undefined
      )
        setIconSave(-1);
      else setIconSave(1);
      if (
        userDetail.unlockFilm == undefined ||
        userDetail.unlockFilm[id] == undefined
      )
        setIconUnlock(-1);
      else {
        setIconUnlock(
          Math.round(
            (userDetail.unlockFilm[id].end - Date.now()) / (1000 * 60 * 60 * 24)
          )
        );
      }
    }
  }, [userDetail]);


  const loadLoading = (numberItems, withNumber) => {
    if (withNumber)
      return [...Array(numberItems)].map((e, i) => (
        <FilmCard numberTrend={i + 1} loading={true} />
      ));
    else
      return [...Array(numberItems)].map((e, i) => <FilmCard loading={true} />);
  };

  // const params_theloai = [
  //   "action",
  //   "movie",
  //   "series",
  //   "scifi",
  //   "comedy",
  //   "anime",
  //   "adventure",
  //   "document",
  //   "fantasy",
  //   "history",
  //   "horror",
  //   "romance",
  //   "war",
  //   "drama",
  //   "crime",
  //   "family",
  // ];
  // const theloai = [
  //   "hành động",
  //   "phim lẻ",
  //   "phim bộ",
  //   "khoa học viễn tưởng",
  //   "hài",
  //   "anime",
  //   "phiêu lưu",
  //   "tài liệu",
  //   "kì ảo",
  //   "lịch sử",
  //   "kinh dị",
  //   "lãng mạn",
  //   "chiến tranh",
  //   "chính kịch",
  //   "tội phạm",
  //   "gia đình - trẻ em",
  // ];
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
      <section className="mt-5">
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
                        // click={setPopupID}
                      />
                    </div>
                  ))}
            </Carousel>
          </div>
        </div>
      </section>
    );
  };

  function unlockTHis(plan) {
    setPopupVip(null);
    if (userDetail.checkUser == "not") setShowAlert("Please login!");
    else if (userDetail.checkUser == false) setShowAlert("Please verified email!");
    else {
      setIsLoading(true);
      setIconUnlock(0);
      axios
        .post(process.env.REACT_APP_API_DEPLOYED2 + "user/unlock", {
          token: userDetail.token,
          fid: id,
          plan: plan,
        })
        .then((res) => {
          if (res.data.complete == true) {
            setShowAlert("Mở khóa thành công, bạn còn lại " + res.data.total + " Coin");
            let newDetail = userDetail;
            newDetail.coin = res.data.total;
            if (newDetail.unlockFilm === undefined)
              newDetail.unlockFilm = { [id]: res.data.info };
            else newDetail.unlockFilm[id] = res.data.info;
            dispatch(setUserDataDetail(newDetail));
            setIconUnlock(
              Math.round(
                (res.data.info.end - Date.now()) / (1000 * 60 * 60 * 24)
              )
            );
            // getDataByTokenId();
            // forceUpdate();
          } else setShowAlert(res.data.complete);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    }
  }

  function saveThis() {
    if (userDetail.checkUser == "not")
      // return history.push("/login");
      setShowAlert("Vui lòng đăng nhập!");
    else {
      setIconSave(0);
      axios
        .post(process.env.REACT_APP_API_DEPLOYED2 + "user/savefilm", {
          token: userDetail.token,
          fid: id,
        })
        .then((res) => {
          let newDetail = userDetail;
          if (res.data.complete == "added") {
            setIconSave(1);
            if (newDetail.saveFilm === undefined)
              newDetail.saveFilm = { [id]: { fid: parseInt(id) } };
            else newDetail.saveFilm[id] = { fid: parseInt(id) };
          } else if (res.data.complete == "removed") {
            setIconSave(-1);
            delete newDetail.saveFilm[id];
          }
          dispatch(setUserDataDetail(newDetail));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  // return data === false ? (
  return info === null ? (
    <Redirect to="/404" />
  ) : (
    <div>
      <MetaTags>
        <title>{!!info && info.title}</title>
        {/* <title>{data.title}</title> */}
        <meta
          name="description"
          content={
            data.description +
            ". Xem nhiều phim hay cập nhật liên tục tại Kphim.xyz với chất lượng cao HD, fullHD, 4K, Bluray,.. với tốc độ cực mạnh!"
          }
        />
      </MetaTags>
      {showAlert && (
        <ModalAlert
          title={"Thông báo"}
          content={showAlert}
          close={() => setShowAlert(null)}
        />
      )}
      <div
        className="details w-100"
        style={{
          backgroundImage: detail != undefined && detail.backimg,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="details-container">
            <div className="details-poster">
              <img
                className="details-poster-img"
                src={info !== undefined ? info.img : ""}
                alt="poster"
              />
            </div>
            
            <div className="details-info">
              <h1 className="details-info-title text-light w-100 text-center text-xl-start">
                {info !== undefined && info.title}
              </h1>
              <p className="details-info-overview">
                {detail !== undefined && detail.description}
              </p>
              <p className="genres">
                Thể loại:
                {
                  // data.converted === true &&
                  // Object.values(data.type2)
                  info !== undefined &&
                    info.type !== undefined &&
                    Object.values(info.type).map((e) => (
                      <Link
                        className="btn btn-sm btn-outline-light ms-1 mt-1 mb-1"
                        to={"/phim/" + e}
                      >
                        {e}
                      </Link>
                    ))
                }
              </p>

              <p className="nation">
                Quốc gia:{" "}
                {info !== undefined && info.country !== undefined && (
                  <Link
                    className="btn btn-sm btn-outline-light ms-1 mt-1 mb-1"
                    to={"/phim/" + info.country}
                  >
                    {quocgia[params_quocgia.indexOf(info.country)]}
                  </Link>
                )}
              </p>
              <p className="time-film">
                Số tập: {detail !== undefined && detail.length}
              </p>
              <p className="year-film">
                Năm: {info !== undefined && info.year}
              </p>
              <p className="year-film">
                Giá VIP: <u>{detail !== undefined && detail.price} Koin</u>
              </p>
              <div className="watch mb-4">
                {info !== undefined && info.disable != true && (
                  <Link
                    className="background-primary btn btn-go-film"
                    to={
                      "/watchnew/" +
                      id +
                      "/" +
                      (info.title !== undefined
                        ? info.title.replaceAll(" ", "-")
                        : "")
                    }
                  >
                    Xem phim
                  </Link>
                )}
                <a
                  className="background-primary btn ms-4 btn-go-trailer"
                  href="#title-video-trailer"
                >
                  Xem Trailer
                </a>
                {/* {JSON.stringify(detail)} */}
              </div>
              {info !== undefined && info.disable != true ? (
                <div className="listAction">
                  <button
                    className="btn text-white btn_save m-1"
                    onClick={() => saveThis()}
                  >
                    {iconSave === 0 ? (
                      <div>
                        <div
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                        ></div>
                        Đang tải ...
                      </div>
                    ) : iconSave === 1 ? (
                      <div>
                        <i class="fa fa-trash"></i> Xóa khỏi danh sách
                      </div>
                    ) : (
                      <div>
                        <i class="fa fa-plus"></i> Thêm vào danh sách
                      </div>
                    )}
                  </button>
                  <button
                    className="btn text-white btn_save m-1"
                    onClick={() => {
                      setPopupVip(1);
                    }}
                    disabled={iconUnlock > 0 && "true"}
                  >
                    {iconUnlock === 0 ? (
                      <div>
                        <div
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                        ></div>
                        Đang tải ...
                      </div>
                    ) : iconUnlock === -1 ? (
                      <div>
                        <i class="fa fa-unlock-alt"></i> Mở khóa vip
                      </div>
                    ) : (
                      <div>
                        <i class="fa fa-hourglass"></i> Còn lại {iconUnlock}{" "}
                        ngày VIP
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                <div>Hiện tại không thể xem phim này!</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-background p-5" id="title-video-trailer">
        <div className="container pb-3">
          <h2 className="primary-color text-center mt-4">TRAILER</h2>
          <div className="video-trailer background-item mt-4">
            {detail !== undefined && (
              <iframe
                className="w-100 h-100"
                // width="560"
                // height="315"
                src={"https://www.youtube.com/embed/" + detail.yttrailer}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            )}
            {/* <p className="text-white text-center">Video trailer</p> */}
          </div>
          {recommendFilm()}
        </div>
      </div>
      {popupVip != null && (
        <div>
          <div
            class="modal  fade show text-light"
            id="unlockFilmPlan"
            aria-modal="true"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="Invisible" onClick={() => setPopupVip(null)}></div>
            <div class="modal-dialog  modal-dialog-centered ">
              <div class="modal-content bg-dark p-3 border border-3 rounded-3">
                <div class="modal-header">
                  <h5 class="modal-title primary-color" id="staticBackdropLabel">
                    Mở khóa VIP cho phim này
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setPopupVip(null)}
                    id="bt-close"
                  />
                </div>
                <div class="modal-body">
                  <div className="row p-1">
                    {userDetail.checkUser == "not" ? (
                      <h5 className="text-center mb-3">
                        <Link to="/login">Đăng nhập</Link> để thực hiện chức
                        năng
                      </h5>
                    ) : userDetail.checkUser == "not verified" ? (
                      <h5 className="text-center mb-3">
                        <Link to="/xacthuc">Xác thực email</Link> để thực hiện
                        chức năng
                      </h5>
                    ) : (
                      <h5 className="text-center mb-3">
                        Số dư của bạn:{" "}
                        <strong className="primary-color">
                          {userDetail.coin}
                        </strong>{" "}
                        Coin
                      </h5>
                    )}

                    <div className="col-12 border mb-3 p-2">
                      <span>
                        Mở khóa <strong className="primary-color">3</strong>{" "}
                        ngày với{" "}
                        <strong className="primary-color">
                          {detail.price}
                        </strong>{" "}
                        Coin
                      </span>
                      <button
                        className="btn btn-sm background-primary float-mk"
                        disabled={userDetail.coin < detail.price}
                        onClick={() => unlockTHis(0)}
                      >
                        Mở khóa
                      </button>
                    </div>
                    <div className="col-12 border mb-3 p-1">
                      <span>
                        Mở khóa <strong className="primary-color">7</strong>{" "}
                        ngày với{" "}
                        <strong className="primary-color">
                          {detail.price * 2}
                        </strong>{" "}
                        Coin
                      </span>
                      <button
                        className="btn btn-sm background-primary float-mk"
                        disabled={userDetail.coin < detail.price * 2}
                        onClick={() => unlockTHis(1)}
                      >
                        Mở khóa
                      </button>
                    </div>
                    <div className="col-12 border mb-3 p-1">
                      <span>
                        Mở khóa <strong className="primary-color">14</strong>{" "}
                        ngày với{" "}
                        <strong className="primary-color">
                          {detail.price * 3}
                        </strong>{" "}
                        Coin
                      </span>
                      <button
                        className="btn btn-sm background-primary float-mk"
                        disabled={userDetail.coin < detail.price * 3}
                        onClick={() => unlockTHis(2)}
                      >
                        Mở khóa
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    type="button"
                    class="btn btn-secondary mx-auto"
                    onClick={() => setPopupVip(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default DetailFilm;

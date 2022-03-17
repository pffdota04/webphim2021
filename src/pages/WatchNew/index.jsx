import "./style.css";
import qc from "./../../assets/images/quang-cao.jpg";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Footer from "../../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { setUserDataDetail } from "../../store/actions/user";
import { Link } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import Loading from "../../components/Loading";
import MetaTags from "react-meta-tags";
import { db } from "../../services/firebase";

import { Player } from "react-tuby";
import "react-tuby/css/main.css";

const WatchNew = () => {
  const { id, name } = useParams();

  const [dataFilmState, setDataFilmState] = useState({});
  const [dataLink, setDataLink] = useState();
  const [nowChap, setnowChap] = useState(-1);
  const [nowServer, setnowServer] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const [loadingData, setLoading] = useState(true);
  const [iconSave, setIconSave] = useState(0);
  const [iconUnlock, setIconUnlock] = useState(0);
  const [popupVip, setPopupVip] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [view, setView] = useState(null);

  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userData.userDetail);

  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);

    // chueyenr qua api
    let clear;
    db.ref()
      .child("view/" + id)
      .get()
      .then((res) => {
        let a = res.val();
        if (a == null) {
          setView(0);
        } else {
          setView(a.view);
        }
        clear = setTimeout(() => {
          db.ref()
            .child("view/" + id)
            .get()
            .then((newRes) => {
              if (newRes.val() == null) {
                newRes.ref.update({ view: 0 });
              } else {
                let x = newRes.val().view + 1;
                newRes.ref.update({ view: x }, (e) => console.log(e));
              }
            });
        }, 30000);
      })
      .catch((e) => console.log(e));

    return () => clearInterval(clear);
  }, []);

  useEffect(() => {
    if (dataFilmState.id == undefined) {
      axios.get(process.env.REACT_APP_API_LOCAL + "film/" + id).then((res) => {
        console.log(res.data[0]);
        if (name != res.data[0].title)
          history.push("/watchnew/" + id + "/" + res.data[0].title);
        setDataFilmState(res.data[0]);
      });
    }
    if (dataFilmState.disabled) {
      setLoading(false);
      setIsDisable(true);
    } else {
      if (dataLink == null)
        if (userDetail.checkUser != "init") {
          if (userDetail.checkUser === "not") getDataByParamsId();
          else getDataByTokenId();
        }
    }
  }, [userDetail]);

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

  const getDataByParamsId = () => {
    // axios.get(process.env.REACT_APP_API_LOCAL + "link/" + id).then((res) => {
    //   setDataLink(res.data);
    //   if (res.data != null) {
    //     setnowServer(res.data[0].server);
    //     setnowChap(res.data[0].chap);
    //   }
    //   setLoading(false);
    // });

    db.ref()
      .child("phimlinkdefaul")
      .orderByChild("film_id")
      .equalTo(parseInt(id))
      .get()
      .then((res) => {
        setDataLink(Object.values(res.val()));
        if (res.val() != null) {
          setnowChap(Object.values(res.val())[0].chap);
        }
        console.log(Object.values(res.val()));
        setLoading(false);
      })
      .catch((e) => alert(e));
  };

  const getDataByTokenId = () => {
    // db.ref()
    //   .child("phimlinkdefaul")
    //   .orderByChild("film_id")
    //   .equalTo(parseInt(id))
    //   .get()
    //   .then((res) => {
    //     setDataLink(Object.values(res.val()));
    //     if (res.val() != null) {
    //       setnowChap(Object.values(res.val())[0].chap);
    //     }
    //     console.log(Object.values(res.val()));
    //     setLoading(false);
    //   })
    //   .catch((e) => alert(e));
    axios
      .post("http://localhost:5000/api/link/vip2", {
        token: userDetail.token,
        fid: id,
      })
      .then((res) => {
        console.log(res.data);
        setDataLink(res.data);
        setLoading(false);
      })
      .catch((e) => alert(e));
  };

  function uniqByKeepFirst(a, key) {
    let seen = new Set();
    return a.filter((item) => {
      let k = key(item);
      return seen.has(k) ? false : seen.add(k);
    });
  }

  function contentVideoView() {
    return loadingData == true ? (
      <div className="container loading-film background-item mt-4">
        <h1 className="text-center primary-color container-load">
          {" "}
          Đang tải dữ liệu...
        </h1>
      </div>
    ) : isDisable ? (
      <div className="container loading-film background-item mt-4">
        <div className="text-center container-load">
          <h1 className="primary-color">Tạm thời không thể xem phim này!</h1>
        </div>
      </div>
    ) : dataLink == null ? (
      <div className="container loading-film background-item mt-4">
        <div className="text-center container-load">
          <h1 className="primary-color">Không tìm thấy dữ liệu!</h1>
          <p className="primary-color">(Phim đang trong quá trình cập nhật)</p>
        </div>
      </div>
    ) : (
      <div>
        <div id="filmView" className={"container ps-5 pe-5"}>
          {dataLink.map((e, i) => (
            <div className="text-center">
              {e.chap == nowChap && e.server == nowServer && (
                <div>
                  <div className="text-white title-film">
                    {dataFilmState.title == undefined ? (
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="container">
                        <h5 className="primary-color">
                          {dataFilmState.title} ({dataFilmState.title_origin})
                        </h5>
                        <span>{view} lượt xem</span>
                        {/* {JSON.stringify(dataLink)} */}
                      </div>
                    )}
                  </div>
                  {JSON.stringify(e)}
                  <Player
                    src={Object.keys(e.link).map((e2) => {
                      console.log(e2);
                      return { quality: e2, url: e.link[e2] };
                    })}
                    subtitles={Object.keys(dataLink[0].sub).map((e) => {
                      return {
                        lang: e,
                        url: dataLink[0].sub[e],
                        language:
                          e === "en"
                            ? "Tiếng Anh"
                            : e === "fr"
                            ? "Tiếng Pháp"
                            : "Tiếng Việt",
                      };
                    })}
                    poster={dataFilmState.backimg}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="container mt-4">
          <div className="row fs-ipad">
            <div className="col-9">
              <h2 className="primary-color">Tập Phim</h2>
              {chapFilm()}
              {/* {serverFilm()} */}
            </div>
          </div>
        </div>
        <div className="container mt-4">
          <h2 className="primary-color mt-5 mb-3 fs-bl">Bình luận</h2>
          <div className="background-comment p-4 col-9 pb-5 container-bl">
            <Chat place={id} backimg={dataFilmState.backimg} />
          </div>
        </div>
      </div>
    );
  }

  function chapFilm() {
    return (
      <nav>
        <div>
          <ul className="pagination  d-flex flex-wrap">
            {uniqByKeepFirst(dataLink, (i) => i.chap).map((e, i) => (
              <li className="p-2">
                <button
                  className={
                    "text-white border-btn-film btn me-1 btn-respon" +
                    (e.chap == nowChap && " background-primary text-light")
                  }
                  onClick={() => {
                    setnowChap(e.chap);
                    setnowServer(e.server);
                    // window.scrollTo(0, 0);
                  }}
                >
                  Tập {e.chap}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  function unlockTHis(plan) {
    setPopupVip(null);
    if (userDetail.checkUser == "not") alert("please login!");
    if (userDetail.checkUser == false) alert("please verified email!");
    else {
      setIsLoading(true);
      setIconUnlock(0);
      axios
        .post(process.env.REACT_APP_API_LOCAL + "user/unlock", {
          token: userDetail.token,
          fid: id,
          plan: plan,
        })
        .then((res) => {
          if (res.data.complete == true) {
            alert("Mở khóa thành công, bạn còn lại " + res.data.total);
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
            getDataByTokenId();
            // forceUpdate();
          } else alert(res.data.complete);
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
      alert("please login!");
    else {
      setIconSave(0);
      axios
        .post(process.env.REACT_APP_API_LOCAL + "user/savefilm", {
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

  return (
    <div>
      <MetaTags>
        <title>{"Bạn đang xem " + name}</title>
        <meta
          name="description"
          content={
            "Xem " +
            name +
            " tại Kphim.xyz với chất lượng cao, tốc độ cực mạnh!. " +
            dataFilmState.description
          }
        />
      </MetaTags>
      {isLoading && <Loading />}
      <main className="container-fluid container-background pb-5">
        <div className="pt-1">
          {/*  */}
          {dataFilmState.title == undefined ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <h2 className="text-center">
              {loadingData == true ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : (
                <div className="mt-3">
                  <button
                    className="btn text-white btn_save"
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
                    className="btn text-white btn_save ms-2"
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
              )}
            </h2>
          )}
          {/*  */}
          {contentVideoView()}
        </div>
      </main>

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
                  <h5
                    class="modal-title primary-color"
                    id="staticBackdropLabel"
                  >
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
                          {dataFilmState.price}
                        </strong>{" "}
                        Coin
                      </span>
                      <button
                        className="btn btn-sm background-primary float-mk"
                        disabled={userDetail.coin < dataFilmState.price}
                        onClick={() => unlockTHis(0)}
                      >
                        Mở khóa
                      </button>
                    </div>
                    <div className="col-12 border mb-3  p-2">
                      Mở khóa <strong className="primary-color">7</strong> ngày
                      với{" "}
                      <strong className="primary-color">
                        {dataFilmState.price * 2}
                      </strong>{" "}
                      Coin
                      <button
                        className="btn btn-sm background-primary float-mk"
                        disabled={userDetail.coin < dataFilmState.price * 2}
                        onClick={() => unlockTHis(1)}
                      >
                        Mở khóa
                      </button>
                    </div>
                    <div className="col-12 border mb-3  p-2">
                      Mở khóa <strong className="primary-color">14</strong> ngày
                      với{" "}
                      <strong className="primary-color">
                        {dataFilmState.price * 3}
                      </strong>{" "}
                      Coin
                      <button
                        className="btn btn-sm background-primary float-mk "
                        disabled={userDetail.coin < dataFilmState.price * 3}
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

      <Footer />
      {console.log(isDisable)}
    </div>
  );
};
export default WatchNew;

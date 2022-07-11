import "./style.css";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Footer from "../../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { setUserDataDetail } from "../../store/actions/user";
import { Link } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import Loading from "../../components/Loading";
import MetaTags from "react-meta-tags";

import { Player } from "react-tuby";
import ReactHlsPlayer from "react-hls-player";

// import "react-tuby/css/main.css";
import "./../../../node_modules/react-tuby/css/main.css";
import ModalAlert from "../../components/ModalAlart/ModalAlert";

// import "./noSub.vtt"

const WatchNew2 = () => {
  const { id, name } = useParams();

  const [dataFilmState, setDataFilmState] = useState({});
  const [dataLink, setDataLink] = useState();
  const [nowChap, setnowChap] = useState(-1);
  const [getSub, setSub] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [loadingData, setLoading] = useState(false);
  const [iconSave, setIconSave] = useState(0);
  const [iconUnlock, setIconUnlock] = useState(0);
  const [popupVip, setPopupVip] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [detail, setDetail] = useState({});
  const [view, setView] = useState(null);
  const [uploadSub, setUploadSub] = useState(null);
  const [forceupdate, setforceupdate] = useState(0);

  //
  const [urlVideo, setUrl] = useState({});
  const [urlCurrent, setUrlCurrnent] = useState([]);
  const [listChap, setListChap] = useState([]);
  const [infoFilm, setInfo] = useState({});

  const [refVideo, setRefVideo] = useState(null);
  const [isChangingChap, SetChangingChap] = useState(false);
  const [showAlert, setShowAlert] = useState(null);

  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userData.userDetail);

  const history = useHistory();

  const getinfo = async () => {
    let res = await axios.get(
      process.env.REACT_APP_API_DEPLOYED2 + "film/info/" + id
    );
    // disable thi quay ve detail
    if (res.data.disable) {
      history.push(
        "/detailfilm/" + id + "/" + res.data.title.replaceAll(" ", "-")
      );
    } else if (name != res.data.title)
      history.push(
        "/watchnew/" + id + "/" + res.data.title.replaceAll(" ", "-")
      );
    setInfo(res.data);
    axios
      .get(process.env.REACT_APP_API_DEPLOYED2 + "film/detail/" + id)
      .then((res) => {
        setDetail(res.data);
      })
      .catch(setDetail(undefined));
    return true;
  };

  const getLink = (token) => {
    axios
      .get(process.env.REACT_APP_API_DEPLOYED2 + "link/alllink/" + id, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        if (res.data == false || res.data == null) setIsDisable(true);
        else {
          setUrl(res.data);
          if (res.data.data.default[0].chap == "Full") {
            setListChap(["Full"]);
            setnowChap("Full");
          } else {
            let list = [];
            res.data.data.default.map((e) => {
              list.push(e.chap);
            });
            res.data.data.vip.map((e) => {
              if (!list.includes(e.chap)) list.push(e.chap);
            });
            setnowChap(list[0]);
            setListChap(list);
          }
        }
        setLoading(false);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  };

  const getView = async () => {
    let a = await axios.get(
      process.env.REACT_APP_API_DEPLOYED2 + "film/view/" + id
    );
    a = a.data;
    if (a == null) setView(0);
    else setView(a.view);
    return setTimeout(() => {
      axios.put(process.env.REACT_APP_API_DEPLOYED2 + "film/view/" + id);
    }, 30000); // sau 30s thi tinh 1 view
  };

  useEffect(async () => {
    window.scrollTo(0, 0);
    await getinfo();

    let clear = await getView();
    return () => clearInterval(clear);
  }, []);

  useEffect(() => {
    if (userDetail.checkUser != "init") {
      if (userDetail.checkUser == "not") {
        getLink("not");
      } else {
        getLink(userDetail.token);
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

  useEffect(() => {
    changeChap();
    SetChangingChap(true);
  }, [nowChap]);

  useEffect(() => {
    if (isChangingChap)
      setTimeout(() => {
        SetChangingChap(false);
      }, 10);
  }, [isChangingChap]);

  const changeChap = () => {
    if (urlVideo.data !== undefined) {
      let currentUrl = [];
      urlVideo.data.default.map((e, i) => {
        if (e.chap == "Full") currentUrl = e.link;
        else if (e.chap == nowChap) currentUrl = e.link;
      });

      if (urlVideo.data.vip !== undefined)
        urlVideo.data.vip.map((e, i) => {
          if (e.chap == "Full") currentUrl = currentUrl.concat(e.link);
          else if (e.chap == nowChap) currentUrl = currentUrl.concat(e.link);
        });
      setUrlCurrnent(currentUrl);
    }
  };

  function getFile(filePath) {
    return filePath.substr(filePath.lastIndexOf("\\") + 1).split(".")[0];
  }

  function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }

  const onFileChange = (event) => {
    setUploadSub(event.target.files[0]);

    let a = event.target.files[0];
    let name = getFile(a.name);

    let rename = renameFile(
      a,
      Math.random().toString(36).substring(4) + ".vtt"
    );

    const data = new FormData();
    data.append("file", rename);
    axios
      .post(
        process.env.REACT_APP_API_DEPLOYED2 + "public/subs/user-upload",
        data
      )
      .then((res) => {
        let copyNowdata = getSub;
        if (name.length > 13) name = name.substring(0, 10) + "...";
        name = name + "(" + res.data.slice(0, -6) + ")";
        copyNowdata[nowChap].sub[name] =
          process.env.REACT_APP_API_DEPLOYED2 + "public/subs/" + res.data;

        setSub(copyNowdata);

        setforceupdate(forceupdate + 1);
      });
  };

  function uniqByKeepFirst(a, key) {
    let seen = new Set();
    return a.filter((item) => {
      let k = key(item);
      return seen.has(k) ? false : seen.add(k);
    });
  }

  function contentVideoView() {
    return loadingData ? (
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
    ) : (
      <div>
        <div id="filmView" className={"container ps-5 pe-5"}>
          <div className="text-center">
            <div className="text-white title-film">
              {infoFilm.title === undefined ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-center nameFilm">
                  <h5 className="primary-color">
                    {infoFilm.title} ({infoFilm.title_origin}){" "}
                  </h5>
                  <span>{view} lượt xem</span>
                </div>
              )}
            </div>
            {/* <p className="text-light">{JSON.stringify(urlVideo)}</p> */}
            {urlCurrent.length !== 0 && !isChangingChap ? (
              <Player
                autoPlay={false}
                src={urlCurrent}
                subtitles={
                  getSub[nowChap] !== undefined
                    ? Object.keys(getSub[nowChap].sub).map((e2) => {
                        return {
                          lang: e2,
                          url: getSub[nowChap].sub[e2],
                          language:
                            e2 === "en"
                              ? "Tiếng Anh"
                              : e2 === "fr"
                              ? "Tiếng Pháp"
                              : e2 === "vi"
                              ? "Tiếng Việt"
                              : e2,
                        };
                      })
                    : [
                        {
                          lang: "no",
                          url:
                            process.env.REACT_APP_API_DEPLOYED2 +
                            "public/subs/noSub.vtt",
                          language: "Chưa có sub",
                        },
                      ]
                }
                poster={infoFilm.img}
              >
                {(ref, props) => {
                  const url = props.src;
                  if (url.substr(url.length - 4) === "m3u8")
                    return (
                      <ReactHlsPlayer
                        playerRef={ref}
                        autoPlay={false}
                        {...props}
                      />
                    );
                  else
                    return <video ref={ref} {...props} autoPlay={false} loop />;
                }}
              </Player>
            ) : (
              <div
                className="tuby"
                style={{
                  width: "100%",
                  height: "0px",
                  paddingBottom: "56.25%",
                }}
              >
                <img src={infoFilm.img} className="tuby-poster" />
              </div>
            )}
            <div className="container mt-1">
              <div className="row fs-ipad">
                <div>
                  <h2 className="primary-color">Tập Phim</h2>
                  {chapFilm2()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          {/* <div>
            <label for="files" class="btn btn-danger ">
              Tải Sub
            </label>
            <span className="text-muted ms-1">(.vtt only)</span>
          </div> */}

          {/* {getSub[nowChap] !== undefined &&
            Object.keys(getSub[nowChap].sub).map((e) => {
              if (e !== "fr" && e !== "en" && e !== "vi")
                return (
                  <>
                    <span className="text-warning ms-1">Đã tải: {e}</span>;
                    <br />
                  </>
                );
            })} */}
        </div>

        <input
          id="files"
          style={{ display: "none" }}
          type="file"
          onChange={onFileChange}
        ></input>

        <div className="container mt-4">
          <h2 className="primary-color mt-5 mb-3 fs-bl text-center">
            Bình luận
          </h2>
          <div className="background-comment p-4  pb-5 container-bl">
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
            {/* {uniqByKeepFirst(dataLink, (i) => i.chap).map((e, i) => ( */}
            {Object.keys(dataLink).map((e, i) => (
              <li className="p-2">
                <button
                  className={
                    "text-white border-btn-film btn me-1 btn-respon" +
                    (e == nowChap && " background-primary text-light")
                  }
                  onClick={() => {
                    setnowChap(e);
                    // setNowDataInfo(e);
                    // window.scrollTo(0, 0);
                  }}
                >
                  Tập {e}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  function chapFilm2() {
    return (
      <div>
        <ul className="pagination  d-flex flex-wrap justify-content-center">
          {listChap.length !== 0 &&
            listChap.map((e) => (
              <li className="p-2">
                <button
                  className={
                    "text-white border-btn-film btn me-1 btn-respon" +
                    (e == nowChap && " background-primary text-light")
                  }
                  onClick={() => {
                    setnowChap(e);
                  }}
                >
                  {e}
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  function unlockTHis(plan) {
    setPopupVip(null);
    if (userDetail.checkUser == "not") setShowAlert("please login!");
    if (userDetail.checkUser == false) setShowAlert("please verified email!");
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
            setShowAlert("Mở khóa thành công, bạn còn lại " + res.data.total);

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
            getLink(userDetail.token);
            // getDataByTokenId();
            // forceUpdate();
          } else setShowAlert(res.data.complete);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIconUnlock(-1);
          setShowAlert("Sorry, some thing was wrong!");
          setIsLoading(false);
        });
    }
  }

  function saveThis() {
    if (userDetail.checkUser == "not")
      // return history.push("/login");
      setShowAlert("please login!");
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
      {showAlert && (
        <ModalAlert
          title={"Thông báo"}
          content={showAlert}
          close={() => setShowAlert(null)}
        />
      )}

      <main className="container-fluid container-background pb-5">
        <div className="pt-1">
          {/*  */}
          {infoFilm.title == undefined ? (
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
                <div className="mt-3 btn-watch-bl">
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
                    <div className="col-12 border mb-3  p-2">
                      Mở khóa <strong className="primary-color">7</strong> ngày
                      với{" "}
                      <strong className="primary-color">
                        {detail.price * 2}
                      </strong>{" "}
                      Coin
                      <button
                        className="btn btn-sm background-primary float-mk"
                        disabled={userDetail.coin < detail.price * 2}
                        onClick={() => unlockTHis(1)}
                      >
                        Mở khóa
                      </button>
                    </div>
                    <div className="col-12 border mb-3  p-2">
                      Mở khóa <strong className="primary-color">14</strong> ngày
                      với{" "}
                      <strong className="primary-color">
                        {detail.price * 3}
                      </strong>{" "}
                      Coin
                      <button
                        className="btn btn-sm background-primary float-mk "
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

      <Footer />
    </div>
  );
};
export default WatchNew2;

import "./style.css";
import qc from "./../../assets/images/quang-cao.jpg";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Footer from "../../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { setUserDataDetail } from "./../../store/actions/user";
import { Link } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import Loading from "../../components/Loading";

const Watch = () => {
  const { id, name } = useParams();

  const [dataFilmState, setDataFilmState] = useState({});
  const [dataLink, setDataLink] = useState();
  const [isFull, setIsFull] = useState(false);
  const [nowChap, setnowChap] = useState(-1);
  const [nowServer, setnowServer] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const [loadingData, setLoading] = useState(true);
  const [iconSave, setIconSave] = useState(0);
  const [iconUnlock, setIconUnlock] = useState(0);
  const [popupVip, setPopupVip] = useState(null);

  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userData.userDetail);

  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    // getDataByParamsId();
  }, []);

  useEffect(() => {
    if (dataFilmState.id == undefined) {
      axios.get(process.env.REACT_APP_API_LOCAL + "film/" + id).then((res) => {
        if (name != res.data[0].title)
          history.push("/watch/" + id + "/" + res.data[0].title);
        setDataFilmState(res.data[0]);
      });
    }
    if (userDetail.checkUser != "init") {
      if (userDetail.checkUser === "not") getDataByParamsId();
      else getDataByTokenId();
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
    axios.get(process.env.REACT_APP_API_LOCAL + "link/" + id).then((res) => {
      setDataLink(res.data);
      if (res.data != null) {
        setnowServer(res.data[0].server);
        setnowChap(res.data[0].chap);
      }
      setLoading(false);
    });
  };

  const getDataByTokenId = () => {
    axios
      .post(process.env.REACT_APP_API_LOCAL + "link/vip", {
        token: userDetail.token,
        fid: id,
      })
      .then((res) => {
        setDataLink(res.data);
        if (res.data != null) {
          setnowServer(res.data[0].server);
          setnowChap(res.data[0].chap);
        }
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
        <h1 className="text-center primary-color container-load"> Đang tải dữ liệu...</h1>
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
        {/* <hr className="m-2" /> */}
        <div
          id="filmView"
          className={
            "container ps-5 pe-5"
            // isFull ? "container-fluir p-2 pt-0 isFull" : "container ps-5 pe-5"
          }
        >
          {dataLink.map((e, i) => (
            <div className="text-center">
              {e.chap == nowChap &&
                e.server == nowServer &&
                (e.link == "vip only" ? (
                  <img
                    src="https://i.imgur.com/JNZDQy0.png"
                    alt="VIP ONLY"
                    className="img-vip mt-4 pt-1"
                  />
                ) : (
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
                        </div>
                      )}
                    </div>
                    <div
                      className="iframe-here"
                      dangerouslySetInnerHTML={{ __html: e.link }}
                    >
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
        {/* <div className="d-block justify-content-center d-flex mt-2">
          <p
            onClick={() => setIsFull(!isFull)}
            className="btn btn-sm background-primary m-1"
          >
            Change view
          </p>
        </div> */}
        <div className="container mt-4">
          <div className="row fs-ipad">
            <div className="col-9">
              <h2 className="primary-color">Tập Phim</h2>
              {chapFilm()}
              {/* {serverFilm()} */}
            </div>
            <div className="col-3">
              <h2 className="primary-color">Server</h2>
                {serverFilm()}
            </div>
          </div>
        </div>
        <div className="container mt-4">
            <h2 className="primary-color mt-5 mb-3 fs-bl">Bình luận</h2>
            <div className="background-comment p-4 col-9 pb-5 container-bl">
              <div className="d-flex justify-content-between p-4 text-item">
                <span className="number-bl">123 Bình luận</span>
                <div className="d-flex col-4 ss">
                  <label className="text-item" for="theloaiSelect">Sắp xếp theo:</label>
                  <select
                    className="sign__input w-50 ms-3 p-1 input-arr"
                    id="theloaiSelect"
                  >
                    <option value="new">Mới nhất</option>
                    <option value="old">Cũ nhất</option>
                  </select>
                </div>
              </div>
              <Chat place={id} backimg={dataFilmState.backimg} />
            </div>
          </div>
        {/* {chapAndServer()} */}
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
    )
  }
  function serverFilm() {
    return (
      <nav>
        <div>
          <ul className="pagination d-flex flex-wrap">
            {dataLink.map(
              (e, i) =>
                e.chap == nowChap && (
                  <li className="p-2">
                    <button
                      className={buttonServerRender(e.server, e.vip)}
                      onClick={() => {
                        setnowServer(e.server);
                        // window.scrollTo(0, 0);
                      }}
                    >
                      Server {e.server}
                    </button>
                  </li>
                )
            )}
          </ul>
        </div>
      </nav>
    );
  }
  // function chapAndServer() {
  //   return (
  //     <nav>
  //       <div>
  //         <ul className="pagination justify-content-center">
  //           {uniqByKeepFirst(dataLink, (i) => i.chap).map((e, i) => (
  //             <li>
  //               <button
  //                 className={
  //                   "btn btn-outline-secondary me-1 " +
  //                   (e.chap == nowChap && " btn-secondary text-light")
  //                 }
  //                 onClick={() => {
  //                   setnowChap(e.chap);
  //                   setnowServer(e.server);
  //                   // window.scrollTo(0, 0);
  //                 }}
  //               >
  //                 {e.chap}
  //               </button>
  //             </li>
  //           ))}
  //         </ul>
  //         <ul className="pagination justify-content-center">
  //           {dataLink.map(
  //             (e, i) =>
  //               e.chap == nowChap && (
  //                 <li>
  //                   <button
  //                     className={buttonServerRender(e.server, e.vip)}
  //                     onClick={() => {
  //                       setnowServer(e.server);
  //                       // window.scrollTo(0, 0);
  //                     }}
  //                   >
  //                     {e.server}
  //                   </button>
  //                 </li>
  //               )
  //           )}
  //         </ul>
  //       </div>

  //       <hr className="m-2" />
  //     </nav>
  //   );
  // }

  function buttonServerRender(sver, isVip) {
    if (isVip == true)
      if (sver == nowServer) return "btn background-primary me-1 text-white btn-respon";
      else return "btn border-btn-film me-1 text-white btn-respon";
    else {
      if (sver == nowServer) return "btn background-primary me-1 text-white btn-respon";
      else return "btn border-btn-film me-1 text-white btn-respon";
    }
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
            newDetail.unlockFilm[id] = res.data.info;
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
          alert(e.response.data.message);
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
            newDetail.saveFilm[id] = { fid: parseInt(id) };
          } else if (res.data.complete == "removed") {
            setIconSave(-1);
            delete newDetail.saveFilm[id];
          }
          dispatch(setUserDataDetail(newDetail));
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    }
  }

  return (
    <div>
      {isLoading && <Loading />}
      <main className="container-fluid container-background pb-5">
        <div className="pt-1">
          {/* <img className="d-block w-100 pb-2" src={qc} alt="" /> */}
          {/* {dataFilmState.title == undefined ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <h2 className="text-center">
              {dataFilmState.title} ({dataFilmState.title_origin})
              {loadingData == true ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : (
                <div className="">
                  <button
                    className="btn btn-danger btn-sm me-1"
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
                    className="btn btn-danger btn-sm ms-1"
                    // data-bs-toggle="modal"
                    // data-bs-target="#unlockFilmPlan"
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
          )} */}
          {contentVideoView()}
          {/* <div className="container">
            <h2 className="primary-color mt-5 mb-3">Bình luận</h2>
            <div className="background-comment p-4 col-9 pb-5">
              <div className="d-flex justify-content-between p-4 text-item">
                <span>123 Bình luận</span>
                <div className="d-flex col-4">
                  <label className="text-item" for="theloaiSelect">Sắp xếp theo:</label>
                  <select
                    className="sign__input w-50 ms-3 p-1 input-arr"
                    id="theloaiSelect"
                  >
                    <option value="new">Mới nhất</option>
                    <option value="old">Cũ nhất</option>
                  </select>
                </div>
              </div>
              <Chat place={id} backimg={dataFilmState.backimg} />
            </div>
          </div> */}

          {/* <img className="d-block w-100 pt-2" src={qc} alt="" /> */}
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
              <div class="modal-content bg-dark p-3 border border-danger border-3 rounded-3">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
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
                        <Link to="/login">Đăng nhập</Link> để thực hiện chức năng
                      </h5>
                    ) : (userDetail.checkUser == "not verified" ? 
                      <h5 className="text-center mb-3">
                        <Link to="/xacthuc">Xác thực email</Link> để thực hiện chức năng
                      </h5>
                      :
                      <h5 className="text-center mb-3">
                        Số dư của bạn: {userDetail.coin} Koin
                      </h5>
                    )}

                    <div className="col-12 border border-danger mb-3 p-1">
                      Mở khóa <strong>3</strong> ngày với{" "}
                      <strong>{dataFilmState.price}</strong> Koin
                      <button
                        className="btn btn-sm btn-danger float-end"
                        disabled={userDetail.coin < dataFilmState.price}
                        onClick={() => unlockTHis(0)}
                      >
                        Mở khóa
                      </button>
                    </div>
                    <div className="col-12 border border-danger mb-3  p-1">
                      Mở khóa <strong>7</strong> ngày với{" "}
                      <strong>{dataFilmState.price * 2}</strong> Koin
                      <button
                        className="btn btn-sm btn-danger float-end"
                        disabled={userDetail.coin < dataFilmState.price * 2}
                        onClick={() => unlockTHis(1)}
                      >
                        Mở khóa
                      </button>
                    </div>
                    <div className="col-12 border border-danger mb-3  p-1">
                      Mở khóa <strong>14</strong> ngày với{" "}
                      <strong>{dataFilmState.price * 3}</strong> Koin
                      <button
                        className="btn btn-sm btn-danger float-end "
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
      <Footer/>
    </div>
  );
};
export default Watch;

import "./style.css";
import qc from "./../../assets/images/quang-cao.jpg";
import { useEffect, useState, useCallback, useRef } from "react";
import { Redirect, useHistory, useParams } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserDataDetail } from "./../../store/actions/user";
import { auth } from "../../services/firebase";
import { Link } from "react-router-dom";

const Watch = () => {
  const { id, name } = useParams();

  const [dataFilmState, setDataFilmState] = useState({});
  const [dataLink, setDataLink] = useState();
  const [isFull, setIsFull] = useState(false);
  const [nowChap, setnowChap] = useState(-1);
  const [nowServer, setnowServer] = useState(-1);

  const [loadingData, setLoading] = useState(true);
  const [iconSave, setIconSave] = useState(0);
  const [iconUnlock, setIconUnlock] = useState(0);
  const [popupVip, setPopupVip] = useState(null);

  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userData.userDetail);

  const modalRefVip = useRef();

  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    // getDataByParamsId();
  }, [id]);

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
      console.log(userDetail.saveFilm);
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
      <p className="text-center"> Đang tai </p>
    ) : dataLink == null ? (
      <p className="text-center">
        Khong tim thay du lieu, (phim này Đang cập nhật !)
      </p>
    ) : (
      <div>
        <hr className="m-2" />
        <div
          id="filmView"
          className={
            isFull ? "container-fluir p-2 pt-0 isFull" : "container ps-5 pe-5"
          }
        >
          {dataLink.map((e, i) => (
            <div>
              {e.chap == nowChap &&
                e.server == nowServer &&
                (e.link == "vip only" ? (
                  <img
                    src="https://i.imgur.com/JNZDQy0.png"
                    alt="VIP ONLY"
                    className="w-100"
                  />
                ) : (
                  <div
                    className="justify-content-center d-flex iframe-here"
                    dangerouslySetInnerHTML={{ __html: e.link }}
                  />
                ))}
            </div>
          ))}
        </div>
        <hr className="m-2" />
        <div className="d-block justify-content-center d-flex">
          <p
            onClick={() => setIsFull(!isFull)}
            className="btn-sm btn-warning m-1"
          >
            Change view
          </p>
        </div>
        {chapAndServer()}
      </div>
    );
  }

  function chapAndServer() {
    return (
      <nav>
        <div>
          <ul className="pagination justify-content-center">
            {uniqByKeepFirst(dataLink, (i) => i.chap).map((e, i) => (
              <li>
                <button
                  className={
                    "btn btn-outline-secondary me-1 " + e.chap == nowChap &&
                    " btn-secondary text-light"
                  }
                  onClick={() => {
                    setnowChap(e.chap);
                    setnowServer(e.server);
                    window.scrollTo(0, 0);
                  }}
                >
                  {e.chap}
                </button>
              </li>
            ))}
          </ul>
          <ul className="pagination justify-content-center">
            {dataLink.map(
              (e, i) =>
                e.chap == nowChap && (
                  <li>
                    <button
                      className={buttonServerRender(e.server, e.vip)}
                      onClick={() => {
                        setnowServer(e.server);
                        window.scrollTo(0, 0);
                      }}
                    >
                      
                      {e.server}
                    </button>
                  </li>
                )
            )}
          </ul>
        </div>

        <hr className="m-2" />
      </nav>
    );
  }

  function buttonServerRender(sver, isVip) {
    if (isVip == true)
      if (sver == nowServer) return "btn btn-danger me-1";
      else return "btn btn-outline-danger me-1 ";
    else {
      if (sver == nowServer) return "btn btn-secondary me-1 ";
      else return "btn btn-outline-secondary me-1 ";
    }
  }

  function unlockTHis(plan) {
    if (userDetail.checkUser == "not") 
    // return history.push("/login");
    alert("please login!")
    else {
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
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    }
  }

  function saveThis() {
    if (userDetail.checkUser == "not") 
    // return history.push("/login");
    alert("please login!")
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
      <main>
        <div className>
          <img className="d-block w-100 pb-2" src={qc} alt="" />
          {dataFilmState.title == undefined ? (
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
                        <i class="fa fa-trash"></i> Mở khóa vip
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
          <hr />
          {contentVideoView()}

          <div className="container bg-light p-2 pt-0">
            <div
              style={{ backgroundImage: `url(${dataFilmState.backimg})` }}
              className="background-comment w-100 h-100"
            >
              <div className="me-5 ms-5 bg-light">
                <h2 className="text-center">Bình luận</h2>
                -xin chào <br />
                - chào
                <br />
                - khỏe không
                <br />
                - khỏe
                <br />
              </div>
            </div>
          </div>

          <img className="d-block w-100 pt-2" src={qc} alt="" />
        </div>
      </main>

      {popupVip != null && (
        <div>
          <div
            class="modal  fade show"
            id="unlockFilmPlan"
            aria-modal="true"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="Invisible" onClick={() => setPopupVip(null)}></div>
            <div class="modal-dialog  modal-dialog-centered ">
              <div class="modal-content p-3 border border-danger border-3 rounded-3">
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
                    {userDetail.coin == undefined ? (
                      <h5 className="text-center mb-3">
                        <Link to="/login">Dang nhap</Link> de thuc hien chuc nang
                      </h5>
                    ) : (
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
    </div>
  );
};
export default Watch;

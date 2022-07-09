import { setWatchLater } from "../../../store/actions/userList_Action";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PopupFilm from "../../../components/PopupFilm";
import FilmCard from "../../../components/FilmCard";
import Footer from "../../../components/Footer";
import axios from "axios";
import { Redirect } from "react-router";
import MetaTags from "react-meta-tags";
import brandads from "../../../assets/images/bia.png";

const WatchLaterList = () => {
  const data = useSelector((state) => state.listUser.watchLater);

  const userInfo = useSelector((state) => state.userData.curentUser);
  const userDetail = useSelector((state) => state.userData.userDetail);

  const dispatch = useDispatch();
  const [popupId, setPopupID] = useState(null);

  useEffect(() => {
    // if (true) {
    if (data.init == true) getData();
    else {
      if (userDetail.saveFilm != null && userDetail.saveFilm != undefined) {
        let arrHold = new Array();
        data.map((e) => {
          arrHold.push(e.id);
        });
        let is_same =
          arrHold.length == Object.keys(userDetail.saveFilm).length &&
          arrHold.every(function (element, index) {
            return element == Object.keys(userDetail.saveFilm)[index];
          });
        if (is_same == false) getData();
      }
    }
  }, [userDetail]);

  function getData() {
    if (userDetail.saveFilm != null && userDetail.saveFilm != undefined) {
      axios
        .post(process.env.REACT_APP_API_DEPLOYED2 + "film/bylistid", {
          list: Object.keys(userDetail.saveFilm),
        })
        .then((res) => {
          dispatch(setWatchLater(res.data));
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (userDetail.checkUser != "init") {
      dispatch(setWatchLater({ init: false }));
    }
  }

  function showData() {
    return (
      <div className="row justify-content-md-center last-update-list mx-auto overflow-hidden">
        {data.map((i, index) => (
          <div className="col-5 col-md-4 col-xl-3 pb-2 mx-auto">
            {/* {JSON.stringify(i)} */}
            <FilmCard key={i + "later"} data={i} click={setPopupID} />
          </div>
        ))}
      </div>
    );
  }

  return userInfo.checkUser == "init" ? (
    <h1>CHECKING...</h1>
  ) : userInfo.checkUser == "not" ? (
    <Redirect push to="/login" />
  ) : (
    <div className="container-background">
      <MetaTags>
        <title>Phim đã lưu</title>
        <meta
          name="description"
          content={
            "Xem nhiều phim hay cập nhật liên tục tại Kphim.xyz với chất lượng cao HD, fullHD, 4K, Bluray,.. với tốc độ cực mạnh!"
          }
        />
      </MetaTags>
      <div className="container text-white">
        <img
          className="d-block w-100 pt-2 brandads"
          // src="https://ads-cdn.fptplay.net/static/banner/2021/10/15_6168ee52a1ccac0001cbd978.jpg"
          src={brandads}
          alt=""
          width={800}
        />
        <section>
          <div className="mb-3">
            {/* <hr className="mb-2" /> */}
            <h1 className="primary-color mt-5 ms-4 mb-4">PHIM BẠN ĐÃ LƯU</h1>
            <hr className="mb-2" />

            {data.init == true ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : userDetail.saveFilm == undefined ? (
              <h3 className="text-center">
                Bạn chưa lưu phim nào vào danh sách này
              </h3>
            ) : (
              showData()
            )}
            <hr className="mb-3" />
          </div>
        </section>
        {/* <img className="d-block w-100 pt-2 pb-2" src={qc} alt="" width={800} /> */}
        <PopupFilm data={popupId} click={setPopupID} />
      </div>
      <Footer />
    </div>
  );
};
export default WatchLaterList;

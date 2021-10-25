import { setWatchLater } from "../../../store/actions/userList_Action";
import qc from "./../../../assets/images/quang-cao.jpg";

import { useSelector, useDispatch } from "react-redux";

import { auth } from "../../../services/firebase";
import { useEffect, useState } from "react";

import PopupFilm from "../../../components/PopupFilm";
import FilmCard from "../../../components/FilmCard";
import Footer from "../../../components/Footer";
import axios from "axios";
import { Redirect } from "react-router";

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
    // }
  }, [userDetail]);

  function getData() {
    if (userDetail.saveFilm != null && userDetail.saveFilm != undefined) {
      axios
        .post(process.env.REACT_APP_API_LOCAL + "film/bylistid", {
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
    <div>
      <div className="container">
        <img className="d-block w-100 pt-2" src={qc} alt="" width={800} />
        <section>
          <div className="mb-3">
            <hr className="mb-2" />
            <h1 className="text-center">PHIM BẠN ĐÃ LƯU</h1>
            <hr className="mb-2" />

            {data.init == true ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : userDetail.saveFilm == undefined ? (
              <h3>Không có phim, hãy thêm vài phim vào đây</h3>
            ) : (
              showData()
            )}
            <hr className="mb-3" />
          </div>
        </section>
        <img className="d-block w-100 pt-2 pb-2" src={qc} alt="" width={800} />
        <PopupFilm data={popupId} click={setPopupID} />
      </div>
      <Footer />
    </div>
  );
};
export default WatchLaterList;

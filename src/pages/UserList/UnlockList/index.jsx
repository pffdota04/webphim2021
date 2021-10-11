import { setUnlockList } from "../../../store/actions/userList_Action";
import qc from "./../../../assets/images/quang-cao.jpg";

import { useSelector, useDispatch } from "react-redux";

import { auth } from "../../../services/firebase";
import { useEffect, useState } from "react";

import PopupFilm from "../../../components/PopupFilm";
import FilmCard from "../../../components/FilmCard";
import Footer from "../../../components/Footer";
import axios from "axios";
import { Redirect } from "react-router";

const UnlockList = () => {
  const data = useSelector((state) => state.listUser.unlockList);
  const userInfo = useSelector((state) => state.userData.curentUser);
  const userDetail = useSelector((state) => state.userData.userDetail);

  const dispatch = useDispatch();
  const [popupId, setPopupID] = useState(null);

  useEffect(() => {
    if (data.init == true) getData();
  }, [userDetail]);

  function getData() {
    if (userDetail.saveFilm != null && userDetail.saveFilm != undefined) {
      console.log(Object.keys(userDetail.unlockFilm));
      axios
        .post(process.env.REACT_APP_API_LOCAL + "film/bylistid", {
          list: Object.keys(userDetail.unlockFilm),
        })
        .then((res) => {
          dispatch(setUnlockList(res.data));
          console.log(res.data);
          console.log("<<<<<<<<<<<");
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (userDetail.checkUser != "init") {
      dispatch(setUnlockList({ init: false }));
    }
  }

  function showData() {
    console.log(userDetail.saveFilm);
    return (
      <div className="row justify-content-md-center last-update-list mx-auto overflow-hidden">
        {data.map((i, index) => (
         ((Object.values(userDetail.unlockFilm)[index].end) -Date.now() >= 0) &&
          <div className="col-5 col-md-4 col-xl-3 pb-2 mx-auto">
            <FilmCard key={i + "later"} data={i} click={setPopupID} />
            <p className="text-center">
              Còn lại
              {Math.ceil(
                Math.abs(
                  new Date(Object.values(userDetail.unlockFilm)[index].end) -
                    Date.now()
                ) /
                  (1000 * 60 * 60 * 24)
              )}
              ngày
              {console.log(
                (new Date( Object.values(userDetail.unlockFilm)[index].end).toString())
              )}
            </p>
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
            <h1 className="text-center">PHIM BẠN ĐÃ MỞ KHÓA</h1>
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
export default UnlockList;

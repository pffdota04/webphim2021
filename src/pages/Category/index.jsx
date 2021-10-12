import "./style.css";
import qc from "./../../assets/images/quang-cao.jpg";

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useSelector, useDispatch } from "react-redux";
import {
  addListSeries,
  addListMovie,
  addListTatCa,
  setListTatCa,
  setListMovie,
  setListSeries,
} from "../../store/actions/listPhim_Action";

// import PopupFilm from "./../../components/PopupFilm";
import FilmCard from "./../../components/FilmCard";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = (props) => {
  const [hasMore, sethasMore] = useState(true);
  const { type } = useParams();

  const data = useSelector((state) => state.listTatCa.data);
  const dataMovie = useSelector((state) => state.listTatCa.dataMovie);
  const dataSeries = useSelector((state) => state.listTatCa.dataSeries);

  const [dataOther, setDataOther] = useState({});
  const [popupId, setPopupID] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const clearOther = [];
    setDataOther(clearOther);
    sethasMore(true);
    window.scrollTo(0, 0);
    setData(-1);
  }, [type]);

  let fetchMoreData = async (dataOf, lastid) => {
    const startTime = Date.now();
    let resulf = [];

    await axios
      .get(
        process.env.REACT_APP_API_LOCAL +
          "film/caterogy/" +
          dataOf +
          "/" +
          lastid
      )
      .then((res) => {
        // console.log(res.headers);
        resulf = res.data;
      });

    let a = resulf;
    // Nếu call nhanh quá thì delay chút cho người ta đọc quảng cáo
    if (Date.now() - startTime < 500)
      a = await new Promise((resolve) => {
        setTimeout(() => resolve(resulf), 500);
      });
    if (a == null || a == "null") sethasMore(false);
    else a = resulf;

    return a;
  };

  // if check == -1 (switch type) check xem đã có data chưa
  //                              =>> nếu có thì bỏ qua
  // else check = lastId
  const setData = async (check) => {
    let holdData;
    switch (
      type // chỉ 3 category chính (tất cả, phim lẻ. phim bộ) lưu vào redux
    ) {
      case "tatca": {
        if (check == -1 && data.length != undefined) break;
        holdData = await fetchMoreData("tatca", check);
        if (holdData == null) break;
        if (check == -1) dispatch(setListTatCa(holdData));
        else dispatch(addListTatCa(holdData));
        break;
      }
      case "movie": {
        if (check == -1 && dataMovie.length != undefined) break;
        holdData = await fetchMoreData("movie", check);
        if (holdData == null) break;
        if (check == -1) dispatch(setListMovie(holdData));
        else dispatch(addListMovie(holdData));
        break;
      }
      case "series": {
        if (check == -1 && dataSeries.length != undefined) break;
        holdData = await fetchMoreData("series", check);
        if (holdData == null) break;
        if (check == -1) dispatch(setListSeries(holdData));
        else dispatch(addListSeries(holdData));
        break;
      }
      default: {
        // các categỏy còn lại k lưu redux
        holdData = await fetchMoreData(type, check);
        if (holdData == null) break;
        if (check == -1) setDataOther(holdData);
        else setDataOther(dataOther.concat(holdData));
        break;
      }
    }
  };

  function categoryData() {
    let showThis;
    switch (type) {
      case "tatca": {
        showThis = data;
        break;
      }
      case "movie": {
        showThis = dataMovie;
        break;
      }
      case "series": {
        showThis = dataSeries;
        break;
      }
      default: {
        showThis = dataOther;
        break;
      }
    }

    return showThis.length != undefined && showThis.length != 0 ? (
      <InfiniteScroll
        dataLength={showThis.length}
        next={() => setData(showThis[showThis.length - 1].id)}
        hasMore={hasMore}
        loader={
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
        className="row justify-content-md-center last-update-list mx-auto overflow-hidden"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! Không còn phim nào nữa</b>
          </p>
        }
      >
        {showThis.map((i, index) => (
          <div className="col-4 col-xl-3 pb-2 mx-auto ps-0 pe-1">
            {/* <PopupFilm key={i.id} data={i} /> */}
            <FilmCard key={i.id} data={i} click={setPopupID} />
          </div>
        ))}
      </InfiniteScroll>
    ) : hasMore == false ? (
      <div className="text-center ">
        <h4>Opps! Sao tìm không thấy cái này vậy ta...</h4>
      </div>
    ) : (
      <div className="text-center ">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        {/* Top ADS: Vừa vào là thấy, tuy nhiên thấy lần đầu */}
        <img className="d-block w-100 pt-2" src={qc} alt="" width={800} />
        <section>
          <div className="mb-3">
            <hr className="mb-2" />
            <h1 className="text-center">PHIM {type}</h1>
            <hr className="mb-2" />
            {categoryData()}
            <hr className="mb-3" />
          </div>
          {popupId != null && (
            <div>
              <div
                className="modal fade popup-none-in-first bd-example-modal-sm  show"
                id="ItemModal7"
                aria-modal="true"
                role="dialog"
                style={{ display: "block" }}
              >
                <div
                  className="Invisible"
                  onClick={() => setPopupID(null)}
                ></div>
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
                    <img
                      src={popupId.backimg}
                      alt="youtube thumnail image"
                      className="w-100 img-trailer"
                      loading="lazy"
                    />
                    <div className=" mx-auto text-ten-line ">
                      <p className="text-center mb-0">
                        <strong>
                          {popupId.id}: {popupId.title} ({popupId.title_origin})
                        </strong>
                      </p>
                      <p className="text-center mb-0">
                        Diễn viên:
                        <div className="the-loai-popup">{popupId.actor}</div> |
                        Đạo diễn:
                        <div className="the-loai-popup">{popupId.director}</div>
                      </p>

                      <p className="text-center">
                        Thể loại:
                        {Object.values(popupId.type).map((e) => (
                          <div className="the-loai-popup">{e}</div>
                        ))}
                      </p>

                      <p className="text-left ps-3 pe-2">
                        &nbsp;&nbsp;{popupId.description}
                      </p>
                      <p className="text-center">
                        Được phát hành vào năm {popupId.year}
                      </p>
                    </div>
                    <div className="modal-footer p-1">
                      <Link
                        className="w-100 p-0 m-0 mb-1 btn-outline-secondary text-center pb-1"
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
          )}
        </section>
        {/* End ADS, Cứ kéo đến cuối là thấy, tuy nhiên chỉ thấy trong vài giây chờ fetch data*/}
        <img className="d-block w-100 pb-2" src={qc} alt="" width={800} />
      </div>
    </div>
  );
};

export default Category;

import "./style.css";
import qc from "./../../assets/images/quang-cao.jpg";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import PopupFilm from "./../../components/PopupFilm";
import FilmCard from "./../../components/FilmCard";
import axios from "axios";
import { setListSearch } from "./../../store/actions/listPhim_Action";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const Search = (props) => {
  const [items, setItems] = useState(Array.from({ length: 12 }));
  const [hasMore, sethasMore] = useState(true);
  const { value } = useParams();
  const [keySearch, setKeySearch] = useState();
  const [movieOrSeries, setMovieOrSeries] = useState("all");
  const [type, setType] = useState("all");
  const [country, setCountry] = useState("all");
  const [resulfSearch, setresulfSearch] = useState([]);
  const [showSearch, setshowSearch] = useState([]);
  const [page, setpage] = useState(1);
  const [popupId, setPopupID] = useState(null);

  const data = useSelector((state) => state.listTatCa.searchData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(data).length == 0) {
      const local = JSON.parse(localStorage.getItem("search"));
      if (
        local == undefined ||
        parseInt(local.time) + 1000 * 60 * 60 * 3 < Date.now()
      )
        axios.get(process.env.REACT_APP_API_DEPLOYED2 + "film/all").then((res) => {
          dispatch(setListSearch(res.data));
          localStorage.setItem("search", JSON.stringify(res.data));
        });
      else dispatch(setListSearch(local));
    }

    setKeySearch(value);
  }, [value]);

  const searching = () => {
    if (keySearch == undefined) return [];
    let a = Object.values(data).filter((item) => {
      return (
        (item.title_origin.toLowerCase().includes(keySearch.toLowerCase()) ||
          item.title.toLowerCase().includes(keySearch.toLowerCase())) &&
        (movieOrSeries != "all"
          ? item.type[movieOrSeries] == movieOrSeries
          : true) &&
        (type != "all" ? item.type[type] == type : true) &&
        (country != "all" ? item.country == country : true)
      );
    });
    return a;
  };

  useEffect(() => {
    let hold = searching();
    setresulfSearch(hold);
    setshowSearch(hold.slice(0, 12));
    setpage(1);
    sethasMore(true);
  }, [keySearch, type, country, movieOrSeries, data]);

  useEffect(() => {
    if (page * 12 >= resulfSearch.length) sethasMore(false);
    setshowSearch(resulfSearch.slice(0, page * 12));
  }, [page]);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const btnScroll = document.getElementById("scrolltotop");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (btnScroll !== undefined)
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        btnScroll.style.display = "flex";
      } else {
        btnScroll.style.display = "none";
      }
  }

  return (
    <div>
      <MetaTags>
        <title>K???t qu??? t??m ki???m '{keySearch}'</title>
        <meta
          name="description"
          content={
            "Xem nhi???u phim hay c???p nh???t li??n t???c t???i Kphim.xyz v???i ch???t l?????ng cao HD, fullHD, 4K, Bluray,.. v???i t???c ????? c???c m???nh!"
          }
        />
      </MetaTags>
      <div className="container-fluid container-background pb-5 mut">
        <div className="">
          {/* Top ADS: V???a v??o l?? th???y, tuy nhi??n th???y l???n ?????u */}
          {/* <img
            className="d-block w-100 pt-2"
            src="https://ads-cdn.fptplay.net/static/banner/2021/10/15_6168ee52a1ccac0001cbd978.jpg"
            alt=""
            width={800}
          /> */}
          <section>
            <div className="mb-3">
              {/* <hr className="mb-2" /> */}
              <div className="text-white container">
                <div className="row">
                  <div className="showSearch">
                    <div className="d-flex align-items-center">
                      <input
                        className="search_film col-6"
                        type="search"
                        id="search-in-search"
                        placeholder="T??m ki???m"
                        aria-label="Search"
                        value={keySearch}
                        onChange={(e) => {
                          setKeySearch(e.target.value);
                        }}
                      />
                      <button
                        className="sign__btn col-6"
                        onClick={() => {
                          setCountry("all");
                          setType("all");
                          setMovieOrSeries("all");
                        }}
                      >
                        X??a b??? l???c
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row width-col">
                  <div className="col-7">
                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <div className="form-group d-flex">
                          <label
                            className="sign__text font-size-label"
                            for="theloaiSelect"
                          >
                            Th??? lo???i:
                          </label>
                          <select
                            className="sign__input w-50 ms-3"
                            id="theloaiSelect"
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                          >
                            <option value="all">T???t c???</option>
                            <option value="action">H??nh ?????ng</option>
                            <option value="scifi">Vi???n T?????ng</option>
                            <option value="horror">Kinh D???</option>
                            <option value="anime"> Ho???t H??nh</option>
                            <option value="drama"> Ch??nh K???ch</option>
                            <option value="comedy">H??i</option>
                            <option value="romantic">L??ng M???n</option>
                            <option value="crime">T???i Ph???m</option>
                            <option value="family"> Gia ????nh - Tr??? em</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="form-group d-flex">
                          <label
                            className="sign__text font-size-label"
                            for="theloaiSelect"
                          >
                            Qu???c gia:
                          </label>
                          <select
                            className="sign__input w-50 ms-3"
                            id="theloaiSelect"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                          >
                            <option value="all">T???t c???</option>
                            <option value="us">M???</option>
                            <option value="ja">Nh???t</option>
                            <option value="ko">H??n Qu???c</option>
                            <option value="ch">Trung Qu???c</option>
                            <option value="vi">Vi???t Nam</option>
                            <option value="es">T??y ban nha</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="select-type">
                      <div className="form-check col-3 p-0 ms-1">
                        <input
                          className="form-check-input ms-0 me-1"
                          type="radio"
                          name="exampleRadios"
                          id="allcheck"
                          defaultChecked
                          checked={movieOrSeries === "all"}
                          onChange={() => {
                            setMovieOrSeries("all");
                          }}
                        />
                        <label className="form-check-label" htmlFor="allcheck">
                          T???t c???
                        </label>
                      </div>
                      <div className="form-check col-3 p-0  ms-2">
                        <input
                          className="form-check-input ms-0  me-1"
                          type="radio"
                          name="exampleRadios"
                          id="moviecheck"
                          checked={movieOrSeries === "movie"}
                          onChange={() => {
                            setMovieOrSeries("movie");
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="moviecheck"
                        >
                          Movie
                        </label>
                      </div>
                      <div className="form-check col-3 p-0  ms-2">
                        <input
                          className="form-check-input  ms-0 me-1"
                          type="radio"
                          name="exampleRadios"
                          id="seriescheck"
                          checked={movieOrSeries === "series"}
                          onChange={() => {
                            setMovieOrSeries("series");
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="seriescheck"
                        >
                          Series
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="hidenDelete col-2">
                    <div className="">
                      <button
                        className="sign__btn"
                        onClick={() => {
                          setCountry("all");
                          setType("all");
                          setMovieOrSeries("all");
                        }}
                      >
                        X??a b??? l???c
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="primary-color mt-5 ms-4">K???t qu??? t??m ki???m</h1>
              {showSearch.length == 0 || keySearch.length == 0 ? (
                <div className="container loading-film background-item mt-4">
                  <div className="text-center container-load">
                    <h1 className="primary-color">Kh??ng t??m th???y d??? li???u!</h1>
                    <p className="primary-color">
                      (Phim ??ang trong qu?? tr??nh c???p nh???t)
                    </p>
                  </div>
                </div>
              ) : (
                <InfiniteScroll
                  dataLength={showSearch.length}
                  next={() => setpage(page + 1)}
                  hasMore={hasMore}
                  loader={
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                  className="row justify-content-md-center last-update-list mx-auto overflow-hidden"
                  // endMessage={
                  //   <p style={{ textAlign: "center" }}>
                  //     <b>Yay! You have seen it all</b>
                  //   </p>
                  // }
                >
                  {showSearch.map((e, i) => (
                    <div className="col-4 col-xl-3 pb-2 mx-auto ps-0 pe-1 mt-5">
                      <FilmCard
                        key={i + "search"}
                        data={e}
                        click={setPopupID}
                      />
                    </div>
                  ))}
                </InfiniteScroll>
              )}
              {/* <hr className="mb-3" /> */}
            </div>
            <PopupFilm data={popupId} click={setPopupID} />
          </section>
          {/* End ADS, C??? k??o ?????n cu???i l?? th???y, tuy nhi??n ch??? th???y trong v??i gi??y ch??? fetch data*/}
          {/* <img className="d-block w-100 pb-2" src={qc} alt="" width={800} /> */}
        </div>
        <div id="scrolltotop" className="scrollTop" onClick={scrollTop}>
          <i class="fa fa-upload" aria-hidden="true"></i>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;

import "./style.css";
import qc from "./../../assets/images/quang-cao.jpg";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import PopupFilm from "./../../components/PopupFilm";
import FilmCard from "./../../components/FilmCard";
import axios from "axios";
import { setListSearch } from "./../../store/actions/listPhim_Action";
import { Link } from "react-router-dom";

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
      // console.log("Calling data... (not header)")
      axios.get(process.env.REACT_APP_API_LOCAL + "film/search").then((res) => {
        dispatch(setListSearch(res.data));
      });
    }
    setKeySearch(value);
  }, [value]);


   const searching = () => {
    //  console.log("Tìm: " + keySearch+ " ...with " + movieOrSeries+ " " +type +" " +country );
    if(keySearch == undefined)
      return [];
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
     console.log("123")
     let hold = searching();
     setresulfSearch(hold);
     setshowSearch(hold.slice(0, 12));
     setpage(1);
     sethasMore(true);
     //  console.log("Tìm thấy: " + hold.length + "phần tử");
   }, [keySearch, type, country, movieOrSeries, data]);

  useEffect(() => {
    if (page * 12 >= resulfSearch.length) sethasMore(false);
     setshowSearch(resulfSearch.slice(0, page * 12));
    //  console.log("_._ Đang ở trang: "+page+ " _._ hiển thị: "+showSearch.length+" phần tử")
  }, [page]);

  return (
    <div>
      <div className="container">
        {/* Top ADS: Vừa vào là thấy, tuy nhiên thấy lần đầu */}
        <img className="d-block w-100 pt-2" src={qc} alt="" width={800} />
        <section>
          <div className="mb-3">
            <hr className="mb-2" />
            <div class="row">
              <div class="col-4">
                <label for="search">Từ khóa:</label>
                <input
                  className="form-control me-2"
                  type="search"
                  id="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={keySearch}
                  onChange={(e) => {
                    setKeySearch(e.target.value);
                  }}
                />
              </div>
              <div class="col-2 pt-1 ps-1 pe-1">
                <div>
                  <div className="form-check col-12 p-0">
                    <input
                      className="form-check-input ms-0 me-1"
                      type="radio"
                      name="exampleRadios"
                      id="allcheck"
                      defaultChecked
                      onChange={() => {
                        setMovieOrSeries("all");
                      }}
                    />
                    <label className="form-check-label" htmlFor="allcheck">
                      Tất cả
                    </label>
                  </div>
                  <div className="form-check col-12 p-0">
                    <input
                      className="form-check-input ms-0  me-1"
                      type="radio"
                      name="exampleRadios"
                      id="moviecheck"
                      onChange={() => {
                        setMovieOrSeries("movie");
                      }}
                    />
                    <label className="form-check-label" htmlFor="moviecheck">
                      Movie
                    </label>
                  </div>
                  <div className="form-check col-12 p-0">
                    <input
                      className="form-check-input  ms-0 me-1"
                      type="radio"
                      name="exampleRadios"
                      id="seriescheck"
                      onChange={() => {
                        setMovieOrSeries("series");
                      }}
                    />
                    <label className="form-check-label" htmlFor="seriescheck">
                      Series
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-3 ps-0">
                <div class="form-group">
                  <label for="theloaiSelect">Thể loại</label>
                  <select
                    class="form-control"
                    id="theloaiSelect"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="all">Tất cả</option>
                    <option value="action"> HÀNH ĐỘNG</option>
                    <option value="scifi"> VIỄN TƯỞNG</option>
                    <option value="horror"> KINH DỊ</option>
                    <option value="anime"> HOẠT HÌNH</option>
                    <option value="drama"> CHÍNH KỊCH</option>
                    <option value="comedy">HÀI</option>
                    <option value="romantic"> LÃNG MẠN</option>
                    <option value="crime">TỘI PHẠM</option>
                    <option value="family"> GIA ĐÌNH - TRẺ EM</option>
                  </select>
                </div>
              </div>
              <div className="col-3 ps-0">
                <div class="form-group">
                  <label for="theloaiSelect">Quốc gia</label>
                  <select
                    class="form-control"
                    id="theloaiSelect"
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="all">Tất cả</option>
                    <option value="us">Mỹ</option>
                    <option value="ja">Nhật</option>
                    <option value="ko">Hàn Quốc</option>
                    <option value="ch">Trung Quốc</option>
                    <option value="vi">Việt Nam</option>
                    <option value="es">Tây ban nha</option>
                  </select>
                </div>
              </div>
            </div>
            <h1 className="text-center pt-3">Kết quả tìm kiếm</h1>
            <hr className="mb-2" />
            {showSearch.length == 0 || keySearch.length == 0 ? (
              <p style={{ textAlign: "center" }}>
                <b>Không tìm thấy!</b>
              </p>
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
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {showSearch.map((e, i) => (
                  <div className="col-5 col-md-4 col-xl-3 pb-2 mx-auto">
                    {e.id}
                    <FilmCard key={i + "search"} data={e} click={setPopupID} />
                  </div>
                ))}
              </InfiniteScroll>
            )}
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
                <div className="modal-dialog modal-xl">
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
                        to={"/watch/" + popupId.id + "/"+ popupId.title}
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

export default Search;

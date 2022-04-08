import "./style.css";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
// firebase
import { db } from "../../services/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const News = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.curentUser);

  const [allData, setAllData] = useState(undefined);
  const [hasMore, sethasMore] = useState(true);
  const [lastKey, setLastKey] = useState(null);

  useEffect(() => {
    // setAllData(allData.reverse());
    db.ref()
      .child("newscontent")
      .limitToLast(3)
      .get()
      .then((snap) => {
        setAllData(Object.values(snap.val()).reverse());
        setLastKey(Object.keys(snap.val())[0]);
      });
  }, []);

  let fetchMore = async () => {
    db.ref()
      .child("newscontent")
      .orderByChild("id")
      .endBefore(allData[allData.length - 1].id, lastKey)
      .limitToLast(4)
      .get()
      .then((snap) => {
        let a = snap.val();
        if (a == null || a == "null") sethasMore(false);
        else {
          setAllData(allData.concat(Object.values(snap.val()).reverse()));
          setLastKey(Object.keys(snap.val())[0]);
        }
      });
  };

  function toggleVideo(i) {}

  return (
    <div className="container-background">
      <MetaTags>
        <title>Tin Tức phim {lastKey}</title>
        <meta
          name="description"
          content={
            "Tin tức về phim ảnh được biên tập bởi Kphim.xyz cập nhật liên tục, mới, chính xác, phân tích phim!"
          }
        />
      </MetaTags>

      <div className="container p-2 bg-dark">
        <h1 className="primary-color text-center">
          Tin phim mới nhất 
        </h1>
        <div className="row p-0 m-0">
          {allData == undefined ? (
            <h5 className="text-center text-warning">Loading...</h5>
          ) : (
            <InfiniteScroll
              dataLength={allData.length}
              next={() => fetchMore()}
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
                <p className="text-danger" style={{ textAlign: "center" }}>
                  <b>Yay! Không còn tin nào nữa</b>
                </p>
              }
            >
              {allData.map((e, i) => (
                <div className="col-12 mt-2 bg-light container-main">
                  <div className="border border-dark border-2 row p-2 container-new">
                    <img
                      src={e.img}
                      alt={e.title}
                      // width={300}
                      className="col-12 col-md-4 img-news"
                    />
                    <div className="col-12 col-md-8  ">
                      <h5>{e.title}</h5>
                      <p>{e.preview}</p>
                      <Link
                        to={"/tintuc/" + e.id + "/" + e.title}
                        className="btn_watch"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;

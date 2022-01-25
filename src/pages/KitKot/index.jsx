import "./style.css";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";

// firebase
import { db } from "../../services/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.min.css";
// import 'swiper/swiper.scss'; // core Swiper
import "./../../../node_modules/swiper/swiper.scss";
import "./../../../node_modules/swiper/modules/navigation/navigation.scss";
import "./../../../node_modules/swiper/modules/pagination/pagination.scss";
import SwiperCore, { Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation]);

const KitKot = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.curentUser);

  const [allData, setAllData] = useState([
    {
      id: null,
      title: "Đang tải",
      year: "",
      yttrailer: null,
    },
  ]);

  const [nowShow, setNowShow] = useState();

  const [random, setRandom] = useState();

  useEffect(() => {
    db.ref()
      .child("/kitkot")
      .orderByKey()
      .limitToLast(1)
      .get()
      .then((snap) => {
        let a = snap.val();
        setRandom(Object.keys(a)[0]);
        setAllData([Object.values(a)[0]]);
        fetchMore(Object.keys(a)[0]);
      });
  }, []);

  const fetchMore = (count = null) => {
    console.log("fetch...");
    let ran = Math.floor(Math.random() * (count ? count : random)) + 1;
    console.log(ran + " <<< ");
    db.ref()
      .child("/kitkot")
      .orderByKey()
      .startAt(String(ran))
      .limitToFirst(1)
      .once("value")
      .then((snap) => {
        let a = snap.val();
        setAllData((prev) => [...prev, Object.values(a)[0]]);
      });
  };

  const changeCarousel = (currentSlide) => {
    if (allData.length - 1 == currentSlide) {
      fetchMore();
    }
  };

  const responsive = {
    mobile: {
      breakpoint: { max: 9999, min: 0 },
      items: 1,
      partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
    },
  };

  return (
    <div>
      <MetaTags>
        <title>KitKot</title>
        <meta
          name="description"
          content={
            "Tuyển tập những cảnh phim hay chọn lọc bởi Kphim.xyz với chất lượng cao HD, fullHD, 4K, Bluray,.. với tốc độ cực mạnh!"
          }
        />
      </MetaTags>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        pagination={true}
        scrollbar={{ draggable: true }}
        onSlideChange={(e) => changeCarousel(e.activeIndex)}
        direction="vertical"
        className="swip-tik"
      >
        {allData.map((e, i) => (
          <SwiperSlide className="slide-tik">
            <div className="slide-ytb">
              <iframe
                className=" h-100 w-100"
                src={"https://www.youtube.com/embed/" + e.yttrailer}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="silde-title w-100 p-0 m-0">
              {e.title} ({e.year && e.year})
              <br />
              <Link
                className="btn btn-primary"
                to={"/detailfilm/" + e.id + "/" + e.title}
              >
                Xem phim
              </Link>
            </div>
          </SwiperSlide>
        ))}
        ...
      </Swiper>
      <Footer />
    </div>
  );
};

export default KitKot;

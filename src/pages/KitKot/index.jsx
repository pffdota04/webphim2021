import "./style.css";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.min.css";
// import 'swiper/swiper.scss'; // core Swiper
import "./../../../node_modules/swiper/swiper.scss";
import "./../../../node_modules/swiper/modules/navigation/navigation.scss";
import "./../../../node_modules/swiper/modules/pagination/pagination.scss";
import SwiperCore, { Navigation } from "swiper";
import axios from "axios";

// install Swiper modules
SwiperCore.use([Navigation]);

const KitKot = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.curentUser);

  const [allData, setAllData] = useState([
    {
      _id: -1,
      title: "Đang tải",
      year: "",
      yttrailer: null,
    },
  ]);

  const [nowShow, setNowShow] = useState(0);
  const [allKitkot, setAllKitKot] = useState([, , , ,]);
  const [holdIndex, setHoldIndex] = useState([]);

  const [random, setRandom] = useState();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_DEPLOYED2 + "kitkot/all")
      .then((res) => {
        const a = res.data;
        setAllKitKot(Object.values(a));
        setAllData([Object.values(a)[0], Object.values(a)[1]]);
        setHoldIndex([0, 1]);
      })
      .catch((e) => alert("Đã xảy ra lỗi, hãy thử tải lại trang"));

  }, []);

  const fetchMore = () => {
    let ran = Math.floor(Math.random() * allKitkot.length);
    if (holdIndex.length == allKitkot.length) {
    } else if (holdIndex.includes(ran)) fetchMore();
    else {
      let item = allKitkot[ran];
      setHoldIndex((prev) => [...prev, ran]);
      setAllData((prev) => [...prev, item]);
    }
  };

  const changeCarousel = (currentSlide) => {
    // toggleVideo("hide", currentSlide - 1);
    toggleVideo(currentSlide);
    // setNowShow(currentSlide);
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
  function toggleVideo(i) {
    // if state == 'hide', hide. Else: show video
    allData.map((e, ii) => {
      var div = document.getElementById("ytb-top" + ii);
      var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
      if (ii == i) {
        div.style.display = "block";
        iframe.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      } else {
        if (div.style.display !== "none") {
          div.style.display = "none";
          iframe.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        }
      }
    });
  }

  return (
    <div className="container-background">
      <MetaTags>
        <title>KitKot</title>
        <meta
          name="description"
          content={
            "Tuyển tập những cảnh phim hay chọn lọc bởi Kphim.xyz với chất lượng cao HD, fullHD, 4K, Bluray,.. với tốc độ cực mạnh!"
          }
        />
      </MetaTags>

      <div className="container-md p-0">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          // pagination={true}
          scrollbar={{ draggable: true }}
          onSlideChange={(e) => changeCarousel(e.activeIndex)}
          direction="vertical"
          className="swip-tik "
        >
          {allData.map(
            (e, i) =>
              e !== undefined && (
                <SwiperSlide className="slide-tik">
                  <div className="slide-ytb" id={"ytb-top" + i}>
                    <iframe
                      className="video_watch"
                      src={
                        "https://www.youtube.com/embed/" +
                        e.yttrailer +
                        "?html5=1&enablejsapi=1&showinfo=0&autohide=1&control=0"
                      }
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      id={"iframe-ytb" + i}
                    ></iframe>
                  </div>
                  <div className="silde-title w-100 p-0 m-0">
                    <div>
                      <p className="title p-0 m-0 ps-3 pe-3">
                        {e.title} ({e.year && e.year}){/*   {i}_{nowShow} */}
                      </p>
                      <Link
                        className="btn_watch"
                        to={
                          "/detailfilm/" +
                          e._id +
                          "/" +
                          e.title.replaceAll(" ", "-")
                        }
                      >
                        Xem phim
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              )
          )}
          ...
        </Swiper>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default KitKot;

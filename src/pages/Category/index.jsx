import "./style.css";
import qc from "./../../assets/images/quang-cao.jpg";

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import PopupFilm from "./../../components/PopupFilm";
import FilmCard from "./../../components/FilmCard";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const Category = (props) => {
  const [items, setItems] = useState(Array.from({ length: 12 }));
  const [hasMore, sethasMore] = useState(true);
  const { type } = useParams();


  const fetchMoreData = () => {
    if (items.length >= 500) {
      sethasMore(false)
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
   setItems(items.concat(Array.from({ length: 12 })));
    }, 1000);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="container">
        {/* Top ADS: Vừa vào là thấy, tuy nhiên thấy lần đầu */}
        <img className="d-block w-100 pt-2" src={qc} alt="" width={800} />
        <section>
          <div className="mb-3">
            <hr className="mb-2" />
            <h1 className="text-center">PHIM HÀNH ĐỘNG {type}</h1>
            <hr className="mb-2" />

            {/* {items.map((e, i) => (
              <PopupFilm key={i + 1} title="Tựa phim" year={2021} id={i + 1} />
            ))} */}
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
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
              {items.map((i, index) => (
                <div className="col-5 col-md-4 col-xl-3 pb-2 mx-auto">
                  <PopupFilm
                    key={index + 1}
                    title="Tựa phim"
                    year={2021}
                    id={index + 1}
                  />
                  <FilmCard
                    key={index + 1}
                    title="Tựa pgim"
                    year={2012}
                    id={index  + 1}
                  />
                </div>
              ))}
            </InfiniteScroll>
            <hr className="mb-3" />
          </div>
        </section>
        {/* End ADS, Cứ kéo đến cuối là thấy, tuy nhiên chỉ thấy trong vài giây chờ fetch data*/}
        <img className="d-block w-100 pb-2" src={qc} alt="" width={800} />
      </div>
    </div>
  );
};

export default Category;

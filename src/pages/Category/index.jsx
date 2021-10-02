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

import PopupFilm from "./../../components/PopupFilm";
import FilmCard from "./../../components/FilmCard";

const Category = (props) => {
  const [hasMore, sethasMore] = useState(true);
  const { type } = useParams();

  const data = useSelector((state) => state.listTatCa.data);
  const dataMovie = useSelector((state) => state.listTatCa.dataMovie);
  const dataSeries = useSelector((state) => state.listTatCa.dataSeries);

  const [dataOther, setDataOther] = useState({});


  const dispatch = useDispatch();

  useEffect(() => {
    const clearOther = []
    setDataOther(clearOther);
    window.scrollTo(0, 0);
    setData(0);
  }, [type]);


  const data1 = 
    {
      title: "Phim tất cả",
      year: 2020,
      image: "https://image.tmdb.org/t/p/w342/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg",
    };

  const data2 = 
    {
      title: "Phim lẻ",
      year: 2013,
      image: "https://image.tmdb.org/t/p/w342/w21lgYIi9GeUH5dO8l3B9ARZbCB.jpg",
    }

  const data3 = 
      {
        title: "Phim bộ",
        year: 2014,
        image:
          "https://image.tmdb.org/t/p/w342/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
      }
  
  const data4 = {
    title: "Phim khác",
    year: 1999,
    image:
      "https://yone-lab.com/wp-content/uploads/2020/03/react-1-768x768-1.jpg",
  };

  // fake load data delay 1s
  let fetchMoreData = async (dataOf) => {
    console.log("Loading data from " + dataOf);
    let resulf = [];
    if (dataOf === "tatca") for (let i = 0; i < 12; i++) resulf.push(data1);
    else if (dataOf === "movie") for (let i = 0; i < 12; i++) resulf.push(data2);
    else if (dataOf === "series") for (let i = 0; i < 12; i++) resulf.push(data3);
    else for (let i = 0; i < 12; i++) resulf.push(data4);

    let a = await new Promise((resolve) => {
      setTimeout(() => resolve(resulf), 1000);
    });
    return a;
  };

  // if check == 0 (== switch type) check xem đã có data chưa
  //  =>> nếu chưa (lenght = undef) thì set data lần đầu tiên vào.
  // if check == 1 ==>>  add thêm 12 records nữa vào
  const setData = async (check) => {
    switch (type) {
      case "tatca": {
        if (data.length == undefined)
          await dispatch(setListTatCa(await fetchMoreData("tatca")));
        else if (check != 0)
          dispatch(addListTatCa(await fetchMoreData("tatca")));
        break;
      }
      case "movie": {
        if (dataMovie.length == undefined)
          dispatch(setListMovie(await fetchMoreData("movie")));
        else if (check != 0)
          dispatch(addListMovie(await fetchMoreData("movie")));
        break;
      }
      case "series": {
        if (dataSeries.length == undefined)
          dispatch(setListSeries(await fetchMoreData("series")));
        else if (check != 0)
          dispatch(addListSeries(await fetchMoreData("series")));
        break;
      }
      default:{
        if(dataOther.length == undefined || dataOther.length == 0)
          setDataOther(await fetchMoreData(type))
        else{
          let xx = await fetchMoreData(type);
          setDataOther(dataOther.concat(xx));
        }
        break;
      }
    }
  };

  function categoryData() {
    let showThis = {};
    switch (type) {
      case "tatca": {
        if (data.length != undefined) showThis = data;
        break;
      }
      case "movie": {
        if (dataMovie.length != undefined) showThis = dataMovie;
        break;
      }
      case "series": {
        if (dataSeries.length != undefined) showThis = dataSeries;
        break;
      }
      default: {
        showThis = dataOther;
        break;
      }
    }
    return showThis != undefined && showThis.length != undefined ? (
      <InfiniteScroll
        dataLength={showThis.length}
        next={() => setData(1)}
        hasMore={hasMore}
        loader={
          <div clclassNameass="d-flex justify-content-center">
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
        {showThis.map((i, index) => (
          <div className="col-5 col-md-4 col-xl-3 pb-2 mx-auto">
            <PopupFilm
              key={index + 1}
              title={type == "tatca" ? "Tat ca phim" : "Tựa phim"}
              year={2021}
              id={index + 1}
            />
            <FilmCard
              key={index + 1}
              title={i.title}
              image={i.image}
              year={i.year}
              id={index + 1}
            />
          </div>
        ))}
      </InfiniteScroll>
    ) : (
      <div className="d-flex justify-content-center">
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
            <h1 className="text-center">PHIM HÀNH ĐỘNG {type}</h1>
            <hr className="mb-2" />
            {/* CONTENT */}
            {categoryData()}
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

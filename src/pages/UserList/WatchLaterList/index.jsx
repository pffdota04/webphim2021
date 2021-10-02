import { setWatchLater } from "../../../store/actions/userList_Action";
import qc from "./../../../assets/images/quang-cao.jpg";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PopupFilm from "../../../components/PopupFilm";
import FilmCard from "../../../components/FilmCard";

const WatchLaterList = () => {
  const data = useSelector((state) => state.listUser.watchLater);
  const dispatch = useDispatch();

  const dataExample = {
    title: "Phim bạn đã lưu",
    year: 2008,
    image:
      "https://stackoverflow.blog/wp-content/themes/stackoverflow/img/logo-podcast.svg",
  };

  useEffect(async () => {
    if (data.length == undefined) {
      let resulf = [];
      for (let i = 0; i < 4; i++) resulf.push(dataExample);
      let a = await new Promise((resolve) => {
        setTimeout(() => resolve(resulf), 1000);
      });
      dispatch(setWatchLater(resulf));
    }
  }, []);

  function showData() {
    return (
      <div className="row justify-content-md-center last-update-list mx-auto overflow-hidden">
        {data.map((i, index) => (
          <div className="col-5 col-md-4 col-xl-3 pb-2 mx-auto">
            <PopupFilm
              key={index + 1}
              title={i.title}
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
      </div>
    );
  }

  return (
    <div>
      <div className="container"></div>
      <img className="d-block w-100 pt-2" src={qc} alt="" width={800} />
      <section>
        <div className="mb-3">
          <hr className="mb-2" />
          <h1 className="text-center">PHIM BẠN ĐÃ LƯU</h1>
          <hr className="mb-2" />

          {data.length == undefined ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : data.length == undefined ? (
            <h2>Không có phim để hiển thị</h2>
          ) : (
            showData()
          )}
          <hr className="mb-3" />
        </div>
      </section>
    </div>
  );
};
export default WatchLaterList;

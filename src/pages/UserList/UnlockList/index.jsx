import { setUnlockList } from "../../../store/actions/userList_Action";
import qc from "./../../../assets/images/quang-cao.jpg";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PopupFilm from "../../../components/PopupFilm";
import FilmCard from "../../../components/FilmCard";

const UnlockList = () => {
//   const { type } = useParams();
  const data = useSelector((state) => state.listUser.unlockList);
  const dispatch = useDispatch();

  const dataExample = {
    title: "Phim vipp đã mở",
    year: 1990,
    image: "https://image.tmdb.org/t/p/w342/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg",
  };

  useEffect(async() => {
      console.log("HEHE")
    if (data.length == undefined) {
      let resulf = [];
      for (let i = 0; i < 7; i++) resulf.push(dataExample);
       let a = await new Promise((resolve) => {
         setTimeout(() => resolve(resulf), 1000);
       });
      dispatch(setUnlockList(resulf));
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
          <h1 className="text-center">PHIM VIP ĐÃ MỞ</h1>
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
export default UnlockList;

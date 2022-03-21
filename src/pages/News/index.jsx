import "./style.css";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
// firebase
import { db } from "../../services/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const News = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.curentUser);

  const [allData, setAllData] = useState([
    {
      id: "1",
      title: "10 phim kinh dị nổi bật năm 2022",
      year: "20/12/2021",
      img: "https://i1-giaitri.vnecdn.net/2022/01/25/223s-6015-1643106523.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=ogGrB1-yATgHzDHkZIdLtA",
      desc: "Nhiều nhân vật đình đám của dòng phim kinh dị như sát nhân Ghostface, Halloween, Leatherface, Esther tái xuất màn ảnh 2022.",
    },
    {
      id: "6",
      title: 'Kphim ra mắt chức năng "Kitkot" cực thú vị',
      year: "26/1/2022",
      img: "https://i.imgur.com/HMCAdfE.png",
      desc: "Kitkot là sự kết hợp giữa trải nghiệm 'lướt' và 'xem' cung cấp nội dung phong phú về những trích đoạn, phân cảnh, phân tích,... của các bộ phim nhằm đưa ra sự gợi ý cho khán giả khi lựa chọn phim để xem.",
    },
    {
      id: "2",
      title:
        "Netflix tung poster nhá hàng sự xuất hiện của nhận vật mới trong The Witcher 3",
      year: "26/12/2021",
      img: "https://f5-zpcloud.zdn.vn/4900695045814518978/63b52bd2c0a60df854b7.jpg",
      desc: "Hình ảnh Nguyễn Tuấn Kiệt đứng bên cạnh Henry Cavill khiến fan hâm mộ Việt Nam háo hức cực độ ngóng chờ sự xuất hiện của anh trong phần 3 series The Witcher đình đám của Netflix.",
    },
    {
      id: "3",
      title: "Tình bạn bất chấp tuổi tác giữa Keanu Reeves và Nguyễn Tuấn Kiệt",
      year: "2/1/2022",
      img: "https://i.imgur.com/K4AGWSX.png",
      desc: "Vừa qua hình ảnh Keanu Reeves ngồi trầm tư bên cạnh Nguyễn Tuấn Kiệt khiến nhiều người thích thú và được chia sẽ mạnh mẽ trên mạng xã hội. Được biết hình ảnh được chụp trong phim trường John Wick khi cả hai đang nghỉ trưa.",
    },
    {
      id: "4",
      title:
        "Đôi nét về Nguyễn Tuấn Kiệt - viên ngọc quý của điện ảnh Việt Nam",
      year: "14/1/2022",
      img: "https://i.imgur.com/ilGGVya.jpg",
      desc: "Buổi phỏng vấn độc quyền của Kphim với nam diễn viên trẻ tài năng Nguyễn Tuấn Kiệt người đã góp mặt trong hàng loạt bom tấn Hollywood vừa qua.",
    },
    {
      id: "5",
      title: "Nguyễn Tuấn Kiệt sẽ xuất hiện trong Dune 2?",
      year: "23/1/2022",
      img: "https://i.imgur.com/fmRVMkq.jpg",
      desc: "Vừa qua trên Reddit lan truyền một hình ảnh được cho là sự xuất hiện của nam diễn viên Việt Nam Nguyễn Tuấn Kiệt với bộ trang phục đặc trưng của hành tinh cát.",
    },
  ]);

  const [nowShow, setNowShow] = useState(0);
  const [random, setRandom] = useState();

  useEffect(() => {
    // setAllData(allData.reverse());
  }, []);

  const fetchMore = (count = null) => {};

  function toggleVideo(i) {}

  return (
    <div className="container-background">
      <MetaTags>
        <title>Tin Tức phim</title>
        <meta
          name="description"
          content={
            "Tin tức về phim ảnh được biên tập bởi Kphim.xyz cập nhật liên tục, mới, chính xác, phân tích phim!"
          }
        />
      </MetaTags>

      <div className="container p-2 bg-dark">
        <h1 className="primary-color text-center">Tin phim mới nhất</h1>
        <div className="row p-0 m-0">
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
                  <p className="text-muted">
                    <i className="fa fa-clock-o"></i> {e.year}
                  </p>
                  <p>{e.desc}</p>
                  <Link to={"/tintuc/" + e.id + "/" + e.title} className="btn_watch">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;

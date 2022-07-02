import "./style.css";
import Footer from "../../components/Footer";
import { Link, useHistory, useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";
// firebase
import { db } from "../../services/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Draft
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { now } from "jquery";
import axios from "axios";

const NewsContent = (props) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.curentUser);

  const [allData, setAllData] = useState([
    {
      id: "2",
      title:
        "Netflix tung poster nhá hàng sự xuất hiện của nhận vật mới trong The Witcher 3",
      year: "26/12/2021",
      img: "https://f5-zpcloud.zdn.vn/4900695045814518978/63b52bd2c0a60df854b7.jpg",
      desc: "Hình ảnh Nguyễn Tuấn Kiệt đứng bên cạnh Henry Cavill khiến fan hâm mộ Việt Nam háo hức cực độ ngóng chờ sự xuất hiện của anh trong phần 3 series The Witcher đình đám của Netflix.",
      content: {
        blocks: [
          {
            key: "b42cs",
            text: "Nội dung đang cập nhật",
            type: "header-one",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
    },
    {
      id: "3",
      title: "Tình bạn bất chấp tuổi tác giữa Keanu Reeves và Nguyễn Tuấn Kiệt",
      year: "2/1/2022",
      img: "https://i.imgur.com/K4AGWSX.png",
      desc: "Vừa qua hình ảnh Keanu Reeves ngồi trầm tư bên cạnh Nguyễn Tuấn Kiệt khiến nhiều người thích thú và được chia sẽ mạnh mẽ trên mạng xã hội. Được biết hình ảnh được chụp trong phim trường John Wick khi cả hai đang nghỉ trưa.",
      content: {
        blocks: [
          {
            key: "b42cs",
            text: "Nội dung đang cập nhật",
            type: "header-one",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
    },
    {
      id: "4",
      title: " ",
      year: "14/1/2022",
      img: "https://i.imgur.com/ilGGVya.jpg",
      desc: "Buổi phỏng vấn độc quyền của Kphim với nam diễn viên trẻ tài năng Nguyễn Tuấn Kiệt người đã góp mặt trong hàng loạt bom tấn Hollywood vừa qua.",
      content: `{"blocks":[{"key":"21kf8","text":"Đôi nét về Nguyễn Tuấn Kiệt - viên ngọc quý của điện ảnh Việt Nam ","type":"header-one","depth":0,"inlineStyleRanges":[{"offset":0,"length":65,"style":"color-rgb(33,37,41)"},{"offset":0,"length":65,"style":"bgcolor-rgb(248,249,250)"},{"offset":0,"length":65,"style":"fontsize-1.25rem"},{"offset":0,"length":65,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"}],"entityRanges":[],"data":{"text-align":"start"}},{"key":"31f0j","text":"Nguyễn Tuấn Kiệt là nam diễn viên sinh năm 1999 tại Việt Nam, từ năm 6 tuổi anh đã tham gia lớp 1, năm 12 tuổi anh trở thành học sinh lớp 6. Với tài năng được bộc lộ từ sớm như vậy anh đã bỏ túi cho mình nhiều vai diễn đáng chú ý từ khi còn rất bé, có thể kể đến như \"Đại chiến tổ ong\", \"Trùm trường\", \"Life of Kiet\",... Gần đây, sự nghiệp diễn xuất của anh đạt đến tầm cao mới khi kết hợp với Leonardo Dicaprio trong bộ phim \"Water Gun\". ","type":"header-six","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c2qn1","text":"Đây là buổi phỏng vấn độc quyền của Kphim với Nguyễn Tuấn Kiệt nhân dịp \"Water Gun\" sắp ra mắt tại Việt Nam.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5pi8c","text":"Phóng viên (PV): Xin chào Kiệt, rất vui khi được gặp bạn ngày hôm nay.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":17,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"drvdt","text":"Kiệt: Xin chào, chào các khán giả của Kphim, mình là Kiệt, rất vui được gặp các bạn.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"8anjo","text":"PV: Trong năm 2021 vừa qua, bạn đã có những sản phẩm điện ảnh nào nổi bật có thể chia sẻ với mọi người?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":3,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"1ra4s","text":"Kiệt: Vừa qua là một năm bận rộn với mình, đầu tiên là bộ phim kinh dị \"Vina House\" của đạo diễn Jordan Peele. Trong phim này thì mình đóng cặp với Emma Watson trong vai một cặp vợ chồng trẻ chuyển đến một ngôi nhà ở vùng quê, phim này ghê lắm đó mọi người. Sau phim này thì mình có tham gia một bộ phim hài đó là \"Switched\" phim này mình kết hợp với BlackPink kể về một tai nạn khiến mình hóa đổi thân xác với Lisa ngay trước tua diễn của nhóm. Sắp tới thì bộ phim \"Water Gun\" sẽ ra mắt vào tháng 3 năm nay, đây là một bom tấn hành động của đạo diễn \"Micheal Bay\" kể về hai điệp viên do mình và Leonardo đóng chính, hi vọng các bạn sẽ ủng hộ bộ phim này của mình.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"},{"offset":466,"length":11,"style":"color-rgb(33,37,41)"},{"offset":596,"length":68,"style":"color-rgb(33,37,41)"},{"offset":466,"length":11,"style":"bgcolor-rgb(255,255,255)"},{"offset":596,"length":68,"style":"bgcolor-rgb(255,255,255)"},{"offset":466,"length":11,"style":"fontsize-16"},{"offset":596,"length":68,"style":"fontsize-16"},{"offset":466,"length":11,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"},{"offset":596,"length":68,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"}],"entityRanges":[],"data":{}},{"key":"275mm","text":"PV: Trong quá trình quay phim bạn có kỷ niệm nào thú vị khi làm việc với các ngôi sao khác?\nKiệt: Haha... Trong phim Switched có phân đoạn mình hoán đổi thân xác với Lisa thì đoạn đoán là mình và cô ấy phải hôn nhau trong tư thế lộn ngược, cảnh này này khó lắm, mình phải hôn cô ấy hơn 100 lần mới đạt cảnh đó. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":125,"style":"color-rgb(33,37,41)"},{"offset":0,"length":125,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":125,"style":"fontsize-16"},{"offset":0,"length":125,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"},{"offset":0,"length":3,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9trre","text":"PV: Sắp tới bạn có dự án nào tại Việt Nam không?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":3,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"21ggu","text":"Kiệt: Mình chưa thể nói trước được, vì hiện tại mình đang có rất nhiều dự án đã lên kế hoạch. Tuy vậy, mình cũng rất hứng thú nếu có cơ hội được thực hiện một bộ phim tại Việt Nam.\nPV: Nếu tham gia một bộ phim tại Việt Nam, bạn muốn kết hợp với ai?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"b5s8s","text":"Kiệt: Nếu bạn diễn nữ thì có lẽ là chị Lan Ngọc, nếu nam thì mình rất vui nếu là chú Thái Hòa. \nPV: Cảm ơn bạn đã tham gia buổi phỏng vấn hôm nay, chúc bạn thành công trong các dự án sắp tới.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"},{"offset":96,"length":3,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"bf0ac","text":"Kiệt: Cảm ơn bạn, chúc các khán giả của KPhim năm mới vui vẻ. Mong các bạn ủng hộ cho sản phẩm \"Water Gun\" sắp ra mắt của mình. Cảm ơn các bạn rất nhiều!","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"f3o67","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"1is39","text":"Ảnh: Nguyễn Tuấn Kiệt khi tham gia siêu phẩm Avenger của Mavel vào năm 2019","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"center"}}],"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-9/56237611_2864299663795283_4738341258206904320_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=UR_bzuxZV2QAX_C7ryt&_nc_oc=AQl8MZzQ0XRWAFo_Lv8XJsp4mp_G-G5FX6HFoJsfYhXz9wvNhLt7hq921_rnL_Bdbbc&_nc_ht=scontent.fhan2-4.fna&oh=00_AT_puKihkG2wK8qRtLX8vDB1JckobHmqsu8WLqcbSFgEBg&oe=621740EB","height":"400px","width":"auto","alt":"Kiệt trong avengert"}}}}`,
    },
    {
      id: "5",
      title: "Nguyễn Tuấn Kiệt sẽ xuất hiện trong Dune 2?",
      year: "23/1/2022",
      img: "https://i.imgur.com/fmRVMkq.jpg",
      desc: "Vừa qua trên Reddit lan truyền một hình ảnh được cho là sự xuất hiện của nam diễn viên Việt Nam Nguyễn Tuấn Kiệt với bộ trang phục đặc trưng của hành tinh cát.",
      content: {
        blocks: [
          {
            key: "b42cs",
            text: "Nội dung đang cập nhật",
            type: "header-one",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
    },
  ]);

  const [nowShow, setNowShow] = useState(null);
  const [random, setRandom] = useState();
  const history = useHistory();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(process.env.REACT_APP_API_DEPLOYED2 + "news/new/" + id)
      .then((res) => {
        let a = Object.values(res.data)[0];
        try {
          a.content = JSON.parse(a.content);
          console.log(a.content);
        } catch {
          a.content = {
            blocks: [
              {
                key: "b42cs",
                text: "Kphim ra mắt chức năng KitKot cực thú vị",
                type: "header-one",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          };
        }
        setNowShow(a);
      })
      .catch((e) => {
        allData.map((e) => e.id == id && setNowShow(e));
      });

    // db.ref("newscontent")
    //   .orderByChild("id")
    //   .equalTo(id)
    //   .get()
    //   .then((res) => {
    //     let a = Object.values(res.val())[0];
    //     try {
    //       a.content = JSON.parse(a.content);
    //       console.log(a.content);
    //     } catch {
    //       a.content = {
    //         blocks: [
    //           {
    //             key: "b42cs",
    //             text: "Kphim ra mắt chức năng KitKot cực thú vị",
    //             type: "header-one",
    //             depth: 0,
    //             inlineStyleRanges: [],
    //             entityRanges: [],
    //             data: {},
    //           },
    //         ],
    //         entityMap: {},
    //       };
    //     }
    //     setNowShow(a);
    //   })
    //   .catch(() => {
    //     allData.map((e) => e.id == id && setNowShow(e));
    //   });
  }, [id]);

  const fetchMore = (count = null) => {};

  function toggleVideo(i) {}

  return (
    <div>
      <MetaTags>
        <title>{nowShow !== null ? nowShow.title : "Tin Tức phim"}</title>
        <meta
          name="description"
          content={
            "Tin tức về phim ảnh được biên tập bởi Kphim.xyz cập nhật liên tục, mới, chính xác, phân tích phim. "
          }
        />
      </MetaTags>
      {/* <div className="border border-3 m-3">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              alt: { present: true, mandatory: true },
            },
          }}
        />
      </div>
      <hr />
      <div
        dangerouslySetInnerHTML={{
          __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        }}
        className="container"
      ></div>
      <hr />
      <hr />
      <textarea
        value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
        className="w-100 "
      />
      <hr />
      ....... */}
      <div className="container p-2 mb-2">
        <nav className="news-breadcrumb pt-3" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/tintuc">Tin phim</Link>
            </li>
            <li class="breadcrumb-item " aria-current="page">
              {nowShow !== null ? nowShow.title : "..."}
            </li>
          </ol>
        </nav>{" "}
        {nowShow !== null ? (
          <div
            dangerouslySetInnerHTML={{
              __html: draftToHtml(
                // JSON.parse(nowShow.content)
                nowShow.content
              ),
            }}
            className=" render-newscontent"
          ></div>
        ) : (
          <div>Đang tải...</div>
        )}
        <nav className="news-breadcrumb pt-3" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/tintuc">Tin phim</Link>
              {/* <div className="div" onClick={() => history.goBack()}>
                cccc
              </div> */}
            </li>
            <li class="breadcrumb-item " aria-current="page">
              {nowShow !== null ? nowShow.title : "..."}
            </li>
          </ol>
        </nav>
        <h3>Xem thêm</h3>
        <div className="row">
          {allData.slice(0, 3).map((e, i) => (
            <div className="col-6 col-sm-4 col-md-4 mt-2 bg-light">
              <div className="border border-dark border-2  p-2">
                <div className="col-12  ">
                  <h5>{e.title}</h5>
                  <p className="text-muted">
                    <i className="fa fa-clock-o"></i> {e.year}
                  </p>
                  <p>{e.desc}</p>
                  <Link to={"/tintuc/" + e.id + "/" + e.title}>
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>{" "}
      </div>
      <Footer />
    </div>
  );
};

export default NewsContent;

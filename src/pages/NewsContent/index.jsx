import "./style.css";
import Footer from "../../components/Footer";
import { Link, useHistory, useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";
// firebase
import { useEffect, useState } from "react";

// Draft
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import axios from "axios";

const NewsContent = (props) => {
  const { id } = useParams();
  const [nowShow, setNowShow] = useState(null);
  const history = useHistory();
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(process.env.REACT_APP_API_DEPLOYED2 + "news/new/" + id)
      .then((res) => {
        let a;
        try {
          a = Object.values(res.data)[0];
          a.content = JSON.parse(a.content);
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
        history.push("404");
      });
    axios
      .get(process.env.REACT_APP_API_DEPLOYED2 + "news/page/0/0")
      .then((res) => {
        setNewData(Object.values(res.data).reverse());
      });
  }, [id]);

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
          {newData.slice(0, 3).map((e, i) => (
            <div className="col-6 col-sm-4 col-md-4 mt-2 bg-light">
              <div className="border border-dark border-2  p-2">
                <div className="col-12  ">
                  <h5 className="titleNews" title={e.title}>{e.title}</h5>

                  <p>{e.preview}</p>
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

import "./style.css";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
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

const SoanTin = (props) => {
  const [nowShow, setNowShow] = useState(null);
  const [title, setTitle] = useState("");

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {}, []);

  const DangTin = () => {
    db.ref("/newscontent")
      .orderByKey()
      .limitToLast(1)
      .once("value")
      .then((res) => {
        console.log(res.val());
        db.ref("/newscontent").push({
          content: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
          id: parseInt(Object.values(res.val())[0].id) + 1 + "",
          title: title,
        });
      })
      .catch((e) => console.log(e));
    // db.ref("/newscontent").push({
    //   content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    // });
  };

  function toggleVideo(i) {}

  return (
    <div className="text-dark bg-light">
      <div className="border border-3 mt-3 mb-3">
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
      <h4 className="text-center">Xem trước</h4>
      <div
        dangerouslySetInnerHTML={{
          __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        }}
        className="m-2 bg-faded "
      ></div>
      <hr />
      {/* <textarea
        value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
        className="w-100 "
      /> */}

      <div className="text-center">
        Tựa đề:{" "}
        <input onChange={(e) => setTitle(e.target.value)} className="w-75" />
        <br />
        <div className="btn btn-danger m-3" onClick={() => DangTin()}>
          Đăng tin
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SoanTin;

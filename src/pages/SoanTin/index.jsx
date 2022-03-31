import "./style.css";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";
// firebase
import { db } from "../../services/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Draft
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const SoanTin = (props) => {
  const { dataNew, token, setFetch } = props;
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [img, setImg] = useState("");

  // edit
  const [edit, setEdit] = useState(null);
  const [title2, setTitle2] = useState("");
  const [preview2, setPreview2] = useState("");
  const [img2, setImg2] = useState("");
  const [editorState2, setEditorState2] = useState(() =>
    // EditorState.createEmpty()
    EditorState.createWithContent(ContentState.createFromText("Hello"))
  );

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
          img: img,
          preview: preview,
        });
      })
      .catch((e) => console.log(e));
    // db.ref("/newscontent").push({
    //   content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    // });
  };

  const UpdateTin = () => {
    db.ref("/newscontent")
      .orderByChild("id")
      .equalTo(edit)
      .once("value")
      .then((res) => {
        console.log(Object.keys(res.val())[0]);
        db.ref("/newscontent/" + Object.keys(res.val())[0]).update({
          content: JSON.stringify(
            convertToRaw(editorState2.getCurrentContent())
          ),
          title: title2,
          img: img2,
          preview: preview2,
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container my-2 mb-3">
      <div className="row">
        <h4 className="text-center">
          <strong className="display-6 fw-bold fst-italic "> Tin Tức</strong>{" "}
          <div className="dashboxs_coin">
            <button
              className="ms-1 btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Soan Tin moi
            </button>{" "}
          </div>
        </h4>
        <div>
          {/* {JSON.stringify(ContentState.createFromText("Hello"))}
          ..
          <br />
          .. ..
          <br />
          <br />
          {JSON.stringify(editorState2)}{" "} */}
          <table class="table table-hover table-dark">
            <thead>
              <tr className="text-center">
                <th>id</th>
                <th> title</th>
                <th>img</th>
                <th>xem</th>
              </tr>
            </thead>
            <tbody>
              {dataNew.map((e, i) => (
                <tr className="text-center">
                  <td>{e.id}</td>
                  <td className="text-start">
                    <strong>
                      {e.title}
                      {/* {JSON.stringify(e.content)} */}
                      {/* {JSON.stringify(convertFromRaw(JSON.parse(e.content)))} */}
                    </strong>{" "}
                    <br />
                    <span className="text-muted">{e.preview}</span>
                  </td>
                  <td>
                    <img src={e.img} width="100" height={100} alt="anh bia" />
                  </td>
                  <td>
                    <Link to={"/tintuc/" + e.id} target="_blank">
                      xem
                    </Link>
                    <span
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#editmodal"
                      onClick={() => {
                        setEdit(e.id);
                        setImg2(e.img === undefined ? "" : e.img);
                        setPreview2(e.preview === undefined ? "": e.preview);
                        setTitle2(e.title === undefined ? "" : e.title);
                        setEditorState2(
                          EditorState.createWithContent(
                            convertFromRaw(JSON.parse(e.content))
                          )
                        ); // dm cho nay kho vl
                      }}
                    >
                      Edit
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ADD MODAL */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-dialog-centered ">
            <div className="modal-content bg-dark border-warning">
              <>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold" id="exampleModalLabel">
                    Soan Tin moi
                  </h5>
                  <button
                    type="button"
                    className="btn_close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id=""
                  >
                    <i className="fa fa-close" />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="text-dark bg-light pt-3">
                    {" "}
                    <div className="text-center">
                      Tựa đề:{" "}
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-75"
                      />
                    </div>{" "}
                    <div className="text-center">
                      link img:{" "}
                      <input
                        onChange={(e) => setImg(e.target.value)}
                        className="w-75"
                      />
                    </div>{" "}
                    <div className="text-center">
                      Preview:{" "}
                      <input
                        onChange={(e) => setPreview(e.target.value)}
                        className="w-75"
                      />
                    </div>
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
                        __html: draftToHtml(
                          convertToRaw(editorState.getCurrentContent())
                        ),
                      }}
                      className="m-2 bg-faded "
                    ></div>
                    <hr />{" "}
                    <div className="text-center">
                      {" "}
                      <div
                        className="btn btn-danger m-3"
                        onClick={() => DangTin()}
                      >
                        Đăng tin
                      </div>
                    </div>
                    <textarea
                      // value={JSON.stringify(
                      //   convertToRaw(editorState.getCurrentContent())
                      // )}
                      value={JSON.stringify(editorState)}
                      className="w-100 "
                    />
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
        {/* Edit MODAL */}
        <div
          className="modal fade"
          id="editmodal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-dialog-centered ">
            <div className="modal-content bg-dark border-warning">
              <>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold" id="exampleModalLabel">
                    edit tin
                  </h5>
                  <button
                    type="button"
                    className="btn_close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id=""
                  >
                    <i className="fa fa-close" />
                  </button>
                </div>
                {
                  <div className="modal-body">
                    <div className="text-dark bg-light pt-3">
                      {" "}
                      <div className="text-center">
                        Tựa đề:{" "}
                        <input
                          onChange={(e) => setTitle2(e.target.value)}
                          value={title2}
                          className="w-75"
                        />
                      </div>{" "}
                      <div className="text-center">
                        link img:{" "}
                        <input
                          onChange={(e) => setImg2(e.target.value)}
                          value={img2}
                          className="w-75"
                        />
                      </div>{" "}
                      <div className="text-center">
                        Preview:{" "}
                        <input
                          onChange={(e) => setPreview2(e.target.value)}
                          className="w-75"
                          value={preview2}
                        />
                      </div>
                      <div className="border border-3 mt-3 mb-3">
                        <Editor
                          editorState={editorState2}
                          onEditorStateChange={setEditorState2}
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
                      {/* {JSON.stringify(editorState2)} */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            convertToRaw(editorState2.getCurrentContent())
                          ),
                        }}
                        className="m-2 bg-faded "
                      ></div>
                      <hr />{" "}
                      <div className="text-center">
                        {" "}
                        <div
                          className="btn btn-danger m-3"
                          onClick={() => UpdateTin()}
                        >
                          Đăng tin
                        </div>
                      </div>
                      {/* <textarea
                      value={JSON.stringify(
                        convertToRaw(editorState.getCurrentContent())
                      )}
                      className="w-100 "
                    /> */}
                    </div>
                  </div>
                }
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoanTin;

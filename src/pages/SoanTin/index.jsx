import "./style.css";
import { Link, useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";
// firebase
import { db } from "../../services/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ModalAlert from "./../../components/ModalAlart/ModalAlert";

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
  const [onLoading, setonLoading] = useState(false);
  const [openModal, setOpenModal] = useState(null);

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

  function Refresh() {
    setFetch(true);
  }

  useEffect(() => {}, []);

  const DangTin = () => {
    setonLoading(true);
    db.ref("/newscontent")
      .orderByKey()
      .limitToLast(1)
      .once("value")
      .then((res) => {
        db.ref("/newscontent").push({
          content: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
          id: parseInt(Object.values(res.val())[0].id) + 1 + "",
          title: title,
          img: img,
          preview: preview,
        });
        setOpenModal("Đã đăng tin thành công!");
        setonLoading(false);
      })
      .catch((e) => {
        setOpenModal(e);
        setonLoading(false);
      });
      const myTimeout = setTimeout(Refresh, 5000);
    // db.ref("/newscontent").push({
    //   content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    // });
  };

  const UpdateTin = () => {
    setonLoading(true);
    db.ref("/newscontent")
      .orderByChild("id")
      .equalTo(edit)
      .once("value")
      .then((res) => {
        db.ref("/newscontent/" + Object.keys(res.val())[0]).update({
          content: JSON.stringify(
            convertToRaw(editorState2.getCurrentContent())
          ),
          title: title2,
          img: img2,
          preview: preview2,
        });
        setOpenModal("Đã cập nhật thành công!");
        setonLoading(false);
      })
      .catch((e) => {
        setOpenModal(e);
        setonLoading(false);
      });
      const myTimeout = setTimeout(Refresh, 5000);
  };

  return (
    <div className="container my-2 pb-5">
      {onLoading && <Loading />}
      {openModal && (
        <ModalAlert
          close={() => setOpenModal(null)}
          content={openModal}
        />
      )}
      <div className="row">
        <h4 className="text-center">
          <strong className="display-6 fw-bold fst-italic text-uppercase">News management</strong>{" "}
          <div className="dashboxs_coin">
            <button
              className="dashbox__mores me-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Create News
            </button>
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
                <th>Id</th>
                <th>Title</th>
                <th>Image</th>
                <th>Action</th>
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
                    <img src={e.img} width="140" height={100} alt="anh bia" />
                  </td>
                  <td>
                    <Link
                      className="btn btn-success mb-2 mt-2"
                      to={"/tintuc/" + e.id}
                      target="_blank"
                    >
                      <i className="fa fa-external-link ps-2 pe-1" />
                    </Link>
                    <span
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#editmodal"
                      onClick={() => {
                        setEdit(e.id);
                        setImg2(e.img === undefined ? "" : e.img);
                        setPreview2(e.preview === undefined ? "" : e.preview);
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
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  CREATE NEWS
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
                    <span className="labelnew">Title:</span>{" "}
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-75"
                    />
                  </div>{" "}
                  <div className="text-center mt-2 mb-2">
                    <span className="labelnew">Link image:</span>{" "}
                    <input
                      onChange={(e) => setImg(e.target.value)}
                      className="w-75"
                    />
                  </div>{" "}
                  <div className="text-center">
                  <span className="labelnew">Summary</span>{" "}
                    <input
                      onChange={(e) => setPreview(e.target.value)}
                      className="w-75"
                    />
                  </div>
                  <div className="border border-1 border-dark m-3">
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
                  <h4 className="text-center">Preview content</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: draftToHtml(
                        convertToRaw(editorState.getCurrentContent())
                      ),
                    }}
                    className="m-3 bg-faded"
                  ></div>
                  <br />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-primarys"
                  data-bs-dismiss="modal"
                  onClick={() => DangTin()}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn-secondarys"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
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
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  EDIT NEWS
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
                    <span className="labelnew">Title:</span>{" "}
                    <input
                      onChange={(e) => setTitle2(e.target.value)}
                      value={title2}
                      className="w-75"
                    />
                  </div>{" "}
                  <div className="text-center mt-2 mb-2">
                    <span className="labelnew">Link image:</span>{" "}
                    <input
                      onChange={(e) => setImg2(e.target.value)}
                      value={img2}
                      className="w-75"
                    />
                  </div>{" "}
                  <div className="text-center">
                    <span className="labelnew">Summary</span>{" "}
                    <input
                      onChange={(e) => setPreview2(e.target.value)}
                      className="w-75"
                      value={preview2}
                    />
                  </div>
                  <div className="border border-1 border-dark m-3">
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
                  <h4 className="text-center">Preview content</h4>
                  {/* {JSON.stringify(editorState2)} */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: draftToHtml(
                        convertToRaw(editorState2.getCurrentContent())
                      ),
                    }}
                    className="m-2 bg-faded "
                  ></div>
                  {/* <div className="text-center">
                    {" "}
                    <div
                      className="btn btn-warning m-3"
                      onClick={() => UpdateTin()}
                    >
                      UPDATE
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-primarys"
                  data-bs-dismiss="modal"
                  onClick={() => UpdateTin()}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn-secondarys"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoanTin;

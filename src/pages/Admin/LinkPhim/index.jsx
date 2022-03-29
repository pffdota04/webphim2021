import axios from "axios";
import { data } from "jquery";
import { useState, useEffect } from "react";
import Loading from "../../../components/Loading";
import "./style.css";

const LinkPhim = (props) => {
  const { dataL, token, setFetchLink } = props;
  const [onLoading, setonLoading] = useState(false);
  const [forceRender, setForceRander] = useState(0); // mặc định là link  đầu tiên
  const [getVip, setVip] = useState(null);
  const [getVip2, setVip2] = useState(null); // copy
  const [getDefault, setDefault] = useState(null);
  const [getDefault2, setDefault2] = useState(null); // copy
  const [getSub, setSub] = useState(null);
  const [getSub2, setSub2] = useState(null); // copy
  const [choseL, setChoseL] = useState(undefined);
  const [isLoadLink, setIsLoadLink] = useState(false);
  const [form, setForm] = useState(0); // 0 = defautl, 1 = vip, 2 = sub
  const [formData, setFormData] = useState({}); // luu data nhap vao
  const [dataLState, setDataLState] = useState([]); // luu data nhap vao

  useEffect(() => {
    setDataLState(dataL);
  }, [dataL]);

  useEffect(() => {
    setFormData({});
  }, [form]);

  useEffect(() => {
    if (choseL !== undefined) {
      setIsLoadLink(true);
      axios
        .post(process.env.REACT_APP_API_LOCAL + "admin/linkvip2", {
          token: token,
          fid: choseL,
        })
        .then((res) => {
          if (res.data !== null) {
            setVip(res.data.chap);
            setVip2(res.data.chap);
          } else {
            setVip(res.data);
            setVip2(res.data);
          }

          setIsLoadLink(false);
        })
        .catch((e) => setIsLoadLink(false));
      axios
        .post(process.env.REACT_APP_API_LOCAL + "admin/linkdefault2", {
          token: token,
          fid: choseL,
        })
        .then((res) => {
          if (res.data !== null) {
            setDefault(res.data.chap);
            setDefault2(res.data.chap);
          } else {
            setDefault(res.data);
            setDefault2(res.data);
          }
          setIsLoadLink(false);
        })
        .catch((e) => setIsLoadLink(false));

      axios
        .post(process.env.REACT_APP_API_LOCAL + "admin/linksub", {
          token: token,
          fid: choseL,
        })
        .then((res) => {
          if (res.data !== null) {
            setSub(res.data.chap);
            setSub2(res.data.chap);
          } else {
            setSub(res.data);
            setSub2(res.data);
          }
        })
        .catch((e) => setIsLoadLink(false));
    }
  }, [choseL]);

  function reRender() {
    setForceRander(forceRender + 1);
  }
  const formLink = (currentLink, setNew) => {
    return (
      <div className="row g-3" id="editFilm">
        <div className="col-12">
          <h4 className="text-center">ID Film {choseL}</h4>
        </div>
        <label>
          Link Default:
          <button
            className="ms-1 btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => {
              setForm(0);
            }}
          >
            <i className="fa fa-plus" />
          </button>
        </label>
        {/* {JSON.stringify(getDefault)}
        {JSON.stringify(getVip)} */}
        {getDefault !== null && getDefault !== undefined ? (
          <table class="table table-hover table-dark">
            <thead>
              <tr className="text-center">
                <th>Chap</th>
                <th className="link-quality">Quality</th>
                <th>Link</th>
                <th className="link-quality">Remove</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(getDefault).map(
                (e, achap) =>
                  e !== null &&
                  Object.keys(getDefault[e].link).map((quali, i) => (
                    <tr className={"text-center "}>
                      <td
                        className={
                          achap % 2 === 0 ? " text-light" : " text-danger"
                        }
                      >
                        {i === 0 && e}
                      </td>
                      <td>
                        <input
                          readOnly
                          className="w-100"
                          type="text"
                          value={quali}
                        />
                      </td>
                      <td>
                        <input
                          className="w-100"
                          type="text"
                          value={getDefault[e].link[quali]}
                          readOnly
                        />
                      </td>
                      <td>
                        <div
                          className="btn btn-danger"
                          onClick={() => removeDefault(e, quali)}
                        >
                          <i className="fa fa-times" />
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        ) : (
          <p>Chưa có link nào</p>
        )}
        <label>
          Link Vip:
          <button
            className="ms-1 btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => {
              setForm(1);
            }}
          >
            <i className="fa fa-plus" />
          </button>
        </label>
        {getVip !== null && getVip !== undefined ? (
          <table class="table table-hover table-dark">
            <thead>
              <tr className="text-center">
                <th>Chap</th>
                <th className="link-quality">Quality</th>
                <th>Link</th>
                <th className="link-quality">Remove</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(getVip).map(
                (e, achap) =>
                  e !== null &&
                  Object.keys(getVip[e].link).map((quali, i) => (
                    <tr className="text-center">
                      <td
                        className={
                          achap % 2 === 0 ? " text-light" : " text-danger"
                        }
                      >
                        {i === 0 && e}
                      </td>
                      <td>
                        <input
                          className="w-100"
                          type="text"
                          readOnly
                          value={quali}
                        />
                      </td>
                      <td>
                        <input
                          className="w-100"
                          type="text"
                          value={getVip[e].link[quali]}
                          readOnly
                        />
                      </td>
                      <td>
                        <div
                          className="btn btn-danger"
                          onClick={() => removeVip(e, quali)}
                        >
                          <i className="fa fa-times" />
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        ) : (
          <p>Chưa có link nào</p>
        )}
        <label>
          Link Sub:
          <button
            className="ms-1 btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => {
              setForm(2);
            }}
          >
            <i className="fa fa-plus" />
          </button>
        </label>
        {getSub !== null && getSub !== undefined ? (
          <table class="table table-hover table-dark">
            <thead>
              <tr className="text-center">
                <th>Chap</th>
                <th className="link-quality"> Language</th>
                <th>Link</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {getSub !== undefined &&
                Object.keys(getSub).map((echap, achap) =>
                  Object.keys(getSub[echap].sub).map((e, i) => (
                    <tr className="text-center">
                      <td
                        className={
                          achap % 2 === 0 ? " text-light" : " text-danger"
                        }
                      >
                        {i === 0 && echap}
                      </td>
                      <td>
                        <input
                          className="w-100"
                          type="text"
                          readOnly
                          value={e}
                        ></input>
                      </td>
                      <td>
                        <input
                          className="w-100"
                          type="text"
                          readOnly
                          value={getSub[echap].sub[e]}
                        ></input>
                      </td>
                      <td>
                        <div
                          className="btn btn-danger"
                          onClick={() => removeSub(echap, e)}
                        >
                          <i className="fa fa-times" />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        ) : (
          <p>Chưa có sub nào</p>
        )}
      </div>
    );
  };

  function updateLink() {
    // LVip LDefaul LSub là một object info Link  sau khi cập nhật
    setonLoading(true);
    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/update/link2", {
        token: token,
        LDefaul: getDefault,
        LVip: getVip,
        LSub: getSub,
        fid: choseL,
      })
      .then((res) => {
        if (res.data === "okok") {
          alert("Cập nhật thành công");
        }
        setonLoading(false);
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  const removeVip = (chap, quality) => {
    let a = JSON.parse(JSON.stringify(getVip));
    delete a[chap].link[quality];
    if (Object.keys(a[chap].link).length === 0) delete a[chap];
    if (Object.keys(a).length === 0) a = null;
    setVip(a);
  };

  const removeDefault = (chap, quality) => {
    let a = JSON.parse(JSON.stringify(getDefault));
    delete a[chap].link[quality];
    if (Object.keys(a[chap].link).length === 0) delete a[chap];
    if (Object.keys(a).length === 0) a = null;
    setDefault(a);
  };

  const removeSub = (chap, quality) => {
    let a = JSON.parse(JSON.stringify(getSub));
    delete a[chap].sub[quality];
    if (Object.keys(a[chap].sub).length === 0) delete a[chap];
    if (Object.keys(a).length === 0) a = null;
    setSub(a);
  };

  const themLink = (type) => {
    if (
      formData.chap === "" ||
      formData.chap === undefined ||
      formData.link === undefined ||
      formData.link === "" ||
      formData.quality === "" ||
      formData.quality === undefined
    )
      alert("Thông tin trống!");
    else if (type === 0) {
      let a = JSON.parse(JSON.stringify(getDefault));
      if (a === null) a = {};
      if (a[formData.chap] === undefined)
        a[formData.chap] = { link: { [formData.quality]: formData.link } };
      // else if (a[formData.chap].link[formData.quality] === undefined) {
      else {
        a[formData.chap].link = {
          ...a[formData.chap].link,
          [formData.quality]: formData.link,
        };
      }
      setDefault(a);
    } else if (type === 1) {
      let a = JSON.parse(JSON.stringify(getVip));
      if (a === null) a = {};

      if (a[formData.chap] === undefined)
        a[formData.chap] = { link: { [formData.quality]: formData.link } };
      else {
        a[formData.chap].link = {
          ...a[formData.chap].link,
          [formData.quality]: formData.link,
        };
      }
      setVip(a);
    } else if (type === 2) {
      let a = JSON.parse(JSON.stringify(getSub));
      if (a === null) a = {};
      if (a[formData.chap] === undefined)
        a[formData.chap] = { sub: { [formData.quality]: formData.link } };
      else {
        a[formData.chap].sub = {
          ...a[formData.chap].sub,
          [formData.quality]: formData.link,
        };
      }
      setSub(a);
    }
  };

  const ModalForm = () => {
    return (
      <div className="modal-content bg-dark border-warning">
        {form === 0
          ? modalAddDefault()
          : form === 1
          ? modalAddVip()
          : form === 2
          ? modalAddSub()
          : ""}
      </div>
    );
  };

  const modalAddDefault = () => {
    return (
      <>
        <div className="modal-header">
          <h5 className="modal-title fw-bold" id="exampleModalLabel">
            Add link default (PHIM: {choseL})
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
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Chap
              </label>
              <input
                type="number"
                className="form-control"
                value={formData.chap !== undefined ? formData.chap : ""}
                required
                onChange={(e) =>
                  setFormData({ ...formData, chap: e.target.value })
                }
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Quality
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="ex: 480, 720"
                value={formData.quality !== undefined ? formData.quality : ""}
                required
                onChange={(e) =>
                  setFormData({ ...formData, quality: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label htmlFor="lastName" className="form-label">
                Link
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="link video (ex: abc.xyz/123.mp4)"
                value={formData.link !== undefined ? formData.link : ""}
                required
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn-primarys"
            data-bs-dismiss="modal"
            onClick={() => themLink(0)}
          >
            Thêm
          </button>
          <button
            type="button"
            className="btn-secondarys"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </>
    );
  };
  const modalAddVip = () => {
    return (
      <>
        <div className="modal-header">
          <h5 className="modal-title fw-bold" id="exampleModalLabel">
            Add link Vip (PHIM: {choseL})
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
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Chap
              </label>
              <input
                type="number"
                className="form-control"
                value={formData.chap !== undefined ? formData.chap : ""}
                required
                onChange={(e) =>
                  setFormData({ ...formData, chap: e.target.value })
                }
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Quality
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="ex: 480, 720"
                value={formData.quality !== undefined ? formData.quality : ""}
                required
                onChange={(e) =>
                  setFormData({ ...formData, quality: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label htmlFor="lastName" className="form-label">
                Link
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="link video (ex: abc.xyz/123.mp4)"
                value={formData.link !== undefined ? formData.link : ""}
                required
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn-primarys"
            data-bs-dismiss="modal"
            onClick={() => themLink(1)}
          >
            Thêm
          </button>
          <button
            type="button"
            className="btn-secondarys"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </>
    );
  };
  const modalAddSub = () => {
    return (
      <>
        <div className="modal-header">
          <h5 className="modal-title fw-bold" id="exampleModalLabel">
            Add link Sub (PHIM: {choseL})
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
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Chap
              </label>
              <input
                type="number"
                className="form-control"
                value={formData.chap !== undefined ? formData.chap : ""}
                required
                onChange={(e) =>
                  setFormData({ ...formData, chap: e.target.value })
                }
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Language
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="ex: vi, en, fr"
                value={formData.quality !== undefined ? formData.quality : ""}
                required
                onChange={(e) =>
                  setFormData({ ...formData, quality: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label htmlFor="lastName" className="form-label">
                Link
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="link vtt (ex: abc.xyz/123.vtt)"
                value={formData.link !== undefined ? formData.link : ""}
                required
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn-primarys"
            data-bs-dismiss="modal"
            onClick={() => themLink(2)}
          >
            Thêm
          </button>
          <button
            type="button"
            className="btn-secondarys"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </>
    );
  };

  const undoAll = () => {
    setVip(getVip2);
    setDefault(getDefault2);
    setSub(getSub2);
  };

  const sortData = () => {
    let a = dataLState;
    a = a.reverse();
    setDataLState(a);
    reRender();
  };

  return (
    <div className="my-2 mb-3">
      {onLoading && <Loading />}
      <div className="row">
        {/* <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic "> Links</strong>{" "}
            <div className="dashboxs">
              <button
                className="dashbox__mores me-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Link
              </button>
              <button className="dashbox__mores_link" onClick={() => Refresh()}>
                Refresh Data
              </button>
            </div>
          </h4>
        </div> */}
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">
              {" "}
              Link Managerment
            </strong>{" "}
          </h4>
        </div>
        <div className="col-12  col-xl-4 mt-2">
          {/* <label htmlFor="timkiem">Tìm kiếm: </label>
          <input
            id="timkiem"
            className="ms-1"
            onChange={(e) => searching(e.target.value)}
            placeholder="id phim"
          /> */}
          {dataLState != undefined && (
            <div className="table-responsive-xl table-link">
              <table class="table table-hover table-dark">
                <thead>
                  <tr className="text-center">
                    <th>
                      ID Film{" "}
                      <button
                        className="btn btn-sm mt-0"
                        onClick={() => {
                          sortData();
                        }}
                      >
                        <i class="fa fa-sort-down text-light"></i>
                      </button>
                    </th>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataLState.map((e, i) => (
                    <tr className="text-center">
                      <td>{e.id}</td>
                      <td>{e.title.substring(0, 10)}...</td>
                      <td>
                        <button
                          className="btn btn-sm  main__table_link-btn--edit"
                          onClick={() => {
                            setChoseL(e.id);
                            window.scrollTo({
                              top:
                                document
                                  .getElementById("editlink")
                                  .getBoundingClientRect().top +
                                window.pageYOffset +
                                -62,
                              behavior: "smooth",
                            });
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="col-12 col-lg-8 mt-2 " id="editlink">
          {/* <h4 className="text-center">
            <strong id="editlink" className="display-6 fw-bold fst-italic ">
              Edit Link
            </strong>
          </h4> */}
          {choseL != undefined ? (
            isLoadLink ? (
              <Loading />
            ) : (
              <>
                {formLink(choseL)}
                <hr className="my-4" />
                <div className="w-100 d-inline-block text-end">
                  <button
                    className="p-2 btn btn-primary btn-xl mt-2"
                    onClick={() => updateLink()}
                  >
                    Update
                  </button>
                  <button
                    className="p-2 ms-2  btn btn-danger btn-xl mt-2"
                    onClick={() => undoAll()}
                  >
                    Undo
                  </button>
                </div>
              </>
            )
          ) : (
            "Chọn một phim để xem"
          )}
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-dialog-centered ">
            {ModalForm()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LinkPhim;

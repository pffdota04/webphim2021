import axios from "axios";
import { data } from "jquery";
import { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import Loading from "../../../components/Loading";
import "./style.css";

const LinkPhim = (props) => {
  const { dataL, token, setFetchLink, dataF } = props;
  const [onLoading, setonLoading] = useState(false);
  const [forceRender, setForceRander] = useState(0); // mặc định là link  đầu tiên
  const [getAll1Link, setAll1Link] = useState(null);
  const [getLinkUndo, setLinkUndo] = useState(null);

  const [getSub, setSub] = useState(null);
  const [getSub2, setSub2] = useState(null); // copy
  const [choseL, setChoseL] = useState(undefined);
  const [isLoadLink, setIsLoadLink] = useState(false);
  const [form, setForm] = useState(0); // 0 = defautl, 1 = vip, 2 = sub
  const [formData, setFormData] = useState({ type: "mp4" }); // luu data nhap vao
  const [dataLState, setDataLState] = useState([]); // luu data nhap vao

  useEffect(() => {
    setDataLState(Object.values(dataL));
  }, [dataL]);

  useEffect(() => {
    setFormData({ type: "mp4" });
  }, [form]);

  useEffect(() => {
    if (choseL !== undefined) {
      setIsLoadLink(true);
      axios
        // .post(process.env.REACT_APP_API_DEPLOYED2 + "admin/linkvip2", {
        .get(process.env.REACT_APP_API_DEPLOYED2 + "link/alllink/" + choseL, {
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          if (res.data == null) {
            setAll1Link(null);
            setLinkUndo(null);
          } else {
            let a = { ...res.data };
            setAll1Link(res.data);
            setLinkUndo({ backup: JSON.parse(JSON.stringify(a)) });
          }
          setIsLoadLink(false);
        })
        .catch((e) => setIsLoadLink(false));

      axios
        .post(process.env.REACT_APP_API_DEPLOYED2 + "admin/linksub", {
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
  const formLink = () => {
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

        {getAll1Link != null &&
        getAll1Link.data.default !== undefined &&
        getAll1Link.data.default.lenght !== 0 ? (
          <table class="table table-hover table-dark">
            <thead>
              <tr className="text-center">
                <th className="link-quality">Chap</th>
                <th className="link-quality">Quality</th>
                <th className="link-quality">Type</th>
                <th>Link</th>
                <th className="link-quality">Remove</th>
              </tr>
            </thead>
            <tbody>
              {/* {JSON.stringify(getAll1Link)} */}
              {getAll1Link.data.default.map(
                (e, achap) =>
                  e !== null &&
                  e.link.map((quali, i) => (
                    <tr className="text-center">
                      <td
                        className={
                          achap % 2 === 0 ? " text-light" : " text-danger"
                        }
                      >
                        {i === 0 && e.chap}
                      </td>
                      <td>
                        <DebounceInput
                          debounceTimeout={200}
                          className="w-100"
                          type="text"
                          value={quali.quality}
                          onChange={(e) => {
                            let a = { ...getAll1Link };
                            a.data.default[achap].link[i].quality =
                              e.target.value;
                            setAll1Link(a);
                          }}
                        />
                      </td>
                      <td>
                        <DebounceInput
                          debounceTimeout={200}
                          className="w-100"
                          type="text"
                          value={quali.type}
                          onChange={(e) => {
                            let a = { ...getAll1Link };
                            a.data.default[achap].link[i].type = e.target.value;
                            setAll1Link(a);
                          }}
                        />
                      </td>
                      <td>
                        <DebounceInput
                          debounceTimeout={200}
                          className="w-100"
                          type="text"
                          value={quali.url}
                          onChange={(e) => {
                            let a = { ...getAll1Link };
                            a.data.default[achap].link[i].url = e.target.value;
                            setAll1Link(a);
                          }}
                        />
                      </td>
                      <td>
                        <div
                          className="btn btn-danger"
                          onClick={() =>
                            removeLink(e.chap, quali.quality, false)
                          }
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
        {getAll1Link != null &&
        getAll1Link.data.vip !== undefined &&
        getAll1Link.data.vip.lenght !== 0 ? (
          <table class="table table-hover table-dark">
            <thead>
              <tr className="text-center">
                <th className="link-quality">Chap</th>
                <th className="link-quality">Quality</th>
                <th className="link-quality">Type</th>
                <th>Link</th>
                <th className="link-quality">Remove</th>
              </tr>
            </thead>
            <tbody>
              {getAll1Link.data.vip.map(
                (e, achap) =>
                  e !== null &&
                  e.link.map((quali, i) => (
                    <tr className="text-center">
                      <td
                        className={
                          achap % 2 === 0 ? " text-light" : " text-danger"
                        }
                      >
                        {i === 0 && e.chap}
                      </td>
                      <td>
                        <DebounceInput
                          debounceTimeout={200}
                          className="w-100"
                          type="text"
                          value={quali.quality}
                          onChange={(e) => {
                            let a = { ...getAll1Link };
                            a.data.vip[achap].link[i].quality = e.target.value;
                            setAll1Link(a);
                          }}
                        />
                      </td>
                      <td>
                        <DebounceInput
                          debounceTimeout={200}
                          className="w-100"
                          type="text"
                          value={quali.type}
                          onChange={(e) => {
                            let a = { ...getAll1Link };
                            a.data.vip[achap].link[i].type = e.target.value;
                            setAll1Link(a);
                          }}
                        />
                      </td>
                      <td>
                        <DebounceInput
                          debounceTimeout={200}
                          className="w-100"
                          type="text"
                          value={quali.url}
                          onChange={(e) => {
                            let a = { ...getAll1Link };
                            a.data.vip[achap].link[i].url = e.target.value;
                            setAll1Link(a);
                          }}
                        />
                      </td>
                      <td>
                        <div
                          className="btn btn-danger"
                          onClick={() =>
                            removeLink(e.chap, quali.quality, true)
                          }
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
        {/* <label>
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
        )} */}
      </div>
    );
  };

  function updateLink() {
    // LVip LDefaul LSub là một object info Link  sau khi cập nhật
    setonLoading(true);
    axios
      .put(
        process.env.REACT_APP_API_DEPLOYED2 + "link",
        {
          linkphim: getAll1Link,
        },
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => {
        if (res.data === "ok") {
          alert("Cập nhật thành công");
        }
        setonLoading(false);
      })
      .catch((e) => {
        alert(e);
        setonLoading(false);
      });
  }

  const removeLink = (chap, quality, isVip) => {
    let a = { ...getAll1Link };
    if (isVip)
      a.data.vip.map((e, i) => {
        if (e.chap == chap) {
          e.link.map((link, j) => {
            if (link.quality == quality) {
              a.data.vip[i].link.splice(j, 1);
              if (a.data.vip[i].link.length == 0) a.data.vip.splice(i, 1);
            }
          });
        }
      });
    else
      a.data.default.map((e, i) => {
        if (e.chap == chap) {
          e.link.map((link, j) => {
            if (link.quality == quality) {
              a.data.default[i].link.splice(j, 1);
              if (a.data.default[i].link.length == 0)
                a.data.default.splice(i, 1);
            }
          });
        }
      });
    // if (Object.keys(a[chap].link).length === 0) delete a[chap];
    // if (Object.keys(a).length === 0) a = null;
    setForceRander(forceRender + 1);
    setAll1Link(a);
  };

  const removeSub = (chap, quality) => {
    let a = JSON.parse(JSON.stringify(getSub));
    delete a[chap].sub[quality];
    if (Object.keys(a[chap].sub).length === 0) delete a[chap];
    if (Object.keys(a).length === 0) a = null;
    setSub(a);
  };

  const themLink = (type) => {
    let a;
    if (getAll1Link != null) a = { ...getAll1Link };
    else a = null;
    if (
      formData.chap === "" ||
      formData.chap === undefined ||
      formData.url === undefined ||
      formData.url === "" ||
      formData.quality === "" ||
      formData.quality === undefined
    )
      alert("Thông tin trống!");
    else if (type === 0) {
      alert(JSON.stringify(a));
      if (a == null) a = { data: { default: [], vip: [] }, _id: choseL };
      alert(JSON.stringify(a));
      if (a.data.default === undefined)
        a.data.default[0] = {
          chap: formData.chap,
          link: [
            {
              quality: formData.quality,
              type: formData.type,
              url: formData.url,
            },
          ],
        };
      else {
        let added = false;
        a.data.default.map((e, i) => {
          if (e.chap == formData.chap) {
            a.data.default[i].link.push({
              quality: formData.quality,
              type: formData.type,
              url: formData.url,
            });
            added = true;
          }
        });
        if (!added)
          // k co chap nay`
          a.data.default.push({
            chap: formData.chap,
            link: [
              {
                quality: formData.quality,
                type: formData.type,
                url: formData.url,
              },
            ],
          });
      }
      setAll1Link(a);
    } else if (type === 1) {
      if (a == null) a = { data: { default: [], vip: [] }, _id: choseL };

      if (a.data.vip === undefined)
        a.data.vip[0] = {
          chap: formData.chap,
          link: [
            {
              quality: formData.quality,
              type: formData.type,
              url: formData.url,
            },
          ],
        };
      else {
        let added = false;
        a.data.vip.map((e, i) => {
          if (e.chap == formData.chap) {
            a.data.vip[i].link.push({
              quality: formData.quality,
              type: formData.type,
              url: formData.url,
            });
            added = true;
          }
        });
        if (!added)
          // k co chap nay`
          a.data.vip.push({
            chap: formData.chap,
            link: [
              {
                quality: formData.quality,
                type: formData.type,
                url: formData.url,
              },
            ],
          });
      }
      setAll1Link(a);
    }
    // else if (type === 2) {
    //   let a = JSON.parse(JSON.stringify(getSub));
    //   if (a === null) a = {};
    //   if (a[formData.chap] === undefined)
    //     a[formData.chap] = { sub: { [formData.quality]: formData.link } };
    //   else {
    //     a[formData.chap].sub = {
    //       ...a[formData.chap].sub,
    //       [formData.quality]: formData.link,
    //     };
    //   }
    //   setSub(a);
    // }
    setForceRander(forceRender + 1);
  };

  const ModalForm = () => {
    return (
      <div className="modal-content bg-dark border-warning">
        {form === 0
          ? modalAdd(false)
          : form === 1
          ? modalAdd(true)
          : form === 2
          ? modalAddSub()
          : ""}
      </div>
    );
  };

  const modalAdd = (isVip) => {
    return (
      <>
        <div className="modal-header">
          <h5 className="modal-title fw-bold" id="exampleModalLabel">
            Add link {isVip ? "VIP" : "DEFAULT"} (PHIM: {choseL})
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
            <div className="col-sm-4">
              <label htmlFor="lastName" className="form-label">
                Chap
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.chap !== undefined ? formData.chap : ""}
                required
                onChange={(e) =>
                  setFormData({ ...formData, chap: e.target.value })
                }
              />
            </div>
            <div className="col-sm-4">
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
            <div className="col-sm-4">
              <label htmlFor="lastName" className="form-label">
                Type
              </label>
              <select
                value={formData.type !== undefined ? formData.type : "mp4"}
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
              >
                <option value="mp4">mp4</option>
                <option value="m3u8">m3u8</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="lastName" className="form-label">
                Link
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="link video (ex: abc.xyz/123.mp4)"
                value={formData.url !== undefined ? formData.url : ""}
                required
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
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
            onClick={() => themLink(isVip ? 1 : 0)}
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

  useEffect(() => {}, [getLinkUndo]);

  const undoAll = () => {
    setAll1Link(getLinkUndo.backup);
    setForceRander(forceRender + 1);
  };

  // const sortData = () => {
  //   let a = dataLState;
  //   a = a.reverse();
  //   setDataLState(a);
  //   reRender();
  // };

  return (
    <div className="my-2 mb-3">
      {onLoading && <Loading />}
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">
              {" "}
              Link Managerment
            </strong>{" "}
          </h4>
        </div>
        <div className="col-12  col-xl-4 mt-2">
          {dataLState != undefined && (
            <div className="table-responsive-xl table-link">
              <table class="table table-hover table-dark">
                <thead>
                  <tr className="text-center">
                    <th style={{ width: 100 }}>
                      ID{" "}
                      {/* <button
                        className="btn btn-sm mt-0"
                        onClick={() => {
                          sortData();
                        }}
                      >
                        <i class="fa fa-sort-down text-light"></i>
                      </button> */}
                    </th>
                    <th>Title</th>
                    <th style={{ width: 100 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataF.map((e, i) => (
                    <tr className="text-center">
                      <td>{e._id}</td>
                      <td>
                        {e.title.substring(0, 30)}
                        {e.title.length > 30 ? "..." : ""}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm  main__table_link-btn--edit"
                          onClick={() => {
                            setChoseL(e._id);
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
        <div className="col-12 col-xl-8 mt-2 " id="editlink">
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
                {formLink()}
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
                    Undo All
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

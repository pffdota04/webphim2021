import "./style.css";
import qc from "./../../assets/images/quang-cao.jpg";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";

const Watch = () => {
  const { id, name } = useParams();

  const [dataFilmState, setDataFilmState] = useState({});
  const [dataLink, setDataLink] = useState();
  const [isFull, setIsFull] = useState(false);
  const [nowChap, setnowChap] = useState(-1);
  const [nowServer, setnowServer] = useState(-1);

  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);

    getDataByParamsId();
  }, [id]);

  const getDataByParamsId = () => {
    axios.get(process.env.REACT_APP_API_LOCAL + "film/" + id).then((res) => {
      setDataFilmState(res.data[0]);
      if (name != res.data[0].title)
        history.push("/watch/" + id + "/" + res.data[0].title);
    });

    axios.get(process.env.REACT_APP_API_LOCAL + "link/" + id).then((res) => {
      // alert(res.data);
      setDataLink(res.data);
      if (res.data != null) {
        setnowServer(res.data[0].server);
        setnowChap(res.data[0].chap);
      }
    });
  };

  function uniqByKeepFirst(a, key) {
    let seen = new Set();
    return a.filter((item) => {
      let k = key(item);
      return seen.has(k) ? false : seen.add(k);
    });
  }

  function contentVideoView() {
    return dataLink == null ? (
      <p className="text-center"> Đang cập nhật phim này! </p>
    ) : (
      <div>
        <hr className="m-2" />
        <div
          id="filmView" className={isFull ? "container-fluir p-2 pt-0 isFull" : "container ps-5 pe-5"}
        >
          {dataLink.map((e, i) => (
            <div>
              {e.chap == nowChap &&
                e.server == nowServer &&
                (e.link == "vip only" ? (
                  <img
                    src="https://i.imgur.com/JNZDQy0.png"
                    alt="VIP ONLY"
                    className="w-100"
                  />
                ) : (
                  <div
                    className="justify-content-center d-flex iframe-here"
                    dangerouslySetInnerHTML={{ __html: e.link }}
                  />
                ))}
            </div>
          ))}
        </div>
        <hr className="m-2" />
          <div className="d-block justify-content-center d-flex">
            <p
              onClick={() => setIsFull(!isFull)}
              className="btn-sm btn-warning m-1"
            >
              Change view
            </p>
          </div>
          {chapAndServer()}
      </div>
    );
  }

  function chapAndServer(){
    return (
      <nav>
        <div>
          <ul className="pagination justify-content-center">
            {uniqByKeepFirst(dataLink, (i) => i.chap).map((e, i) => (
              <li>
                <button
                  className={"btn btn-outline-secondary me-1 " + e.chap == nowChap && " btn-secondary text-light"}
                  onClick={() => {
                    setnowChap(e.chap);
                    setnowServer(e.server);
                    window.scrollTo(0, 0);
                  }}
                >
                  {e.chap}
                </button>
              </li>
            ))}
          </ul>
          <ul className="pagination justify-content-center">
            {dataLink.map(
              (e, i) =>
                e.chap == nowChap && (
                  <li>
                    <button
                      className={buttonServerRender(e.server, e.link)}
                      onClick={() => {
                        setnowServer(e.server);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {e.server}
                    </button>
                  </li>
                )
            )}
          </ul>
        </div>

        <hr className="m-2" />
      </nav>
    );
  }

  function buttonServerRender(sver, isVip) {
    switch (isVip) {
      case "vip only": {
        if (sver == nowServer) return "btn btn-danger me-1";
        else return "btn btn-outline-danger me-1 ";
      }
      default: {
        if (sver == nowServer) return "btn btn-secondary me-1 ";
        else return "btn btn-outline-secondary me-1 ";
      }
    }
  }

  return (
    <div>
      <main>
        <div className>
          <img className="d-block w-100 pb-2" src={qc} alt="" />

          {dataFilmState.id == undefined ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <h2 className="text-center">
              {dataFilmState.id} {dataFilmState.title} (
              {dataFilmState.title_origin})
            </h2>
          )}

          {contentVideoView()}

          <div className="container bg-light p-2 pt-0">
            <div
              style={{ backgroundImage: `url(${dataFilmState.backimg})` }}
              className="background-comment w-100 h-100"
            >
              <div className="me-5 ms-5 bg-light">
                <h2 className="text-center">Bình luận</h2>
                -xin chào <br />
                - chào
                <br />
                - khỏe không
                <br />
                - khỏe
                <br />
              </div>
            </div>
          </div>

          <img className="d-block w-100 pt-2" src={qc} alt="" />
        </div>
      </main>
    </div>
  );
};
export default Watch;

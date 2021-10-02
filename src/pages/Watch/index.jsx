import "./style.css";
import qc from "./../../assets/images/quang-cao.jpg";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const data1 = {
  title: "Công chúa ngủ trong rừng",
  year: 2020,
};

const Watch = () => {
  const { id } = useParams();

  const [dataFilmState, setDataFilmState] = useState({});
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
      getDataByParamsId();

  }, []);

  const getDataByParamsId = () => {
    setTimeout(() => {    
      data1.id = id;
      setDataFilmState(data1);
  },1000
    )

  };



  return (
    <div>
      <main>
        <div className>
          <img className="d-block w-100 pb-2" src={qc} alt="" width={800} />

          {dataFilmState.id == undefined ? (
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <h2 className="text-center">
              {dataFilmState.id} {dataFilmState.title}
            </h2>
          )}
          <hr className="m-2" />
          <div
            className={
              isFull
                ? "container-fluir bg-secondary p-2 pt-0"
                : "container bg-secondary"
            }
            id="filmView"
          >
            <img
              src="https://i.imgur.com/ia3Jrgc.png"
              alt="phim"
              className="mx-auto d-block w-100"
            />
          </div>
          <hr className="m-2" />
          <div className="container bg-secondary p-2 pt-0">
            <div className="d-block justify-content-center d-flex">
              <p
                // onClick={() => {changeIsFull()}}
                onClick={() => {
                  setIsFull(!isFull);
                }}
                className="btn-sm btn-warning m-1"
              >
                Change view
              </p>

            </div>
            <nav>
              <ul className="pagination justify-content-center">
                <li>
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li>
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li>
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li>
                  <a className="page-link" href="#">
                    4
                  </a>
                </li>
                <li>
                  <a className="page-link" href="#">
                    5
                  </a>
                </li>
              </ul>
              <hr className="m-2" />
            </nav>
            <div>
              <h2 className="text-center">Bình luận</h2>
              <div className="me-5 ms-5 bg-light">
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
          {/* <hr class="m-2" /> */}
          <img className="d-block w-100" src={qc} alt="" width={800} />
        </div>
      </main>
    </div>
  );
};
export default Watch;

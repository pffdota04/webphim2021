import "./style.css"
import qc from "./../../assets/images/quang-cao.jpg"
const Watch = () => {
    return (
      <main>
        <div className>
          <img className="d-block w-100 pb-2" src={qc} alt="" width={800} />
          <h2 className="text-center">Tựa phim</h2>
          <hr className="m-2" />
          <div className="container ps-5 pe-5" id="film">
            <img
              src="https://i.imgur.com/ia3Jrgc.png"
              alt="phim"
              className="mx-auto d-block w-100"
            />
          </div>
          <hr className="m-2" />
          <div className="container bg-secondary p-2 pt-0">
            <div className="d-block justify-content-center d-flex">
              <button onclick="maxview()" className="btn-sm btn-warning m-1">
                Big view
              </button>
              <button onclick="minview()" className="btn-sm btn-warning m-1">
                Small view
              </button>
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
    );
  }
export default Watch;
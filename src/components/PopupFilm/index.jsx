import { Link } from "react-router-dom";
import meo from "./../../assets/images/hinhmeo.png"
import "./style.css"

const PopupFilm = (props) => {
  const { data } = props;

  // return (
  //   <div
  //     className="modal fade popup-none-in-first bd-example-modal-sm show"
  //     id="ItemModal7"
  //     aria-modal="true"
  //     role="dialog"
  //     style={{ display: "block" }}
  //   >
  //     <div className="modal-dialog modal-xl">
  //       <div className="modal-content bg-light text-dark  trailer-ytb">
  //         <div className="modal-header p-2" id="header-popup">
  //           <h5 className="modal-title" id="exampleModalLabel">
  //             {data.title} (2016)
  //           </h5>
  //           <button
  //             type="button"
  //             className="btn-close"
  //             data-bs-dismiss="modal"
  //             aria-label="Close"
  //             id="bt-close"
  //           /> 
  //         </div>
  //         <img
  //           src="https://i.imgur.com/6F4UO1g.gif"
  //           alt="youtube thumnail image"
  //           className="w-100 img-trailer"
  //           loading="lazy"
  //         />
  //         <div className=" mx-auto text-ten-line ">
  //           <p className="text-center">7: "Tên cậu là gì?"</p>
  //           <p className="text-left ps-3 pe-2">
  //             &nbsp;&nbsp;Hai người xa lạ nhận ra mình được liên kết với nhau
  //             một cách kì lạ. Sự gắn kết giữa họ vượt qua không gian và thời
  //             gian và phải cứu lấy thị trấn trước khi một thiên thạch vào trái
  //             đất.
  //           </p>
  //           <p className="text-center"> Được phát hành vào năm 2016</p>
  //         </div>
  //         <div className="modal-footer p-1">
  //           <button
  //             className="w-100 p-0 m-0 mb-1 btn-outline-secondary"
  //             data-bs-dismiss="modal"
  //             aria-label="Close"
  //           >
  //             <a className=" pb-2 pt-2 d-block0" href="/watch/7">
  //               Xem ngay
  //             </a>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div
      className="modal fade popup-none-in-first bd-example-modal-sm"
      id={"ItemModal" + data.id}
      // tabIndex={-1}
      // aria-labelledby="exampleModalLabel"
      // aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content bg-light text-dark  trailer-ytb">
          <div className="modal-header p-2" id="header-popup">
            <h5 className="modal-title" id="exampleModalLabel">
              {data.title} ({data.year})
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="bt-close"
            />
          </div>
          <img
            src={data.backimg != undefined ? data.backimg : meo}
            alt="youtube thumnail image"
            className="w-100 img-trailer"
            loading="lazy"
          />
          <div className=" mx-auto text-ten-line ">
            <p className="text-center">
              {data.id}: "{data.title}"
            </p>
            <p className="text-left ps-3 pe-2">
              &nbsp;&nbsp;{data.description}
            </p>

            <p className="text-center"> Được phát hành vào năm {data.year}</p>
          </div>
          <div className="modal-footer p-1">
            <button
              className="w-100 p-0 m-0 mb-1 btn-outline-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <Link to={"/watch/" + data.id} className=" pb-2 pt-2 d-block0">
                Xem ngay
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupFilm;

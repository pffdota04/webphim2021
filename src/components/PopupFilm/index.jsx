import { Link } from "react-router-dom";
import meo from "./../../assets/images/hinhmeo.png"
import "./style.css"

const PopupFilm = (props) => {
  const { data, click } = props;

  return (
    data != null && (
      <div>
        <div
          className="modal fade popup-none-in-first bd-example-modal-sm show"
          id="ItemModal7"
          aria-modal="true"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="Invisible" onClick={() => click(null)}></div>
          <div className="modal-dialog modal-xl">
            <div className="modal-content bg-light text-dark  trailer-ytb">
              <div className="modal-header p-2" id="header-popup">
                <h5 className="modal-title" id="exampleModalLabel">
                  {data.title} ({data.year})
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => click(null)}
                  id="bt-close"
                />
              </div>
              <img
                src={data.backimg}
                alt="youtube thumnail image"
                className="w-100 img-trailer"
                loading="lazy"
              />
              <div className=" mx-auto text-ten-line ">
                <p className="text-center mb-0">
                  <strong>
                    {data.id}: {data.title} ({data.title_origin})
                  </strong>
                </p>
                <p className="text-center mb-0">
                  Diễn viên:
                  <div className="the-loai-popup">{data.actor}</div> | Đạo diễn:
                  <div className="the-loai-popup">{data.director}</div>
                </p>

                <p className="text-center">
                  Thể loại:
                  {Object.values(data.type).map((e) => (
                    <div className="the-loai-popup">{e}</div>
                  ))}
                </p>

                <p className="text-left ps-3 pe-2">
                  &nbsp;&nbsp;{data.description}
                </p>
                <p className="text-center">
                  Được phát hành vào năm {data.year}
                </p>
              </div>
              <div className="modal-footer p-1">
                <Link
                  className="w-100 p-0 m-0 mb-1 btn-outline-secondary text-center pb-1"
                  aria-label="Close"
                  to={"/watch/" + data.id + "/" + data.title}
                >
                  Xem ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    // <div
    //   className="modal fade popup-none-in-first bd-example-modal-sm"
    //   id={"ItemModal" + data.id}
    // >
    //   <div className="modal-dialog modal-xl">
    //     <div className="modal-content bg-light text-dark  trailer-ytb">
    //       <div className="modal-header p-2" id="header-popup">
    //         <h5 className="modal-title" id="exampleModalLabel">
    //           {data.title} ({data.year})
    //         </h5>
    //         <button
    //           type="button"
    //           className="btn-close"
    //           data-bs-dismiss="modal"
    //           aria-label="Close"
    //           id="bt-close"
    //         />
    //       </div>
    //       <img
    //         src={data.backimg != undefined ? data.backimg : meo}
    //         alt="youtube thumnail image"
    //         className="w-100 img-trailer"
    //         loading="lazy"
    //       />
    //       <div className=" mx-auto text-ten-line ">
    //         <p className="text-center">
    //           {data.id}: "{data.title}"
    //         </p>
    //         <p className="text-left ps-3 pe-2">
    //           &nbsp;&nbsp;{data.description}
    //         </p>

    //         <p className="text-center"> Được phát hành vào năm {data.year}</p>
    //       </div>
    //       <div className="modal-footer p-1">
    //         <button
    //           className="w-100 p-0 m-0 mb-1 btn-outline-secondary"
    //           data-bs-dismiss="modal"
    //           aria-label="Close"
    //         >
    //           <Link to={"/watch/" + data.id} className=" pb-2 pt-2 d-block0">
    //             Xem ngay
    //           </Link>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PopupFilm;

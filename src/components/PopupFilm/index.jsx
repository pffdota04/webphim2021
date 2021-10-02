import { Link } from "react-router-dom";
import meo from "./../../assets/images/hinhmeo.png"
import "./style.css"

const PopupFilm = (props) => {
  const { title, year, id } = props;

  return (
    <div
      className="modal fade popup-none-in-first"
      id={"ItemModal" + id}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content bg-light text-dark  trailer-ytb">
          <div className="modal-header p-2" id="header-popup">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
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
            src={meo}
            alt="youtube thumnail image"
            className="w-100 img-trailer"
          />
          <div className=" mx-auto text-ten-line ">
            <p className="text-center">
              Đây là bộ phim có id = {id} và có tựa là "{title}".
            </p>
            <p className="text-left ps-3 pe-2">
              &nbsp;&nbsp; Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Debitis, rem perferendis consequuntur est dicta architecto
              assumenda perspiciatis veritatis hic labore cum soluta possimus
              cupiditate dolores quos impedit corrupti deserunt? Expedita.\
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis,
              rem perferendis consequuntur est dicta architecto assumenda
              perspiciatis veritatis hic labore cum soluta possimus
            </p>

            <p className="text-center"> Được phát hành vào năm {year}</p>
          </div>
          <div className="modal-footer p-1">
            <button
              className="w-100 p-0 m-0 mb-1 btn-outline-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <Link to={"/watch/" + id} className=" pb-2 pt-2 d-block ">
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

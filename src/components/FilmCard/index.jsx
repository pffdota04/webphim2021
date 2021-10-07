import "./style.css";


import { useEffect, useState } from "react";
import { data } from "jquery";

const FilmCard = (props) => {
  const { numberTrend, title, loading, data } = props;
  const [numberImage, setNumberImage] = useState(null);

  async function lazyLoadNumber(num) {
    const { default: numimg } = await import(
      "./../../assets/images/sodem/so" + num + ".png"
    );
    setNumberImage(numimg);
  }

  useEffect(() => {
    if (numberTrend !== undefined)
      lazyLoadNumber(numberTrend);
    return() => {
    }
  }, []);

  // loading > xoa het modal
  return loading ? (
    <div>
      <div className="card">
        {numberTrend !== undefined && (
          <img
            src={numberImage}
            className="card-img-top position-absolute bottom-0 start-0 sodem"
            alt="..."
          />
        )}
        <svg
          className="card-img-top film-item"
          style={{ width: "100%", height: "50vh" }}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: First slide"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Đang tải...</title>
          <rect width="100%" height="100%" fill="#999" />
        </svg>
        <h6 className="card-title text-center text-one-line mb-0 mt-1">
          Loading...
        </h6>
        <div className="card-body pb-1 pt-0">
          <p className="card-text text-center text-one-line ">Loading...</p>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="card">
        {numberTrend !== undefined && (
          <img
            src={numberImage}
            className="card-img-top position-absolute bottom-0 start-0 sodem"
            alt="..."
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + data.id}
            draggable="false"
          />
        )}
        <img
          src={data.img}
          className="card-img-top film-item"
          alt="..."
          data-bs-toggle="modal"
          data-bs-target={"#ItemModal" + data.id}
          draggable="false"
        />
        <h6 className="card-title text-center text-one-line mb-0 mt-1">
          {data.title}
        </h6>
        <div className="card-body pb-1 pt-0">
          <p className="card-text text-center text-one-line ">
            {data.title_origin}
            &nbsp;({data.year})
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;

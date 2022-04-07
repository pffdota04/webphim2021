import "./style.css";
import filmCard from "../../assets/images/film-loading.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FilmCard = (props) => {
  const { numberTrend, loading, data, click } = props;
  const [numberImage, setNumberImage] = useState(null);

  async function lazyLoadNumber(num) {
    const { default: numimg } = await import(
      "./../../assets/images/sodem/so" + num + ".png"
    );
    setNumberImage(numimg);
  }

  useEffect(() => {
    if (numberTrend !== undefined) lazyLoadNumber(numberTrend);
    return () => {};
  }, []);

  // loading > xoa het modal
  return loading ? (
    <div className="card">
      {numberTrend !== undefined && (
        <img
          src={numberImage}
          className="card-img-top position-absolute bottom-0 start-0 sodem"
          alt="..."
        />
      )}
      <img
        className="card-img-top film-item"
        style={{ width: "100%", height: "50vh" }}
        src={filmCard}
      />
      <h6 className="card-title text-center text-one-line mb-0 mt-1">
        Loading...
      </h6>
      <div className="card-body pb-1 pt-0">
        <p className="card-text text-center text-one-line ">Loading...</p>
      </div>
    </div>
  ) : (
    <div className="card">
      <Link to={"/detailfilm/" + data._id + "/" + data.title}>
        <div>
          {numberTrend !== undefined && (
            <img
              src={numberImage}
              className="card-img-top position-absolute start-0 sodem"
              alt="..."
              draggable="false"
              // onClick={() => click(data)}
            />
          )}
        </div>
        <div className="hover-image">
          <img
            src={data.img}
            className="card-img-top film-item"
            alt="..."
            // onClick={() => click(data)}
            draggable="false"
          />
        </div>
        <div className="text-center text-white text-des">
          <h6 className="card-title mb-0 mt-3">{data.title}</h6>
          <p className="card-text">
            {data.title_origin}
            &nbsp;({data.year})
          </p>
        </div>
      </Link>
    </div>
  );
};

export default FilmCard;

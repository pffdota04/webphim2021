import "./style.css";


import { useEffect, useState } from "react";

const FilmCard = (props) => {
  const { numberTrend, title, year, id, image} = props;
  const [numberImage, setNumberImage] = useState(null);

  async function lazyLoadNumber(num) {
    const { default: numimg } = await import(
      "./../../assets/images/sodem/so" + num + ".png"
    );
    setNumberImage(numimg);
  }

  useEffect(() => {
    // console.log("Hiii, you in "+ id)
    if (numberImage === null && numberTrend !== undefined)
      lazyLoadNumber(numberTrend);
    return() => {
      // console.log("Stop "+ id)
    }
  }, []);

  return (
    <div>
      <div className="card">
        {numberTrend !== undefined && (
          <img
            src={numberImage}
            className="card-img-top position-absolute bottom-0 start-0 sodem"
            alt="..."
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + id}
            draggable="false"
          />
        )}
        <img
          src={image}
          className="card-img-top film-item"
          alt="..."
          data-bs-toggle="modal"
          data-bs-target={"#ItemModal" + id}
          draggable="false"
        />
        <h5 className="card-title text-center text-one-line mb-0 mt-2">
          {id} {title}
        </h5>
        <div className="card-body pb-1 pt-0">
          <p className="card-text text-center text-one-line ">{year}</p>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;

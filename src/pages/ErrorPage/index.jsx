import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./style.css";

const ErrorPage = (props) => {
  const { error } = props;
  const img = "https://i.imgur.com/w3kgGfF.png";
  return (
    <div style={{ textAlign: "center" }}>
      {error === 404 ? (
        <section className="collage-404">
          <h3 className="mt-5">Không tìm thấy trang</h3>
          <h5>Sin lủi vì sự ngốk nghếk này</h5>
          <h1>404</h1>
          <div className="collage-404-images">
            {Array(52)
              .fill(1)
              .map((el, i) => (
                <Link to="/" className="loaded introduced">
                  <img src={img} />
                </Link>
              ))}
          </div>
        </section>
      ) : (
        <section>
          <h1>{error}</h1>
        </section>
      )}
      <Footer />
    </div>
  );
};
export default ErrorPage;

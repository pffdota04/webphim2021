import axios from "axios";
import { useState } from "react";
import "./style.css";

const Links = (props) => {
  const { dataL, token, setFetchLink } = props;
  const [choseL, setChoseL] = useState(0);
  const [currentLink, setCurrentLink] = useState(dataL[choseL]); // mặc định là link  đầu tiên 

  function Refresh() {
    setFetchLink(true);
  }

  function updateLink() {
    // LObject là một object chứa thông tin User sau khi cập nhật

    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/updatelink", {
        token: token,
        LObject: currentLink,
      })
      .then((res) => {
        alert(res.data);
        // bấm nút refresh để update data sau khi cập nhâtk
      })
      .catch((e) => alert(e));
  }

  return (
    <div className="container my-2 mb-3">
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic "> Links</strong>{" "}
            <button onClick={() => Refresh()}>refresh data link</button>
          </h4>
          <div className="col-6">
            {dataL.map((e, i) => {
              return (
                <div>
                  {e.film_id}: <input value={e.link} readOnly />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Links;

import axios from "axios";
import { useState } from "react";
import "./style.css"

const Links = (props) => {
  const { dataL } = props;

  return (
    <div className="container my-2 mb-3">
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic "> Links</strong>{" "}
          </h4>
          <div className="col-6">
         {dataL.map((e,i)=>{return (
           <div>
             {e.film_id}: <input value={e.link} />
           </div>
         );})}
          </div>
        </div>
             </div>
    </div>
  );
};
export default Links;

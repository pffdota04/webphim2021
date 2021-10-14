import axios from "axios";
import { useState } from "react";
import "./style.css"

const User = (props) => {

  const {  dataU } = props;

  return (
    <div className="container my-2 mb-3">
      <div className="row">
        {console.log(dataU)}
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">User</strong>
          </h4>
          <div className="col-8">{dataU.map((e,i)=>{return(
            <div>{e.code}: {e.email}</div>
          )})}</div>
          <div className="col-6"></div>
        </div>
      </div>
    </div>
  );
};
export default User;

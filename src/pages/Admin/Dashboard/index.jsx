import "./style.css"
import { Line } from "react-chartjs-2";
import { useEffect } from "react";

const Dashboard = (props) => {
  const { char1, char2 } = props;

  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="stats">
          <div className="header">
            <h1 className="titles">REVENUE</h1>
            <div className="links"></div>
          </div>{" "}
          {char1.labels != undefined && <Line data={char1} />}
        </div>
      </div>

      <div className="col-lg-6">
      <div className="stats">
        <div className="header">
          <h1 className="titles">NEW USER</h1>
          <div className="links"></div>
        </div>
        {char2.labels != undefined && <Line data={char2} />}
      </div>
      </div>
    </div>
  );
};
export default Dashboard;

import "./style.css"
import { Line } from "react-chartjs-2";

const Dashboard = (props) => {
  const { char1, char2 } = props;

  return (
    <div className="row">
      {console.log(props)}
      <div className="col-lg-6">
        <div className="header">
          <h1 className="title">Doanh thu</h1>
          <div className="links"></div>
        </div>{" "}
        {char1.labels != undefined && <Line data={char1} />}
      </div>

      <div className="col-lg-6">
        <div className="header">
          <h1 className="title">Người dùng mới</h1>
          <div className="links"></div>
        </div>
        {char2.labels != undefined && <Line data={char2} />}
      </div>
    </div>
  );
};
export default Dashboard;

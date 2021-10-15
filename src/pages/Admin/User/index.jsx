import axios from "axios";
import { useState } from "react";
import "./style.css"

const User = (props) => {
  const { dataU, token, setFetchUser } = props;
  const [choseU, setChoseU] = useState(0);
  const [currentUser, setCurrentUser] = useState(dataU[choseU]); // giá trị mặc định là user đầu tiên, update gì thì lưu vào đây

  function Refresh() {
    setFetchUser(true);
  }


  // update user thì gọi cái này
  function updateUser() {
    // UObject là một object chứa thông tin User sau khi cập nhật. example:
    //
    // UObject =
    //  {
    //     "code": "5ez522b",
    //     "coin": 456,
    //     "createDay": 1634180235794,
    //     "email": "maivanluong0458@gmail.com",
    //     "usedCode": false
    //  }

    axios
      .post(process.env.REACT_APP_API_LOCAL + "admin/updateuser", {
        token: token,
        UObject: currentUser,
      })
      .then((res) => {
        alert(res.data);
        // bấm nút refresh để update all data user sau khi cập nhât thnah cong
      })
      .catch((e) => alert(e));
  }

  return (
    <div className="container my-2 mb-3">
      <div className="row">
        {/* {console.log(dataU)} */}
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            <strong className="display-6 fw-bold fst-italic ">User</strong>
            <button onClick={() => Refresh()}>Test refresh data user</button>
          </h4>
          <div className="col-8">
            {dataU.map((e, i) => {
              return (
                <div>
                  {e.code}: {e.email}
                </div>
              );
            })}
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    </div>
  );
};
export default User;

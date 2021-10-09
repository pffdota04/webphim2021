
import userProfile from "./../../../assets/images/user-profile.jpg";
const Profile = (props) => {
  const {userInfo} = props
  return (

    <div className="container my-2">
      <img
        className="d-block mx-auto mb-4 rounded-circle"
        src={userProfile}
        alt=""
        width={100}
        height={100}
      />
      <h1 className="display-5 fw-bold text-center">{userInfo.displayName} </h1>
      <h5 className="text-center">
        vippro@gmail.com <i className="fa fa-check-circle text-primary"></i>
      </h5>
      <h4 className="text-center">
        Số dư:
        <strong className="display-6 fw-bold fst-italic ">
          {" "}
          320 KOIN
        </strong>{" "}
      </h4>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Cảm ơn bạn đã sử dụng trang web! Trang web hiện đang tron giai đoạn
          phát triển và liên tục cập nhật các tính năng mới. Nếu bạn đọc được
          dòng này thì bạn là một trong những người đầu tiên sử dụng bản Beta
          của trang web, chân thành cảm ơn bạn! <br></br>Kphim.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg px-4"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Liên hệ
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Bạn muốn nói gì đó với chúng tôi?
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <ul>
                    <li>Facebook: click</li>
                    <li>Email: click</li>
                    <li>Discord: click</li>
                  </ul>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      placeholder=" Hoặc viết lời nhắn ở đây"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                    >
                      Gửi
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;

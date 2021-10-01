import "./style.css";
import qc from "./../../assets/images/quang-cao.jpg";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Profile from "./Profile";
import NapTien from "./NapTien";
import MaGioiThieu from "./MaGioiThieu";
import Voucher from "./Voucher";
import Footer from "./../../components/Footer"

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const UserRequest = (props) => {
  useEffect(() => {}, []);

  return (
    <div>
      <div className="container">
        {/* Top ADS: Vừa vào là thấy, tuy nhiên thấy lần đầu */}
        <img className="d-block w-100 pt-2" src={qc} alt="" width={800} />
        <section>
          <div className="mb-3">
            <hr className="mb-2" />
            {/* <h1 className="text-center">Xin chào bạn tôi!</h1>
            <hr className="mb-2" /> */}
            <div>
              <nav>
                <div
                  className="nav nav-tabs justify-content-center buton-user"
                  id="nav-tab"
                  role="tablist"
                >
                  <button
                    className="nav-link active"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="true"
                  >
                    <i className="fa fa-user" /> Hồ sơ
                  </button>
                  <button
                    className="nav-link"
                    id="nav-naptien-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-naptien"
                    type="button"
                    role="tab"
                    aria-controls="nav-naptien"
                    aria-selected="false"
                  >
                    <i className="fa fa-dollar" /> Nạp tiền
                  </button>
                  <button
                    className="nav-link"
                    id="nav-usercode-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-usercode"
                    type="button"
                    role="tab"
                    aria-controls="nav-usercode"
                    aria-selected="false"
                  >
                    <i class="fa fa-users"></i> Nhập mã
                  </button>
                  <button
                    className="nav-link"
                    id="nav-voucher-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-voucher"
                    type="button"
                    role="tab"
                    aria-controls="nav-voucher"
                    aria-selected="false"
                  >
                    <i className="fa fa-gift" /> Voucher
                  </button>
                </div>
              </nav>
              <div className="tab-content pb-0" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <Profile />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-naptien"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <NapTien />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-usercode"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <MaGioiThieu />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-voucher"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <Voucher />
                </div>
              </div>
            </div>
            <hr className="mb-3" />
          </div>
        </section>
        {/* End ADS, Cứ kéo đến cuối là thấy, tuy nhiên chỉ thấy trong vài giây chờ fetch data*/}
        <img className="d-block w-100 pb-2" src={qc} alt="" width={800} />
      </div>
      <Footer/>
    </div>
  );
};

export default UserRequest;

const NapTien = () => {
  return (
    <div className="container mb-3 my-2">
      <div className="row">
        <div className="col-12 mx-auto ps-5 pe-5">
          <h4 className="text-center">
            Tỷ lệ quy đổi:
            <strong className="display-6 fw-bold fst-italic ">
              {" "}
              1000 đồng = 1 KOIN
            </strong>{" "}
          </h4>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Nhập chính xác số tiền bạn muốn nạp vào ô mệnh giá, chọn phương
              thức nạp tiền phù hợp, thực hiện chuyển tiền theo thông tin hiển
              thị. Lấy mã giao dịch nhận được nhập vào và bấm gửi. <br />
              Thông tin nạp của bạn sẽ được kiểm tra và cập nhật (trong vòng
              24h). Nếu bạn gặp bất cứ khó khăn nào, hãy liên hệ với chúng tôi
              (hồ sơ > liên hệ).
            </p>
          </div>
        </div>
        <hr className="mt-3 mb-3" style={{ height: "2px" }} />

        <div className="col-12 col-md-6">
          <label for="menhgia" className="form-label">
            Mệnh giá <span className="text-muted">(Bắt buộc) </span>&nbsp;
          </label>
          <select
            name="type"
            id="menhgia"
            className="w-100 form-control"
            // onChange={this.getMenhgia.bind(this)}
            //   value={this.state.menhgia}
          >
            <option value="10">10k</option>
            <option value="20">20k</option>
            <option value="50">50k</option>
            <option value="100">100k</option>
          </select>{" "}
        </div>
        <div className="col-12 col-md-6">
          <label for="phuongthuc" className="form-label">
            Phương thức: <span className="text-muted">(Bắt buộc) </span>&nbsp;
          </label>
          <select
            type="select"
            name="coin"
            id="phuongthuc"
            className="w-100 form-control"
            // onChange={this.getCombo.bind(this)}
            //   value={this.state.type}
          >
            <option value="momo">Momo</option>
            <option value="airpay">Airpay</option>
            <option value="bank">Chuyển Khoản</option>
          </select>
        </div>
        <hr className="mt-3 mb-3" style={{ height: "2px" }} />

        <div className="col-12 col-md-6 mx-auto">
          <label for="magiaodich" className="form-label">
            Mã giao dịch <span className="text-muted">(Bắt buộc) </span>&nbsp;
          </label>
          <input
            type="text"
            name="magiaodich"
            id="magiaodich"
            className="w-100 form-control"
            // onChange={this.getCombo.bind(this)}
            //   value={this.state.type}
          ></input>
        </div>
        <div className="col-12 col-md-6 mx-auto">
          <label for="magiaodich" className="form-label">
            Ghi chú &nbsp;
          </label>
          <input
            type="text"
            name="magiaodich"
            id="magiaodich"
            className="w-100 form-control"
            // onChange={this.getCombo.bind(this)}
            //   value={this.state.type}
          ></input>
        </div>
        <hr className="mt-3 mb-3" style={{ height: "2px" }} />
        <div className="col-12 ">
          <button className="btn-lg w-25 btn-secondary mx-auto d-block">
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};
export default NapTien;

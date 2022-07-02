import { useEffect } from "react";
import Footer from "../../components/Footer";
import "./ChinhSachBaoMat.css";

function ChinhSachBaoMat() {
  useEffect(async () => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-background">
      <div className="container p-5 contain-cs">
        <h1 className="text-center primary-color">Chính sách bảo mật </h1>
        <p className="mt-4 text-light">
          Kphim tôn trọng dữ liệu cá nhân của bạn khi sử dụng dịch vụ tại Kphim!
        </p>
        <ul className="text-light">
          <li>
            Kphim có quyền thu thập dữ liệu về bạn khi bạn nhấn ĐĂNG NHẬP/ĐĂNG
            KÝ sử dụng KPHIM.
          </li>
          <li>
            Dữ liệu Kphim thu thập bao gồm: họ tên; địa chỉ email, ảnh đại diện,
            ngày sinh (nếu được cung cấp), số điện thoại (nếu được cung cấp),
            giới tính (nếu được cung cấp) và các dữ liệu công khác được cho phép
            bởi Google khi bạn sử dụng tính năng Đăng nhập bằng Gmail HOẶC cho
            phép bởi Facebook khi bạn sử dụng tính năng Đăng nhập bằng Facebook.
          </li>
          <li>
            Chúng tôi thực hiện các biện pháp bảo mật khác nhau và luôn nỗ lực
            để đảm bảo sự an toàn của dữ liệu cá nhân của bạn trên các hệ thống
            của chúng tôi.
          </li>
          <li>
            Các thông tin này được sử dụng để tạo sự thuận lợi trong quá trình
            sử dụng trang web mà không nhằm bất kì mục đích nào khác.
          </li>

          <li>
            Các dịch vụ trên trang web không dành cho trẻ em dưới 13 tuổi.
          </li>
        </ul>
        <strong className="primary-color">
          NẾU BẠN KHÔNG ĐỒNG Ý CHO PHÉP XỬ LÝ DỮ LIỆU CÁ NHÂN CỦA BẠN NHƯ MÔ TẢ
          TRONG CHÍNH SÁCH NÀY, VUI LÒNG KHÔNG SỬ DỤNG CÁC DỊCH VỤ CỦA CHÚNG TÔI
          HAY TRUY CẬP NỀN TẢNG HOẶC TRANG WEB CỦA CHÚNG TÔI.
        </strong>
      </div>
      <Footer />
    </div>
  );
}

export default ChinhSachBaoMat;

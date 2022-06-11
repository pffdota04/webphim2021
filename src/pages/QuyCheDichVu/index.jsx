import { useEffect } from "react";
import Footer from "../../components/Footer";

function QuyCheDichVu() {
  useEffect(async () => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container-background">
      <div className="container p-5 contain-cs">
        <h1 className="text-center primary-color">Quy chế dịch vụ </h1>
        <p className="mt-4 text-light">
          Khi sử dụng trang web này, có nghĩa là bạn đồng ý với các quy chế sau:
        </p>
        <ul className="text-light">
          <li> Không trao đổi, mua bán tài khoản và koin.</li>
          <li>
            Không sao chép nội, chỉnh sửa bất kỳ phần nào hoặc toàn bộ nội dung
            của trang web này trên bất kỳ máy chủ hoặc như là một phần của bất
            kỳ website nào khác mà chưa nhận được sự chấp thuận bằng văn bản của
            Kphim.
          </li>
          <li>
            {" "}
            Không sử dụng bất kỳ robot, chương trình do thám hay bất kỳ thiết bị
            tự động hoặc phương thức thủ công để theo dõi hoặc sao chép nội dung
            trang web khi chưa có sự đồng ý trước bằng văn bản của Kphim.{" "}
          </li>
          <li>
            Không sử dụng các tính năng của trang web cho mục đích thương mại.{" "}
          </li>
          <li>
            {" "}
            Mọi giao dịch mua koin đều chỉ sử dụng tính năng "Nạp tiền" sẵn có
            của trang web, cần chú ý các chương trình, đường link giả mạo.
          </li>
          <li>
            Koin đã nạp có hạn sử dụng là vô thời hạn hoặc cho đến khi trang web
            đóng cửa. Bạn không thể quy đổi Koin thành bất cứ tài sản nào khác.{" "}
          </li>
          <li>
            {" "}
            Các phim đã mở VIP sẽ hết hạn sau một thời gian tùy vào gói VIP bạn
            chọn mở. Hiện nay không có gói VIP vĩnh viễn.{" "}
          </li>
          <li>
            {" "}
            Trong quá trình sử dụng, nếu phát sinh bất cứ lỗi nào hãy liên hệ
            ngay cho chúng tôi (Hồ sơ/Báo lỗi).
          </li>
          <li>
            {" "}
            Các tài khoản có dấu hiệu nghi vấn có thể bị cấm mà không báo trước.
          </li>
          <li>
            {" "}
            Tại bất kỳ hoặc các thời điểm nào, Kphim có quyền chỉnh sửa các quy
            chế, nội dung trang web, các tính năng để ngày càng hoàn thiện hơn.
          </li>
          <li>
            Bạn đồng ý tuân thủ mọi quy định pháp luật hiện hành và các quy chế
            của trang web.{" "}
          </li>
          <li>
            Trong mọi trường hợp, quyết định từ Kphim là quyết định cuối cùng.
          </li>
        </ul>
        <strong className="primary-color">
          {" "}
          TÔI ĐÃ ĐỌC CÁC ĐIỀU KHOẢN DỊCH VỤ NÀY VÀ ĐỒNG Ý VỚI TẤT CẢ CÁC ĐIỀU
          KHOẢN NHƯ TRÊN CŨNG NHƯ BẤT KỲ ĐIỀU KHOẢN NÀO ĐƯỢC CHỈNH SỬA SAU NÀY.
          BẰNG CÁCH BẤM NÚT “ĐĂNG KÝ” HOẶC “ĐĂNG NHẬP” KHI ĐĂNG KÝ SỬ DỤNG TRANG
          SHOPEE, TÔI HIỂU RẰNG TÔI ĐANG TẠO CHỮ KÝ ĐIỆN TỬ MÀ TÔI HIỂU RẰNG NÓ
          CÓ GIÁ TRỊ VÀ HIỆU LỰC TƯƠNG TỰ NHƯ CHỮ KÝ TÔI KÝ BẰNG TAY.
        </strong>
      </div>
      <Footer />
    </div>
  );
}

export default QuyCheDichVu;

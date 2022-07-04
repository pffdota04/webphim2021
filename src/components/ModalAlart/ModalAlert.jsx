import "./alert.css";
import brandLogo from "./../../assets/images/logo1.png";

const ModalAlert = ({ color, title, content, close }) => {
  return (
    <div
      class="modal fade show d-block text-dark"
      tabindex="-1"
      id="AlertModalLabel"
      aria-labelledby="AlertModalLabel"
      aria-hidden="true"
      style={{ zIndex: 9999 }}
      onClick={close}
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header rounded-circle d-flex align-items-center justify-content-center">
            {/* <h5 class="modal-title" id="exampleModalLabel">
              {title}
            </h5> */}
            <img src={brandLogo} alt="" className="imgAlert" />
          </div>
          <div class="modal-body"> {content}</div>
          <div class="modal-footer justify-content-center">
            (Click bất kì để đóng thông báo hoặc nhấn OK)
          </div>
          <button class="btn btn-primary modal-footer justify-content-center mb-4 btnAlert" type="submit">OK</button>
        </div>
      </div>
      
    </div>
  );
};

export default ModalAlert;

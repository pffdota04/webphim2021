const ModalAlert = ({ color, title, content, close }) => {
  return (
    <div
      class="modal fade show d-block text-dark"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ zIndex: 9999 }}
      onClick={close}
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {title}
            </h5>
          </div>
          <div class="modal-body"> {content}</div>
          <div class="modal-footer justify-content-center">
            (Click bất kì để đóng thông báo)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;

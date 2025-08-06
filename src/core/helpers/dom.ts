import { Modal } from "bootstrap";

const hideModal = (modalEl: HTMLElement | null): void => {
  if (!modalEl) {
    return;
  }

  const myModal = Modal.getInstance(modalEl);
  myModal.hide();
  // removeModalBackdrop();
};

const showModal = (id): void => {
  const myModal = new Modal(document.getElementById(id));
  myModal.show();
};

const newHideModal = (id): void => {
  const myModalEl = document.getElementById(id);
  const myModal = Modal.getInstance(myModalEl);
  // const myModal = document.getElementById(id)

  removeModalBackdrop();
  myModal.hide();
  // document.getElementsByClassName(".modal-backdrop.fade.show").();
};

const removeModalBackdrop = (): void => {
  if (document.querySelectorAll(".modal-backdrop.fade.show").length) {
    document.querySelectorAll(".modal-backdrop.fade.show").forEach((item) => {
      item.remove();
    });
  }
};

export { removeModalBackdrop, hideModal, showModal, newHideModal };

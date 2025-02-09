import React, { useRef, useEffect } from "react";
import "./EditModal.css";

function EditModal({ children, open }) {
  const dialog = useRef();
  //Логика для открытия и закрытия модального окна
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return (
    <dialog ref={dialog} className="modal">
      {children}
    </dialog>
  );
}

export default EditModal;

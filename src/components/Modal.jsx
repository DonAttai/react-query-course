import React from "react";

const Modal = ({ title, children, isModalOpen, toggleModal }) => {
  const dialogRef = React.useRef(null);

  React.useEffect(() => {
    if (isModalOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isModalOpen]);

  const closeDialog = () => {
    dialogRef.current?.close();
    toggleModal();
  };

  return (
    <dialog ref={dialogRef} className="w-2/3 md:w-1/3 rounded-md  p-5">
      <div className="flex flex-col w-full gap-8">
        <div className="flex justify-between">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <button
            className="bg-red-600 rounded-md py-0.5 px-2 text-white text-xl shadow font-bold "
            onClick={closeDialog}
          >
            &times;
          </button>
        </div>
        <div className=" text-center flex flex-col gap-5 ">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;

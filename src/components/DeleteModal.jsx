import { useEffect, useRef } from "react";
import { useDeleteTodoMutation } from "../hooks/react-query-hooks";
import toast from "react-hot-toast";

const DeleteModal = ({ isDeleteModalOpen, toggleDeleteModal, todo }) => {
  const deleteTodoMutation = useDeleteTodoMutation();
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current?.close();
    if (isDeleteModalOpen) {
      return dialogRef.current?.showModal();
    } else {
      return dialogRef.current?.close();
    }
  }, [isDeleteModalOpen]);

  useEffect(() => {
    if (isDeleteModalOpen) {
      return dialogRef.current?.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
          toggleDeleteModal();
        }
      });
    }
  }, [isDeleteModalOpen, toggleDeleteModal]);

  return (
    <dialog ref={dialogRef} className="w-1/3 p-6 rounded-md ">
      <div className="w-full space-y-4 flex flex-col items-center">
        <h3 className="text-2xl">Delete Todo</h3>
        <hr className="w-full" />
        <p>Are you sure?</p>
        <hr className="mb-3 w-full" />
        <div className="space-x-2">
          <button
            className="bg-gray-500 rounded-md px-3 py-1 text-white"
            onClick={() => toggleDeleteModal()}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteTodoMutation.mutate(todo.id, {
                onSuccess: toast.success("Todo was deleted!"),
              }),
                toggleDeleteModal();
            }}
            disabled={deleteTodoMutation.isLoading}
            className="bg-red-500 px-5 py-1 rounded-md text-white"
          >
            {deleteTodoMutation.isLoading ? "Wait..." : "Yes"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;

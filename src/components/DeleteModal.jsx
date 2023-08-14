import { useDeleteTodoMutation } from "../hooks/react-query-hooks";
import toast from "react-hot-toast";
import Modal from "./Modal";

const DeleteModal = ({ todo, isModalOpen, toggleModal }) => {
  const { mutate } = useDeleteTodoMutation();

  const deleteTodo = () => {
    mutate(todo.id, { onSuccess: () => toast.success("Todo was deleted!") });
    toggleModal();
  };
  return (
    <Modal
      title="Delete Todo"
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
    >
      <p className="text-xl">Are you sure you want to delete?</p>
      <button
        onClick={deleteTodo}
        className="w-max bg-red-600 rounded-md py-1 px-6 text-white self-center"
      >
        Ok
      </button>
    </Modal>
  );
};

export default DeleteModal;

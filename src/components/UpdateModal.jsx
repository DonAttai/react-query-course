import { useForm } from "react-hook-form";
import { useUpdateTodoMutation } from "../hooks/react-query-hooks";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { useEffect } from "react";

const UpdateModal = ({ isModalOpen, toggleModal, todo }) => {
  const { mutate } = useUpdateTodoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm({ defaultValues: { title: todo.title } });

  const onSubmit = (data) => {
    mutate(
      { ...data, id: todo.id },
      { onSuccess: toast.success("Todo was updated!") }
    );
    toggleModal();
    reset();
  };

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  return (
    <Modal
      title="Update Todo"
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="">
          <input
            type="search"
            className="border shadow text-gray-700 text-lg font-medium rounded-md w-full px-3 py-2 focus:outline-none"
            placeholder="Add todo..."
            id="todo"
            {...register("title", { required: "Add a todo" })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <button
          type="submit"
          className=" w-max px-6 py-1 bg-green-500 text-white rounded-md self-center"
        >
          Ok
        </button>
      </form>
    </Modal>
  );
};

export default UpdateModal;

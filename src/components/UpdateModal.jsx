import React from "react";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useUpdateTodoMutation } from "./hooks/react-query-hooks";
import toast from "react-hot-toast";

const UpdateModal = ({ isUpdateModalOpen, toggleUpdateModal, id, title }) => {
  const { mutate, isLoading } = useUpdateTodoMutation();
  const updateRef = useRef(null);

  React.useEffect(() => {
    updateRef.current?.close();
    if (isUpdateModalOpen) {
      return updateRef.current?.showModal();
    } else {
      return updateRef.current?.close();
    }
  }, [isUpdateModalOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { title } });

  const onSubmit = (data) => {
    mutate({ id, ...data }, { onSuccess: toast.success("Todo was updated!") });
    toggleUpdateModal();
    reset();
  };

  return (
    <dialog ref={updateRef} className="w-2/3  px-3 rounded-md md:w-1/3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto mt-4 mb-5"
      >
        <div className="flex flex-col space-y-6 px-3 items-center">
          <h3 className="text-xl">Update Todo</h3>
          <hr className="w-full" />
          <div className="w-full">
            <input
              type="search"
              className="border shadow text-gray-700 text-sm font-medium rounded-md w-full px-3 py-2 focus:outline-none"
              placeholder="Add todo..."
              id="todo"
              {...register("title", { required: "Add a todo" })}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <hr className="w-full" />
          <div className="space-x-2">
            <button
              type="button"
              className=" px-2 py-1 bg-blue-500 text-white rounded-md"
              onClick={() => toggleUpdateModal()}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className=" px-2 py-1 bg-blue-500 text-white rounded-md"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default UpdateModal;

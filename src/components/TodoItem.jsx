import React from "react";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import { AiOutlineDelete } from "react-icons/ai";
import { LuEdit } from "react-icons/lu";
import { useToggleTodoMutation } from "../hooks/react-query-hooks";

const TodoItem = ({ todo }) => {
  const [isDeleteModalOpen, toggleDeleteModal] = React.useReducer(
    (previous) => !previous,
    false
  );
  const [isUpdateModalOpen, toggleUpdateModal] = React.useReducer(
    (previous) => !previous,
    false
  );
  const toggleTodo = useToggleTodoMutation();

  return (
    <>
      <li className="py-4 px-6 flex items-center">
        {isDeleteModalOpen && (
          <DeleteModal
            todo={todo}
            isDeleteModalOpen={isDeleteModalOpen}
            toggleDeleteModal={toggleDeleteModal}
          />
        )}
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-500"
          checked={todo.completed}
          onChange={() => toggleTodo.mutate(todo)}
        />
        <span
          className={` flex-grow ml-3 outline-none ${
            todo.completed ? "line-through" : ""
          }`}
        >
          {todo.title}
        </span>
        <span className="ml-4  ">
          <button
            className="text-white font-extrabold p-2 rounded bg-red-600 ml-2 mr-2"
            onClick={() => toggleDeleteModal()}
          >
            <AiOutlineDelete />
          </button>
          <button
            onClick={() => toggleUpdateModal()}
            className="text-white font-extrabold bg-blue-600 p-2 rounded"
          >
            <LuEdit />
          </button>
        </span>

        {isUpdateModalOpen && (
          <UpdateModal
            isUpdateModalOpen={isUpdateModalOpen}
            toggleUpdateModal={toggleUpdateModal}
            {...todo}
          />
        )}
      </li>
    </>
  );
};

export default TodoItem;

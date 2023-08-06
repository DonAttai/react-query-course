import { useForm } from "react-hook-form";
import TodoItem from "./components/TodoItem";
import {
  useAddTodoMutation,
  useTodosQuery,
} from "./components/hooks/react-query-hooks";
import toast from "react-hot-toast";

function App() {
  const todosQuery = useTodosQuery();

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //add todo query
  const addTodo = useAddTodoMutation();

  //submit data
  const onSubmit = (data) => {
    addTodo.mutate(
      { ...data, completed: false },
      { onSuccess: toast.success("Todo added!") }
    );
    reset();
  };

  if (todosQuery.isLoading) {
    return <h1 className="text-2xl">Loading...</h1>;
  }

  if (todosQuery.isError) {
    return <h4>{todosQuery.error.message}</h4>;
  }
  return (
    <>
      <section className="container mx-auto p-4">
        <h1 className="text-2xl text-center mb-4">Todo App</h1>

        {/* Add Todo Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto mt-4 mb-5"
        >
          <div className="flex flex-col">
            <div>
              <input
                type="text"
                className=" mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
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
              disabled={addTodo.isLoading}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              {addTodo.isLoading ? "Adding..." : "Add Todo"}
            </button>
          </div>
        </form>

        {/* Todo List */}
        <div className="max-w-lg mx-auto">
          {todosQuery.data?.length ? (
            <ul className="bg-white divide-y divide-gray-300 rounded-lg border shadow">
              {todosQuery.data?.map((todo) => {
                return <TodoItem key={todo.id} todo={todo} />;
              })}
            </ul>
          ) : (
            <h3>No todos available</h3>
          )}
        </div>
      </section>
    </>
  );
}

export default App;

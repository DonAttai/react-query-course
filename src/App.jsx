import { useForm } from "react-hook-form";
import TodoItem from "./components/TodoItem";
import { useAddTodoMutation, useTodosQuery } from "./hooks/react-query-hooks";
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
          className="max-w-lg mx-auto mt-4 mb-10"
        >
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full flex flex-col items-center">
              <input
                type="search"
                className="w-full h-10 mb-1 px-4 text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block py-1.5 shadow focus:outline-none"
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
              className="w-full h-10 shadow bg-blue-400 py-1.5 text-white rounded-lg"
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

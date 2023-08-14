import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  "Content-Type": "application/json",
});

//hook to fecth todo
export const useTodosQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => axiosInstance.get("/todos").then((res) => res.data),
    onSuccess: (data) => {
      data.sort((a, b) => b.id - a.id);
    },
  });
};

//hook to add todo
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo) => {
      return axiosInstance.post("/todos", todo).then((res) => res.data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

//hook to delete todo
export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => axiosInstance.delete(`/todos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

//hook to update todo
export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo) => {
      return axiosInstance
        .patch(`/todos/${todo.id}`, { title: todo.title })
        .then((res) => res.data);
    },
    // onSuccess: (todo) => {
    //   queryClient.setQueryData(["todos", todo.id], todo);
    //   queryClient.invalidateQueries({ queryKey: ["todos"] });
    // },

    // optimistic update
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (oldTodos) => {
        oldTodos.map((oldTodo) =>
          oldTodo.id === newTodo.id
            ? { ...newTodo, title: newTodo.title }
            : oldTodo
        );
      });

      return { previousTodos };
    },
    onError: (err, todo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

//hook to toggle todo
export const useToggleTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo) => {
      return axiosInstance
        .patch(`/todos/${todo.id}`, {
          completed: !todo.completed,
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

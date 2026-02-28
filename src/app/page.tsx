"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          ToDo App
        </h1>

        <form onSubmit={addTodo} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Add
            </button>
          </div>
        </form>

        <div className="bg-white rounded-lg shadow-md">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No todos yet. Add one above!
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span
                    className={`flex-1 ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              {todos.length - completedCount} of {todos.length} remaining
            </span>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
              >
                Clear completed ({completedCount})
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

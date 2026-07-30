"use client";
import { db } from "@/firebase";
import { Checkbox } from "@mui/material";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

interface Todo {
  id: string;
  title: string;
  body: string;
  completed: boolean;
}

type Props = {
  todo: Todo;
};

function TodoCard({ todo }: Props) {
  const [checked, setChecked] = useState<boolean>(false);
  const handleChecked = async () => {
    const newValue = !todo.completed;
    try {
      await updateDoc(doc(db, "todos", todo.id), {
        completed: newValue,
      });
      setChecked(newValue);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "todos", todo.id));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(checked);

  return (
    <div
      data-testid="todo-card"
      className="flex flex-col p-4 rounded-md bg-zinc-100"
    >
      <h1 className="font-extrabold text-2xl underline">{todo.title}</h1>
      <p className="font-semibold˝ text-justify">{todo.body}</p>
      <Checkbox
        data-testid={`checkbox-${todo.title}`}
        checked={todo.completed}
        onChange={handleChecked}
      />
      {checked && (
        <button
          data-testid="delete-button"
          onClick={handleDelete}
          className="p-2 text-white bg-red-500 rounded-md hover:cursor-pointer"
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default TodoCard;

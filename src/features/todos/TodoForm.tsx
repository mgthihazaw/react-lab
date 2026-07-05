import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTodo(trimmedTitle);
    setTitle("");
  };

  console.log("TodoForm rendered", title);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="New todo"
        value={title}
        onChange={setTitle}
        placeholder="Example: Learn React state"
      />

      <Button type="submit" disabled={!title.trim()}>
        Add Todo
      </Button>
    </form>
  );
};

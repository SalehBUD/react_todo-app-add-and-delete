import React, { FormEvent, useState } from 'react';
import cn from 'classnames';

type Props = {
  onError: (value: string) => void;
  createTodo: (title: string) => void;
  isInputDisabled: boolean;
};

export const TodoHeader: React.FC<Props> = ({
  onError,
  createTodo,
  isInputDisabled,
}) => {
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    const todoName = newTodo.trim();

    if (todoName === '') {
      onError("Title can't be empty");

      return;
    }

    createTodo(todoName);
    setNewTodo('');
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all')}
        aria-label="mark all"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={addTodo}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          disabled={isInputDisabled}
        />
      </form>
    </header>
  );
};

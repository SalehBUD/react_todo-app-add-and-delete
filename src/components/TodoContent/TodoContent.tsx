import { useEffect, useState } from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { TodoFooter } from '../TodoFooter';
import { TodoHeader } from '../TodoHeader';
import { TodoMain } from '../TodoMain';

type Props = {
  filterTodos: (filterBy: Filter) => void;
  todos: Todo[] | null;
  onError: (value: string) => void;
  createTodo: (title: string) => void;
  tempTodo: Todo | null;
  isInputDisabled: boolean;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
};

export const TodoContent: React.FC<Props> = ({
  todos,
  filterTodos,
  onError,
  createTodo,
  tempTodo,
  isInputDisabled,
  deleteTodo,
  clearCompleted,
}) => {
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [activeClearBtn, setActiveClearBtn] = useState(false);

  useEffect(() => {
    if (todos?.some((todo) => todo.completed)) {
      setActiveClearBtn(true);
    }
  });

  return (
    <div className="todoapp__content">
      <TodoHeader
        onError={onError}
        createTodo={createTodo}
        isInputDisabled={isInputDisabled}
      />

      <TodoMain todos={todos} tempTodo={tempTodo} deleteTodo={deleteTodo} />

      {todos && (
        <TodoFooter
          todosLength={todos?.length}
          filter={filter}
          onChange={(selectedFilter) => {
            setFilter(selectedFilter);
            filterTodos(selectedFilter);
          }}
          activeClearBtn={activeClearBtn}
          clearCompleted={clearCompleted}
        />
      )}
    </div>
  );
};

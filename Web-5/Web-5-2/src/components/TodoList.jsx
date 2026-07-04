import Todo from "./Todo";

const TodoList = (props) => {
    const {
        filteredTasks,
        tasks,
        setTasks,
        saveTask,
        cancelEditTask,
        onToggleTaskCheckbox,
        startEditTask,
        deleteTask,
    } = props;

    return (
        <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
            {filteredTasks.map((task) => (
                <Todo
                    task={task}
                    tasks={tasks}
                    setTasks={setTasks}
                    saveTask={saveTask}
                    cancelEditTask={cancelEditTask}
                    onToggleTaskCheckbox={onToggleTaskCheckbox}
                    startEditTask={startEditTask}
                    deleteTask={deleteTask}
                    key={task.id}
                />
            ))}
        </ul>
    );
};

export default TodoList;

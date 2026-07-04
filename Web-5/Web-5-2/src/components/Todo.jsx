const Todo = (props) => {
    const { task, setTasks, tasks, saveTask, cancelEditTask, onToggleTaskCheckbox, startEditTask, deleteTask } = props;

    return (
        <li className="todo stack-small">
            {task.isEditing ? (
                <>
                    <input
                        className="todo-text"
                        value={task.tempTitle}
                        onInput={(e) =>
                            setTasks(
                                tasks.map((task) =>
                                    task.id === task.id ? { ...task, tempTitle: e.target.value } : task,
                                ),
                            )
                        }
                    />

                    <div className="btn-group">
                        <button type="button" className="btn btn__primary" onClick={() => saveTask(task.id)}>
                            Save
                        </button>
                        <button type="button" className="btn btn__danger" onClick={() => cancelEditTask(task.id)}>
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="c-cb">
                        <input
                            id={task.id}
                            type="checkbox"
                            checked={task.isDone}
                            onChange={({ target }) => onToggleTaskCheckbox(task.id, target.checked)}
                        />
                        <label className="todo-label" htmlFor={task.id}>
                            {task.title}
                        </label>
                    </div>

                    <div className="btn-group">
                        <button type="button" className="btn" onClick={() => startEditTask(task.id)}>
                            Edit <span className="visually-hidden">{task.title}</span>
                        </button>
                        <button type="button" className="btn btn__danger" onClick={() => deleteTask(task.id)}>
                            Delete <span className="visually-hidden">{task.title}</span>
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default Todo;

import { useState, useEffect } from "react";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filter, setFilter] = useState("all");

    const addTask = async (e) => {
        e.preventDefault();

        if (!taskTitle) return;

        const res = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: taskTitle,
                isDone: false,
            }),
        });

        const newTask = await res.json();

        setTasks((prev) => [...prev, newTask]);

        setTaskTitle("");
        setFilter("all");
    };

    const deleteTask = async (id) => {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
        });

        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const editTask = async (id) => {
        const newTitle = prompt("Введите новую задачу:");
        if (!newTitle) return;

        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle }),
        });

        const updatedTask = await res.json();

        setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
    };

    const startEditTask = (id) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, isEditing: true, tempTitle: task.title } : task)),
        );
    };

    const saveTask = async (id) => {
        const task = tasks.find((t) => t.id === id);
        if (!task.tempTitle.trim()) return;

        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: task.tempTitle }),
        });

        const updatedTask = await res.json();

        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...updatedTask, isEditing: false, tempTitle: undefined } : t)),
        );
    };

    const cancelEditTask = (id) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, isEditing: false, tempTitle: undefined } : task)),
        );
    };


    const onToggleTaskCheckbox = async (id, isDone) => {
        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isDone }),
        });

        const updatedTask = await res.json();

        setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
    };

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const res = await fetch("http://localhost:3000/tasks");
                const data = await res.json();
                setTasks(data);
            } catch (e) {
                console.log(e);
                alert("Ошибка получения задач!");
            }
        };
        loadTasks();
    }, []);

    useEffect(() => {
        setFilteredTasks(
            tasks.filter((task) => {
                if (filter === "active") return !task.isDone;
                if (filter === "done") return task.isDone;
                return true;
            }),
        );
    }, [tasks, filter]);

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <form>
                <h2 className="label-wrapper">
                    <label htmlFor="new-todo-input" className="label__lg">
                        What needs to be done?
                    </label>
                </h2>
                <input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="text"
                    autoComplete="off"
                    value={taskTitle}
                    onInput={({ target }) => setTaskTitle(target.value)}
                />
                <button type="submit" className="btn btn__primary btn__lg" onClick={addTask}>
                    Add
                </button>
            </form>
            <div className="filters btn-group stack-exception">
                <button type="button" className="btn toggle-btn" aria-pressed="true" onClick={() => setFilter("all")}>
                    <span className="visually-hidden">Show </span>
                    <span>all</span>
                    <span className="visually-hidden"> tasks</span>
                </button>
                <button
                    type="button"
                    className="btn toggle-btn"
                    aria-pressed="false"
                    onClick={() => setFilter("active")}
                >
                    <span className="visually-hidden">Show </span>
                    <span>Active</span>
                    <span className="visually-hidden"> tasks</span>
                </button>
                <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={() => setFilter("done")}>
                    <span className="visually-hidden">Show </span>
                    <span>Completed</span>
                    <span className="visually-hidden"> tasks</span>
                </button>
            </div>
            <h2 id="list-heading">{tasks.filter(({ isDone }) => !isDone).length} tasks remaining</h2>

            <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                {filteredTasks.map((task) => (
                    <li className="todo stack-small" key={task.id}>
                        {task.isEditing ? (
                            <>
                                <input
                                    className="todo-text"
                                    value={task.tempTitle}
                                    onInput={(e) =>
                                        setTasks(
                                            tasks.map((t) =>
                                                t.id === task.id ? { ...t, tempTitle: e.target.value } : t,
                                            ),
                                        )
                                    }
                                />

                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className="btn btn__primary"
                                        onClick={() => saveTask(task.id)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn__danger"
                                        onClick={() => cancelEditTask(task.id)}
                                    >
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
                                    <button
                                        type="button"
                                        className="btn btn__danger"
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        Delete <span className="visually-hidden">{task.title}</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;



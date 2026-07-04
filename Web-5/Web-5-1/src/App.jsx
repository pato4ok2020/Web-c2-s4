import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import FilterPanel from "./components/FilterPanel";
import TasksInfo from "./components/TasksInfo";
import TodoList from "./components/TodoList";

const App = () => {
    const [tasks, setTasks] = useState([
        { id: crypto.randomUUID(), title: "Поесть", isDone: true },
        { id: crypto.randomUUID(), title: "Помыться", isDone: false },
    ]);
    const [taskTitle, setTaskTitle] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filter, setFilter] = useState("all");

    const addTask = (e) => {
        e.preventDefault();

        if (!taskTitle) return;

        setTasks([...tasks, { id: crypto.randomUUID(), title: taskTitle, isDone: false }]);
        setTaskTitle("");
        setFilter("all");
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const editTask = (id) => {
        const newTitle = prompt("Введите новую задачу: ");
        setTasks(
            tasks.map((task) => {
                if (task.id === id) {
                    return { ...task, title: newTitle };
                }
                return task;
            }),
        );
    };

    const startEditTask = (id) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, isEditing: true, tempTitle: task.title } : task)));
    };

    const saveTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, title: task.tempTitle, isEditing: false, tempTitle: undefined } : task,
            ),
        );
    };

    const cancelEditTask = (id) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, isEditing: false, tempTitle: undefined } : task)));
    };

    const onToggleTaskCheckbox = (id, isDone) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === id) {
                    return { ...task, isDone: isDone };
                }
                return task;
            }),
        );
        setFilter("all");
    };

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
            <AddTaskForm taskTitle={taskTitle} addTask={addTask} setTaskTitle={setTaskTitle} />
            <FilterPanel setFilter={setFilter} />
            <TasksInfo tasks={tasks} />
            <TodoList
                filteredTasks={filteredTasks}
                tasks={tasks}
                setTasks={setTasks}
                saveTask={saveTask}
                cancelEditTask={cancelEditTask}
                onToggleTaskCheckbox={onToggleTaskCheckbox}
                startEditTask={startEditTask}
                deleteTask={deleteTask}
            />
        </div>
    );
};

export default App;


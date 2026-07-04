import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import FilterPanel from "./components/FilterPanel";
import TasksInfo from "./components/TasksInfo";
import TodoList from "./components/TodoList";

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


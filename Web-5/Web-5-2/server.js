import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let tasks = [];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    try {
        const task = {
            ...req.body,
            id: crypto.randomUUID(),
        };

        tasks.push(task);

        res.json(task);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
});

app.put("/tasks/:id", (req, res) => {
    try {
        const id = req.params.id;

        let updatedTask = null;

        tasks = tasks.map((task) => {
            if (task.id === id) {
                updatedTask = { ...task, ...req.body };
                return updatedTask;
            }
            return task;
        });

        if (!updatedTask) {
            return res.sendStatus(404);
        }

        res.json(updatedTask);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
});

app.delete("/tasks/:id", (req, res) => {
    try {
        const id = req.params.id;

        tasks = tasks.filter((task) => task.id !== id);

        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
});

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});

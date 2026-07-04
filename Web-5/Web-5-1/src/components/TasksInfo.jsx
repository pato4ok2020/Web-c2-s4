const TasksInfo = (props) => {
    const { tasks } = props;

    return <h2 id="list-heading">{tasks.filter(({ isDone }) => !isDone).length} tasks remaining</h2>;
};

export default TasksInfo;

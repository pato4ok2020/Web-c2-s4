const FilterButton = (props) => {
    const { onClick, value } = props;

    return (
        <button type="button" className="btn toggle-btn" aria-pressed="true" onClick={onClick}>
            <span className="visually-hidden">Show </span>
            <span>{value}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );
};

export default FilterButton;

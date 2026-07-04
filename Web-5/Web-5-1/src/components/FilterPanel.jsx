import FilterButton from "./FilterButton";

const FilterPanel = (props) => {
    const { setFilter } = props;

    return (
        <div className="filters btn-group stack-exception">
            <FilterButton onClick={() => setFilter("all")} value="all" />
            <FilterButton onClick={() => setFilter("active")} value="Active" />
            <FilterButton onClick={() => setFilter("done")} value="Completed" />
        </div>
    );
};

export default FilterPanel;

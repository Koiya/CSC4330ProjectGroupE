import React, {useState} from 'react';
import './filter.css';
/*
* Filters
*  Checkbox
*   Day of the week
* input bar
*   Time range
* Search Bar
*   Name
*   Field of study
*
*
* */

export const Filter = () => {
    const study = ["English", "Biology", "Math"];
    function ListItem(props) {
        return(
            <div>
                <input type='checkbox'/>
                <li>{props.value}</li>
            </div>
        )};
    const listItems = study.map((item) =>
        <ListItem key={item.toString()} value={item} />
    );
    return(
        <div id="filter-component">
            <h1>Filter</h1>
            <ul>
            {listItems}
            </ul>

        </div>
    )
}
export default Filter;
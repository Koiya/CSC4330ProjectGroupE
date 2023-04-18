import React from 'react';
import '../../Styles/filter.css';
/*
* Filters
*  Checkbox
*   Day of the week
* input bar
*   Time range
* Search Bar
*   all?
*   Name
*   Field of study
*
*
* */

export const Filter = ({searchInput, boxInput}) => {
    /*const study = ["English", "Biology", "Math"];
    function ListItem(props) {
        return(
            <div>
                <input
                    style={{float:"left", position:"relative"}}
                    id={props.value.toString()}
                    type='checkbox'
                    onChange={() => boxInput(props.value)}
                />
                <li>{props.value}</li>
            </div>
        )};
    const listItems = study.map((item) =>
        <ListItem key={item.toString()} value={item} />
    );*/
    return(
        <div id="filter-component">
            <h1>Search</h1>
            <input
                type="text"
                id="filter-text-box"
                placeholder="Filter..."
                onInput={searchInput}
            />
            <ul>
                <input
                    style={{float:"left", position:"relative"}}
                    name="field"
                    type='radio'
                    defaultChecked
                    onChange={() => boxInput("All")}
                />
                <li>All</li>
                <input
                    style={{float:"left", position:"relative"}}
                    name="field"
                    type='radio'
                    onChange={() => boxInput("English")}
                />
                <li>English</li>
                <input
                    style={{float:"left", position:"relative"}}
                    name="field"
                    type='radio'
                    onChange={() => boxInput("Biology")}
                />
                <li>Biology</li>
                <input
                    style={{float:"left", position:"relative"}}
                    name="field"
                    type='radio'
                    onChange={() => boxInput("Math")}
                />
                <li>Math</li>
            </ul>

        </div>
    )
}
export default Filter;
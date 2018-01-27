import React from 'react';
import { NavLink } from 'react-router-dom';

const categoriesMenuItem = (props) => {
    return (
        <li>
            <NavLink to={"/articles/"+props.id} activeClassName="active">{props.name}</NavLink>
        </li>
    );
}

export default categoriesMenuItem;
import React from 'react';
import { Link } from 'react-router-dom';

const categoriesMenuItem = (props) => {
    return (
        <li>
            <Link to="/article/1">{props.name}</Link>
        </li>
    );
}

export default categoriesMenuItem;
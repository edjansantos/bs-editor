import React, { Component } from 'react';
import axios from 'axios';

import './CategoriesMenu.css';

import CategoriesMenuItem from './CategoriesMenuItem/CategoriesMenuItem';

class CategoriesMenu extends Component {
    state = {
        categories: []
    }

    componentDidMount() {
        axios.get('https://bs-app-api.herokuapp.com/categories/full')
            .then(response => {
                this.setState({ categories: response.data.categories });
            })
    }

    render() {
        const categories = this.state.categories.map(category => { 
            return <CategoriesMenuItem key={category.id} id={category.id} name={category.name} /> 
        });
        return (
            <ul className="categories-list">
                {categories}
            </ul>
        )
    }
}

export default CategoriesMenu;
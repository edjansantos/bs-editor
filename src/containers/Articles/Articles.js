import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";


import CategoriesMenu from '../../components/CategoriesMenu/CategoriesMenu';
import ArticleCard from '../../components/Article/ArticleCard/ArticleCard';

import './Articles.css';

class Articles extends Component {

    state = {
        articles: []
    }

    getPosts(idCategory) {
        axios.get('https://bs-app-api.herokuapp.com/posts-by-category/'+idCategory)
            .then(response => {
                this.setState({ articles: response.data.posts });
            })
    }

    componentDidMount() {
        const idCategory = this.props.match.params.id ? this.props.match.params.id : 1;
        this.getPosts(idCategory);
    }

    componentWillReceiveProps(newProps) {
        this.getPosts(newProps.match.params.id);
    }

    render() {
        const articles = this.state.articles.map(article => { return <ArticleCard key={article.id} id={article.id} title={article.title} subTitle={article.subTitle} /> });
        return (
            <section className="home">
                <aside className="column">
                    <CategoriesMenu />
                </aside>
                <div className="column">
                    {articles}
                </div>
            </section>
        )
    }
}

export default withRouter(Articles);
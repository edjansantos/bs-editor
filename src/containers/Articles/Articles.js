import React, { Component } from 'react';
import axios from 'axios';

import ArticleCard from '../../components/Article/ArticleCard/ArticleCard';

class Articles extends Component {
    state = {
        articles: []
    }

    componentDidMount() {
        axios.get('https://bs-app-api.herokuapp.com/posts-by-category/1')
        .then(response => {

            this.setState({articles:response.data.posts});
            console.log(response.data.posts);
        })
    }

    render() {
        const articles = this.state.articles.map(article => {return <ArticleCard key={article.id} id={article.id} title={article.title} subTitle={article.subTitle} />});
        return (
            <div>
                {articles}
            </div>
        )
    }
}

export default Articles;
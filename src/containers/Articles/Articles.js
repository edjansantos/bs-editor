import React, { Component } from 'react';
import axios from 'axios';

import CategoriesMenu from '../../components/CategoriesMenu/CategoriesMenu';
import ArticleCard from '../../components/Article/ArticleCard/ArticleCard';

class Articles extends Component {
    state = {
        articles: []
    }

    componentDidMount() {
        axios.get('https://bs-app-api.herokuapp.com/posts-by-category/1')
            .then(response => {

                this.setState({ articles: response.data.posts });
                console.log(response.data.posts);
            })
    }

    render() {
        const articles = this.state.articles.map(article => { return <ArticleCard key={article.id} id={article.id} title={article.title} subTitle={article.subTitle} /> });
        return (
            <section>
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

export default Articles;
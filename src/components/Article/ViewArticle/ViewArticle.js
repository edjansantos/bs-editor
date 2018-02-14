import React, { Component } from 'react';
import axios from 'axios';
import Article from '../Article/Article';
import moment from 'moment';

class ViewArticle extends Component {

    state = {
        // article: {
            title: '',
            subTitle: '',
            publishDate: moment(),
            author: '',
            content: '',
            featured: false,
            source: '',
            edition: '',
            category: {
                id: 0,
                name: ''
            },
            tags: '',
            mediaPath: ''
        // }
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleHtmlChange = this.handleHtmlChange.bind(this);
        this.handlePublishDateChange = this.handlePublishDateChange.bind(this);
        this.saveArticle = this.saveArticle.bind(this);
        moment.locale('pt-BR');
    }

    handleHtmlChange(html) {
        this.setState({ content: html });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handlePublishDateChange(date) {
        this.setState({ publishDate: date });
    }

    saveArticle() {
        console.log("State", this.state);
    }

    componentDidMount() {
        // axios.get('https://bs-app-api.herokuapp.com/categories/full')
        //     .then(response => {
        //         this.setState({ ...response.data.post });
        //     });
        if (this.props.match.params.id !== undefined) {
            axios.get('https://bs-app-api.herokuapp.com/post/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ ...response.data.post, publishDate: moment(response.data.post.publishDate) });
                });
        }
    }

    render() {
        return (
            <div>
                <Article data={this.state} handleChange={this.handleChange} handleHtmlChange={this.handleHtmlChange} handlePublishDateChange={this.handlePublishDateChange} saveArticle={this.saveArticle} />
            </div>
        )
    }
}

export default ViewArticle;
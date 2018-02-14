import React, { Component } from 'react';
import Article from '../Article/Article';
import moment from 'moment';
import axios from 'axios';

import './NewArticle.css';

class NewArticle extends Component {

    state = {
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

        // _fields.idCategory,
        // _fields.title,
        // _fields.subTitle,
        // _fields.author,
        // _fields.publishDate,
        // _fields.source,
        // _fields.tags,
        // _fields.content,
        // _fields.edition,
        // _fields.mediaPath

        const data = {
            idCategory: this.state.category.id,
            ...this.state
        }

        axios.post('https://bs-app-api.herokuapp.com/new-post', data)
                .then(response => {
                    console.log(response);
                });
    }

    render() {
        return (
            <div>
                <Article data={this.state} handleChange={this.handleChange} handleHtmlChange={this.handleHtmlChange} handlePublishDateChange={this.handlePublishDateChange} saveArticle={this.saveArticle} header="Novo Artigo" />
            </div>
        )
    }
}

export default NewArticle;
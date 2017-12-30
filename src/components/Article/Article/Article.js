import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

import './Article.css';

class Article extends Component {

    state = {
        article: {
            title: '',
            subTitle: '',
            publishDate: new Date(),
            author: ''
        },
        editorHtml: ''
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleHtmlChange = this.handleHtmlChange.bind(this)
    }

    componentDidMount() {
        if (this.props.match.params.id !== undefined) {
            axios.get('https://bs-app-api.herokuapp.com/post/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ article: response.data.post, editorHtml: response.data.post.content });
                })
        }
    }

    modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'color'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    }

    formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]

    handleHtmlChange(html) {
        // debugger;
        this.setState({ editorHtml: html });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <section className="bs-container">
                <section className="article">
                    <div className="column editor">
                        <div className="row">
                            <div className="bs-form-control">
                                <input type="text" name="article.title" value={this.state.article.title} onChange={this.handleChange.bind(this)} className="bs-control bs-big" id="title" required autoComplete="off" />
                                <label htmlFor="title">Título</label>
                            </div>
                            <div className="bs-form-control">
                                <input type="text" name="article.subTitle" value={this.state.article.subTitle} onChange={this.handleChange.bind(this)} className="bs-control" id="subTitle" autoComplete="off" />
                                <label htmlFor="subTitle"><span>Sub-título</span></label>
                            </div>
                            <div className="bs-form-control column">
                                <input type="text" name="article.publishDate" value={this.state.article.publishDate} onChange={this.handleChange.bind(this)} className="bs-control" id="publishDate" required autoComplete="off" />
                                <label htmlFor="publishDate"><span>Data da Publicação</span></label>
                            </div>
                            <div className="bs-form-control column">
                                <input type="text" name="article.author" value={this.state.article.author} onChange={this.handleChange.bind(this)} className="bs-control" id="author" required  />
                                <label htmlFor="author"><span>Autor</span></label>
                            </div>
                            <div className="bs-form-control">
                                <ReactQuill value={this.state.editorHtml}
                                    onChange={this.handleHtmlChange}
                                    formats={this.formats}
                                    modules={this.modules}
                                />
                            </div>
                            <div className="bs-form-control">
                                <button className="bs-btn-primary">Salvar</button>
                            </div>
                        </div>
                    </div>
                    <div className="column preview">
                        <div className="iphone-container">
                            <span className="camera"></span>
                            <span className="mic"></span>
                            <div className="iframe-container">
                                <h1>{this.state.article.title}</h1>
                                <p className="lead">{this.state.article.subTitle}</p>
                                <div dangerouslySetInnerHTML={{ __html: this.state.editorHtml }}></div>
                            </div>
                            <div className="home-button"></div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}

export default Article;
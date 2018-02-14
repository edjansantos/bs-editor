import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'moment/locale/pt-br';

import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

import './Article.css';


class Article extends Component {

    constructor(props) {
        super(props);
        this.timeToRead = this.timeToRead.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        categories: []
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
    ];

    timeToRead() {

        return "10 minutos"
    }

    componentDidMount() {
        axios.get('https://bs-app-api.herokuapp.com/categories/full')
            .then(response => {
                this.setState({ categories: response.data.categories });
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            alert('Preencha os campos obrigatórios antes de prosseguir');
            // form is invalid! so we do nothing
            return;
        } else {
            // console.log(this.props.data);
            this.props.saveArticle();
        }
    }

    render() {
        return (
            <section className="bs-container">
                {(this.props.header) ? <h1>{this.props.header}</h1> : null}
                <section className="new-article">
                    <div className="column editor">
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="row">
                                <div className="bs-form-control">
                                    <input required type="text" name="title" value={this.props.data.title} onChange={this.props.handleChange.bind(this)} className="bs-control bs-big" id="title" autoComplete="off" />
                                    <label htmlFor="title">Título</label>
                                </div>
                                <div className="bs-form-control">
                                    <input type="text" name="subTitle" value={this.props.data.subTitle} onChange={this.props.handleChange.bind(this)} className="bs-control" id="subTitle" autoComplete="off" />
                                    <label htmlFor="subTitle"><span>Sub-título</span></label>
                                </div>
                                <div className="bs-form-control column">
                                    <label htmlFor="publishDate" className="no-order"><span>Data da Publicação</span></label>

                                    <DatePicker
                                        name="publishDate" required
                                        className="bs-control" id="publishDate" autoComplete="off"
                                        selected={this.props.data.publishDate}
                                        onChange={this.props.handlePublishDateChange.bind(this)}
                                    />
                                </div>
                                <div className="bs-form-control column">
                                    <select required className="bs-control" id="category" name="category.id" value={this.props.data.category.id} onChange={this.props.handleChange.bind(this)}>
                                        {this.state.categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                                    </select>
                                    <label htmlFor="category"><span>Categoria</span></label>
                                </div>
                                <div className="bs-form-control column">
                                    <input required type="text" name="author" value={this.props.data.author} onChange={this.props.handleChange.bind(this)} className="bs-control" id="author" autoComplete="off" />
                                    <label htmlFor="author"><span>Autor</span></label>
                                </div>
                                <div className="bs-form-control column">
                                    <input type="text" name="source" value={this.props.data.source} onChange={this.props.handleChange.bind(this)} className="bs-control" id="source" autoComplete="off" />
                                    <label htmlFor="source"><span>Fonte</span></label>
                                </div>
                                <div className="bs-form-control column">
                                    <input type="text" name="edition" value={this.props.data.edition} onChange={this.props.handleChange.bind(this)} className="bs-control" id="edition" autoComplete="off" />
                                    <label htmlFor="edition"><span>Edição</span></label>
                                </div>
                                <div className="bs-form-control column">
                                    <input type="text" name="timeToRead" readOnly value={this.timeToRead()} className="bs-control" id="timeToRead" autoComplete="off" />
                                    <label htmlFor="timeToRead"><span>Tempo de leitura</span></label>
                                </div>
                                <div className="bs-form-control">
                                    <ReactQuill value={this.props.data.content}
                                        onChange={this.handleHtmlChange}
                                        formats={this.formats}
                                        modules={this.modules} required
                                    />
                                </div>
                                <div className="bs-form-control">
                                    <input required type="text" name="tags" value={this.props.data.tags} onChange={this.props.handleChange.bind(this)} className="bs-control" id="tags" autoComplete="off" />
                                    <label htmlFor="tags"><span>Tags</span></label>
                                </div>
                                <div className="bs-form-control">
                                {/* {articleForm.checkValidity()} */}
                                    {/* <button className="bs-btn-primary" onClick={this.props.saveArticle}>Salvar</button> */}
                                    <button className="bs-btn-primary">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="column preview">
                        <div className="iphone-container">
                            <span className="camera"></span>
                            <span className="mic"></span>
                            <div className="iframe-container">
                                <time>{this.props.data.publishDate.format('LL')}</time>
                                <h1>{this.props.data.title}</h1>
                                <p className="lead">{this.props.data.subTitle}</p>
                                <div dangerouslySetInnerHTML={{ __html: this.props.data.content }}></div>
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






import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';


import './NewArticle.css';

class NewArticle extends Component {
    
    state = { 
        editorHtml: '',
        title: '',
        subTitle: '',
        publishDate: moment(),
        author: ''
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleHtmlChange = this.handleHtmlChange.bind(this);
        moment.locale('pt-BR');
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

    saveArticle = () => {
        const _s = this.state;
        console.log({
            title: _s.title,
            subTitle: _s.subTitle,
            content: _s.editorHtml,
            author: _s.author,
            publishDate: _s.publishDate.format()
        });
    }

    handleHtmlChange(html) {
        // debugger;
        this.setState({ editorHtml: html });
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value})
      }

      handlePublishDateChange(date) {
        this.setState({publishDate : date});
      }
    render() {
        return (
            <section className="bs-container">
                <h1>Novo Artigo</h1>
                <section className="new-article">
                    <div className="column editor">
                        <div className="row">
                            <div className="bs-form-control">
                                <input type="text" name="title" value={this.state.title} onChange={this.handleChange.bind(this)} className="bs-control bs-big" id="title" required autoComplete="off" />
                                <label htmlFor="title">Título</label>
                            </div>
                            <div className="bs-form-control">
                                <input type="text" name="subTitle" value={this.state.subTitle} onChange={this.handleChange.bind(this)} className="bs-control" id="subTitle" autoComplete="off" />
                                <label htmlFor="subTitle"><span>Sub-título</span></label>
                            </div>
                            <div className="bs-form-control column">
                            <label htmlFor="publishDate" className="no-order"><span>Data da Publicação</span></label>
                           
                                <DatePicker
                                     name="publishDate"
                                     className="bs-control" id="publishDate" required autoComplete="off"
                                    selected={this.state.publishDate}
                                    onChange={this.handlePublishDateChange.bind(this)}
                                />
                            </div>
                            <div className="bs-form-control column">
                                <input type="text" name="author" value={this.state.author} onChange={this.handleChange.bind(this)}  className="bs-control" id="author" required autoComplete="off" />
                                <label htmlFor="author"><span>Autor</span></label>
                            </div>
                            <div className="bs-form-control">
                                <ReactQuill value={this.state.editorHtml}
                                    onChange={this.handleHtmlChange}
                                    formats={this.formats}
                                    
                                    modules={this.modules}
                                />
                                {/* <label>Conteúdo</label> */}
                            </div>
                            <div className="bs-form-control">
                                <button className="bs-btn-primary" onClick={this.saveArticle}>Salvar</button>
                            </div>
                        </div>
                    </div>                    
                    <div className="column preview">
                        <div className="iphone-container">
                            <span className="camera"></span>
                            <span className="mic"></span>
                            <div className="iframe-container">
                                <time>{this.state.publishDate.format('LL')}</time>
                                <h1>{this.state.title}</h1>
                                <p className="lead">{this.state.subTitle}</p>
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

export default NewArticle;
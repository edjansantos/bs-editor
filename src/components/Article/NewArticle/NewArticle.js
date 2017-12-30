import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import './NewArticle.css';

class NewArticle extends Component {
    
    state = { 
        editorHtml: '',
        title: '',
        subTitle: '',
        publishDate: new Date(),
        author: ''
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleHtmlChange = this.handleHtmlChange.bind(this)
    }

    modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
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
        this.setState({[e.target.name] : e.target.value})
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
                                <input type="date" name="publishDate" className="bs-control" id="publishDate" required autoComplete="off" />
                                <label htmlFor="publishDate"><span>Data da Publicação</span></label>
                            </div>
                            <div className="bs-form-control column">
                                <input type="text" name="author" className="bs-control" id="author" required autoComplete="off" />
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
                                <button className="bs-btn-primary">Salvar</button>
                            </div>
                        </div>
                    </div>
                    <div className="column preview">
                        <div className="iphone-container">
                            <span className="camera"></span>
                            <span className="mic"></span>
                            <div className="iframe-container">
                                <h1>{this.state.title}</h1>
                                <h2>{this.state.subTitle}</h2>
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
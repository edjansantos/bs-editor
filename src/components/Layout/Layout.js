import React from 'react';
import { Route } from 'react-router-dom';

// import SideMenu from '../components/SideMenu/SideMenu';
import Header from '../Header/Header';
import Aux from '../../hoc/Auxs';
import Article from '../../components/Article/Article/Article';
import Articles from '../../containers/Articles/Articles';
import NewArticle from '../../components/Article/NewArticle/NewArticle';

const layout = (props) => (
    <Aux>
        <Header />
        <main>
            <Route path="/" exact render={() => <h1>Home 2</h1>} />            
            <Route path="/article/:id" exact  component={Article} />            
            <Route path="/articles" exact  component={Articles} />            
            <Route path="/articles/new" exact  component={NewArticle} />            
            
            {props.children}
        </main>
    </Aux>
    // <ReactQuill
    //   onChange={this.handleChange}
    //   value={this.state.editorHtml}
    //   modules={this.modules}
    //   formats={this.formats}
    //   bounds={'.App'}
    //   placeholder={this.props.placeholder}
    // />
);

export default layout;
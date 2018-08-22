import React from 'react';
import { Route } from 'react-router-dom';

// import SideMenu from '../components/SideMenu/SideMenu';
import Header from '../Header/Header';
import Aux from '../../hoc/auxs';
import ViewArticle from '../../components/Article/ViewArticle/ViewArticle';
import Articles from '../../containers/Articles/Articles';
import NewArticle from '../../components/Article/NewArticle/NewArticle';

const layout = (props) => (
    <Aux>
        <Header />
        <main>
            <Route exact strict path="/" render={() => <h1>Home 2</h1>} />            
            <Route exact strict path="/article/:id" component={ViewArticle} />            
            <Route exact strict path="/articles" component={Articles} />            
            <Route exact strict path="/articles/:id" component={Articles} />            
            <Route exact strict path="/new-article" component={NewArticle} />            
        </main>
    </Aux>
);

export default layout;
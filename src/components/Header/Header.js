import React, {Component} from 'react';
import HeaderItem from './HeaderItem/HeaderItem';

import './Header.css';

class Header extends Component {
    
    render() {
        return (
            <header className="Header">
                <div className="logo">
                    <span>MEU<strong>BS</strong> Editor</span>
                </div>
                <div className="menuItems">
                    <ul>
                        <HeaderItem name="Novo Artigo" href="/new-article" />
                        <HeaderItem name="Lista de Artigos" href="/articles" />
                        <HeaderItem name="Gestão de Imagens" href="/images"/>
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header;
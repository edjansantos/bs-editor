import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import '../Header.css';

class HeaderItem extends Component {
    
    render() {
        return (
            <li>
                <NavLink to={this.props.href} exact>{this.props.name}</NavLink>
                {/* <a href={this.props.href}>{this.props.name}</a> */}
            </li>
        )
    }
}

export default HeaderItem;
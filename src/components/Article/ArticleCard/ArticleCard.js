import React from 'react';
import './ArticleCard.css';
import { Link } from 'react-router-dom';

const articleCard = (props) => (
    <div className="article-card">
        <Link to={{ pathname: '/article/' + props.id }}>
            <h3>{props.title}</h3>
            <span>{props.subTitle}</span>
        </Link>
    </div>
)

export default articleCard;
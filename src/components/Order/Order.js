import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            quantity: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{
                "display": "inline-block",
                "textTransform": "capitalize",
                "margin": "0px 8px",
                "padding": "5px",
                "border": "1px solid #ccc"
            }}
            key={ig.name}>{ig.name} ({ig.quantity})</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;
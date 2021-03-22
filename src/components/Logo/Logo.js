import React from 'react';

import classes from './Logo.module.css';

import BurgerLogo from '../../assets/images/burger-logo.png';

const logo = () => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt="MyBurger" />
    </div>
);

export default logo;
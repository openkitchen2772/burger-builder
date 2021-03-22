import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggledHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar 
                    isAuthenticated={this.props.isAuth}
                    drawerToggleClicked={this.sideDrawerToggledHandler} />
                <SideDrawer
                    isAuthenticated={this.props.isAuth}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);
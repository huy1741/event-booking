import React, { Component } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignOutMenu from '../menus/SignOutMenu';
import SignInMenu from '../menus/SignInMenu';

class NavBar extends Component {
    state = {
        authenicated: false
    };

    handleSignIn = () => {
        this.setState({
            authenicated: true
        });
    };
    handleSignOut = () => {
        this.setState({
            authenicated: false
        });
        this.props.history.push('/');
    };

    render() {
        const { authenicated } = this.state;
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item as={Link} to="/" header>
                        <img src="/assets/logo.png" alt="logo" />
                        Re-vents
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/events" name="Events" />
                    { authenicated && 
                    <Menu.Item as={NavLink} to="/people" name="People" />}

                    {authenicated && 
                    
                    <Menu.Item as={Link} to="/createEvent">
                        <Button
                            floated="right"
                            positive
                            inverted
                            content="Create Event"
                        />
                    </Menu.Item>
                    }
                    {authenicated ? (
                        <SignInMenu signOut={this.handleSignOut} />
                    ) : (
                        <SignOutMenu signIn={this.handleSignIn} />
                    )}
                </Container>
            </Menu>
        );
    }
}

export default withRouter (NavBar);

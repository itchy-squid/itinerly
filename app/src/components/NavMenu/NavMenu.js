import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { navRoutes } from '../../AppRoutes.js';
import './NavMenu.css';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Box>
          <AppBar position='static'>
            <Toolbar>
              <IconButton size='small'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{mr: 2}}>
                <MenuIcon/>
              </IconButton>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                itinerly
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow" container light>
          <NavbarBrand tag={Link} to="/">itinerly</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              {navRoutes
                .map((item, idx) => (
                  <NavItem key={`navmenu-${idx}`}>
                    <NavLink tag={Link} className="text-dark" to={item.path}>{item.name}</NavLink>
                  </NavItem>
                ))}
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

import React, { Component } from 'react';
import { Container } from '@mui/material';
import { NavMenu } from './NavMenu';
import 'react-toastify/dist/ReactToastify.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container tag="main" maxWidth='none'
          style={{paddingLeft: '48px'}}
        >
          {this.props.children}
        </Container>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
   Collapse, Button,
   Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
   UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
 } from 'reactstrap';

import Contact from './Contact';

function SiteNavLink(page) {
  let currentPage = window.location.pathname
        .split("/")
        .filter(function (c) { return c.length;})
        .pop();

  return (
    <NavItem key={page.name}>
      <Link className="nav-link" to={page.path}>{page.name}</Link>
    </NavItem>
  );
}

class SiteNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    let links = this.props.pages.map(page => SiteNavLink(page));

    return (
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="/" className="mr-auto">
          <h4>Jennifer Ellicott<br/>
          <small>Contemporary Dance Artist</small>
          </h4>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} className="mr-2">
          <div className={"menu-toggle-btn" + (this.state.collapsed ? '' : ' open')}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </NavbarToggler>
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav className="ml-auto" navbar>
            {links}
            &emsp;
            <NavItem>
              <Contact />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default SiteNav;

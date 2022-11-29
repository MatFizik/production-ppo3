import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">
            Ammo's
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link}  to="/ready-product"
                >
                  Готовый продукт</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/posts"
                >
                  Должности</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/staff"
                >
                  Кадровый состав
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/ingridients"
                >
                  Составные части
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/feed-stock"
                >
                  Сырье
                </NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink tag={Link} to="/measures"
                >
                  Ед.измерения
                </NavLink>
              </NavItem>
              
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

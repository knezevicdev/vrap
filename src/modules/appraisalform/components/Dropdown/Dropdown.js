import React, { Component } from 'react';
import classNames from 'classnames';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter(event) {
    event.preventDefault();
    this.setState({ active: true });
  }

  onMouseLeave(event) {
    event.preventDefault();
    this.setState({ active: false });
  }

  render() {
    const dropdownClass = classNames('dropdown', this.props.className);
    const headingClass = classNames('dropdown-heading', {
      active: this.state.active
    });

    return (
      <span
        className={dropdownClass}
        onMouseOver={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        data-qa="DropdownComponent"
      >
        <span className={headingClass}>{this.props.children}</span>
        <div
          className="submenu"
          onMouseOver={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <ul className="list-block">
            {this.props.data.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </span>
    );
  }
}

export default Dropdown;

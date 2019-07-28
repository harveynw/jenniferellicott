import React, { Fragment, Component } from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import {
   Button, ButtonDropdown,
   DropdownToggle, DropdownMenu, DropdownItem,
   Popover, PopoverHeader, PopoverBody
} from 'reactstrap';


class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  getStyle = () => {
    return this.state.isOpen ?
    {
      backgroundColor: 'black',
      borderColor: 'black',
      color: 'white'
    } :
    {
      backgroundColor: 'white',
      borderColor: 'black',
      color: 'black'
    }
  }

  toggle = () => {
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen
      }
    })
  }

  render() {
    return (
      <Fragment>
        <Button style={this.getStyle()} id='popover'>Contact</Button>
        <Popover placement='bottom' isOpen={this.state.isOpen} target='popover' toggle={this.toggle}>
          <PopoverHeader style={{backgroundColor: 'white'}}>General Enquires</PopoverHeader>
          <PopoverBody>
            <p>
            info@jenniferellicott.com
            </p>
            <hr/>
            <a href='https://www.instagram.com/jenniferellicott/' className='social-media'>Instagram</a>
          </PopoverBody>
        </Popover>
      </Fragment>
    );
  }
}

export default Contact;

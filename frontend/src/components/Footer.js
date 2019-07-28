import React, { Component } from 'react';
import {
  Container, Row, Col
} from 'reactstrap';

class Footer extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col style={{textAlign: 'center', fontSize: '0.8em', padding: '8px'}}>
            &copy; {new Date().getFullYear()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;

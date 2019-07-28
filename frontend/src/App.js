import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
   Row, Col, Container
} from 'reactstrap';

import GalleryComponent from './components/Gallery';
import SiteNav from './components/SiteNav';
import Footer from './components/Footer';

import './App.css';

function IndexPage() {
  return (
    <div style={{padding: '2px'}}>
      <img style={{maxWidth: '100%'}} src='/fixed/homepage.jpg' />
    </div>
  );
}

function GalleryPage() {
  return (
    <div style={{padding: '2px'}}>
      <GalleryComponent />
    </div>
  );
}

function BioPage() {
  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <img src='/fixed/studio_picture.jpg' className='img-fluid' />
          <hr/>
          <p>
            A painter of large oils and lyrical figure drawings, I have lost my heart to the mesmerising art form of contemporary dance.
          </p>
          <p>
            There is much to explore in the De Kooning legacy of expressive figuration and the centuries old craft of oil paint and canvas. Swathes of juicy paint echo the muscular and turbulent actions of the dancers held in check by the tautly composed rectangular canvas.
          </p>
          <p>
            In my painterly struggle I hope to arrive at a place of poetic equilibrium where the viewer can take over and immersion in a rich canvas rewards repeated visits.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

function AppRouter() {
  let pages = [
    {
      name: 'Home',
      path: '/',
      exact: true,
      component: IndexPage
    },
    {
      name: 'Gallery',
      path: '/gallery/',
      exact: false,
      component: GalleryPage
    },
    {
      name: 'Bio',
      path: '/bio/',
      exact: false,
      component: BioPage
    }
  ];

  let routes = pages.map(page =>
    <Route key={page.name} path={page.path} component={page.component} exact={page.exact} />
  );

  return (
    <Router>
      <div>
        <SiteNav pages={pages} />
        {routes}
      </div>
    </Router>
  );
}

class App extends Component {
  render() {
    return (
      <div>
        <AppRouter />
        <Footer />
      </div>
    );
  }
}

export default App;

import React, { useState } from 'react';
import CallApi from '../../../utils/api';
import AppContextHOC from '../../HOC/AppContextHOC';

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';

class MoviePage extends React.Component {
  state = {
    movie: '',
    activeTab: 1,
  };

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`).then((results) => {
      this.setState({
        movie: results,
      });
    });
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setActiveTab(tab);
  };

  setActiveTab = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };

  render() {
    const { poster_path, overview } = this.state.movie;

    return (
      <div className="container-m mt-5">
        <div className="row">
          <div className="col-4 text-center">
            <img
              className="h-75 rounded float-end"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={this.state.movie.title}
            />
          </div>
          <div className="col mt-3 ">
            <h1 className="text fw-bold ">{this.state.movie.title}</h1>
            <p className="text fs-5 w-75">{overview}</p>
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === '1',
                    })}
                    onClick={() => {
                      this.toggle('1');
                    }}
                  >
                    Details
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === '2',
                    })}
                    onClick={() => {
                      this.toggle('2');
                    }}
                  >
                    Videos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === '3',
                    })}
                    onClick={() => {
                      this.toggle('3');
                    }}
                  >
                    Credits
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <h4>Tab 1 Contents</h4>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <h4>Tab 2 Contents</h4>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <h4>Tab 3 Contents</h4>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MoviePage);

import React from 'react';
import { TabPane, Row, Col } from 'reactstrap';
import CallApi from '../../../../utils/api';
import '../../../../styles/galery.css';

class Credits extends React.Component {
  state = {
    actors: [],
    chosenImage: null,
  };

  componentDidMount() {
    CallApi.get(`/movie/${this.props.id}/credits`).then((result) => {
      console.log(result);
      this.setState({
        actors: result.cast,
      });
    });
  }

  chooseImage = (item) => {
    this.setState({
      chosenImage: item,
    });
  };

  removeImage = () => {
    this.setState({
      chosenImage: null,
    });
  };

  render() {
    return (
      <TabPane tabId="3">
        <Row>
          <Col sm="12">
            <div className="wrapper-galery mt-3">
              {this.state.actors.map((item, index) => {
                return (
                  <div
                    className="galery-image"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.profile_path})`,
                    }}
                    key={index}
                  >
                    <div
                      className="image-overflow"
                      onClick={this.chooseImage.bind(null, item)}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`${item.name}`}
                    ></div>
                  </div>
                );
              })}
              // End of - .map()
              {this.state.chosenImage ? (
                <div
                  className="image-window"
                  onClick={this.removeImage.bind(null)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${this.state.chosenImage.profile_path}`}
                    alt={this.state.chosenImage.name}
                  />
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </TabPane>
    );
  }
}

export default Credits;

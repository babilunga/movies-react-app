import React from 'react';
import { TabPane, Row, Col } from 'reactstrap';
import CallApi from '../../../../utils/api';

class Videos extends React.Component {
  state = {
    clips: [],
  };
  componentDidMount() {
    CallApi.get(`/movie/${this.props.id}/videos`).then((result) => {
      this.setState({
        clips: result.results,
      });
    });
  }
  render() {
    return (
      <TabPane tabId="2">
        <Row>
          <Col sm="12">
            <div className="row ms-3">
              {this.state.clips.map((clip, index) => (
                <div className="col m-0 mt-3 p-0" key={index}>
                  <iframe
                    width="430"
                    height="200"
                    src={`https://www.youtube-nocookie.com/embed/${clip.key}`}
                    title={`${clip.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </TabPane>
    );
  }
}

export default Videos;

import { TabPane, Row, Col } from 'reactstrap';
import React from 'react';
// import CallApi from '../../../../utils/api';

class Details extends React.Component {
  state = {};

  componentDidMount() {
    console.log(this.props.movie);
  }

  render() {
    const {
      status,
      release_date,
      runtime,
      original_language,
      production_countries: countries,
      budget,
      revenue,
      production_companies: companies,
      genres,
    } = this.props.movie;
    return (
      <TabPane tabId="1">
        <Row>
          <Col sm="12">
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Status</th>
                  <td>{status}</td>
                </tr>
                <tr>
                  <th scope="row">Release date</th>
                  <td>{release_date}</td>
                </tr>
                <tr>
                  <th scope="row">Runtime</th>
                  <td>{runtime}</td>
                </tr>
                <tr>
                  <th scope="row">Original language</th>
                  <td>{original_language}</td>
                </tr>
                <tr>
                  <th scope="row">
                    {countries.length > 1 ? 'Countries' : 'Country'}
                  </th>
                  <td>
                    {countries.length === 0 ? 'No information' : null}
                    {countries.map((item, index) => (
                      <div>
                        <span className="m-0 badge bg-primary" key={index}>
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Budget</th>
                  <td>{budget === 0 ? 'No information' : `${budget}$`}</td>
                </tr>
                <tr>
                  <th scope="row">Revenue</th>
                  <td>{revenue === 0 ? 'No information' : `${revenue}$`}</td>
                </tr>
                <tr>
                  <th scope="row">
                    {companies.length > 1 ? 'Companies' : 'Company'}
                  </th>
                  <td>
                    {companies.length === 0 ? 'No information' : null}
                    {companies.map((item, index) => (
                      <div>
                        <span className="m-0 badge bg-primary" key={index}>
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Genres</th>
                  <td className="">
                    {genres.length === 0 ? 'No information' : null}
                    {genres.map((item, index) => (
                      <div>
                        <span className="m-0 badge bg-primary" key={index}>
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </TabPane>
    );
  }
}

export default Details;

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import uuivd4 from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import refreshIcon from '../assets/refresh.svg';
import linkIcon from '../assets/link.svg';

class LaunchTable extends Component {
  constructor(props) {
    super(props);
    this.filterList = ['LAND SUCCESS', 'REUSED', 'WITH REDDIT'];
    this.tableHeaderList = ['Badge', 'Rocket Name', 'Rocket Type', 'Launch Date', 'Details', 'ID', 'Article'];

    this.handleChange = this.handleChange.bind(this);
    this.getTableRow = this.getTableRow.bind(this);

    this.state = {
      land_success: false,
      reused: false,
      with_reddit: false
    };
  }
    
  handleChange(e) {
    if(e.target.checked === true) {
      this.setState({
        [e.target.name]: true
      });
    } else {
      this.setState({
        [e.target.name]: false
      });
    }
  }

  getFilters(list) {
    return list.map(header => {
      const value = header.split(' ').join('_').toLowerCase();
      return (
        <li key={uuivd4()} className="col text-white px-md-0 d-md-inline pt-2 pt-md-0">
          <label className="mb-md-0" htmlFor={value}>
            <input 
              type="checkbox" 
              onChange={this.handleChange}
              checked={this.state[value]}
              name={value}>
            </input>
            <span className="justify-content-center align-items-center d-inline-flex"></span>
            <span className="label-text">{header}</span>
          </label>
        </li>
      );
    });
  }

  getHeaders(list) {
    return list.map(header => {
      return (
        <th key={uuivd4()} colSpan={header === 'Details' ? '4' : '1'}>
          {header}
        </th>
      );
    });
  }

  getTableRow(data) {
    const { land_success, reused, with_reddit } = this.state;
    return data.map(item => {
      const { badge, rocket, launch_date, details, id, article_link } = item;
      if (
        (land_success === true && item.land_success !== true) ||
        (reused === true && item.reusedItems !== true) ||
        (with_reddit === true && item.with_reddit !== true)
      ) {
        return null;
      }
      return (
        <tr key={uuivd4()}>
          <td className="text-center"><img className="badge-img" src={badge}/></td>
          <td>{rocket.rocket_name}</td>
          <td>{rocket.rocket_type}</td>
          <td>{launch_date}</td>
          <td colSpan="4">{details}</td>
          <td className="text-center">{id}</td>
          <td className="text-center"><a href={article_link} target="_blank" rel="noopener noreferrer"><img src={linkIcon}/></a></td>
        </tr>
      );
    }).filter(i => i !== null);
  }

  render() {
    const { data, reloadData } = this.props;
    if (data.loading === true) {
      return (
        <div className="col-12 text-center">
          <FontAwesomeIcon 
            className="text-white loading" 
            icon={faSpinner} 
            pulse/>
        </div>
      );
    } else if (data.launches) {
      return (
        <Fragment>
          <div className="col-12 col-md-7 m-auto header-one-container mt-5 px-0">
            <div className="col-12 col-md-1 d-md-inline-flex mt-2 float-right float-md-none ml-md-2 mr-2 mr-md-0 refresh-div">
              <img src={refreshIcon} onClick={reloadData}/>
            </div>
            <div className="col-12 col-md-8 d-inline-flex d-md-block float-md-right mr-md-2 px-0">
              <ul className="col-12 d-block float-right p-0 m-0 text-md-right">
                {this.getFilters(this.filterList)}
              </ul>
            </div>
          </div>
          <table className="col-12 col-md-7 m-auto px-0 table table-responsive-md">
            <thead className="gradient-background">
              <tr>
                {this.getHeaders(this.tableHeaderList)}
              </tr>
            </thead>
            <tbody>
              {this.getTableRow(data.launches)}
            </tbody>
          </table>
        </Fragment>
      );
    }
    return <h1>{data.err ? data.err.message : null}</h1>;
  }
}

LaunchTable.propTypes = {
  data: PropTypes.object.isRequired,
  reloadData: PropTypes.func.isRequired
};

export default LaunchTable;
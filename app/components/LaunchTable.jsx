import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import uuivd4 from 'uuid'

import refreshIcon from '../assets/refresh.svg'
import linkIcon from '../assets/link.svg'

class LaunchTable extends Component {
  constructor(props) {
    super(props)
    this.filterList = ['LAND SUCCESS', 'REUSED', 'WITH REDDIT'];
    this.tableHeaderList = ['Badge', 'Rocket Name', 'Rocket Type', 'Launch Date', 'Details', '', '', '', 'Id', 'Article']

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      land_success: false,
      reused: false,
      with_reddit: false
    }
  }
    
  handleChange(e) {
    if(e.target.checked === true) {
      this.setState({
        [e.target.name]: true
      })
    } else {
      this.setState({
        [e.target.name]: false
      })
    }
  }

  getFilters(list) {
    return list.map(header => {
      const value = header.split(' ').join('_').toLowerCase()
      return (
        <li key={uuivd4()} className="col text-white pl-md-0 d-md-inline pt-2 pt-md-0">
          <Fragment>
            <input 
              type="checkbox" 
              onChange={this.handleChange}
              checked={this.state[value]}
              name={value}>
            </input>
            {` `}
            <label className="mb-md-0" htmlFor={value}>{header}</label>
          </Fragment>
        </li>
      )
    })
  }

  getHeaders(list) {
    return list.map(header => {
      return (
        <th key={uuivd4()}>
          {header}
        </th>
      )
    })
  }

  getTableRow(data) {
    return data.map(item => {
      const { badge, rocket, launch_date, details, id, article_link } = item
      return (
        <tr key={uuivd4()}>
          <td className="text-center"><img className="badge-img" src={badge}/></td>
          <td>{rocket.rocket_name}</td>
          <td>{rocket.rocket_type}</td>
          <td>{launch_date}</td>
          <td>{details}</td>
          <td>{` `}</td>
          <td>{` `}</td>
          <td>{` `}</td>
          <td className="text-center">{id}</td>
          <td className="text-center"><a href={article_link} target="_blank" rel="noopener noreferrer"><img src={linkIcon}/></a></td>
        </tr>
      )
    })
  }

  render() {
    const { data, reloadData } = this.props;
    if (data.loading === true) {
      return <i className="text-white fas fa-spinner fa-spin"></i>
    } else if (data.launches) {
      return (
        <Fragment>
          <div className="col-12 col-md-8 offset-md-2 header-one-container mt-5 px-0">
            <div className="col-12 col-md-1 d-md-inline-flex h-100">
              <img className="float-right mt-2 mt-md-0" src={refreshIcon} onClick={reloadData}/>
            </div>
            <div className="col-12 col-md-6 d-inline-flex d-md-block float-md-right px-0">
              <ul className="col-12 d-block float-right p-0 m-0 text-md-right">
                {this.getFilters(this.filterList)}
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-8 offset-md-2 px-0">
            <table className="table table-responsive-md">
              <thead className="gradient-background">
                <tr>
                  {this.getHeaders(this.tableHeaderList)}
                </tr>
              </thead>
              <tbody>
                {this.getTableRow(data.launches)}
              </tbody>
            </table>
          </div>
        </Fragment>
      )
    }
    return <h1>{data.err ? data.err.message : null}</h1>
  }
}

LaunchTable.propTypes = {
  data: PropTypes.object.isRequired,
  reloadData: PropTypes.func.isRequired
}

export default LaunchTable
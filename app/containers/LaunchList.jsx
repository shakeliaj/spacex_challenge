import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getLaunchData } from '../actions';
import LaunchTable from '../components/LaunchTable.jsx';

class LaunchList extends Component {
  constructor(props) {
    super(props);
    this.requestLaunchData = this.requestLaunchData.bind(this);
  }

  componentDidMount() {
    this.requestLaunchData();
  }

  requestLaunchData() {
    this.props.dispatch(getLaunchData());
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-12 mt-5 text-center mb-4">
          <h1 className="text-white">SpaceX Launches</h1>
        </div>
        <LaunchTable data={this.props.launchData} reloadData={this.requestLaunchData} />
      </div>
    );
  }
}

LaunchList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  launchData: PropTypes.object
};

const mapStateToProps = state => {
  const { launchData } = state;
  return { launchData };
};

export default connect(mapStateToProps)(LaunchList);
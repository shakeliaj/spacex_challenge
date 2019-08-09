import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getLaunchData } from '../actions'
// import LaunchTable from '../components/LaunchTable.jsx'

class LaunchList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(getLaunchData())
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-white col text-center mt-5">SpaceX Launches</h1>
            </div>
        )
    }
}

LaunchList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    launchData: PropTypes.object
}

const mapStateToProps = state => {
    const { launchData } = state
    return { launchData }
}

export default connect(mapStateToProps)(LaunchList)
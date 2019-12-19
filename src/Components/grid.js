import React from "react";
import PropTypes from "prop-types";
import logo from './../logo.svg'
import {connect} from 'react-redux'
import {TOGGLE_ACTIVE, FILTER, FILTER_DETAILS} from '../Constants'
import {filterGrid, toggleActive, loadDataInGrid} from '../Actions'

require("bootstrap/dist/css/bootstrap.css");

class GridRecord extends React.Component {
    render() {
        let {record} = this.props;
        return <tr>
            <th onClick={this.showUserDetails.bind(this)}>
                <a href="#">{record.id}</a>
            </th>
            <th>
                <span onChange={this.props.handleFilterChange}
                      onDoubleClick={this.props.handleFilterChange}>{record.firstName} </span>
            </th>
            <th>
                <span onChange={this.props.handleFilterChange}
                      onDoubleClick={this.props.handleFilterChange}>{record.lastName} </span>
            </th>
            <th><input type="checkbox" checked={record.active}
                       onChange={this.props.toggleActive}/></th>
        </tr>
    }

    showUserDetails(e) {
        e.preventDefault();
        this.props.history.push(`/details/${this.props.record.id}`);
    }
}

GridRecord.defaultProps = {
    record: {firstName: "N/A", lastName: "N/A", active: false}
};

GridRecord.propTypes = {
    record: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    })
};

class GridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: []
        }
    }

    componentDidMount(){
        this.refs.filterInput && this.refs.filterInput.focus();
        this.loadData();
    }

    loadData(){
        let {dispatch} = this.props;
        dispatch(loadDataInGrid());
    }

    toggleActive(index) {
        let {dispatch} = this.props;
        dispatch(toggleActive(index));
    }

    handleFilterChange(e) {
        let {dispatch} = this.props;
        dispatch(filterGrid(e.target.value));
    }

    render() {

        console.log("props", this.props)
        return (
            <div style={{width: 300, height: 300, padding: 20}}>
                <p>
                    <input type="text" ref="filterInput" placeholder="Filter by..."
                           onChange={(e) => this.handleFilterChange(e)}/>
                </p>
                <table className="table table-condensed">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.records.map((record, index) => {
                        return <GridRecord record={record} key={index} history={this.props.history}
                                           toggleActive={this.toggleActive.bind(this, index)}/>
                    })}
                    </tbody>
                </table>
                <div>{this.props.children &&
                React.cloneElement(this.props.children, {records: this.props.records})}</div>
            </div>
        )
    }
}

GridComponent.propTypes = {
    records: PropTypes.array.isRequired,
    filtered: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        records: state.grid.records,
        filtered: state.grid.filtered,
        loading: state.grid.loading
    }
}

export default connect(
    mapStateToProps
)(GridComponent)
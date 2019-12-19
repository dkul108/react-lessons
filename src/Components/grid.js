import React from "react";
import PropTypes from "prop-types";
import logo from './../logo.svg'
import {connect} from 'react-redux'

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

//todo:remove hardcoded data
//export default class GridComponent extends React.Component {
class GridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: []
        }
    }

    componentDidMount() {
        this.refs.filterInput && this.refs.filterInput.focus();
    }

    // toggleActive(index) {
    //     let {records} = this.state;
    //     records[index].active = !records[index].active;
    //     this.setState({
    //         records: records
    //     })
    // }

    toggleActive(index) {
        let {dispatch} = this.props;
        dispatch({
            type: "TOGGLE_ACTIVE",
            value: index
        });
    }

    handleFilterChange(e) {
        // let value = e.target.value,
        //     records = dataSource.filter((record) =>
        //         record.lastName.toUpperCase().includes(value.toUpperCase()));
        // this.setState({
        //     records: records
        // });
    }

    render() {
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
    records: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        records: state.grid
    }
}

export default connect(
    mapStateToProps
)(GridComponent)
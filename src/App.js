import React from 'react';
import logo from './logo.svg'
import {render} from 'react-dom';
import PropTypes from 'prop-types';

require("bootstrap/dist/css/bootstrap.css");

const dataSource = [
    {firstName: "John", lastName: "Doe", active: false},
    {firstName: "Mary", lastName: "Moe", active: false},
    {firstName: "Peter", lastName: "Noname", active: true}
]

class GridRecord extends React.Component {
    render() {
        let {record} = this.props;
        return <tr>
            <th>
                <span onChange={this.props.handleFilterChange} onDoubleClick={this.props.handleFilterChange}>{record.firstName} </span>
            </th>
            <th>
                <span onChange={this.props.handleFilterChange} onDoubleClick={this.props.handleFilterChange}>{record.lastName} </span>
            </th>
            <th><input type="checkbox" checked={record.active}
                       onChange={this.props.toggleActive}/></th>
        </tr>
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

export class SummaryActive extends React.Component {
    render(){
        return (
            <div>Active Users:
                {this.props.records.filter((record)=>record.active).length}</div>
        )
    }
}
export class SummaryUsers extends React.Component {
    render(){
        return (
            <div>Users Count: {this.props.records.length}</div>
        )
    }
}

export default class GridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: []
        }
    }

    componentDidMount(){
        this.refs.filterInput && this.refs.filterInput.focus();
        this.setState({
            records:dataSource
        })
    }

    toggleActive(index) {
        let {records} = this.state;
        records[index].active = !records[index].active;
        this.setState({
            records: records
        })
    }

    handleFilterChange(e) {
        let value = e.target.value,
            records = dataSource.filter((record) =>
                record.lastName.toUpperCase().includes(value.toUpperCase()));
        this.setState({
            records: records
        });
    }

    render() {
        return (
            <div style={{width: 300, height: 300, padding: 20}}>
                <p>
                    <input type="text" ref="filterInput" placeholder="Filter by..."
                           onChange={(e)=> this.handleFilterChange(e)}/>
                </p>
                <table className="table table-condensed">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.records.map((record, index) => {
                        return <GridRecord record={record} key={index} toggleActive={this.toggleActive.bind(this, index)}/>
                    })}
                    </tbody>
                </table>
                <div>{this.props.children &&
                React.cloneElement(this.props.children, { records: this.state.records })}</div>
            </div>
        )
    }
}


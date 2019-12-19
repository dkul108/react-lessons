import React from 'react';
import logo from './logo.svg'
import {render} from 'react-dom';
import PropTypes from 'prop-types';


require("bootstrap/dist/css/bootstrap.css");

const dataSource = [
    {firstName: "John", lastName: "Doe", active: false, id: 1},
    {firstName: "Mary", lastName: "Moe", active: false, id: 2},
    {firstName: "Peter", lastName: "Noname", active: true, id: 3}
]

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

export class SummaryActive extends React.Component {
    render() {
        return (
            <div>Active Users:
                {this.props.records.filter((record) => record.active).length}</div>
        )
    }
}

export class SummaryUsers extends React.Component {
    render() {
        return (
            <div>Users Count: {this.props.records.length}</div>
        )
    }
}


function User({detail}) {
    return (<div className="well profile">
        <div className="col-sm-12">
            <div className="col-xs-12 col-sm-8">
                <h2>{detail.name}</h2>
                <p><strong>About:</strong>{detail.about}</p>
                <p><strong>Hobby:</strong>{detail.hobby}</p>
                <p><strong>Skills: </strong>
                    {detail.skills.map(skill => <span>{skill}, </span>)}
                </p>
            </div>
            <div className="col-xs-12 col-sm-4 text-center">
                <figure>
                    <img
                        src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-2.jpg"
                        alt="" className="img-circle img-responsive"/>
                </figure>
            </div>
        </div>
    </div>)
}

export class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: []
        }
    }

    filterDetails(id) {
        if (id) {
            this.setState({
                details: detailsRecords.filter((record) => {
                    return record.id == id;
                })
            })
        } else {
            this.setState({
                details: detailsRecords
            })
        }
    }

    componentWillMount() {
        this.filterDetails(this.props.match.params.id);
    }

    componentWillReceiveProps(props) {
        this.filterDetails(props.match.params.id);
    }

    render() {
        let {details} = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                        {details.map(detail => <User detail={detail}/>)}
                    </div>
                </div>
            </div>)
    }
}

const detailsRecords = [{
    id: 1,
    name: "John Doe",
    about: "Nice guy",
    hobby: "Likes drinking wine",
    skills: ["html", "javascript", "redux"]
}, {
    id: 2,
    name: "Mary Moe",
    about: "Cute girl",
    hobby: "Likes playing xbox whole days long",
    skills: ["Fortran", "Lua", "R#"]
}];

export default class GridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: []
        }
    }

    componentDidMount() {
        this.refs.filterInput && this.refs.filterInput.focus();
        this.setState({
            records: dataSource
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
                    {this.state.records.map((record, index) => {
                        return <GridRecord record={record} key={index} history={this.props.history}
                                           toggleActive={this.toggleActive.bind(this, index)}/>
                    })}
                    </tbody>
                </table>
                <div>{this.props.children &&
                React.cloneElement(this.props.children, {records: this.state.records})}</div>
            </div>
        )
    }
}


// <HashRouter>
//     <div>
//         <Header />
//         <Switch>
//             <Route path="/grid" component={GridComponent}/>
//             <Route exact path="/details" component={UserDetails}/>
//             <Route path="/details/:id" component={UserDetails}/>
//         </Switch>
//     </div>
// </HashRouter>


import React from "react";
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

require("bootstrap/dist/css/bootstrap.css");

export class User extends React.Component {
    render(){
        let {detail} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg6">
                        <div className="well profile">
                            <div className="col-sm-12">
                                <div className="col-xs-12 col-sm-8">
                                    <h2>{detail.name}</h2>
                                    <p><strong>About: </strong> {detail.about} </p>
                                    <p><strong>Hobbies: </strong> {detail.hobbies}
                                    </p>
                                    <p><strong>Skills: </strong>
                                        {detail.skills.map((skill, i)=>{
                                            return <span key={i}
                                                         className="tags">{skill}</span>
                                        })}
                                    </p>
                                </div>
                                <div className="col-xs-12 col-sm-4 text-center">
                                    <figure>
                                        <img src="http://www.bitrebels.com/wpcontent/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-2.jpg" alt=""
                                             className="img-circle img-responsive"/>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class UserDetails extends React.Component {
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                        {this.props.details.map((detail, i) => {
                            return <User key={i} detail={detail}/>
                        })}
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


UserDetails.propTypes = {
    details: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        details: state.details
    }
}

export default connect(
    mapStateToProps
)(UserDetails)
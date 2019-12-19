import React from "react";
require("bootstrap/dist/css/bootstrap.css");

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
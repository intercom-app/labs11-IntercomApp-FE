import React, { Component } from "react";
import axios from "axios";
import host from "../../host.js";
import { Link } from "react-router-dom";

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        };
    }

    componentDidMount() {
        axios
            .get(`${host}/api/groups`)
            .then(res => {
                this.setState({ groups: res.data });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <div>
                {/* {console.log(this.state.groups)} */}
                {this.state.groups.map(group => (
                    <Link to={`/groups/${group.id}`} key={group.id}>
                        <div >
                            {group.id} 
                        </div>
                    </Link>
                ))}
            </div>
        );
    }
}

export default Groups;

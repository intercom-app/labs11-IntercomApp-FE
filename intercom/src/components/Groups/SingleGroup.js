import React, { Component } from 'react';
import axios from "axios";
import host from "../../host.js";
import { Link } from "react-router-dom";

class SingleGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            group: []
        }
    }

    componentDidMount() {
        axios
            .get(`${host}/api/groups/${this.state.id}`)
            // .get(`http://localhost:3300/api/group/${this.state.id}`)

            // console.log(this.state.id)
            .then(res => {
                console.log(res)
                this.setState({ group: res.data })
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        return (
            <div>
                {console.log(this.state.group)}

                <div key={this.state.group.id}>
                    {this.state.group.id} 
                </div>
            </div>
        );
    }
}

export default SingleGroup;
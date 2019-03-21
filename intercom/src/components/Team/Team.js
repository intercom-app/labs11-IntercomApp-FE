import React, { Component } from 'react';
import axios from 'axios';

import host from '../../host';

class Team extends Component {
    state = {
        team: []
    }

    componentDidMount() {
        const teamEndpoint = `${host}/api/team`;

        axios.get(teamEndpoint)
        .then(res => {
            this.setState({ team: res.data })
        })
        .catch(err => {
            this.setState({
                error: err.response.data.message,
                team: [],
            });
        });
    }

    render() {
        return (
            <>
                {this.state.error 
                ?   <p>Error retrieving team members!</p> 
                :   <ul>
                        {this.state.team.map(teamMember => 
                            <li key={teamMember.id}>{teamMember.name}</li>
                        )}
                    </ul>

                }
            </>
        )
    }
}

export default Team;
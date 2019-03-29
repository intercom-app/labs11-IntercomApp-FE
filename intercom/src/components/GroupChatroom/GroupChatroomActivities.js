import React, { Component } from 'react';
import axios from 'axios';

import host from '../../host';

class GroupChatroomActivities extends Component {
    state = {
        activities: [],
        error: null,
    }

    componentDidMount = async () => {
        const activities = `${host}/api/groups/${this.props.groupId}/activities`;
        try {
            const res = await axios.get(activities)
            this.setState(prevState => ({
                ...prevState, activities: res.data
            }))
        } catch (err) {
            this.setState(prevState => ({
                ...prevState, error: err.response.data.message,
            }))
        }

    }

    getDateTime = (date) => {
        const dateStr = new Date(date).toLocaleDateString('en-GB', {  
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        });
        const today = new Date().toLocaleDateString('en-GB', {  
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        });
        if (dateStr !== today) {
            return dateStr
        } else {
            return new Date(date).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
            })
        }
    }

    render() {

        return (
            <>
                {this.state.error
                    ? <p>{this.state.error}</p>
                    : <ul>
                        {this.state.activities.map(activity =>
                            <li key={activity.id}>
                                {activity.displayName} {': '}
                                {activity.activity} {' '}
                                {this.getDateTime(activity.createdAt)}
                            </li>
                        )}
                    </ul>
                }
            </>
        )
    }

}


export default GroupChatroomActivities;
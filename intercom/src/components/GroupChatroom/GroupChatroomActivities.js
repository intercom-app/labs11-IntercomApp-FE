import React, { Component } from 'react';
import host from "../../host.js";
import axios from 'axios';

class GroupChatroomActivities extends Component {
    state = {
        activities: [],
    }

    interval = 0

    componentDidMount() {
        this.getActivities()
        // Get Activities when component mounts and every 5 seconds while on page
        this.interval = setInterval(() => this.getActivities(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getActivities = () => {
        axios
            .get(`${host}/api/groups/${this.props.groupId}/activities`)
            .then(res => this.setState({ activities: res.data }))
            .catch(() => this.setState({ activities: [] }))
    }

    getDateTime = (date) => {
        const today = new Date().toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const dateStr = new Date(date).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const todayYear = new Date().toLocaleDateString(undefined, { year: 'numeric' });
        const dateStrYear = new Date(date).toLocaleDateString(undefined, { year: 'numeric' });

        if (dateStr === today) { // if activity happened today, return time
            return new Date(date).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
            })
        } else if (todayYear === dateStrYear) { // if activity happened this year, return month and day
            return new Date(date).toLocaleDateString(undefined, {
                day: 'numeric',
                month: 'short',
            });
        } else { // if activity happened before this year, return month day and year
            return dateStr
        }
    }

    render() {
        return (
            <>
            <h2 className="page-header sidebar-title page-header-noborder page-header-table">
                Latest Activities
            </h2>
            
            <div>
                <table className="table">
                    <tbody className="act-chatroom">
                        {this.state.activities.map(activity =>
                            <tr key={activity.id}>
                                <td align="center">
                                    <img 
                                        className='avatar-img-act' 
                                        src={activity.avatar || require('../../images/avatar1.png')} 
                                        alt="user avatar"
                                    />
                                </td>
                                <td valign="middle" className="td-sm">
                                    <strong>{activity.displayName}{': '}</strong>
                                    {activity.activity}
                                </td>
                                <td align="right" valign="middle" nowrap="true" className="td-sm">
                                    <i className="fa fa-calendar-o"></i>
                                    {' '}
                                    {this.getDateTime(activity.createdAt)}
                                </td>
                            </tr>
                        )}
                        <tr><td></td><td></td><td></td></tr>
                    </tbody>
                </table>
            </div>
            </>
        )
    }
}

export default GroupChatroomActivities;
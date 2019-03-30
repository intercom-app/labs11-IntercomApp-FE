import React, { Component } from 'react';

class GroupChatroomActivities extends Component {

    getDateTime = (date) => {
        const dateStr = new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const today = new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
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

        const { activities } = this.props

        return (
            <>
                <h4>Latest Activities</h4>
                <ul>
                    {activities.map((activity, ind) =>
                        <li key={ind}>
                            {activity.displayName} {': '}
                            {activity.activity} {' '}
                            {this.getDateTime(activity.createdAt)}
                        </li>
                    )}
                </ul>
            </>
        )
    }

}


export default GroupChatroomActivities;
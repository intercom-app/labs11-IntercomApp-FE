import React, { Component } from 'react';
import { ListGroupItem, Card} from 'reactstrap';

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
            <div className="comments1">            
                <h4>Latest Activities</h4>
                <div className="media">
                    <a className="pull-left" href="#">
                        <img className="media-object" src="..styling/images/avatar1.png" alt=""/>
					</a>
                    {activities.map((activity, ind) =>
                    <div key={ind} className="media-body">
                            <p>
                                <i className="fa fa-calendar-o"></i> {this.getDateTime(activity.createdAt)}
		                        <span className="comments-padding"></span>
                                <strong>{activity.displayName} {': '}</strong>
                                {activity.activity} {' '}
		                    </p>

                    </div>
                    
                    )}
                </div>
            </div>
            
        )
    }

}


export default GroupChatroomActivities;
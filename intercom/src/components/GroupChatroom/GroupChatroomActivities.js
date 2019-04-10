import React, { Component } from 'react';
// import '../../../public/images/';
// const image = require('../../images/avatar1.png')

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
        const bulletless = { listStyleType: 'none' }
        const { activities } = this.props
        const avatar = this.props.avatar || require('../../images/avatar1.png');
        return (
            <div className="comments1">            
                <h4>Latest Activities</h4>
                <div className="media">
                    {/* <span className="pull-left" > */}
					{/* </span> */}
                    <div className="media-body row">
                        {activities.map((activity, ind) =>
                            <ul style={bulletless} key={ind} className='comment-wrap'>
                                {/* <img className="media-object avatar-img" src={require('../../images/avatar1.png')} alt=""/> */}
                                <img className="media-object avatar-img" src={avatar} alt="" />                                
                                <span><i className="fa fa-calendar-o"></i> {this.getDateTime(activity.createdAt)}</span>
                                <li key={ind} >
                                    <span className="comments-padding"></span>
                                    <strong>{activity.displayName}{': '}</strong>
                                    {activity.activity}
                                </li>
                            </ul>
                            
                                )}
                    </div>
                </div>
            </div>
            
        )
    }

}


export default GroupChatroomActivities;
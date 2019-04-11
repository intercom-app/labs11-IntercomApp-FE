import React, { Component } from 'react';
// import '../../../public/images/';
// const image = require('../../images/avatar1.png')

class GroupChatroomActivities extends Component {

    getDateTime = (date) => {
        const dateStr = new Date(date).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const today = new Date().toLocaleDateString(undefined, {
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
        const avatar = this.props.avatar || require('../../images/avatar1.png');
        return (
            <div className="comments1">            
                <h3>Latest Activities</h3>
                <div className="media">
                    <div className="media-body row">
                        {activities.map((activity, ind) =>
                            <div key={ind} className="col-xs-12 col-sm-12 col-md-12" style={{padding: "3px 0px 5px 15px"}}>
                                <div className="col-xs-1 col-sm-1 col-md-1" style={{padding: "0px"}}>
                                    <img className="avatar-img" src={avatar} alt="user avatar" />                                
                                </div>

                                <div className="col-xs-10 col-sm-9 col-md-9" style={{padding: "1.5% 0px 0px 0px"}}>
                                    <strong>{activity.displayName}{': '}</strong>
                                    {activity.activity}
                                </div>

                                <div className="col-xs-11 col-xs-offset-1 col-sm-2 col-sm-offset-0 col-md-2 col-md-offset-0" style={{padding: "1.5% 0px 0px 0px"}}>
                                    <i className="fa fa-calendar-o"></i> 
                                    {' '}
                                    {this.getDateTime(activity.createdAt)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
        )
    }

}


export default GroupChatroomActivities;
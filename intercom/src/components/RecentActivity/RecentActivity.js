import React from 'react';
import { Link } from "react-router-dom";

const RecentActivity = (props) => {
    let { recentActivities, getDateTime } = props
    return (
        <div className="blog-sidebar" style = {{ color: "#9d9d9d", fontSize: "13px", paddingTop: '17px'}}>
            <h4 className="sidebar-title"><i className="fa fa-align-left"></i> Recent Group Activity</h4>
            <hr></hr>

            { recentActivities.length === 0
            ? <p>No recent activity.</p>
            : <>
                {recentActivities.map( activity =>
                    <div className="media" key={activity.activityId ? activity.activityId : activity.id}>
                        <div className="media-body">
                            
                            <h4 className="media-heading">
                                <Link to={`/group/${activity.groupId}`}>{activity.groupName}</Link>
                                <span className="pull-right" style={{color:"#9d9d9d", fontSize: "13px", paddingTop: "3px"}}>
                                    <i className="fa fa-calendar-o"></i>
                                    {' '}{getDateTime(activity.createdAt)}
                                </span>
                            </h4>
                            <div className='rec-gr-act'> 
                                <img className="media-object avatar-img-rec" src={activity.avatar || require('../../images/avatar1.png')} alt="user avatar" />                                                              
                                <p><strong>{activity.displayName}: </strong>{activity.activity}</p>
                            </div>
                            
                        </div>
                    </div>
                )}
            </>}
        </div>
    );
}

export default RecentActivity;
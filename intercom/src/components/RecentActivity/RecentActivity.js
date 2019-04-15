import React from 'react';
import { Link } from "react-router-dom";

const RecentActivity = (props) => {
    return (
        <div className="blog-sidebar" style = {{ color: "#9d9d9d", fontSize: "13px", paddingTop: '17px'}}>
            <h4 className="sidebar-title"><i className="fa fa-align-left"></i> Recent Group Activity</h4>
            <hr></hr>

            {props.recentActivities.map( activity =>
                <div className="media" key={activity.id}>
                    <div className="media-body">
                        
                        <h4 className="media-heading">
                            <Link to={`/group/${activity.groupId}`} >{activity.groupName}</Link>
                            <span className="pull-right" style={props.style || {color:"#9d9d9d", fontSize: "13px", paddingTop: "3px"}}>
                                <i className="fa fa-calendar-o"></i>
                                { new Date().toLocaleDateString() === new Date(activity.createdAt).toLocaleDateString()
                                ? 
                                <>  {new Date(activity.createdAt).toLocaleTimeString(undefined, {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </>
                                : 
                                <>  {new Date(activity.createdAt).toLocaleDateString(undefined, {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </>
                                }
                            </span>
                        </h4>
                        <div className='rec-gr-act'> 
                            <img className="media-object avatar-img-rec" src={activity.avatar || require('../../images/avatar1.png')} alt="" />                                                              
                            <p><strong>{activity.displayName}: </strong>{activity.activity}</p>
                        </div>
                        
                    </div>
                </div>
            )}

        </div>
    );
}

export default RecentActivity;
import React from 'react';

const RecentActivity = (props) => {
    console.log(props.recentActivities)
    
    return (
        <div className="blog-sidebar">
            <h4 className="sidebar-title"><i className="fa fa-align-left"></i> Recent Activity</h4>
            <hr></hr>

            {props.recentActivities.map( activity =>
                <div className="media" key={activity.id}>
                    <div className="media-body">
                        <h4 className="media-heading">{activity.groupName}</h4>
                        {activity.displayName}
                        {' '}
                        {activity.activity}
                    </div>
                </div>
            )}

        </div>
    );
}

export default RecentActivity;
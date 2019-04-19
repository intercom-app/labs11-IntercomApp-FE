import React from 'react';

const GroupMembersList = (props) => {

    let { isOwner, members, userId, removeUser, getDateTime } = props
    return (
        <>
            <h2 className="page-header sidebar-title page-header-table">
                Group Members
            </h2>

            <table className="table">
                <thead>
                    <tr>
                        <th align="left">User</th>
                        <th className="tc-xs-hide"></th>
                        <th align="left" className="tc-lg-hide">Hover for Email</th>
                        <th align="left" className="tc-xs-hide">Email</th>
                        <th align="left" className="tc-sm-hide">Joined</th>
                        {isOwner ? <th align="center">Manage</th> : null}
                    </tr>
                </thead>
                <tbody className="act-chatroom">
                    {members.map( member =>
                        <tr key={member.id}>

                            {/* User's Avatar */}
                            <td valign="middle" className="td-img">
                                <img 
                                    className="avatar-img-act avatar-img-mem"
                                    src={member.avatar || require('../../images/avatar1.png')} 
                                    alt="user avatar" 
                                />
                            </td>

                            {/* User's Name = At extra small view will get email on hover */}
                            <td valign="middle" className="tc-xs-hide">
                                <strong>{member.displayName}</strong>
                            </td>
                            <td valign="middle" className="tc-lg-hide">
                                <span
                                    data-toggle="tooltip-email"
                                    data-placement="bottom"
                                    title={member.email}
                                    onMouseEnter={() => window.$('[data-toggle="tooltip-email"]').tooltip()}
                                >
                                    <strong>{member.displayName}</strong>
                                </span>
                            </td>

                            {/* User's Email - Hidden at Extra Small Views */}
                            <td valign="middle" className="tc-xs-hide">
                                {member.email}
                            </td>

                            {/* Date Joined - Hidden at Smaller Views */}
                            <td valign="middle" nowrap="true" className="tc-sm-hide">
                                <i className="fa fa-calendar-o"></i>
                                {' '}{getDateTime(member.memberCreatedAt)}
                            </td>

                            {/* Manage Members for Owners Only */}
                            {isOwner ? 
                            <td align="center" valign="middle">   
                                <button
                                    className="btn rounded btn-remove"
                                    type="button"
                                    disabled={member.id === userId}
                                    onClick={(e) => removeUser(e, member.id, member.displayName)}
                                >
                                    {member.id === userId ? 'Owner' : 'Remove' }
                                </button>  
                            </td>
                            : null
                            }

                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default GroupMembersList;
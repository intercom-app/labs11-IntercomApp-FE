import React from 'react';

const GroupInviteesList = (props) => {

    let { isOwner, invitees, removeInvitee, getDateTime } = props
    return (
        <>
            <h2 className="page-header sidebar-title page-header-table">
                Group Invitees
            </h2>

            { invitees.length === 0 ? <p className="no-groups">No group invitees at this time.</p> : <>

            <table className="table">
                <thead>
                    <tr>
                    <th align="left">User</th>
                        <th className="tc-xs-hide"></th>
                        <th align="left" className="tc-lg-hide">Hover for Email</th>
                        <th align="left" className="tc-xs-hide">Email</th>
                        <th align="left" className="tc-sm-hide">Invited</th>
                        {isOwner ? <th align="center">Manage</th> : null}
                    </tr>
                </thead>
                <tbody className="act-chatroom">
                    {invitees.map( invitee =>
                        <tr key={invitee.id}>

                            {/* User's Avatar */}
                            <td valign="middle" className="td-img">
                                <img 
                                    className="avatar-img-act avatar-img-mem"
                                    src={invitee.avatar || require('../../images/avatar1.png')} 
                                    alt="user avatar" 
                                />
                            </td>

                            {/* User's Name = At extra small view will get email on hover */}
                            <td valign="middle" className="tc-xs-hide">
                                <strong>{invitee.displayName}</strong>
                            </td>
                            <td valign="middle" className="tc-lg-hide">
                                <span
                                    data-toggle="tooltip-email"
                                    data-placement="bottom"
                                    title={invitee.email}
                                    onMouseEnter={() => window.$('[data-toggle="tooltip-email"]').tooltip()}
                                >
                                    <strong>{invitee.displayName}</strong>
                                </span>
                            </td>

                            {/* User's Email - Hidden at Extra Small Views */}
                            <td valign="middle" className="tc-xs-hide">
                                {invitee.email}
                            </td>

                            {/* Date Invited - Hidden at Smaller Views */}
                            <td valign="middle" nowrap="true" className="tc-sm-hide">
                                <i className="fa fa-calendar-o"></i>
                                {' '}{getDateTime(invitee.inviteeCreatedAt)}
                            </td>

                            {/* Manage Invitees for Owners Only */}
                            {isOwner ? 
                            <td align="center" valign="middle">   
                                <button
                                    className="btn rounded btn-remove"
                                    type="button"
                                    onClick={(e) => removeInvitee(e, invitee.id, invitee.displayName)}
                                >
                                    Remove
                                </button>  
                            </td>
                            : null
                            }

                        </tr>
                    )}
                </tbody>
            </table>
            </>}
        </>
    );
}

export default GroupInviteesList;
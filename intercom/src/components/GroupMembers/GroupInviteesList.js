import React from 'react';

const GroupInviteesList = (props) => {

    let { isOwner, invitees, removeInvitee, getDateTime } = props
    return (
        <>
            <h1 className="page-header sidebar-title">
                Group Invitees
            </h1>


            <div className="row blogu" style={{ marginRight: "0px", marginLeft: "0px" }}>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">User</th>
                            <th scope="col"></th>
                            <th scope="col">Email</th>
                            <th scope="col">Invited On</th>
                            {isOwner ? <th scope="col">Manage</th> : null}
                        </tr>
                    </thead>
                    {invitees.map( invitee =>
                        <tbody key={invitee.id}>
                            <tr>
                                <td style={{ width: '15%' }}>
                                    <img className='avatar-img-act' style={{ width: '45%', borderRadius: '50%' }} src={invitee.avatar || require('../../images/avatar1.png')} alt="user avatar" />
                                </td>
                                <td style={{ width: '15%', paddingTop: '2.5%' }}>
                                    {invitee.displayName}
                                </td>
                                <td style={{ width: '22%', paddingTop: '2.5%' }}>
                                    {invitee.email}
                                </td>
                                <td style={{ width: '20%', paddingTop: '2.5%' }}><i className="fa fa-calendar-o"></i>
                                    {' '}{getDateTime(invitee.inviteeCreatedAt)}
                                </td>
                                {isOwner
                                    ? <>
                                        <td style={{ width: '20%', paddingTop: '2.5%' }}>
                                            <button
                                                className="btn btn-delete rounded"
                                                type="button"
                                                onClick={(e) => removeInvitee(e, invitee.id, invitee.displayName)}
                                            >
                                                Cancel Invite
                                            </button>
                                        </td>
                                    </>
                                    : null
                                }

                            </tr>
                        </tbody>
                    )}
                </table>

            </div>
            <hr></hr>

            {/* {invitees.map(invitee => (
                <div key={invitee.userId}>
                    <div className="row blogu" >
                        <div className="col-sm-8 col-md-8">
                            <h4 className="blog-title">
                                {invitee.displayName}
                            </h4>
                        </div>
                        <>
                            {isOwner
                                ? <>
                                    <button
                                        className="btn btn-primary rounded hvr-bounce-to-bottom pull-right"
                                        type="button"
                                        onClick={(e) => removeInvitee(e, invitee.userId, invitee.displayName)}
                                    >
                                        Rescind Invite
                                        </button>
                                </>
                                : null
                            }
                        </>
                    </div>
                    <hr></hr>
                </div>

            ))} */}

        </>

    );
}

export default GroupInviteesList;
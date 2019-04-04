import React from 'react';
// import { Row, Table, Button } from 'reactstrap';

const GroupInviteesList = (props) => {
    let { isOwner, invitees, removeInvitee } = props
    return (
        <>
            <h1 className="page-header sidebar-title">
                Group Invitees
            </h1>

            {invitees.map(invitee => (
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
                                        className="btn btn-primary btn-noborder-radius hvr-bounce-to-bottom pull-right"
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

            ))}

        </>

    );
}

export default GroupInviteesList;
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
                <div key={invitee.groupId}>
                    <div className="row blogu" >
                        <div className="col-sm-8 col-md-8">
                            <h3 className="blog-title">
                                {invitee.displayName}
                            </h3>
                            <>
                                {isOwner
                                    ? <>
                                        <button
                                            className="btn btn-primary btn-noborder-radius hvr-bounce-to-bottom"
                                            type="button"
                                            onClick={(e) => removeInvitee(e, invitee.userId, invitee.displayName)}
                                        >
                                            Rescind Invitee
                                        </button>
                                    </>
                                    : null
                                }
                            </>
                        </div>
                    </div>
                    <hr></hr>
                </div>

            ))}

        </>

    );
}

export default GroupInviteesList;
import React from 'react';
// import { Row, Table, Button } from 'reactstrap';

const GroupMembersList = (props) => {
    let { isOwner, members, userId, removeUser } = props
    return (
        <>
            <h1 className="page-header sidebar-title">
                Group Members
            </h1>

            {members.map(member => (
                <div key={member.userId}>
                    <div className="row blogu" >
                        <div className="col-sm-8 col-md-8">
                            <h4 className="blog-title">
                                {member.displayName}
                            </h4>
                        </div>
                        <>
                            {isOwner
                                ? <>
                                    {member.userId === userId
                                        ?   <button 
                                                className="btn btn-primary btn-noborder-radius pull-right" 
                                                type="button" 
                                                disabled
                                            >
                                                Owner
                                            </button>
                                        :   <button 
                                                className="btn btn-primary btn-noborder-radius hvr-bounce-to-bottom pull-right" 
                                                type="button" 
                                                onClick={(e) => removeUser(e, member.userId, member.displayName)}
                                            >
                                                Remove Member
                                            </button>
                                    }
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

export default GroupMembersList;
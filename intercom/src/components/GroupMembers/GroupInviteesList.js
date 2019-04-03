import React from 'react';
import { Row, Table, Button } from 'reactstrap';

const GroupInviteesList = (props) => {
    let { isOwner, invitees, removeInvitee } = props
    return (
        <Row>
            <h3>Group Invitees</h3>
            <Table>
                <thead>
                    <tr>
                        <th>Group Id</th>
                        <th>User Id</th>
                        <th>Invitee Name</th>
                        {isOwner ? <th>Manage Invitee</th> : null}
                    </tr>
                </thead>
                {invitees.map(invitee => (
                    <tbody key={invitee.userId}>
                        <tr>
                            <td>{invitee.groupId}</td>
                            <td>{invitee.userId}</td>
                            <td>{invitee.displayName}</td>
                            {isOwner
                                ? <td>
                                    <Button
                                        color='danger'
                                        onClick={(e) => removeInvitee(e, invitee.userId, invitee.displayName)}
                                    >
                                        Remove Invitee
                                </Button>
                                </td>
                                : null
                            }
                        </tr>
                    </tbody>

                ))}
            </Table>
        </Row>

    );
}

export default GroupInviteesList;
import React from 'react';
import { Row, Table, Button } from 'reactstrap';

const GroupMembersList = (props) => {
    let { isOwner, members, userId, removeUser } = props
    return (
        <Row>
            <h3>Group Members</h3>
            <Table>
                <thead>
                    <tr>
                        <th>Group Id</th>
                        <th>User Id</th>
                        <th>Member Name</th>
                        {isOwner ? <th>Manage Member</th> : null}
                    </tr>
                </thead>
                {members.map(member => (
                    <tbody key={member.userId}>
                        <tr>
                            <td>{member.groupId}</td>
                            <td>{member.userId}</td>
                            <td>{member.displayName}</td>
                            {isOwner
                                ? <td>
                                    {member.userId === userId
                                        ? <Button color="secondary" disabled>
                                            Owner
                                    </Button>
                                        : <Button
                                            color='danger'
                                            onClick={(e) => removeUser(e, member.userId, member.displayName)}
                                        >
                                            Remove Member
                                    </Button>
                                    }
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

export default GroupMembersList;
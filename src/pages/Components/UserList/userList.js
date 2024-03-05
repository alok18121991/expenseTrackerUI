import {  Col, Form } from "react-bootstrap";

function UserList(props) {

    return <Form>
        {props.selectedUsers && props.selectedUsers.map((user) => (
            <Col xs={6} className='user-list' key={user.userId}>
            <div key={user.userId}>
                <Form.Check
                    type='checkbox'
                    id={user.userId}
                    label={user.userName}
                    checked={user.selected}
                    onChange={props.onChange} />
            </div>
            </Col>
            
        ))}
    </Form>;
}

export default UserList;
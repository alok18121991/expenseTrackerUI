import {  Col, Form } from "react-bootstrap";

function UserList(props) {

    return <Form>
        {props.selectedUsers && props.selectedUsers.map((user) => (
            <Col xs={6} className='user-list' key={user.id}>
            <div key={user.id}>
                <Form.Check
                    type='checkbox'
                    id={user.id}
                    label={user.firstName}
                    checked={user.selected}
                    onChange={props.onChange} />
            </div>
            </Col>
            
        ))}
    </Form>;
}

export default UserList;
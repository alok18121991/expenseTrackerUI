import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../AddGroup/addGroup.css"
import { NavLink } from "react-router-dom";

function AddOwner() {

    // const [activeUser,setUserData] = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: '',
        ownerId:''
    });


    const handleChange = event => {

        const value = event.target.value;
        const name = event.target.name;
        console.log(formData);
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })

    };

    // const addOwner = event => {
    //     event.preventDefault();
    //     callCreateGroupApi({
    //         'groupId': activeGroup.id,
    //         "owners":[formData.ownerId]
    //     }).then(response => {
    //         if (response.status === HttpStatusCode.Ok) {
    //             navigate(-1);
                
    //         }
    //     });
    // }

   

    return(
        <div>
            <Row>
                <Col xs={6}>
                <h2>
                    Add Member
                </h2>
                </Col>
                <Col xs={6} >
                    <NavLink to='/' className="nav-link create-group">
                        Go back
                    </NavLink>
                </Col>
            </Row>
            <Row>
                {/* <Form onSubmit={(i) => addOwner(i)} > */}
                <Form>
                    <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.email">
                            <Form.Control type="text" placeholder="Enter members email" name="email" onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row className="create-group-row">
                    <Button variant="primary" type="submit" className="create-group-btn">
                        Add
                    </Button>
                </Row>
                </Form>
            </Row>
        </div>
        
        
    )
}

export default AddOwner;
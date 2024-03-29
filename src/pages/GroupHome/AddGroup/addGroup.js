import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { UserContext } from "../../../Components/Context/context";
import { callCreateGroupApi } from "../../../API/createGroupApi";
import { HttpStatusCode } from "axios";
import "./addGroup.css"
import { NavLink, useNavigate } from "react-router-dom";
import { callGetUserDetailsApi } from "../../../API/getUserDetailsApi";

function AddGroup() {

    const [activeUser,setUserData] = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        groupName: '',
    });


    const handleChange = event => {

        const value = event.target.value;
        const name = event.target.name;
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })

    };

    const createGroup = event => {
        event.preventDefault();
        callCreateGroupApi({
            "name": formData.groupName,
            "owners":[activeUser.id]
        }).then(response => {
            if (response.status === HttpStatusCode.Created) {
                callGetUserDetailsApi(activeUser.id)
                .then(response => {
                    if (response.status === HttpStatusCode.Ok) {
                        setUserData(response.data)
                        navigate(-1);
                    } else {
                        console.log("error occured while fetching userDetails", response.error)
                    }
                })
                .catch(error => {
                    console.log(error);
                });    
                
            }
        });
    }

   

    return(
        <div>
            <Row>
                <Col xs={6}>
                <h2>
                    Create Group
                </h2>
                </Col>
                <Col xs={6} >
                    <NavLink to='/group' className="nav-link create-group">
                        Go back
                    </NavLink>
                </Col>
            </Row>
            <Row>
                <Form onSubmit={(i) => createGroup(i)} >
                    <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.groupName">
                            <Form.Control type="text" placeholder="Enter Group name" name="groupName" onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row className="create-group-row">
                    <Button variant="primary" type="submit" className="create-group-btn">
                        Create
                    </Button>
                </Row>
                </Form>
            </Row>
        </div>
        
        
    )
}

export default AddGroup;
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../AddGroup/addGroup.css"
import { NavLink } from "react-router-dom";
import { ActiveGroupContext, UserContext } from "../../../Components/Context/context";
import { callGetRelatedUsersApi } from "../../../API/getRelatedUserApi";
import { HttpStatusCode } from "axios";
import "./addOwners.css";
import { callAddOwnerToGroupApi } from "../../../API/addOwnerToGroupApi";
import { callGetGroupDetailsApi } from "../../../API/getGroupDetailsApi";
import { callInviteAndAddOwnerToGroupApi } from "../../../API/inviteAndAddOwnerToGroupApi";

function AddOwner() {

    const [activeUser,] = useContext(UserContext);
    const [activeGroup,setActiveGroup ] = useContext(ActiveGroupContext);

    const [formData, setFormData] = useState({
        email: '',
        ownerId:'',
        name: ''
    });

    const [memberList, setMemberList] = useState();

    useEffect(()=>{
        callGetRelatedUsersApi(activeUser.id).then(response => {
            if(response.status === HttpStatusCode.Ok){
                let members = response.data.owners
                if(members && activeGroup && activeGroup.owners){
                 members = members.filter(element =>  !activeGroup.owners.find(el => el.id === element.id));
                }
                setMemberList(members);
            }
            else{
                console.log("error occured while fetching related members");
            }
        })
    }, [activeUser, activeGroup, activeGroup.owners])




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

    const addMember = memberId => {
        callAddOwnerToGroupApi({
            'groupId': activeGroup.id,
            "owners":[memberId]
        }).then(response => {
            if(response.status === HttpStatusCode.Ok){
                let filteredMemberList = memberList.filter(memb => memb.id !== memberId);
                setMemberList(filteredMemberList);
            }
            else{
                console.error("failed to add member to group", response.error)
            }
        })
    }

    const callGetGroupDetails = (ids) => {
        callGetGroupDetailsApi(ids).then(response => {
            if(response.status === HttpStatusCode.Ok){
                setActiveGroup(response.data[0]);
            }else{
                console.log("error occured while fetching group details", response.error);
            }

        }).catch(error => {
            console.log("error occured while fetching group details", error)
        });
    }

    const inviteOwner = event => {
        event.preventDefault();
        let body = {
            userid: activeUser.id,
            userName: `${activeUser.firstName} ${activeUser.lastName}`,
            inviteeName: formData.name,
            inviteeEmail: formData.email,
            groupId: activeGroup.id

        }
        callInviteAndAddOwnerToGroupApi(body).then(response => {
            if(response.status === HttpStatusCode.Ok){
                console.log("invite sent to : ", formData.email)
            }
            else{
                console.error("failed to invite : ", formData.email)
            }
    })
    }
   

    return(
        <div>
            <Row>
                <Col xs={6}>
                <h2>
                    Add Member
                </h2>
                </Col>
                <Col xs={6} >
                    <NavLink to='/' className="nav-link create-group" onClick={() => callGetGroupDetails(activeGroup.id)}>
                        Go back
                    </NavLink>
                </Col>
            </Row>
            <Row>
                <Form onSubmit={(i) => inviteOwner(i)} >
                {/* <Form> */}
                    <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.name">
                            <Form.Control type="text" placeholder="Enter members name" name="name" onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.email">
                            <Form.Control type="text" placeholder="Enter members gmail id only" name="email" onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row className="create-group-row">
                    <Button variant="primary" type="submit" className="create-group-btn">
                        Add
                    </Button>
                </Row>
                </Form>
            </Row>
            { memberList ?
            <Row>
                <h3>Select Members</h3>
                {memberList.map((member, ) => (
                    <Row>
                        <div key={member.id} className="user-member" onClick={() => addMember(member.id)} >
                            {member.name}
                        </div>
                    </Row>
                ))}
            </Row>
            : ""
            }
        </div>
        
        
    )
}

export default AddOwner;
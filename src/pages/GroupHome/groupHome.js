import { HttpStatusCode } from "axios";
import React, { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import "./groupHome.css";
import { ActiveGroupContext, UserContext } from "../../Components/Context/context";
import { callGetGroupDetailsApi } from "../../API/getGroupDetailsApi";
import { Col, Row } from "react-bootstrap";

function GroupHome() {

    const [activeUser,] = useContext(UserContext);
    const [, setActiveGroup] = useContext(ActiveGroupContext);
    const [groups, setGroups] = useState();

    useEffect(() => {
        callGetGroupDetails(activeUser.groups.toString())
    }, [activeUser, activeUser.groups])

    const callGetGroupDetails = (ids) => {
        callGetGroupDetailsApi(ids).then(response => {
            if(response.status === HttpStatusCode.Ok){
                setGroups(response.data);
            }else{
                console.log("error occured while fetching group details", response.error);
            }

        }).catch(error => {
            console.log("error occured while fetching group details", error)
        });
    }

    return (
        <div>
            <Row>
                <Col xs={6}><h2>Groups</h2></Col>
                <Col xs={6}>
                    <NavLink to='/group/add' className="nav-link create-group">
                        Create Group
                    </NavLink>
                </Col>
            </Row>
            {
                groups && groups.map((group, index) => {
                    return (
                        <div className="card-body card-body-main group-card" key={group.id}>
                            <h3><NavLink key={group.id} className="nav-link" to='/'onClick={()=>setActiveGroup(group)}>{group.name}</NavLink></h3>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GroupHome
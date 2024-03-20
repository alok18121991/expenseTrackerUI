import { HttpStatusCode } from "axios";
import React, { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import "./groupHome.css";
import { ActiveGroupContext, UserContext } from "../Components/Context/context";
import { callGetGroupDetailsApi } from "../API/getGroupDetailsApi";

function GroupHome() {

    const activeUser = useContext(UserContext);
    const [, setActiveGroup] = useContext(ActiveGroupContext);
    const [groups, setGroups] = useState();

    useEffect(() => {
        callGetGroupDetails(activeUser.groups.toString())
    }, [activeUser.groups])

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
            <h2>Groups</h2>
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
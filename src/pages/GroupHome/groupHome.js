import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import "./groupHome.css";
import { ActiveGroupContext, UserContext } from "../Components/Context/context";

function GroupHome() {

    const activeUser = useContext(UserContext);
    const [, setActiveGroup] = useContext(ActiveGroupContext);
    const [groups, setGroups] = useState();

    useEffect(() => {
        callGetGroupDetails(activeUser.groups.toString())
    }, [activeUser.groups])

    const callGetGroupDetails = (ids) => {
        axios.get("http://192.168.1.8:8080/groups", {
            params: {
                group_ids: ids
            }
        }).then(response => {
            setGroups(response.data);

        }).catch(error => {
            console.log("errrr..33..", error)
        });
    }

    const setStateToLink = (group) => {
        return {
            group: {
                id: group.id,
                name: group.name,
                owners: group.owners
            }

        }
    }

    return (
        <div>
            <h2>Groups</h2>
            {
                groups && groups.map((group, index) => {
                    return (
                        
                        <div className="card-body card-body-main group-card" key={group.id}>
                            {/* {setActiveGroup(group)}
                           {console.log("activeGroip......", activeGroup)} */}
                            {/* <h3><NavLink key={group.id} className="nav-link" to='/group/history' */}
                            <h3><NavLink key={group.id} className="nav-link" to='/'
                                state={setStateToLink(group)} onClick={()=>setActiveGroup(group)}>{group.name}</NavLink></h3>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default GroupHome
import axios from "axios";
import React from "react"
import { NavLink } from "react-router-dom";
import "./groupHome.css";

class GroupHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
        }
    };

    componentDidMount() {
        this.setState(prevState => ({
            ...prevState,
            userData: this.props.userData,
        }), () => {
            this.callGetGroupDetails(this.state.userData.groups.toString())
        })

    };

    callGetGroupDetails(ids) {
        axios.get("http://192.168.1.5:8080/groups", {

            params: {
                group_ids: ids
            }
        }).then(response => {
            this.setState(prevState => ({
                ...prevState,
                grouplist: response.data
            }))
        }).catch(error => {
            console.log("errrr..33..", error)
        });
    }



    render() {

        return (

            <div>
                <h2>Groups</h2>
                {
                    this.state.grouplist && this.state.userData && this.state.grouplist.map((group, index) => {
                        return (
                            <div className="card-body card-body-main group-card" key={group.id}>
                                    <h3><NavLink key={group.id} className="nav-link" to='/group/history'
                                        state={{
                                            user: {
                                                id: this.state.userData.id,
                                                fistName: this.state.userData.firstName,
                                                lastName: this.state.userData.lastName
                                            },
                                            group: {
                                                id: group.id,
                                                name: group.name,
                                                owners: group.owners
                                            }

                                        }}>{group.name}</NavLink></h3>
                            </div>

                        )
                    })
                }
            </div>
        )
    }
}

export default GroupHome
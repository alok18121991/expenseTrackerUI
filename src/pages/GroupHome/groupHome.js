import axios from "axios";
import React from "react"
import { Link } from "react-router-dom";
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
        axios.get("http://192.168.1.4:8080/groups", {

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
                            <div className="card-body card-body-main group-card">
                                    <h3><Link key={group.id} className="nav-link" to='/'
                                        state={{
                                            user: {
                                                id: this.state.userData.id,
                                                fistName: this.state.userData.firstName,
                                                lastName: this.state.userData.lastName
                                            },
                                            group: {
                                                name: group.name,
                                                owners: group.owners
                                            }

                                        }}>{group.name}</Link></h3>
                            </div>

                        )
                    })
                }
            </div>
        )
    }
}

export default GroupHome
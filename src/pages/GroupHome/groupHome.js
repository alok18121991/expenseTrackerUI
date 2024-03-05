import axios from "axios";
import React from "react"
import { Link } from "react-router-dom";

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
            user:{
                ...prevState.user,
                userName: "Shankar"
            }
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
                <h2>Group Home</h2>
                {this.state.grouplist && this.state.grouplist.map((group, index) => {
                    return (
                        <h3 key={group.name} >{group.name}</h3>
                    )
                })}
                {this.state.grouplist && this.state.userData && this.state.grouplist.map((group, index) => {
                    return (
 
                           <Link key={group.id} className="nav-link" to='/history'  state={this.state.userData }>{group.name}</Link>
                    )
                })}


            </div>
        )
    }
}

export default GroupHome
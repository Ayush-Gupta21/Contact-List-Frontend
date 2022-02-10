//MADE BY:- Ayush Gupta - 1910990212 - st2

import React, {useState, useEffect} from "react"
import {getAllContacts, deleteContact} from "./helper/contactapis"
import {Link} from "react-router-dom"
import "./contacts.css"

const Contact = () => {
    const [contacts, setContacts] = useState([])
    const [namesearch, setNamesearch] = useState("")

    const preloadcontacts = () => {
        getAllContacts().then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                setContacts(data)
            }
        })
    }

    useEffect(() => {
        preloadcontacts()
    }, [])

    const handleChange = name => event => {
        const value = event.target.value;
        setNamesearch(value);
    }

    const deleteOnSubmit = (contactId) => {
        deleteContact(contactId)
        .then(data => {
            if(data.error){
                console.log("error")
            } else{
                setTimeout(preloadcontacts, 100)
            }
        })
    }

    return(
        <div className="master-container">
            <div className="heading-container">
                <div className="heading"><u>CONTACT LIST</u></div>
                <div className="head-btn">
                    <Link to="/createcontact">
                        <button className="create-btn">Create Contact</button>
                    </Link>
                </div>
            </div>

            <input 
            type="text" 
            className="search-bar" 
            onChange={handleChange("namesearch")}
            name="namesearch"
            value={namesearch}
            placeholder="Search"
            />
            
            <div id = "contactsContainer">
                <div className="grid-container">
                    <div className="grid-item" ><b>Name</b></div>
                    <div className="grid-item"><b>Mobile</b></div>
                    <div className="grid-item"><b>Email</b></div>
                </div>
                {contacts.map((contact, index) => {
                    let text = contact.name;
                    let x = namesearch.toLowerCase();
                    let y = text.toLowerCase();
                    if(namesearch === "" || y.search(x) !== -1){
                        return(
                            <div className="grid-container" key={index}>
                                <div className="grid-item">{contact.name}</div>
                                <div className="grid-item">{contact.mobile}</div>
                                <div className="grid-item">{contact.email}
                                <div className="del-btn-div">
                                    <Link to={`/updatecontact/${contact._id}`}>
                                        <button className="update-btn">Update</button>
                                    </Link>
                                    <button className="del-btn" onClick={() => {deleteOnSubmit(contact._id)}}>Delete</button>
                                </div>
                                </div>
                            </div>
                        )
                    }else{
                        return (
                            <div>
                                
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    )
}

export default Contact;
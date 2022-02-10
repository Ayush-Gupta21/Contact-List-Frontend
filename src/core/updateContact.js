//MADE BY:- Ayush Gupta - 1910990212 - st2

import React, {useState, useEffect} from "react"
import {updateContact, getContact} from "../core/helper/contactapis"
import { useParams, useNavigate } from "react-router-dom"
import "./createContact.css"

const Updatecontact = () => {
    const {contactId} = useParams();
    const [values, setValues] = useState({
        name: "",
        mobile: "",
        email: "",
        loading: false,
        error: "",
        getaRedirect: false,
        formData: ""
    })
    const navigate = useNavigate();

    const {name, mobile, email, error, getaRedirect, formData} = values

    const preloadContact = contactId => {
        getContact(contactId).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else{
                setValues({
                    ...values,
                    name: data.name,
                    mobile: data.mobile,
                    email: data.email,
                    formData: new FormData()   
                })   
            }
        })
    }

    useEffect(() => {
        preloadContact(contactId);
    }, [])

    const handleChange = name => event => {
        const value = event.target.value;
        formData.set(name, value);
        setValues({...values, error:false, [name]: value}) 
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: "", loading: true})
        if(name === "") setValues({...values, error: "Enter Name!"});
        else if(email === "") setValues({...values, error: "Enter email!"});
        else if(!validateEmail(email)) setValues({...values, error: "Enter correct email!!"})
        else if(!(mobile >= 1000000000 && mobile <= 9999999999)) setValues({...values, error: "Enter valid mobile number"});
        else{
            updateContact(contactId, formData).then(data => {
                if(data.error){
                    setValues({...values, error: data.error})
                } else{
                    setValues({
                        ...values,
                        name: "",
                        mobile: "",
                        email: "",
                        loading: false,
                        getaRedirect: true
                    })
                }
            })
        }
    }



    const performRedirect = () => {
        if(getaRedirect){
            setTimeout(() => {
                 window.location.href = `/`
            }, 0)
        }
    }

    const errorMessage = () => (
        <div style={{display: error ? "" : "none", color: "red"}}>
            <h4>{error}</h4>
        </div>
    )

    const createContactForm = () => {
        return(
            <div className="create-contact-container">
                {errorMessage()}
                <div>
                    <form id="createContactForm">
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control"
                            onChange={handleChange("name")}
                            name="name"
                            placeholder="Enter name"
                            value={name}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <input 
                            type="email" 
                            className="form-control"
                            onChange={handleChange("email")}
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <input 
                            type="number" 
                            className="form-control"
                            onChange={handleChange("mobile")}
                            name="mobile"
                            placeholder="Enter mobile no."
                            value={mobile}
                            required
                            />
                        </div>
                        <button onClick={onSubmit} type="submit" className="form-btn">Update</button>  
                    </form>
                </div>
            </div>
        )
    }

    return(
        <div>
            <div className="new-contact-container">
                <div className="new-contact-heading"><b><u>Update Contact</u></b></div>
                <div className="home-btn">
                    <button onClick={() => {
                        navigate(-1);
                    }}>Home</button>
                </div>
            </div>
            {createContactForm()}
            {performRedirect()}
        </div>
    )
}

export default Updatecontact;
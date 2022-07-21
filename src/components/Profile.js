import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import styled from 'styled-components'
import userProfile from '../assets/userProfile.png'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { updateUsersRoute, getUsersRoute, changePasswordRoute } from '../utils/APIRoutes'
import { FaWindows } from 'react-icons/fa'
import {ToastContainer, toast} from 'react-toastify'

function Profile() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [item, updateItem]=useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetch, setIsfetch]=useState(false);
    const [show, setShow] = useState(false);
    const [showPass, setShowPass]=useState(false);
    const [passwords, setPasswords]=useState(undefined);
    const toastOptions={
        position:"bottom-right",
        autoclose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }
    useEffect(() => {
        const func = async () => {
            if (!localStorage.getItem("inventory-app-user")) {
                navigate('/login')
            }
            else {
                const user = localStorage.getItem('inventory-app-user');
                if (user) {
                    setCurrentUser(await JSON.parse(localStorage.getItem('inventory-app-user')));
                    setIsLoading(false);
                }
            }

        }
        func();
    }, []);
    useEffect(()=>{
        const func=async()=>{
            if(currentUser){
                const data=await axios.post(getUsersRoute, {id:currentUser._id});
                updateItem(data.data);
                setIsfetch(true);
            }
            
            // console.log(data.data);
        }
        func();
    }, [currentUser]);
    const handleClick = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    const handleClosePass = () => {
        setShowPass(false);
    }
    const handleChange=(e)=>{
        const { name, value } = e.target;
        updateItem(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
        // console.log(item);

    }
    const changePassword=()=>{
        setShowPass(true);
    }
    const handleSubmit=async ()=>{
        const data={...item, id:currentUser._id};
        await axios.post(updateUsersRoute, data);
        window.location.reload();
    }
    const handleChangePass=(e)=>{
        const { name, value } = e.target;
        setPasswords(prev=>{
            return{
                ...prev,
                [name]:value
            }
        })
        console.log(passwords);
    }
    const handleSubmitPass=async ()=>{
        const pass={...passwords, id:currentUser._id};
        const data= axios.post(changePasswordRoute, pass)
        if(data.status===false){
            toast.error(data.data.msg, toastOptions);
        }
        if(data.data.status===true){
            toast.error(data.data.msg, toastOptions);
        }
        
    }

    return (
        <>
            <Navbar />
            <Container>
                {!isLoading &&
                    <div className="card">
                        <img src={userProfile} />
                        <h1>{currentUser.username}</h1>
                        <p className="user-email">{isFetch&&item.email}</p>
                        <p>Name: {isFetch?item.name:'not set'}</p>
                        <p>Age: {isFetch?item.age:'not set'}</p>
                        <p><button onClick={handleClick}>Edit</button></p>
                        <p><button onClick={changePassword}><span className='changePass'>Change Password</span></button></p>

                    </div>
                }
                {
                    show &&isFetch&&
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                        <div className="wrapper wrapper--w790">
                            <div className="card card-5">
                                <div className="card-heading">
                                    <h2 className="title">Update Profile</h2>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-row">
                                            <div className="name">Name</div>
                                            <div className="value">
                                                <div className="input-group">
                                                    <input className="input--style-5" type="text" name="name" value={item.name} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="name">Email</div>
                                            <div className="value">
                                                <div className="input-group">
                                                    <input className="input--style-5" type="text" value={item.email} name="email"  onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="name">Age</div>
                                            <div className="value">
                                                <div className="input-group">
                                                    <input className="input--style-5" type="text" value={item.age} name="age"  onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4"></div>
                                            <div className="col-4 add-btn">
                                                <button className="btn btn--radius-2 btn--red" type="submit" onClick={handleSubmit}><h2>Update</h2></button>
                                            </div>
                                            <div className="col-4"></div>


                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                }
                {
                    showPass&&
                    <Modal show={showPass} onHide={handleClosePass}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                        <div className="wrapper wrapper--w790">
                            <div className="card card-5">
                                <div className="card-heading">
                                    <h2 className="title">Update Password</h2>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-row">
                                            <div className="name">Current</div>
                                            <div className="value">
                                                <div className="input-group">
                                                    <input className="input--style-5" type="password" name="currPassword" onChange={handleChangePass} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="name">New</div>
                                            <div className="value">
                                                <div className="input-group">
                                                    <input className="input--style-5" type="password" name="newPassword" onChange={handleChangePass} />
                                                </div>
                                            </div>
                                        </div>
                                        

                                        <div className="row">
                                            <div className="col-4"></div>
                                            <div className="col-4 add-btn">
                                                <button className="btn btn--radius-2 btn--red" type="submit" onClick={handleSubmitPass}><h2>Update</h2></button>
                                            </div>
                                            <div className="col-4"></div>


                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClosePass}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                }

            </Container>
            <ToastContainer />
        </>
    )
}
const Container = styled.div`
    .card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  margin-top:60px;
  text-align: center;
}

.user-email {
  color: grey;
  font-size: 18px;
}
.changePass{
    font-size:12px;
}
button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 40%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
p{
    font-size:1.5rem;
}
`
export default Profile
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { addProductRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
function AddProduct(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const func = async () => {
            if (!localStorage.getItem("inventory-app-user")) {
                navigate('/login')
            }
            else {
                const user = localStorage.getItem('inventory-app-user');
                if (user) {
                    setCurrentUser(await JSON.parse(localStorage.getItem('inventory-app-user')))
                    setIsLoading(false);
                }
            }

        }
        func();
    }, []);

    const [item, updateItem] = useState({
        title: "",
        price: "",
        category: "",
        description: "",
        imageUrl: ""
    });
    function handleChange(e) {
        const { name, value } = e.target;
        updateItem(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(currentUser._id);
        const data = { ...item, userId: currentUser._id }
        await axios.post(addProductRoute, data);

        navigate('/');
        // updateItem(reset);
    }
    return (
        <>
            <Navbar />
            {
                !isLoading &&
                <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
                    <div className="wrapper wrapper--w790">
                        <div className="card card-5">
                            <div className="card-heading">
                                <h2 className="title">Add Product</h2>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-row">
                                        <div className="name">Title</div>
                                        <div className="value">
                                            <div className="input-group">
                                                <input className="input--style-5" type="text" name="title" value={item.title} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="name">Price</div>
                                        <div className="value">
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="input-group">
                                                        <input className="input--style-5" type="text" name="price" value={item.price} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="name">ImageUrl</div>
                                        <div className="value">
                                            <div className="input-group">
                                                <input className="input--style-5" type="text" name="imageUrl" value={item.imageUrl} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="name">Category</div>
                                        <div className="value">
                                            <div className="input-group">
                                                <input className="input--style-5" type="text" name="category" value={item.category} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="name">Description</div>
                                        <div className="value">
                                            <div className="input-group">
                                                <input className="input--style-5" type="text" name="description" value={item.description} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-5"></div>
                                        <div className="col-2 add-btn">
                                            <button className="btn btn--radius-2 btn--red" type="submit" onClick={handleSubmit}><h2>Add</h2></button>
                                        </div>
                                        <div className="col-5"></div>


                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </>
    )
}

export default AddProduct
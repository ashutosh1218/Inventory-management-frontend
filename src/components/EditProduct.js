import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { updateProductRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
function EditProduct(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [item, updateItem] = useState(props);
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
        const data = { ...item }
        await axios.post(updateProductRoute, data);

        navigate('/');
        // updateItem(reset);
    }
    const handleClose = () => {
        // setShow(false);
        props.setShow(false);
    }

    return (
        <>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
                        <div className="wrapper wrapper--w790">
                            <div className="card card-5">
                                <div className="card-heading">
                                    <h2 className="title">Update Product</h2>
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
                                                <div className="input-group">
                                                    <input className="input--style-5" type="text" name="price" value={item.price} onChange={handleChange} />
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
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



        </>
    )
}

export default EditProduct
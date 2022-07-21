import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { pink } from '@mui/material/colors';
import axios from 'axios';
import { deleteProductRoute } from '../utils/APIRoutes';
import EditProduct from './EditProduct';
function Product(props) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const item=props;
    const { image } = (props.imageUrl);
    const handleDelete = async (e) => {
        e.preventDefault();
        await axios.post(deleteProductRoute, {
            id: props.id
        })
        window.location.reload();
        

    }
    const handleChange = () => {

    }
    return (
        <Container>
            <article className="card">
                <header id={image} className='card-header'>
                    <h4 className="card-header--title">{props.title}</h4>
                    <div className="img-div">
                        <img src={props.imageUrl} alt="product" className='prod-img' />
                    </div>
                </header>
                <div className="card-body">
                    <h4 className="price">
                        ₹{props.price}
                    </h4>
                    <h2 className='prod-title'>{props.title}</h2>
                    <p className="body-content">{props.description}</p>
                    <div className="row">
                        <div className="col-3">
                            <button className="button button-primary" onClick={handleDelete}>
                                <DeleteIcon sx={{ color: pink[500] }} fontSize="large" />
                            </button>
                        </div>
                        <div className="col-6"></div>
                        <div className="col-3">
                            <button className="button button-delete" onClick={(e) => {
                                setShow(!show);
                            }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <EditIcon color="success" />
                            </button>

                        </div>
                    </div>

                </div>
            </article>
            {
                show&&<EditProduct 
                    id={props.id}
                    title={props.title}
                    price={props.price}
                    imageUrl={props.imageUrl}
                    category={props.category}
                    description={props.description}
                    show={show}
                    setShow={setShow}
                    userId={props.userId}
                />
            }
            

        </Container>
    )
}
const Container = styled.div`
    .card {
  width:280px;
  display: block;
  margin: 40px 20px;
  box-shadow: 10px 5px 40px 20px darken(#341cac, 5%);
  transition: .25s;
  
  &:hover {
    box-shadow: 10px 5px 40px 20px darken(#341cac, 10%);
    cursor: pointer;
    
    .button-primary {
      transform: translate(10px, 0);
    }
    .button-delete{
        transform: translate(10px, 0);
    }
  }
}

.card-header {
  height: 200px;
  width: 100%;
  padding: 15px;
  background-size:cover;
  color:#fff;
}

.card-header--title {
  text-transform: uppercase;
  margin: 0;
  color:black;
}

.card-body {
  padding: 15px;
  background-color:#fff;
  width:100%;
}
.img-div{
    text-align:center;
}
.prod-img{
    heigth:150px;
    width:150px;
}
.price {
    text-align:center;
  font-size: 11px;
  font-weight: 600;
  color: black;
}
.prod-title{
    text-align:center;
}

.body-content {
    text-align:center;
  padding-bottom: 40px;
  font-size: 13px;
  line-height: 1.8;
}

.button-primary {
  border: none;
  box-shadow: none;
  font-family: inherit;
  background-color:transparent;
  color: $blue;
  font-size: 15px;
  transition:.25s;
  
  i{
    padding-right:4px;
  }
}

`
export default Product
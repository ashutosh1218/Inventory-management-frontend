import React from 'react'
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';
import { deleteCategoryRoute } from '../utils/APIRoutes';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
function Products({ products }) {
    const category = products[0].category;
    const handleDelete = async (e) => {
        e.preventDefault();
        await axios.post(deleteCategoryRoute, {
            category:products[0].category
        })
        window.location.reload();

    }
    // console.log(category);
    return (
        <Container>
            <div className="Box">
                <h2>
                    <span className="heading">{category}</span>
                    <button className="button button-primary" onClick={handleDelete}>
                        <DeleteIcon sx={{ color: pink[500] }} fontSize="large" /></button>
                </h2>

                {products.map((prod, ind) =>
                    <Product
                        key={ind}
                        title={prod.title}
                        price={prod.price}
                        imageUrl={prod.imageUrl}
                        category={prod.category}
                        description={prod.description}
                        id={prod._id}
                        userId={prod.userId}
                    />
                )}

            </div>
        </Container>
    )
}
const Container = styled.div`
    .Box{
        margin-top:30px;
        display: flex;
        overflow-x: scroll;
        margin:5px;
        border-style:outset;
    }
    .heading{
        margin-top:30px;
        margin-left:10px;
    }
    .button-primary {
  border: none;
  box-shadow: none;
  font-family: inherit;
  background-color:transparent;
  color: $blue;
  font-size: 15px;
  transition:.25s;
  margin-left:10px;
  
  i{
    padding-right:4px;
  }
`
export default Products
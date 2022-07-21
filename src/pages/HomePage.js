import React, {useState, useEffect, createFactory} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import axios from 'axios'
import { getProductsRoute } from '../utils/APIRoutes';
import styled from 'styled-components';
import Products from '../components/Products';
function HomePage() {
    const navigate=useNavigate();
    const [categoryProd, setCategoryProd]=useState(undefined);
    // const [currentUserId, setCurrentUserId]=useState('');
    const [categories, setCategories]=useState([]);
    const [currentUser, setCurrentUser]=useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const func=async ()=>{
          if(!localStorage.getItem("inventory-app-user")){
            navigate('/login')
          }
          else{
            const user=await JSON.parse(localStorage.getItem('inventory-app-user'));
            // setCurrentUserId(user._id);
            setCurrentUser(user);
            // console.log(currentUserId);

          }
    
        }
        func();
      }, []);
    useEffect(()=>{
        const func=async ()=>{
            if(currentUser){
                const data=await axios.post(getProductsRoute, {
                    userId:currentUser._id
                });
                // console.log(data.data);
                let arr=data.data;
                const all_categories=[];
                for(let i=0;i<arr.length;i++){
                    all_categories.push(arr[i].category);
                }
                arr=all_categories;
                let categories = arr.filter((item, i, ar) => ar.indexOf(item) === i);
                setCategories(categories);
                const cat_prods=new Array(categories.length);
                for(let i=0;i<categories.length;i++){
                    cat_prods[categories[i]]=[];
                }
                arr=data.data;
                for(let i=0;i<arr.length;i++){
                    cat_prods[arr[i].category].push(arr[i]);
                }
                setCategoryProd(cat_prods);
                // console.log(cat_prods);
                setIsLoading(false);
            }
            // console.log(currentUser._id);
            
        }
        func();
    }, [currentUser]);

    useEffect(()=>{
        
        console.log(categoryProd, isLoading);
    }, [categoryProd]);

    return (
        <>
            <Navbar />
            <Container>
            
                { !isLoading ? 
                categories.map((category, ind)=>
                    <Products 
                        key={ind}
                        products={categoryProd[category]}
                    />
                ): <p>Loading Data</p> }
            
            
             
            </Container>
        </>

    )
}
const Container=styled.div`
.hello{
    font-size:2rem;
}

`
export default HomePage
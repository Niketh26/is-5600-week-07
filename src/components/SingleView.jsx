/*
import React from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';


export default function SingleView({data}) {
  // get the id from the url using useParams
  const { id } = useParams();
  
  // get the product from the data using the id
  const product = data.find(product => product.id === id);

  const { user } = product;

  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls["regular"]})`
  }

  return (
    <article class="bg-white center mw7 ba b--black-10 mv4">
      <div class="pv2 ph3">
        <div class="flex items-center">
          <img src={user?.profile_image?.medium} class="br-100 h3 w3 dib" alt={user.instagram_username} />
          <h1 class="ml3 f4">{user.first_name} {user.last_name}</h1>
        </div>
      </div>
      <div class="aspect-ratio aspect-ratio--4x3">
        <div class="aspect-ratio--object cover" style={style}></div>
      </div>
      <div class="pa3 flex justify-between">
        <div class="mw6">
          <h1 class="f6 ttu tracked">Product ID: {id}</h1>
          <a href={`/products/${id}`} class="link dim lh-title">{title}</a>
        </div>
        <div class="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        {/* TODO Implement the AddToCart button */ /*
      </div>
    </article>

  )
}

*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config'; // Ensure BASE_URL is correct
import AddToCart from '../components/AddToCart'; // Import the AddToCart component
import '../App.css';

export default function SingleView() {
  // Get the id from the URL using useParams
  const { id } = useParams();

  // Define the state object for product data
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the product by id from the server
  const fetchProductById = (id) => {
    setLoading(true); // Set loading to true while fetching
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false); // Set loading to false when the product data is fetched
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false); // Ensure loading is set to false in case of an error
      });
  };

  // Use the useEffect hook to fetch the product when the component mounts
  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  // Show a loading spinner if there is no product loaded yet
  if (loading) return <div className="loading-spinner">Loading...</div>;

  // Check if the product is available
  if (!product) return <div className="error">Product not found</div>;

  const { user } = product;
  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls["regular"]})`
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img src={user?.profile_image?.medium} className="br-100 h3 w3 dib" alt={user.instagram_username} />
          <h1 className="ml3 f4">{user.first_name} {user.last_name}</h1>
        </div>
      </div>
      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>
      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <a href={`/products/${id}`} className="link dim lh-title">{title}</a>
        </div>
        <div className="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        {/* Add the AddToCart button here */}
        <AddToCart product={product} />
      </div>
    </article>
  );
}
/*
import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'

const CardList = ({ data }) => {
  // define the limit state variable and set it to 10
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState(data);

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data])

  const filterTags = (tagQuery) => {
    const filtered = data.filter(product => {
      if (!tagQuery) {
        return product
      }

      return product.tags.find(({title}) => title === tagQuery)
    })

    setOffset(0)
    setProducts(filtered)
  }


  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
      <div className="mt2 mb2">
      {products && products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  )
}

export default CardList;

*/



import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import { BASE_URL } from '../config';

const CardList = () => {
  const limit = 10; // Define the limit state variable and set it to 10
  const [offset, setOffset] = useState(0); // Define the offset state variable and set it to 0
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products

  // Fetch products data from API (or your backend)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [offset]);

  // Function to handle previous pagination
  const handlePrevious = () => {
    if (offset > 0) setOffset(offset - limit);
  };

  // Function to handle next pagination
  const handleNext = () => {
    setOffset(offset + limit);
  };

  // Function to handle filtering by tags
  const filterTags = (tag) => {
    if (!tag) {
      setFilteredProducts(products); // Reset to all products if no tag
    } else {
      const filtered = products.filter((product) =>
        product.tags.some(({ title }) => title === tag)
      );
      setFilteredProducts(filtered); // Update filtered products based on selected tag
    }
    setOffset(0); // Reset offset when filtering
  };

  // Function to get the paginated products (based on the current offset)
  const getPaginatedProducts = () => {
    return filteredProducts.slice(offset, offset + limit);
  };

  return (
    <div className="cf pa2">
      {/* Search component for filtering by tags */}
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {/* Render products in paginated chunks */}
        {getPaginatedProducts().map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;
import React, { useEffect, useState } from 'react';
import "./ProductList.css"
function ProductTable({ data, selectedProperties }) {
    data = data || {};
    const [products, setproducts] = useState([])
    const [filteredProducts, setfilteredProducts] = useState()

 useEffect( () => {

    const newobj=data.products;
    const productsArray = Object.entries(newobj).map(([id, product]) => ({
        id,
        ...product
      }));
      
      // Sort the array based on the 'popularity' property
      const sortedProductsArray = productsArray.sort((a, b) => b.popularity - a.popularity);
      setproducts(sortedProductsArray);
      
 }, [data]);

 useEffect(() => {
  setfilteredProducts(
    products.map((product) =>
      selectedProperties.reduce((filteredProduct, property) => {
        filteredProduct[property] = product[property];
        return filteredProduct;
      }, {})
    )
  );
}, [selectedProperties, products]);


useEffect(() => {
  console.log(filteredProducts)
}, [filteredProducts]);


    // console.log(typeof(products));
  // Filter products based on selected properties


  return (
    <table>
      <thead>
        <tr>
          {selectedProperties.map((property) => (
            <th key={property}>{property}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredProducts?.map((product, index) => (
          <tr key={index}>
            {selectedProperties.map((property) => (
              <td key={`${index}-${product}`}>{product[property]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ProductTable;
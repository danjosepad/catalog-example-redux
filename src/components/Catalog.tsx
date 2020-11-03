import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Project imports
import api from '../services/api';
import { IProduct } from '../store/modules/cart/types';
import { addProductToCart } from '../store/modules/cart/actions';

const Catalog: React.FC = () => {
    const dispatch = useDispatch();
    const [catalog, setCatalog] = useState<IProduct[]>([]);

    useEffect(() => {
      api.get('products').then(response => {
        setCatalog(response.data);
      })
    }, []);
    
    const handleAddProductToCart = (product: IProduct) => {
      dispatch(addProductToCart(product))
    }

    return (
      <main>
        <h1>Catalog</h1>

        {catalog.map(product => (
          <article key={product.id}>
            <strong>{product.title}</strong> {" - "}
            <span>{product.price}</span> {" "}

            <button type="button" onClick={() => handleAddProductToCart(product)}>Comprar</button>
          </article>
        ))}
      </main>
    )
}

export default Catalog;
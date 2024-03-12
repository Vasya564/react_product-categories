import Product from './Product';

const ProductList = ({ filteredProducts }) => (
  <>
    {filteredProducts.map(product => (
      <Product key={product.id} product={product} />
    ))}
  </>
);

export default ProductList;

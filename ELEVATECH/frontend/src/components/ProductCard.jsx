import { Link } from "react-router-dom";

export default function ProductCard({product}){

return(

<div className="product-card">

<img
src={product.image}
alt={product.name}
/>

<h3>{product.name}</h3>

<p>${product.price}</p>

<p>⭐⭐⭐⭐⭐</p>

<div className="buttons">

<Link to={`/product/${product.id}`}>
<button>

View

</button>
</Link>

<button>

Add to Cart

</button>

</div>

</div>

);

}
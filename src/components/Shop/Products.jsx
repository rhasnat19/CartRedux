import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCT = [
  {
    id: "p1",
    price: 6,
    title: "My first book",
    description: "My first book is awesome",
  },
  {
    id: "p2",
    price: 10,
    title: "My second book",
    description: "My second book is awesome",
  },
  {
    id: "p3",
    price: 16,
    title: "My third book",
    description: "My third book is awesome",
  },
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCT.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;

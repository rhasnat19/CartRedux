import classes from "./Card.module.css";

const Card = (prop) => {
  return (
    <section
      className={`${classes.card} ${prop.className ? prop.className : ""}`}
    >
      {prop.children}
    </section>
  );
};

export default Card;

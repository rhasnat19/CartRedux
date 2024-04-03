import classes from "./Notification.module.css";

const Notification = (prop) => {
  console.log(prop.status);
  let specialClasses = "";

  if (prop.status === "error") {
    specialClasses = classes.error;
  }
  if (prop.status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{prop.title}</h2>
      <p>{prop.message}</p>
    </section>
  );
};

export default Notification;

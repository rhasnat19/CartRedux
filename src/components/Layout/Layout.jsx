import MainHeader from "./MainHeader";

const Layout = (prop) => {
  return (
    <>
      <MainHeader />
      <main>{prop.children}</main>
    </>
  );
};

export default Layout;

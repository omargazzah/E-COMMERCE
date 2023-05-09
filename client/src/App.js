import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import SignUp from "./template/SignUp";
import SignIn from "./template/SignIn";
import AddProduct from "./products/AddProduct";
import Profil from "./template/Profil";
import UpdateProfil from "./template/UpdateProfil";

// import data from ".../back";

function App() {
  // const { productItems } = data;
  return (
    <Template>
      <Switch>
        {/* <Route path="/map" exact>
          <Map />
        </Route> */}
        <Route path="/" exact>
          <Landing />
        </Route>{" "}
        <Route path="/products" exact>
          <ProductList />
        </Route>
        {/* <Route productItems={productItems} /> */}
        <Route path="/AddProduct" exact>
          <AddProduct />
        </Route>
        <Route path="/SignUp" exact>
          <SignUp />
        </Route>
        <Route path="/SignIn" exact>
          <SignIn />
        </Route>
        <Route path="/Profil" exact>
          <Profil />
        </Route>
        <Route path="/products/:slug" exact>
          <ProductDetail />
        </Route>
        <Route path="/UpdateUser/:slug" exact>
          <UpdateProfil />
        </Route>
      </Switch>
    </Template>
  );
}

export default App;

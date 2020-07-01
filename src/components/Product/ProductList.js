import React from "react";
import axios from "axios";
import ProductListItem from "./ProductListItem";
import Header from "../../layout/Header";
import Loading from "../../layout/Loading";
import { API_BASE_URL } from "../../Const";
import keycloak from "../../keyclock";

class ProductList extends React.Component {
  state = {
    isLoading: true,
    productList: [],
  };

  getProducts = async () => {
    const { data: products } = await axios.get(
      `${API_BASE_URL}/api/v1/products`
    );

    // console.log("return: ", products);
    // console.log(products);
    this.setState({ productList: products, isLoading: false });
  };

  componentDidMount() {
    this.getProducts();

    console.log("Lnb : ", keycloak);
  }

  render() {
    const { isLoading, productList } = this.state;

    console.log("product List : ", productList);

    return (
      <div>
        <Header menuName="Product List"></Header>
        <div className="w3-row">
          <section>
            {isLoading ? (
              <div>
                <Loading></Loading>
              </div>
            ) : (
              <div>
                {productList.length === 0 ? (
                  "No Contents"
                ) : (
                  <ul className="w3-ul w3-hoverable">
                    {productList.map((product) => (
                      <ProductListItem
                        key={product.id}
                        id={product.id}
                        name={product.title}
                        img={product.imageFilePath}
                        region={product.region}
                        category={product.category}
                        price={product.price}
                        description={product.content}
                        status={product.status}
                        createdTime={product.createdTime}
                      />
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>
        </div>
        <div>{/* <Pager></Pager> */}</div>
      </div>
    );
  }
}

export default ProductList;

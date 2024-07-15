import { useGetProductsQuery } from "../slices/products.apiSlice";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Product from "../components/Product";

const HomeSreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : isError ? (
        <>
          <div>{isError?.data.message || isError.error}</div>
        </>
      ) : (
        <>
          <h1>Products</h1>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};
export default HomeSreen;

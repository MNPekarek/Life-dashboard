import styled from "styled-components";
import Dashboard from "../components/Dashboard.jsx";
import ProductTable from "../components/ProductTable.jsx";
import CrearProductoModal from "../components/CreateProduct.jsx";

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #010707, #0e6f67, #3f914a, #738436);
`;
// background: linear-gradient(135deg, #010707, #0e6f67, #3f914a, #738436);
const Home = () => {
  return (
    <Container>
      <Dashboard />    
      <ProductTable />
    </Container>
  );
};

export default Home;

import styled from "styled-components";
import Dashboard from "../components/Dashboard.jsx";
import ProductTable from "../components/ProductTable.jsx";
import CrearProductoModal from "../components/CreateProduct.jsx";
import { useState } from "react";
import DashboardOrders from "../components/DashboardOrders/DashboardOrders.jsx";

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #010707, #0e6f67, #3f914a, #738436);
`;
// background: linear-gradient(135deg, #010707, #0e6f67, #3f914a, #738436);

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const StyledButton = styled.button`
  background-color: ${({ active }) => (active ? "#3f914a" : "#ffffff22")};
  color: ${({ active }) => (active ? "#fff" : "#eee")};
  border: 2px solid #3f914a;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);

  &:hover {
    background-color: #3f914a;
    color: #fff;
  }
`;

const Home = () => {
  const [view, setView] = useState("products");

  return (
    <Container>
      <Dashboard />

      <ButtonGroup>
        <StyledButton
          active={view === "products"}
          onClick={() => setView("products")}
        >
          Ver productos
        </StyledButton>
        <StyledButton
          active={view === "orders"}
          onClick={() => setView("orders")}
        >
          Ver pedidos
        </StyledButton>
      </ButtonGroup>

      {view === "products" && <ProductTable />}
      {view === "orders" && <DashboardOrders />}
    </Container>

  );
};

export default Home;

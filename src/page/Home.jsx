// src/page/Home.jsx
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f172a, #0f766e, #22c55e);
  color: white;
  text-align: center;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  background: #22c55e;
  color: white;
  padding: 0.8rem 1.4rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s ease;
  &:hover {
    background: #16a34a;
  }
`;

export default function Home() {
  return (
    <Container>
      <h1>🌿 Bienvenido a Life Admin</h1>
      <p>Accedé al panel de administración para gestionar tus productos y pedidos.</p>
      <StyledLink to="/dashboard">Ir al Dashboard</StyledLink>
    </Container>
  );
}

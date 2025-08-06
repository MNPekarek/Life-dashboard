// Dashboard.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const DashboardContainer = styled.div`
  padding: 1rem;
  background-color: transparent;
  font-family: "Segoe UI", sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #307157;
  margin-bottom: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  color: #98d3bc;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.2); /* mantiene transparencia */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const StatLabel = styled.p`
  font-size: 0.9rem;
  color: #98d3bc;

`;

const StatValue = styled.h2`
  font-size: 1.5rem;
  color: #98d3bc;
  margin: 0.5rem 0 0;
`;

const Dashboard = () => {

  const API_URL = import.meta.env.VITE_API_URL;
  // Simulamos datos (después los traés del backend)
  const [totalDocs, setTotalDocs] = useState(1);
  const stats = [
    { label: "Productos", value: totalDocs },
    { label: "Carritos activos", value: 34 },
    { label: "Ventas hoy", value: "$1,250" },
    { label: "Usuarios online", value: 12 },
  ];


  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/products`
      );
      
      setTotalDocs(res.data.totalDocs);
    } catch (err) {
      console.error("Error al traer productos:", err);
     }
  };
  fetchProducts();
}, []);

  return (
    <div>
    <DashboardContainer>
      <div style={{display: "flex"}}>
        <img src="/logo.png" alt="logo" style={{width: "40px", height: "40px", borderRadius: "10px", marginTop: "3px"}}/>
      <Title> Dashboard Life 📊</Title>
      </div>
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatLabel>{stat.label}</StatLabel>
            <StatValue>{stat.value}</StatValue>
          </StatCard>
        ))}
      </StatsGrid>
    </DashboardContainer>
    
    </div>
  );
};

export default Dashboard;
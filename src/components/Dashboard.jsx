// src/components/Dashboard.jsx
import { useState } from "react";
import styled from "styled-components";
import ProductTable from "./ProductTable";
import DashboardOrders from "./DashboardOrders/DashboardOrders";
import Analytics from "./dashboard/Analytics";
import useDashboardStats from "../hooks/useDashboardStats";
import DashboardChart from "./DashboardChart";
import { FiMenu } from "react-icons/fi";

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden; /* ✅ evita el scroll horizontal “fantasma” */
  background: radial-gradient(
    circle at top,
    #0f766e 0%,
    #0f172a 60%,
    #0f172a 100%
  );
`;


/* SIDEBAR */
const Sidebar = styled.aside`
  width: ${({ collapsed }) => (collapsed ? "70px" : "220px")};
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(7px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  height: 100%;
  left: ${({ show }) => (show ? "0" : "-250px")};
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    position: relative;
    left: 0;
    width: ${({ collapsed }) => (collapsed ? "70px" : "220px")};
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 200;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem;
  cursor: pointer;
  font-size: 1.3rem;
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;

  img {
    width: 32px;
    height: 32px;
    border-radius: 12px;
  }

  h2 {
    font-size: 1rem;
    opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
    transition: opacity 0.3s ease;
  }
`;

const MenuBtn = styled.button`
  background: ${({ active }) =>
    active ? "rgba(34,197,94,0.15)" : "transparent"};
  border: none;
  color: #e2e8f0;
  text-align: left;
  padding: 0.55rem 0.7rem;
  border-radius: 0.6rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(148, 163, 184, 0.08);
  }

  span {
    opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
    transition: opacity 0.3s ease;
  }
`;

const Content = styled.main`
  flex: 1;
  width: 100%;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  color: #0f172a;
  margin-left: ${({ collapsed }) => (collapsed ? "70px" : "10px")};
  transition: all 0.3s ease;

  /* @media (max-width: 1024px) {
    margin-left: ${({ collapsed }) => (collapsed ? "60px" : "180px")};
  } */

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;


const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h1 {
    color: #e2e8f0;
    font-size: 1.4rem;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 1rem;
  padding: 1rem;
  color: #e2e8f0;

  small {
    color: rgba(226, 232, 240, 0.75);
  }
  h3 {
    font-size: 1.3rem;
    margin-top: 0.35rem;
  }
`;

export default function Dashboard() {
  const [view, setView] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { stats, loading, weekly } = useDashboardStats();

  return (
    <Layout>
      {/* Toggle para mobile */}
      <ToggleButton onClick={() => setShowSidebar(!showSidebar)}>
        <FiMenu />
      </ToggleButton>

      {/* Sidebar principal */}
      <Sidebar show={showSidebar} collapsed={collapsed}>
        <Logo collapsed={collapsed}>
          <img src="/logo.png" alt="life" />
          {!collapsed && <h2>Life Admin</h2>}
        </Logo>

        <MenuBtn
          active={view === "overview"}
          onClick={() => setView("overview")}
          collapsed={collapsed}
        >
          📊 <span>Resumen</span>
        </MenuBtn>

        <MenuBtn
          active={view === "products"}
          onClick={() => setView("products")}
          collapsed={collapsed}
        >
          🧺 <span>Productos</span>
        </MenuBtn>

        <MenuBtn
          active={view === "orders"}
          onClick={() => setView("orders")}
          collapsed={collapsed}
        >
          📦 <span>Órdenes</span>
        </MenuBtn>

        <MenuBtn
          active={view === "analytics"}
          onClick={() => setView("analytics")}
          collapsed={collapsed}
        >
          📈 <span>Analytics</span>
        </MenuBtn>

        {/* Botón para colapsar (solo desktop) */}
        <button
          style={{
            marginTop: "auto",
            background: "rgba(255,255,255,0.08)",
            border: "none",
            color: "#e2e8f0",
            padding: "0.6rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </Sidebar>

      {/* Contenido principal */}
      <Content collapsed={collapsed}>
        <TopBar>
          <h1>
            {view === "overview" && "Panel general"}
            {view === "products" && "Gestión de productos"}
            {view === "orders" && "Órdenes"}
            {view === "analytics" && "Analytics"}
          </h1>
        </TopBar>

        {view === "overview" && (
          <>
            <StatGrid>
              <StatCard>
                <small>Ventas hoy</small>
                <h3>
                  {loading
                    ? "Cargando..."
                    : `$${stats?.todayRevenue?.toLocaleString() || 0}`}
                </h3>
              </StatCard>
              <StatCard>
                <small>Productos cargados</small>
                <h3>{loading ? "..." : stats?.totalProducts || 0}</h3>
              </StatCard>
              <StatCard>
                <small>Órdenes pendientes</small>
                <h3>{loading ? "..." : stats?.pendingOrders || 0}</h3>
              </StatCard>
              <StatCard>
                <small>Total de ventas</small>
                <h3>
                  {loading
                    ? "..."
                    : `$${stats?.totalRevenue?.toLocaleString() || 0}`}
                </h3>
              </StatCard>
            </StatGrid>

            {!loading && <DashboardChart data={weekly} />}
          </>
        )}

        {view === "products" && <ProductTable />}
        {view === "orders" && <DashboardOrders />}
        {view === "analytics" && <Analytics />}
      </Content>
    </Layout>
  );
}

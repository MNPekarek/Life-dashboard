// src/components/dashboard/Analytics.jsx
import {  useState } from "react";
import styled from "styled-components";
// si querés usar Recharts -> npm i recharts
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Wrap = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.03);
  border-radius: 1rem;
  padding: 1rem;
  color: #e2e8f0;
`;

export default function Analytics() {
  const [data, setData] = useState([
    { name: "Lun", orders: 4 },
    { name: "Mar", orders: 7 },
    { name: "Mié", orders: 3 },
    { name: "Jue", orders: 9 },
    { name: "Vie", orders: 5 },
  ]);

  // acá podrías fetch a /api/orders y agrupar por día

  return (
    <Wrap>
      <h2>Actividad de órdenes</h2>
      <p style={{ marginBottom: "1rem", color: "rgba(226,232,240,.6)" }}>
        Últimos días
      </p>
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.7}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(226,232,240,0.12)" />
            <XAxis dataKey="name" stroke="rgba(226,232,240,.5)" />
            <YAxis stroke="rgba(226,232,240,.5)" />
            <Tooltip />
            <Area type="monotone" dataKey="orders" stroke="#22c55e" fill="url(#colorOrders)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Wrap>
  );
}

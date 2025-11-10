import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import styled from "styled-components";

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  backdrop-filter: blur(6px);
`;

export default function DashboardChart({ data }) {
  return (
    <ChartWrapper>
      <h3 style={{ marginBottom: "1rem", color: "#fff" }}>📈 Ventas últimos 7 días</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="date" stroke="#d1fae5" fontSize={12} />
          <YAxis stroke="#d1fae5" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #22c55e",
              borderRadius: "8px",
              color: "white",
            }}
            formatter={(value) => `$${value.toLocaleString()}`}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

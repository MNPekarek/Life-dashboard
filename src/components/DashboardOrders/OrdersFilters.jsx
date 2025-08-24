export const OrdersFilters = ({ setFilterStatus, setFilterDate }) => (
  <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
    <select onChange={e => setFilterStatus(e.target.value)}>
      <option value="todos">Todos</option>
      <option value="pendiente">Pendiente</option>
      <option value="enviado">Enviado</option>
      <option value="cancelado">Cancelado</option>
    </select>

    <input
      type="date"
      onChange={e => setFilterDate(e.target.value)}
    />
  </div>
);
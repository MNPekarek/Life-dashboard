import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff11;
  backdrop-filter: blur(4px);
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  padding: 0.75rem;
  background-color: #3f914a;
  color: white;
  text-align: left;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #ffffff33;
  color: #eee;
  vertical-align: top;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: #ccc;
`;

  export const OrdersTable = ({ orders, updateOrderStatus }) => (
  <Table>
    <thead>
      <tr>
        <Th>Fecha</Th>
        <Th>Cliente</Th>
        <Th>Total</Th>
        <Th>Estado</Th>
        <Th>Acciones</Th>
        <Th>Productos</Th>
      </tr>
    </thead>
    <tbody>
      {orders.map(order => (
        <tr key={order._id}>
          <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
          <Td>{order.customerName}</Td>
          <Td>${order.total.toLocaleString()}</Td>
          <Td>{order.status}</Td>
          <Td>
            <select
              value={order.status}
              onChange={e => updateOrderStatus(order._id, e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="enviado">Enviado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </Td>
          <Td>
            <ItemList>
              {order.items.map(item => (
                <div key={item._id}>
                  {item.title} x{item.cantidadCart}
                </div>
              ))}
            </ItemList>
          </Td>
        </tr>
      ))}
    </tbody>
  </Table>
);


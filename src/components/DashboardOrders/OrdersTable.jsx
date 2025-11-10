import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPackage, FiEdit3 } from "react-icons/fi";

/* ====== ESTILOS BASE ====== */
const Wrapper = styled.div`
  flex: 1;
  color: #f9fafb;
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(34, 197, 94, 0.4);
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    overflow-x: hidden;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Th = styled.th`
  padding: 1rem;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.25), rgba(34, 197, 94, 0.15));
  color: #a7f3d0;
  text-align: left;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Td = styled.td`
  padding: 1rem 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
  vertical-align: top;
  font-size: 0.95rem;
  white-space: normal;
`;

const Row = styled(motion.tr)`
  &:hover {
    background: rgba(34, 197, 94, 0.06);
  }
`;

const StatusSelect = styled.select`
  padding: 0.45rem 0.7rem;
  border-radius: 8px;
  border: none;
  background: ${({ status }) =>
    status === "pendiente"
      ? "rgba(234,179,8,0.15)"
      : status === "enviado"
      ? "rgba(34,197,94,0.15)"
      : "rgba(239,68,68,0.15)"};
  color: ${({ status }) =>
    status === "pendiente"
      ? "#facc15"
      : status === "enviado"
      ? "#22c55e"
      : "#ef4444"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ deleteBtn }) => (deleteBtn ? "#f87171" : "#60a5fa")};
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: scale(1.1);
    color: ${({ deleteBtn }) => (deleteBtn ? "#ef4444" : "#22c55e")};
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: #cbd5e1;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

/* ====== RESPONSIVE CARDS ====== */
const MobileList = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  backdrop-filter: blur(6px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(34, 197, 94, 0.1);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f1f5f9;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const CardSub = styled.div`
  color: #9ca3af;
  font-size: 0.85rem;
`;

const CardBody = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #e2e8f0;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 0.5rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  background: ${({ status }) =>
    status === "pendiente"
      ? "rgba(234,179,8,0.15)"
      : status === "enviado"
      ? "rgba(34,197,94,0.15)"
      : "rgba(239,68,68,0.15)"};
  color: ${({ status }) =>
    status === "pendiente"
      ? "#facc15"
      : status === "enviado"
      ? "#22c55e"
      : "#ef4444"};
  font-weight: 600;
  font-size: 0.85rem;
`;

/* ====== COMPONENTE ====== */
export const OrdersTable = ({ orders, updateOrderStatus, deleteOrder }) => (
  <Wrapper>
    {/* 🖥️ Tabla para Desktop */}
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
        <AnimatePresence>
          {orders.map((order) => (
            <Row
              key={order._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
              <Td>{order.customerName}</Td>
              <Td>${order.total.toLocaleString()}</Td>
              <Td>
                <StatusSelect
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order._id, e.target.value)
                  }
                  status={order.status}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="enviado">Enviado</option>
                  <option value="cancelado">Cancelado</option>
                </StatusSelect>
              </Td>
              <Td>
                <Actions>
                  <IconButton deleteBtn onClick={() => deleteOrder(order._id)}>
                    <FiTrash2 />
                  </IconButton>
                </Actions>
              </Td>
              <Td>
                <ItemList>
                  {order.items.map((item) => (
                    <div key={item._id}>
                      {item.title} x{item.cantidadCart}
                    </div>
                  ))}
                </ItemList>
              </Td>
            </Row>
          ))}
        </AnimatePresence>
      </tbody>
    </Table>

    {/* 📱 Cards para Mobile */}
    <MobileList>
      {orders.map((order) => (
        <motion.div
          key={order._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Card>
            <CardHeader>
              <span>{order.customerName}</span>
              <StatusBadge status={order.status}>{order.status}</StatusBadge>
            </CardHeader>
            <CardSub>{new Date(order.createdAt).toLocaleDateString()}</CardSub>
            <CardBody>
              <p>
                <b>Total:</b> ${order.total.toLocaleString()}
              </p>
              <p>
                <b>Productos:</b>
              </p>
              {order.items.map((item) => (
                <p key={item._id}>
                  {item.title} x{item.cantidadCart}
                </p>
              ))}
            </CardBody>
            <CardActions>
              <StatusSelect
                value={order.status}
                onChange={(e) =>
                  updateOrderStatus(order._id, e.target.value)
                }
                status={order.status}
              >
                <option value="pendiente">Pendiente</option>
                <option value="enviado">Enviado</option>
                <option value="cancelado">Cancelado</option>
              </StatusSelect>
              <IconButton deleteBtn onClick={() => deleteOrder(order._id)}>
                <FiTrash2 />
              </IconButton>
            </CardActions>
          </Card>
        </motion.div>
      ))}
    </MobileList>
  </Wrapper>
);

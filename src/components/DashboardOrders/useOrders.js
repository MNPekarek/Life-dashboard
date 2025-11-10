import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "https://life-project-api-db-production.up.railway.app";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterDate, setFilterDate] = useState("");

  // ✅ obtener pedidos filtrados
  const fetchOrders = async () => {
    try {
      let url = `${API_URL}/api/orders`;

      if (filterStatus !== "todos") {
        url = `${API_URL}/api/orders/by-status?status=${filterStatus}`;
      } else if (filterDate) {
        url = `${API_URL}/api/orders/by-date?fecha=${filterDate}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error al cargar pedidos:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filterStatus, filterDate]);

  // ✅ actualizar estado
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const updated = await res.json();

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? updated : order))
      );
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

  // ✅ eliminar pedido
  const deleteOrder = async (orderId) => {
    if (!window.confirm("¿Seguro que querés eliminar este pedido?")) return;
    try {
      await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: "DELETE",
      });
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Error al eliminar pedido:", err);
    }
  };

  return {
    orders,
    setFilterStatus,
    setFilterDate,
    updateOrderStatus,
    deleteOrder,
  };
};

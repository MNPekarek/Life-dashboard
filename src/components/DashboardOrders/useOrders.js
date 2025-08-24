import { useEffect, useState } from "react"


export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("todos");
    const [filterDate, setFilterDate] = useState("");

    useEffect(() => {
        fetch("https://life-project-api-db-production.up.railway.app/api/orders")
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.log("Error al cargar los pedidos", err))
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await res.json();
      setOrders(prev =>
        prev.map(order => (order._id === orderId ? updated : order))
      );
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

   const filteredOrders = orders.filter(order => {
    const matchStatus =
      filterStatus === "todos" || order.status === filterStatus;
    const matchDate =
      !filterDate ||
      new Date(order.createdAt).toISOString().slice(0, 10) === filterDate;
    return matchStatus && matchDate;
  });

  return {
    orders: filteredOrders,
    setFilterStatus,
    setFilterDate,
    updateOrderStatus,
  };
}
import { useOrders } from "./useOrders.js";
import { OrdersFilters } from "./OrdersFilters.jsx";
import { OrdersTable } from "./OrdersTable.jsx";

const DashboardOrders = () => {
  const {
    orders,
    setFilterStatus,
    setFilterDate,
    updateOrderStatus,
    deleteOrder,
  } = useOrders();

  return (
    <div>
      <h2>Pedidos</h2>
      <OrdersFilters
        setFilterStatus={setFilterStatus}
        setFilterDate={setFilterDate}
      />
      <OrdersTable
        orders={orders}
        updateOrderStatus={updateOrderStatus}
        deleteOrder={deleteOrder}
      />
    </div>
  );
};

export default DashboardOrders;

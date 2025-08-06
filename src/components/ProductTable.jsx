import React, { useState } from "react";
import styled from "styled-components";
import ProductSearch from "./HandleSearch.jsx";
import EditProductModal from "./EditProductModal.jsx";
import CrearProductoModal from "./CreateProduct.jsx";
import useProducts from "../hooks/useProducts.js";

const TableContainer = styled.div`
  padding: 2rem;
  background-color: transparent;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #2c3e50;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.2); /* mantiene transparencia */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.3); /* translúcido pero legible */
  color: #2c3e50;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Td = styled.td`
  padding: 0.75rem;
  color: #2c3e50;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.2); /* mantiene transparencia */
`;

const ActionButton = styled.button`
  margin-right: 0.5rem;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.delete ? "#e74c3c" : "#3498db")};
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const PageButton = styled.button`
  padding: 0.4rem 0.8rem;
  margin: 0 0.2rem;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? "#2ecc71" : "#bdc3c7")};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#27ae60" : "#95a5a6")};
  }
`;

const ProductTable = () => {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const {
    products, 
    loading,
    totalPages,
    deleteProduct,
    updateProduct,
    createProduct,
    searchProducts,
  } = useProducts(page);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  
  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };
  
  const getPageNumbers = () => {
    const pages = [];
    const masVisible = 5;
    
    if (totalPages <= masVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (page > 3) pages.push("...");
      
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (page < totalPages - 2) pages.push("...");
      
      pages.push(totalPages);
    }
    return pages;
  }
  
  if (loading) return <TableContainer>Cargando productos...</TableContainer>;

  return (
    <TableContainer>
      <h2>📦 Productos</h2>
      <div style={{ display: "flex" }}>
      <ProductSearch searchProducts={searchProducts} />
      <CrearProductoModal onCreate={createProduct} />
      </div>
      <Table>
        <thead>
          <tr>
            <Th>Nombre</Th>
            <Th>Precio</Th>
            <Th>Stock</Th>
            <Th>Categoría</Th>
            <Th>Cantidad</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <Td>{product.title}</Td>
              <Td>${product.price}</Td>
              <Td>{product.stock}</Td>
              <Td>{product.category}</Td>
              <Td>{product.quantity}</Td>
              <Td>
                <ActionButton
                  onClick={() => handleEdit(product)}
                >
                  Editar
                </ActionButton>
                <ActionButton delete onClick={() => deleteProduct(product._id)}>
                  Eliminar
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <ActionButton onClick={handlePrev} disabled={page === 1}>Anterior</ActionButton>
        {getPageNumbers().map((p, index) => 
         p === "..." ? (
          <span key={`dots-${index}`} style={{ padding: "0.4rem 0.8rem" }}>...</span>
         ) : (
            <PageButton
            key={p}
            active={p === page}
            onClick={() => setPage(p)}
            >
              {p}
            </PageButton>
          )
        )}
        <ActionButton onClick={handleNext} disabled={page === totalPages}>
          Siguiente
        </ActionButton>

      </div>

      <EditProductModal 
      show={showModal}
      onClose={() => setShowModal(false)}
      product={selectedProduct}
      onUpdate={updateProduct}
      />
    </TableContainer>
  );
};

export default ProductTable;
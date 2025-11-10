import React, { useState } from "react";
import styled from "styled-components";
import ProductSearch from "./HandleSearch.jsx";
import EditProductModal from "./EditProductModal.jsx";
import CrearProductoModal from "./CreateProduct.jsx";
import useProducts from "../hooks/useProducts.js";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit3, FiTrash2, FiPackage } from "react-icons/fi";

/* ====== ESTILOS ====== */

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #f9fafb;
  padding: 1.5rem;
  min-height: calc(100vh - 60px);
  overflow: hidden;
  max-width: calc(100vw - 260px);
  box-sizing: border-box;

  @media (max-width: 1024px) {
    max-width: 100%;
    padding: 1rem;
  }
`;

const HeaderBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #d1fae5;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #22c55e;
    font-size: 1.6rem;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  scroll-behavior: smooth;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(34, 197, 94, 0.4);
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    border-radius: 10px;
    margin: 0;
    overflow-x: hidden;
  }
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.25), rgba(34, 197, 94, 0.15));
  backdrop-filter: blur(10px);
  z-index: 2;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  color: #a7f3d0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  &:first-child {
    padding-left: 1.5rem;
  }
`;

const Td = styled.td`
  padding: 1rem 1.2rem;
  color: #e2e8f0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.95rem;
  white-space: normal; /* ✅ permite salto de línea */
  word-break: break-word; /* corta palabras largas si hace falta */
  max-width: 220px; /* evita que ensanche */
  line-height: 1.3;

  &:nth-child(2) {
    font-weight: 600;
    color: #22c55e;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;


const Row = styled(motion.tr)`
  transition: background 0.25s ease;
  &:hover {
    background: rgba(34, 197, 94, 0.08);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1.5rem;
`;

const PageButton = styled.button`
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  border: none;
  background: ${({ active }) => (active ? "#22c55e" : "rgba(255,255,255,0.1)")};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active }) => (active ? "#16a34a" : "rgba(255,255,255,0.25)")};
  }
`;

/* ====== MOBILE CARDS ====== */

const MobileList = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(34, 197, 94, 0.12);
  }

  p {
    margin: 0.25rem 0;
    color: #e2e8f0;
    font-size: 0.9rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f1f5f9;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
`;

const Price = styled.span`
  color: #22c55e;
  font-weight: 700;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 0.7rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 0.5rem;
`;

/* Ocultar tabla en mobile */
const Table = styled.table`
  width: 100%;
  min-width: 850px;
  border-collapse: collapse;
  color: #f1f5f9;

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ====== COMPONENTE PRINCIPAL ====== */

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

  const handlePrev = () => page > 1 && setPage((p) => p - 1);
  const handleNext = () => page < totalPages && setPage((p) => p + 1);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
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
  };

  return (
    <Wrapper>
      <HeaderBar>
        <Title>
          <FiPackage /> Productos
        </Title>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <ProductSearch searchProducts={searchProducts} />
          <CrearProductoModal onCreate={createProduct} />
        </div>
      </HeaderBar>

      {loading ? (
        <p style={{ color: "#94a3b8" }}>Cargando productos...</p>
      ) : (
        <TableContainer>
          {/* 🧩 Tabla para desktop */}
          <Table className="desktop-table">
            <Thead>
              <tr>
                <Th>Nombre</Th>
                <Th>Precio</Th>
                <Th>Stock</Th>
                <Th>Categoría</Th>
                <Th>Presentación</Th>
                <Th>Acciones</Th>
              </tr>
            </Thead>
            <tbody>
              <AnimatePresence>
                {products.map((p) => (
                  <Row
                    key={p._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Td>{p.title}</Td>
                    <Td>${p.price}</Td>
                    <Td>{p.stock}</Td>
                    <Td>{p.category}</Td>
                    <Td>{p.quantity}</Td>
                    <Td>
                      <Actions>
                        <IconButton onClick={() => handleEdit(p)}>
                          <FiEdit3 />
                        </IconButton>
                        <IconButton deleteBtn onClick={() => deleteProduct(p._id)}>
                          <FiTrash2 />
                        </IconButton>
                      </Actions>
                    </Td>
                  </Row>
                ))}
              </AnimatePresence>
            </tbody>
          </Table>

          {/* 📱 Cards para mobile */}
          <MobileList>
            {products.map((p) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ProductCard>
                  <CardHeader>
                    <strong>{p.title}</strong>
                    <Price>${p.price}</Price>
                  </CardHeader>
                  <CardBody>
                    <p>
                      <b>Stock:</b> {p.stock}
                    </p>
                    <p>
                      <b>Categoría:</b> {p.category}
                    </p>
                    <p>
                      <b>Presentación:</b> {p.quantity}
                    </p>
                  </CardBody>
                  <CardActions>
                    <IconButton onClick={() => handleEdit(p)}>
                      <FiEdit3 />
                    </IconButton>
                    <IconButton deleteBtn onClick={() => deleteProduct(p._id)}>
                      <FiTrash2 />
                    </IconButton>
                  </CardActions>
                </ProductCard>
              </motion.div>
            ))}
          </MobileList>
        </TableContainer>
      )}

      <Pagination>
        <PageButton onClick={handlePrev} disabled={page === 1}>
          ‹
        </PageButton>
        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} style={{ color: "#9ca3af", padding: "0.5rem" }}>
              ...
            </span>
          ) : (
            <PageButton key={p} active={p === page} onClick={() => setPage(p)}>
              {p}
            </PageButton>
          )
        )}
        <PageButton onClick={handleNext} disabled={page === totalPages}>
          ›
        </PageButton>
      </Pagination>

      <EditProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
        onUpdate={updateProduct}
      />
    </Wrapper>
  );
};

export default ProductTable;

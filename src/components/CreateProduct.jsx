import React, { useState } from "react";
import styled from "styled-components";
import useProducts from "../hooks/useProducts";

const FloatingButton = styled.button`
  margin-left: 2rem;
  background-color: #2ecc71;
  color: white;
  font-size: 2rem;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #27ae60;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #2c3e50;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.6);
  color: #2c3e50;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #2980b9;
  }
`;

const CrearProductoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: "",
    stock: "",
    quantity: "",
    category: "",
  });

  const { createProduct } = useProducts();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);      
      setIsOpen(false);
      setFormData({
        title: "",
        description: "",
        thumbnail: "",
        price: "",
        stock: "",
        quantity: "",
        category: "",
      });
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(true)}>＋</FloatingButton>

      {isOpen && (
        <Overlay onClick={() => setIsOpen(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <h2>Crear Producto</h2>
            <Form onSubmit={handleSubmit}>
              <Input
                name="title"
                placeholder="Nombre"
                value={formData.title}
                onChange={handleChange}
              />
              <Input
                name="description"
                placeholder="Descripcion"
                value={formData.description}
                onChange={handleChange}
              />
              <Input
                name="thumbnail"
                placeholder="Imagen"
                value={formData.thumbnail}
                onChange={handleChange}
              />
              <Input
                name="price"
                placeholder="Precio"
                value={formData.price}
                onChange={handleChange}
              />
              <Input
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
              />
              <Input
                name="quantity"
                placeholder="Cantidad"
                value={formData.quantity}
                onChange={handleChange}
              />
              <Input
                name="categoria"
                placeholder="Categoría"
                value={formData.categoria}
                onChange={handleChange}
              />

              <SubmitButton type="submit">Crear</SubmitButton>
            </Form>
          </Modal>
        </Overlay>
      )}
    </>
  );
};

export default CrearProductoModal;

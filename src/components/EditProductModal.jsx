import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const EditProductModal = ({ show, onClose, product, onUpdate }) => {
  const [form, setForm] = useState({
    title: "",
    _id: "",
    description: "",
    thumbnail: "",
    price: "",
    stock: "",
    quantity: "",
    category: ""
  });

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        _id: product._id || "",
        price: product.price || "",
        description: product.description || "",
        thumbnail: product.thumbnail || "",
        stock: product.stock || "",
        quantity: product.quantity || "",
        category: product.category || ""
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`https://life-project-api-db.onrender.com/api/products/${product._id}`, form);
      onUpdate(res.data.payload); // actualiza en el frontend
      onClose(); // cierra el modal
    } catch (err) {
      console.error("Error al editar producto:", err);
    }
  };

  return (
    <Overlay show={show}>
      <Modal>
        <Title>✏️ Editar Producto</Title>
        <Input name="title" value={form.title} onChange={handleChange} placeholder="Título" />
        <Input name="_id" value={form._id} onChange={handleChange} placeholder="id" />
        <Input name="price" value={form.price} onChange={handleChange} placeholder="Precio" />
        <Input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" />
        <Input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="Imagen" />
        <Input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" />
        <Input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Cantidad" />
        <Input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" />
        <ButtonRow>
          <Button cancel onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Guardar</Button>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
};

export default EditProductModal;
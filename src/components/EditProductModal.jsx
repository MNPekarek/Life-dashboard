// src/components/EditProductModal.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1200;
`;

const Modal = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.2rem;
  width: 460px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 0.7rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
`;

const Row = styled.div`
  display: flex;
  gap: .6rem;
  align-items: center;
  margin-bottom: .5rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: .5rem;
`;

const Button = styled.button`
  background: ${({ cancel }) => (cancel ? "#e2e8f0" : "#0f766e")};
  color: ${({ cancel }) => (cancel ? "#0f172a" : "white")};
  border: none;
  padding: 0.6rem 1.1rem;
  border-radius: 8px;
  cursor: pointer;
`;

const EditProductModal = ({ show, onClose, product, onUpdate }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: "",
    stock: "",
    quantity: "",
    category: "",
    featured: false,
    offer: {
      active: false,
      discount: 0,
    },
  });

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        thumbnail: product.thumbnail || "",
        stock: product.stock || "",
        quantity: product.quantity || "",
        category: product.category || "",
        featured: product.featured || false,
        offer: {
          active: product.offer?.active || false,
          discount: product.offer?.discount || 0,
        },
        _id: product._id,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    if (name === "featured") {
      setForm((prev) => ({ ...prev, featured: checked }));
    } else if (name === "offerActive") {
      setForm((prev) => ({ ...prev, offer: { ...prev.offer, active: checked } }));
    }
  };

  const handleOfferDiscount = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, offer: { ...prev.offer, discount: Number(value) || 0 } }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/api/products/${product._id}`,
        form
      );
      onUpdate(res.data.payload);
      onClose();
    } catch (err) {
      console.error("Error al editar producto:", err);
    }
  };

  return (
    <Overlay show={show}>
      <Modal>
        <Title>✏️ Editar Producto</Title>
        <Input name="title" value={form.title} onChange={handleChange} placeholder="Título" />
        <Input name="price" value={form.price} onChange={handleChange} placeholder="Precio" />
        <Input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" />
        <Input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="Imagen" />
        <Input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" />
        <Input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Cantidad" />
        <Input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" />

        <Row>
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleCheckbox}
            id="featured-edit"
          />
          <label htmlFor="featured-edit">Destacado ⭐</label>
        </Row>

        <Row>
          <input
            type="checkbox"
            name="offerActive"
            checked={form.offer?.active}
            onChange={handleCheckbox}
            id="offer-edit"
          />
          <label htmlFor="offer-edit">En oferta 🔥</label>
        </Row>

        {form.offer?.active && (
          <>
            <label>Descuento (%)</label>
            <Input
              type="number"
              value={form.offer.discount}
              onChange={handleOfferDiscount}
              min="0"
              max="90"
            />
          </>
        )}

        <ButtonRow>
          <Button cancel onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Guardar</Button>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
};

export default EditProductModal;

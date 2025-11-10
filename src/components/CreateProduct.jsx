// src/components/CreateProduct.jsx
import React, { useState } from "react";
import styled from "styled-components";
import useProducts from "../hooks/useProducts";

const FloatingButton = styled.button`
  margin-left: 2rem;
  background-color: #22c55e;
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
    background-color: #16a34a;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1300;
`;

const Modal = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.4rem;
  width: 420px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 0.7rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: .85rem;
  margin-bottom: .3rem;
  display: block;
`;

const Row = styled.div`
  display: flex;
  gap: .8rem;
  margin-bottom: .7rem;
  align-items: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #0f766e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #115e59;
  }
`;

const CrearProductoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createProduct } = useProducts();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: "",
    stock: "",
    quantity: "",
    category: "",
    featured: false,
    offerActive: false,
    offerDiscount: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // adaptamos al formato que espera tu API nueva:
    const payload = {
      title: formData.title,
      description: formData.description,
      thumbnail: formData.thumbnail,
      price: Number(formData.price),
      stock: Number(formData.stock),
      quantity: formData.quantity,
      category: formData.category,
      featured: formData.featured,
      offer: {
        active: formData.offerActive,
        discount: Number(formData.offerDiscount) || 0,
      },
    };

    await createProduct(payload);
    setIsOpen(false);
    setFormData({
      title: "",
      description: "",
      thumbnail: "",
      price: "",
      stock: "",
      quantity: "",
      category: "",
      featured: false,
      offerActive: false,
      offerDiscount: 0,
    });
  };

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(true)}>+</FloatingButton>
      {isOpen && (
        <Overlay onClick={() => setIsOpen(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <h2>Nuevo producto</h2>
            <form onSubmit={handleSubmit}>
              <Label>Nombre</Label>
              <Input name="title" value={formData.title} onChange={handleChange} required />
              <Label>Descripción</Label>
              <Input name="description" value={formData.description} onChange={handleChange} />
              <Label>Imagen (URL)</Label>
              <Input name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
              <Label>Precio</Label>
              <Input name="price" type="number" value={formData.price} onChange={handleChange} />
              <Label>Stock</Label>
              <Input name="stock" type="number" value={formData.stock} onChange={handleChange} />
              <Label>Categoría</Label>
              <Input name="category" value={formData.category} onChange={handleChange} />
              <Label>Presentación / cantidad</Label>
              <Input name="quantity" value={formData.quantity} onChange={handleChange} />

              <Row>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  id="featured"
                />
                <label htmlFor="featured">Marcar como destacado ⭐</label>
              </Row>

              <Row>
                <input
                  type="checkbox"
                  name="offerActive"
                  checked={formData.offerActive}
                  onChange={handleChange}
                  id="offerActive"
                />
                <label htmlFor="offerActive">Está en oferta 🔥</label>
              </Row>

              {formData.offerActive && (
                <>
                  <Label>Descuento (%)</Label>
                  <Input
                    name="offerDiscount"
                    type="number"
                    min="0"
                    max="90"
                    value={formData.offerDiscount}
                    onChange={handleChange}
                  />
                </>
              )}

              <SubmitButton type="submit">Crear</SubmitButton>
            </form>
          </Modal>
        </Overlay>
      )}
    </>
  );
};

export default CrearProductoModal;

import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = (page, limit = 20) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // 🔄 Obtener productos
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/products?limit=${limit}&page=${page}`);
        setProducts(res.data.payload);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error al traer productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  // 🗑️ Eliminar producto
  const deleteProduct = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      alert("Hubo un problema al eliminar el producto.");
    }
  };

  // ✏️ Editar producto
  const updateProduct = async (updatedProduct) => {
    try {
      const res = await axios.put(`${API_URL}/api/products/${updatedProduct._id}`, updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? res.data.payload : p))
      );
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      alert("No se pudo actualizar el producto.");
    }
  };

  // ➕ Crear producto
  const createProduct = async (newProduct) => {
    try {
      const res = await axios.post(`${API_URL}/api/products`, newProduct);
      setProducts((prev) => [res.data.payload, ...prev]);
    } catch (err) {
      console.error("Error al crear producto:", err);
      alert("No se pudo crear el producto.");
    }
  };

  // 🔍 Buscar productos
  const searchProducts = async (title) => {
    try {
      const res = await axios.get(`${API_URL}/api/products/search?title=${title}`);
      setProducts(res.data.payload);
    } catch (err) {
      console.error("Error al buscar productos:", err);
    }
  }; 

  return {
    products,
    loading,
    totalPages,
    setProducts,
    deleteProduct,
    updateProduct,
    createProduct,
    searchProducts,
  };
};

export default useProducts;
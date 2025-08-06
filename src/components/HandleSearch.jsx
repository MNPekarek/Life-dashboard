import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  width: 100%;
  max-width: 400px;
  border-radius: 4px;
  color: #dadbdb;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.2); /* mantiene transparencia */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  &::placeholder{
    color: #98d3bc;
  }
`;

const ProductSearch = ({ searchProducts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await searchProducts(searchTerm);
     
    } catch (err) {
      console.error("Error al buscar productos:", err);
    }
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </SearchContainer>
  );
};

export default ProductSearch;
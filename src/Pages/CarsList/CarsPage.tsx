import React, { useState } from "react";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import BibliotekariTable from "./CarsTable";
import "./Bibliotekari.css";

const CarsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div title="Bibliotekari">
      <div className="bottom-right">
        <div className="top">
          <PrimaryBtn link="add-bibliotekar" className="primaryBtn">
            <i className="bi bi-plus-lg"></i> Novi Bibliotekar/ka
          </PrimaryBtn>
          <div className="search-bar">
            <i className="bi bi-search" />
            <input
              className="search-input"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <BibliotekariTable searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default CarsPage;

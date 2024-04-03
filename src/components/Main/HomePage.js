import React, { useEffect, useState } from "react";
import { Container, FormControl, InputGroup, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import FoodTable from "../Food/TableFood/FoodTable";
import foodClient from "../service/Client-axios";
import SelectedTable from "../Food/SelectedTable/SelectedTable";
import "./Home.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const [allFoods, setAllFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState(
    JSON.parse(localStorage.getItem("selectedFoods")) || []
  );

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await foodClient.getAllFoods();
        setAllFoods(response);
        setFilteredFoods(response);
      } catch (error) {
        console.error("Грешка при извличане на информация за храните:", error);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const filtered = allFoods.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFoods(filtered);
  }, [search, allFoods]);

  useEffect(() => {
    localStorage.setItem("selectedFoods", JSON.stringify(selectedFoods));
  }, [selectedFoods]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFoodSelect = (food) => {
    const isAlreadySelected = selectedFoods.some(
      (selectedFood) => selectedFood.id === food.id
    );
    if (!isAlreadySelected) {
      setSelectedFoods((prevSelectedFoods) => [...prevSelectedFoods, food]);
    } else {
      console.log("Този продукт вече е добавен.");
    }
  };
  const handleClearSelected = () => {
    setSelectedFoods([]);
  };

  return (
    <Container>
      <Row>
        <SelectedTable
          selectedFood={selectedFoods}
          setSelectedFood={setSelectedFoods}
        />
      </Row>

      <Row>
        <InputGroup className="mb-3">
          <InputGroup.Text id="search-icon">
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            value={search}
            onChange={handleSearchChange}
            type="text"
            placeholder="Търсене на храна..."
            aria-label="Търсене на храна..."
          />
        </InputGroup>
      </Row>
      <Row>
        <FoodTable foods={filteredFoods} onFoodSelect={handleFoodSelect} />
      </Row>
      <button
        variant="custom"
        className="clear-button"
        onClick={handleClearSelected}
      >
        Изчисти избраните
      </button>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function FoodTable({ foods, onFoodSelect }) {
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    setFilteredFoods(foods);
  }, [foods]);
  return (
    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
      <Table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Име</th>
            <th>KCAL</th>
            <th>Протеин</th>
            <th>Мазнини</th>
            <th>Въглехидрати</th>
          </tr>
        </thead>
        <tbody>
          {filteredFoods.map((food) => (
            <tr key={food.id} onClick={() => onFoodSelect(food)}>
              <td>{food.name}</td>
              <td>{food.kcal}</td>
              <td>{food.protein}</td>
              <td>{food.fat}</td>
              <td>{food.carbs}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FoodTable;

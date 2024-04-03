import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import "./Table.css";
import FoodDetails from "../../Details/Details-Food";
const SelectedTable = ({ selectedFood, setSelectedFood }) => {
  const [totals, setTotals] = useState({
    totalKcal: 0,
    totalProtein: 0,
    totalFat: 0,
    totalCarbs: 0,
  });

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);

  useEffect(() => {
    const calculateTotals = () => {
      let totalKcal = 0;
      let totalProtein = 0;
      let totalFat = 0;
      let totalCarbs = 0;

      selectedFood.forEach((food) => {
        totalKcal += food.kcal;
        totalProtein += food.protein;
        totalFat += food.fat;
        totalCarbs += food.carbs;
      });
      setTotals({
        totalKcal,
        totalProtein,
        totalFat,
        totalCarbs,
      });
    };
    calculateTotals();
  }, [selectedFood]);

  const handleDetailsClick = (foodId) => {
    setSelectedFoodId(foodId);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleRemoveClick = (foodId) => {
    const updatedSelectedFood = selectedFood.filter(
      (food) => food.id !== foodId
    );
    setSelectedFood(updatedSelectedFood);
  };

  return (
    <div className="table-container">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th colSpan="6" className="text-center">
              Избрани храни
            </th>
          </tr>
          <tr>
            <th>Име</th>
            <th>Калории</th>
            <th>Протеин</th>
            <th>Мазнини</th>
            <th>Въглехидрати</th>
            <th>Опции</th>
          </tr>
        </thead>
        <tbody>
          {selectedFood.map((food) => (
            <tr key={food.id}>
              <td>{food.name}</td>
              <td>{food.kcal}</td>
              <td>{food.protein}</td>
              <td>{food.fat}</td>
              <td>{food.carbs}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveClick(food.id)}
                >
                  Премахни
                </Button>{" "}
                <Button onClick={() => handleDetailsClick(food.id)}>
                  Детайли
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total:</th>
            <th>{totals.totalKcal}</th>
            <th>{totals.totalProtein}</th>
            <th>{totals.totalFat}</th>
            <th>{totals.totalCarbs}</th>
            <th></th>
          </tr>
        </tfoot>
      </Table>

      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Детайли за продукта</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FoodDetails foodId={selectedFoodId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>
            Затвори
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SelectedTable;

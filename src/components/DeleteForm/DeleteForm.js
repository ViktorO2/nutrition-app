import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown, Card } from "react-bootstrap";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import foodClient from "../service/Client-axios";
import "./DeleteFormFood.css";

function DeleteFormFood({ onDelete }) {
  const [selectedFood, setSelectedFood] = useState(null);
  const [food, setFood] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await foodClient.getAllFoods();
        setFood(response);
      } catch (error) {
        console.error("Грешка при извличане на продуктите:", error);
      }
    };
    fetchFoods();
  }, []);

  const handleDelete = async () => {
    try {
      await foodClient.deleteFood(selectedFood.id);
      onDelete(selectedFood.id);
      console.log("Продуктът е успешно изтрит.");
      setSelectedFood(null);
    } catch (error) {
      console.error("Грешка при изтриване на продукта:", error);
    }
  };

  return (
    <div>
      <Header />
      <Form className="delete-form-container">
        <Form.Group>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Изберете продукт
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {food.map((food) => (
                <Dropdown.Item
                  key={food.id}
                  onClick={() => setSelectedFood(food)}
                >
                  {food.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        {selectedFood && (
          <Card className="food-info-card">
            <Card.Body>
              <Card.Title>{selectedFood.name}</Card.Title>
              <Card.Text>KCAL: {selectedFood.kcal}</Card.Text>
              <Card.Text>Протеин: {selectedFood.protein}</Card.Text>
              <Card.Text>Мазнини: {selectedFood.fat}</Card.Text>
              <Card.Text>Въглехидрати: {selectedFood.carbs}</Card.Text>
            </Card.Body>
          </Card>
        )}
        {selectedFood && (
          <div className="confirm-delete">
            <p>Сигурни ли сте, че искате да изтриете {selectedFood.name}?</p>
            <Button variant="danger" onClick={handleDelete}>
              Изтрий
            </Button>
          </div>
        )}
        {!food.length && (
          <p className="no-food-message">
            В момента няма налични продукти за изтриване.
          </p>
        )}
      </Form>
      <Footer />
    </div>
  );
}

export default DeleteFormFood;

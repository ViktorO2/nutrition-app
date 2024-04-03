import React, { useState, useEffect } from "react";
import foodClient from "../service/Client-axios";
import { Card, Spinner } from "react-bootstrap";
import "./FoodDetails.css";

const FoodDetails = ({ foodId }) => {
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodDescription = async () => {
      try {
        const description = await foodClient.getFoodDescriptionById(foodId);
        setDescription(description);
        setLoading(false);
      } catch (error) {
        console.error("Грешка при зареждане на описанието за храната:", error);
      }
    };
    fetchFoodDescription();
  }, [foodId]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Зареждане...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Card className="food-details-card">
      <Card.Body>
        <Card.Title className="food-details-title">
          Описание на храната
        </Card.Title>
        <Card.Text className="food-details-description">
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FoodDetails;

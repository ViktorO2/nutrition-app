import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import foodClient from "../../service/Client-axios";

export default function FoodAdd(){
    const [food,setFood]=useState({
        name: '',
        description: '',
        kcal: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
    });

    const handleAddFood = async (e) => {
        e.preventDefault();
        try {
            if (!food.name.trim()) {
                alert("Моля, въведете име на храната.");
                return;
            }
            if (!food.description.trim()) {
                alert("Моля, въведете описание на храната.");
                return;
            }

            if (food.kcal<=0 || isNaN(food.kcal)){
                alert("Моля, въведете валидни калории.");
                return;
            }
            if (food.protein<=0 || isNaN(food.protein)){
                alert("Моля, въведете валидни протеини.");
                return;
            }
            if (food.fat<=0 || isNaN(food.fat)){
                alert("Моля, въведете валидни мазнини.");
                return;
            }
            if (food.carbs<=0 || isNaN(food.carbs)){
                alert("Моля, въведете валидни въгхлехидрати.");
                return;
            }
            
            await foodClient.createFood(food);
            alert('Храната е добавена успешно!');
            resetForm();
        } catch (error) {
            console.error('Грешка при добавяне на храна:', error);
            alert('Грешка при добавяне на храна. Моля, опитайте отново.');
        }
    };

    const resetForm = () => {
        setFood({
            name: '',
            description: '',
            kcal: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
        });
    };

    return(
        <div>
        <Header/>
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "89vh" }}>
        <Form onSubmit={handleAddFood} className="card p-4 w-50 shadow ">
        <h4 className="mb-4">НОВА ХРАНА</h4>

        <Form.Group >
            <Form.Label>Име на храна</Form.Label>
            <Form.Control type="text" value={food.name} onChange={(e)=> setFood({...food,name: e.target.value})}/>
        </Form.Group>
        <Form.Group >
            <Form.Label>Описание</Form.Label>
            <Form.Control type="text"  value={food.description} onChange={(e) => setFood({ ...food, description: e.target.value })} />
        </Form.Group>
        <Form.Group >
            <Form.Label>Калории</Form.Label>
            <Form.Control type="number" value={food.kcal} onChange={(e) => setFood({ ...food, kcal: e.target.value })} />
        </Form.Group>
        <Form.Group >
            <Form.Label>Протеини</Form.Label>
            <Form.Control type="number" value={food.protein} onChange={(e) => setFood({ ...food, protein: e.target.value })} />
        </Form.Group>
        <Form.Group >
            <Form.Label>Мазнини</Form.Label>
            <Form.Control type="number" value={food.fat} onChange={(e) => setFood({ ...food, fat: e.target.value })} />
        </Form.Group>
        <Form.Group >
            <Form.Label>Въглехидрати</Form.Label>
            <Form.Control type="number" value={food.carbs} onChange={(e) => setFood({ ...food, carbs: e.target.value })}/>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 w-100">
            Добави храна
        </Button>
    </Form> 
    </div>
    <Footer/>
    </div>
);
    }
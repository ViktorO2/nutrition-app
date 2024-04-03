import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import FoodAdd from "./components/Food/Food_Add/FoodAdd";
import Layout from "./components/Layout/Layout";
import DeleteFormFood from "./components/DeleteForm/DeleteForm";
import foodClient from "./components/service/Client-axios";
function App() {
  const handleDeleteProduct = async (productId) => {
    try {
      await foodClient.deleteFood(productId);
      console.log("Продуктът е успешно изтрит с ID:", productId);
    } catch (error) {
      console.error("Грешка при изтриване на продукт:", error);
    }
  };

  return (
    <div className="App ">
      <Routes>
        <Route exact path="/" element={<Layout />}></Route>
        <Route path="/add" element={<FoodAdd />} />
        <Route
          path="/delete"
          element={<DeleteFormFood onDelete={handleDeleteProduct} />}
        />
      </Routes>
    </div>
  );
}

export default App;

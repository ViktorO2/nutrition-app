import axios from "axios";

const API_URL = "http://localhost:8080/api/foods";

function getAllFoods(success) {
  return axios
    .get(API_URL, {
      headers: {
        Accept: "application/json",
      },
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(success)
    .catch(console.error);
}

function createFood(data) {
  return axios
    .post(API_URL + "/add", JSON.stringify(data), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(checkStatus);
}

function updateFood(data) {
  return axios
    .put(API_URL + "/edit/" + data.id, JSON.stringify(data), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(checkStatus);
}

function deleteFood(id) {
  return axios
    .delete(`${API_URL}/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(checkStatus);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.error(error);
    throw error;
  }
}

function parseJSON(response) {
  return response.data;
}

function searchFood(query, success) {
  return axios
    .get(API_URL + "/search?query=" + query, {
      headers: {
        Accept: "application/json",
      },
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(success)
    .catch(console.error);
}

export async function getFoodById(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Грешка при извличане на храната с ID ${id}:`, error);
    throw error; // Хвърляне на грешката за обработка от викателя на функцията
  }
}
export async function getFoodDescriptionById(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data.description; // Връщане само на описанието на храната
  } catch (error) {
    console.error(
      `Грешка при извличане на описанието на храната с ID ${id}:`,
      error
    );
    throw error;
  }
}

const foodClient = {
  getAllFoods,
  createFood,
  updateFood,
  deleteFood,
  searchFood,
  getFoodById,
  getFoodDescriptionById,
};

export default foodClient;

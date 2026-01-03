import axios from "axios";

const API = "https://ngaf-backend.onrender.com";

export const loginAdmin = async (email, password) => {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  const res = await axios.post(`${API}/auth/login`, formData);
  return res.data; // { access_token }
};

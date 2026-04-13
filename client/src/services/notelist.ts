import axios from "axios";

let API_URL = "";

if (import.meta.env.VITE_MOOD === "development") {
  API_URL = import.meta.env.VITE_URL;
}

if (import.meta.env.VITE_MOOD === "production") {
  API_URL = import.meta.env.VITE_PR_URL;
}

axios.defaults.withCredentials = true;

//REST_API DATA Fetching
// export const fetchNotes = async () => {
//   const response = await fetch(`${API_URL}/todolists`);
//   console.log("API_URL:", API_URL);
//   const data = await response.json();
//   return data.result;
// };

// export const createNote = async (title: string) => {
//   const response = await fetch(`${API_URL}/create`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ title }),
//   });
//   const data = await response.json();
//   return data.result;
// };

// export const updateNote = async (id: string, title: string) => {
//   const response = await fetch(`${API_URL}/todolist-edit/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id, title }),
//   });
//   const data = await response.json();
//   return data.result;
// };

// export const deleteNote = async (id: string) => {
//   const response = await fetch(`${API_URL}/delete`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id }),
//   });
//   const data = await response.json();
//   return data.result;
// };

//AXIOS DATA Fetching

export const fetchNotes = async () => {
  const { data } = await axios.get(`${API_URL}/todolists`);
  return data.result;
};

export const createNote = async (title: string) => {
  const { data } = await axios.post(
    `${API_URL}/create`,
    { title },
    { withCredentials: true },
  );
  return data.result;
};

export const updateNote = async (id: string, title: string) => {
  const { data } = await axios.put(
    `${API_URL}/todolist-edit/${id}`,
    {
      id,
      title,
    },
    { withCredentials: true },
  );
  return data.result;
};

export const deleteNote = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/delete/${id}`, {
    withCredentials: true,
  });
  return data.result;
};

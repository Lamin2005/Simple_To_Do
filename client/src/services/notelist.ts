let API_URL = "";

if (import.meta.env.VITE_MOOD === "development") {
  API_URL = import.meta.env.VITE_URL;
}

if (import.meta.env.VITE_MOOD === "production") {
  API_URL = import.meta.env.VITE_PR_URL;
}

export const fetchNotes = async () => {
  const response = await fetch(`${API_URL}/todolists`);
  console.log("API_URL:", API_URL);
  const data = await response.json();
  return data.result;
};

export const createNote = async (title: string) => {
  const response = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await response.json();
  return data.result;
};

export const deleteNote = async (id: number) => {
  const response = await fetch(`${API_URL}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  return data.result;
};

import { API_AUTH_KEY } from "../constants";

export async function getKey() {
    const body = {
      name: "ApiKey",
    };
  
    try {
      const response = await fetch(API_AUTH_KEY, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
      });
  
      if (response.ok) {
        const apiKey = await response.json();
        localStorage.setItem("API-KEY", JSON.stringify(apiKey));
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong trying to get apiKey");
    }
  }

/*const options = {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmlkbWFuY2UiLCJlbWFpbCI6ImJpZG1hbmNlLnNsaW1hYkBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTczMjIxOTUwOH0.jZiaqkYhMgJIdaefNUKsZ8rHEzcWKEx7YWm6iQSfXfU',
      'X-Noroff-API-Key': '3be1b52e-353b-49e5-b590-19bcb4d76395'
    }
  };*/
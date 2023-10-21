import React from "react";

// import { useNavigate } from "react-router-dom";

export default async function CreateProfile(email) {
  try {
    const response = await fetch(`http://localhost:1337/api/profiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          Email: email,
        },
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data.data.id;
    } else {
      console.error("Failed to create a profile.");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Note: You should call CreateProfile() elsewhere in your application; it should not be logged.

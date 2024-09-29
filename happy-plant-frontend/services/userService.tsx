/**
 * Find a user by their username.
 *
 * @param name Name of the user to search for.
 * @returns If the user is found, returns the user data. If the user is not found, returns null.
 */
export async function searchUserByName(name: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/users/name/${encodeURIComponent(name)}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("User not found or server error.");
    }

    const userData = await response.json();

    return userData;
  } catch (error) {
    console.error("Error searching user by name: ", error);
    throw error;
  }
}

/**
 * Create a new user.
 *
 * @param name Name of the user to create.
 */
export async function createUser(name: string) {
  try {
    const response = await fetch(`http://localhost:8080/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Error creating user.");
    }
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
}

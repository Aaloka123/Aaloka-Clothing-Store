export const AUTH_TOKEN = "112233";

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string; // plain text
  role?: "admin" | "user";
}

// Login function
export const doLogin = (email: string, password: string): boolean => {
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "admin123";

  // Admin login
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem("AUTH_TOKEN", AUTH_TOKEN);
    localStorage.setItem("USER_EMAIL", email);
    localStorage.setItem("ROLE", "admin");
    return true;
  }

  // User login
  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    localStorage.setItem("AUTH_TOKEN", AUTH_TOKEN);
    localStorage.setItem("USER_EMAIL", email);
    localStorage.setItem("ROLE", foundUser.role || "user");
    return true;
  }

  return false;
};

// Logout
export const logout = () => {
  localStorage.removeItem("AUTH_TOKEN");
  localStorage.removeItem("USER_EMAIL");
  localStorage.removeItem("ROLE");
};

// Check if logged in
export const isLoggedIn = (): boolean => {
  return localStorage.getItem("AUTH_TOKEN") !== null;
};

// Get role
export const getUserRole = (): "admin" | "user" | null => {
  return (localStorage.getItem("ROLE") as "admin" | "user") || null;
};

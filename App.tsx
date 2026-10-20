import { useState } from "react";
import HomePage from "./src/pages/home";
import LoginPage from "./src/pages/login";
import SplashScreen from "./src/pages";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "splash" | "login" | "home"
  >("splash");

  if (currentScreen === "home") {
    return <HomePage onBackToLogin={() => setCurrentScreen("login")} />;
  }

  if (currentScreen === "login") {
    return <LoginPage onLoginSuccess={() => setCurrentScreen("home")} />;
  }

  return <SplashScreen onContinue={() => setCurrentScreen("login")} />;
}

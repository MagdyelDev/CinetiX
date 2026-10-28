import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import HomePage from "./src/pages/home";
import LoginPage from "./src/pages/login";
import RegisterPage from "./src/pages/register";
import SimulatorPage from "./src/pages/simulator";
import ComparePage from "./src/pages/compare";
import LawPage from "./src/pages/law";
import LabPage from "./src/pages/lab";
import ChallengesPage from "./src/pages/challenges";
import SplashScreen from "./src/pages";

type Account = { name: string; email: string; password: string };

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "splash" | "login" | "register" | "home" | "simulator" | "compare" | "law" | "lab" | "challenges"
  >("splash");
  const [account, setAccount] = useState<Account | null>(null);
  const [loggedInName, setLoggedInName] = useState("Visitante");

  useEffect(() => {
    AsyncStorage.getItem("cinetix_account")
      .then((saved) => {
        if (saved) setAccount(JSON.parse(saved));
      })
      .catch(() => undefined);
  }, []);

  const registerAccount = (registeredAccount: Account) => {
    setAccount(registeredAccount);
    setLoggedInName(registeredAccount.name);
    AsyncStorage.setItem("cinetix_account", JSON.stringify(registeredAccount)).catch(() => undefined);
    setCurrentScreen("home");
  };

  const backToHome = () => setCurrentScreen("home");

  if (currentScreen === "simulator") return <SimulatorPage onBack={backToHome} />;
  if (currentScreen === "compare") return <ComparePage onBack={backToHome} />;
  if (currentScreen === "law") return <LawPage onBack={backToHome} />;
  if (currentScreen === "lab") return <LabPage onBack={backToHome} />;
  if (currentScreen === "challenges") return <ChallengesPage onBack={backToHome} />;

  if (currentScreen === "home") {
    return (
      <HomePage
        userName={loggedInName}
        onBackToLogin={() => setCurrentScreen("login")}
        onNavigate={(destination) => setCurrentScreen(destination)}
      />
    );
  }

  if (currentScreen === "register") {
    return (
      <RegisterPage
        onRegister={registerAccount}
        onBackToLogin={() => setCurrentScreen("login")}
      />
    );
  }

  if (currentScreen === "login") {
    return (
      <LoginPage
        account={account}
        onLoginSuccess={(name) => {
          setLoggedInName(name);
          setCurrentScreen("home");
        }}
        onOpenRegister={() => setCurrentScreen("register")}
      />
    );
  }

  return <SplashScreen onContinue={() => setCurrentScreen("login")} />;
}

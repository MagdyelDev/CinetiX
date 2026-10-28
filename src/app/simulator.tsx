import { useRouter } from "expo-router";
import SimulatorPage from "../pages/simulator";
export default function SimulatorRoute() { const router = useRouter(); return <SimulatorPage onBack={() => router.replace("/home")}/>; }

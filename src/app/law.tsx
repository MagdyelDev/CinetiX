import { useRouter } from "expo-router";
import LawPage from "../pages/law";
export default function LawRoute() { const router = useRouter(); return <LawPage onBack={() => router.replace("/home")}/>; }

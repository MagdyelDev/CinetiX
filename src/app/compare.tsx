import { useRouter } from "expo-router";
import ComparePage from "../pages/compare";
export default function CompareRoute() { const router = useRouter(); return <ComparePage onBack={() => router.replace("/home")}/>; }

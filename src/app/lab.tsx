import { useRouter } from "expo-router";
import LabPage from "../pages/lab";
export default function LabRoute() { const router = useRouter(); return <LabPage onBack={() => router.replace("/home")}/>; }

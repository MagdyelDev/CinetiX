import { useRouter } from "expo-router";
import ChallengesPage from "../pages/challenges";
export default function ChallengesRoute() { const router = useRouter(); return <ChallengesPage onBack={() => router.replace("/home")}/>; }

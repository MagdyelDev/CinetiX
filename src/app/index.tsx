import { useRouter } from "expo-router";
import SplashScreen from "../pages";

export default function Index() {
  const router = useRouter();
  return <SplashScreen onContinue={() => router.replace("/login")} />;
}

import { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../features/styles";

export default function ChallengesPage({ onBack }: { onBack: () => void }) {
  const [missionSolved, setMissionSolved] = useState(false);
  const missions = [
    ["Missão 1 — Descubra o fator", "Compare duas reações controlando uma variável por vez."],
    ["Missão 2 — Detetive da velocidade", "Determine as ordens a partir da tabela experimental."],
    ["Missão 3 — O catalisador", "Identifique por que o catalisador reduz a energia de ativação."],
    ["Missão 4 — Preveja a reação", "Se [B] triplicar e sua ordem for 2, a velocidade aumenta 9 vezes."],
  ];
  return <SafeAreaView style={styles.screen}><StatusBar barStyle="dark-content" backgroundColor="#FFFEFA" />
    <View style={styles.topBar}><TouchableOpacity onPress={onBack} style={styles.back}><Text style={styles.backText}>← Início</Text></TouchableOpacity><Text style={styles.pageTitle}>Desafios</Text><View style={{ width: 60 }} /></View>
    <ScrollView contentContainerStyle={styles.content}><Text style={styles.intro}>Resolva missões para reforçar os conceitos.</Text>{missions.map(([mission, description], index) => <TouchableOpacity key={mission} style={[styles.mission, missionSolved && index === 0 && styles.missionSolved]} onPress={() => index === 0 && setMissionSolved(true)}><Text style={styles.cardTitle}>{mission}</Text><Text style={styles.body}>{description}</Text></TouchableOpacity>)}{missionSolved && <View style={styles.quiz}><Text style={styles.answer}>Missão 1 concluída! Mantenha os demais fatores constantes.</Text></View>}</ScrollView>
  </SafeAreaView>;
}

import { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../features/styles";

function Option({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <TouchableOpacity style={[styles.option, selected && styles.optionSelected]} onPress={onPress}><Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text></TouchableOpacity>;
}

export default function SimulatorPage({ onBack }: { onBack: () => void }) {
  const [factor, setFactor] = useState("Temperatura");
  const [factorValue, setFactorValue] = useState(25);
  const [catalyst, setCatalyst] = useState(false);

  return <SafeAreaView style={styles.screen}>
    <StatusBar barStyle="dark-content" backgroundColor="#FFFEFA" />
    <View style={styles.topBar}><TouchableOpacity onPress={onBack} style={styles.back}><Text style={styles.backText}>← Início</Text></TouchableOpacity><Text style={styles.pageTitle}>Simulador de fatores</Text><View style={{ width: 60 }} /></View>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.intro}>Escolha um fator, mantenha os outros constantes e observe o gráfico.</Text>
      <View style={styles.row}>{["Temperatura", "Concentração", "Superfície", "Catalisador"].map(item => <Option key={item} label={item} selected={factor === item} onPress={() => setFactor(item)} />)}</View>
      <View style={styles.card}><Text style={styles.cardTitle}>Investigar: {factor}</Text>
        {factor === "Temperatura" ? <><Text style={styles.label}>Temperatura: {factorValue} °C</Text><View style={styles.sliderFake}><View style={[styles.sliderPart, { left: `${Math.min(90, factorValue)}%` }]} /></View></> : factor === "Concentração" ? <Text style={styles.largeValue}>{factorValue <= 25 ? "1,0 mol/L" : "2,0 mol/L"}</Text> : factor === "Superfície" ? <Text style={styles.largeValue}>Pó / partículas menores</Text> : <Option label={catalyst ? "Catalisador presente" : "Sem catalisador"} selected={catalyst} onPress={() => setCatalyst(v => !v)} />}
        <TouchableOpacity style={styles.measureButton} onPress={() => { setFactorValue(v => v >= 75 ? 25 : v + 25); setCatalyst(v => !v); }}><Text style={styles.measureText}>Alterar condição</Text></TouchableOpacity>
      </View>
      <View style={styles.card}><Text style={styles.cardTitle}>Concentração × tempo</Text><View style={styles.chartArea}>{[72,58,44,31,20].map((height, index) => <View key={index} style={[styles.chartBar, { height: height * (factorValue > 25 || catalyst ? 0.75 : 1) }]} />)}</View><Text style={styles.explanation}>{factorValue > 25 || catalyst ? "Maior velocidade: a curva diminui mais rapidamente." : "A curva representa a reação nas condições selecionadas."}</Text></View>
      <View style={styles.quiz}><Text style={styles.cardTitle}>Interpretação</Text><Text style={styles.body}>Qual fator foi alterado?</Text><Text style={styles.answer}>Resposta: {factor}.</Text><Text style={styles.body}>Qual reação foi mais rápida?</Text><Text style={styles.answer}>A condição com maior intensidade do fator selecionado.</Text></View>
    </ScrollView>
  </SafeAreaView>;
}

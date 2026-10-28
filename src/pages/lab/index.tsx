import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../features/styles";

type LabRecord = { id: number; reaction: string; factor: string; concentration: string; temperature: string; time: string; rate: string; observation: string };
const factors = ["Temperatura", "Concentração", "Superfície", "Catalisador"];

export default function LabPage({ onBack }: { onBack: () => void }) {
  const [reaction, setReaction] = useState(""); const [factor, setFactor] = useState("Temperatura"); const [concentration, setConcentration] = useState(""); const [temperature, setTemperature] = useState(""); const [time, setTime] = useState(""); const [observation, setObservation] = useState(""); const [error, setError] = useState(""); const [records, setRecords] = useState<LabRecord[]>([]);

  useEffect(() => { AsyncStorage.getItem("cinetix_lab_records").then(saved => { if (saved) setRecords(JSON.parse(saved)); }).catch(() => undefined); }, []);
  const persist = (items: LabRecord[]) => { setRecords(items); AsyncStorage.setItem("cinetix_lab_records", JSON.stringify(items)).catch(() => undefined); };
  const save = () => {
    const seconds = Number(time.replace(",", ".")); const concentrationValue = Number(concentration.replace(",", "."));
    if (!reaction.trim()) { setError("Informe o nome da reação."); return; }
    if (!Number.isFinite(seconds) || seconds <= 0) { setError("O tempo deve ser maior que zero."); return; }
    if (!Number.isFinite(concentrationValue) || concentrationValue <= 0) { setError("Informe uma concentração inicial válida."); return; }
    const rate = concentrationValue / seconds;
    persist([{ id: Date.now(), reaction: reaction.trim(), factor, concentration, temperature, time, rate: rate.toFixed(4).replace(".", ","), observation: observation.trim() }, ...records]);
    setReaction(""); setConcentration(""); setTemperature(""); setTime(""); setObservation(""); setError("");
  };
  const previewRate = Number(concentration.replace(",", ".")) / Number(time.replace(",", "."));

  return <SafeAreaView style={styles.screen}><StatusBar barStyle="dark-content" backgroundColor="#FFFEFA" />
    <View style={styles.topBar}><TouchableOpacity onPress={onBack} style={styles.back}><Text style={styles.backText}>← Início</Text></TouchableOpacity><Text style={styles.pageTitle}>Laboratório</Text><View style={{ width: 60 }} /></View>
    <ScrollView contentContainerStyle={styles.content}><Text style={styles.intro}>Faça um registro simples: mantenha apenas o fator selecionado variável.</Text>
      <View style={styles.card}><Text style={styles.cardTitle}>1. Novo experimento</Text><Text style={styles.fieldLabel}>Nome da reação</Text><TextInput style={styles.input} placeholder="Ex.: reação do zinco com ácido" value={reaction} onChangeText={setReaction} />
        <Text style={styles.fieldLabel}>Qual fator você está estudando?</Text><View style={styles.choiceRow}>{factors.map(item => <TouchableOpacity key={item} style={[styles.choiceButton, factor === item && styles.choiceButtonActive]} onPress={() => setFactor(item)}><Text style={[styles.choiceButtonText, factor === item && styles.choiceButtonTextActive]}>{item}</Text></TouchableOpacity>)}</View>
        <Text style={styles.fieldLabel}>2. Dados coletados</Text><View style={styles.labInputRow}><View style={styles.labInputGroup}><Text style={styles.inputHint}>Concentração inicial (mol/L)</Text><TextInput style={styles.input} placeholder="0,10" value={concentration} onChangeText={setConcentration} keyboardType="decimal-pad" /></View><View style={styles.labInputGroup}><Text style={styles.inputHint}>Temperatura (°C)</Text><TextInput style={styles.input} placeholder="25" value={temperature} onChangeText={setTemperature} keyboardType="decimal-pad" /></View></View><Text style={styles.inputHint}>Tempo observado (s)</Text><TextInput style={styles.input} placeholder="Ex.: 30" value={time} onChangeText={setTime} keyboardType="decimal-pad" />
        <Text style={styles.fieldLabel}>Observação</Text><TextInput style={[styles.input, styles.textArea]} placeholder="O que mudou? Como foi o resultado?" value={observation} onChangeText={setObservation} multiline />
        {Number.isFinite(previewRate) && previewRate > 0 && <View style={styles.quiz}><Text style={styles.body}>Velocidade estimada</Text><Text style={styles.answer}>{previewRate.toFixed(4).replace(".", ",")} mol·L⁻¹·s⁻¹</Text><Text style={styles.body}>Cálculo: concentração ÷ tempo.</Text></View>}{!!error && <Text style={styles.errorText}>{error}</Text>}<TouchableOpacity style={styles.measureButton} onPress={save}><Text style={styles.measureText}>Salvar experimento</Text></TouchableOpacity>
      </View>
      <View style={styles.card}><Text style={styles.cardTitle}>Histórico ({records.length})</Text>{records.length === 0 ? <Text style={styles.body}>Nenhum experimento salvo ainda.</Text> : records.map((item, index) => <View style={styles.record} key={item.id}><View style={styles.recordHeader}><Text style={styles.recordTitle}>{records.length-index}. {item.reaction}</Text><TouchableOpacity onPress={() => persist(records.filter(record => record.id !== item.id))}><Text style={styles.deleteText}>Excluir</Text></TouchableOpacity></View><Text style={styles.body}>Fator: {item.factor} • Concentração: {item.concentration} mol/L • Temperatura: {item.temperature || "não informada"} °C</Text><Text style={styles.body}>Tempo: {item.time} s • Velocidade: {item.rate} mol·L⁻¹·s⁻¹</Text>{!!item.observation && <Text style={styles.observationText}>Observação: {item.observation}</Text>}</View>)}</View>
    </ScrollView>
  </SafeAreaView>;
}

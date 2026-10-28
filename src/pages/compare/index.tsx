import { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../features/styles";

type Condition = { temperature: number; concentration: number; surface: "Peças" | "Pó"; catalyst: boolean };
const initialA: Condition = { temperature: 25, concentration: 1, surface: "Peças", catalyst: false };
const initialB: Condition = { temperature: 50, concentration: 1, surface: "Peças", catalyst: false };

function Choice({ value, options, onChange }: { value: string | number | boolean; options: { label: string; value: string | number | boolean }[]; onChange: (value: any) => void }) {
  return <View style={styles.choiceRow}>{options.map(option => <TouchableOpacity key={String(option.value)} style={[styles.choiceButton, value === option.value && styles.choiceButtonActive]} onPress={() => onChange(option.value)}><Text style={[styles.choiceButtonText, value === option.value && styles.choiceButtonTextActive]}>{option.label}</Text></TouchableOpacity>)}</View>;
}

function ReactionCard({ title, condition, setCondition, color }: { title: string; condition: Condition; setCondition: (condition: Condition) => void; color: string }) {
  return <View style={styles.conditionCard}><View style={[styles.conditionHeader, { borderLeftColor: color }]}><Text style={styles.cardTitle}>{title}</Text></View>
    <Text style={styles.fieldLabel}>Temperatura</Text><Choice value={condition.temperature} options={[{ label: "25 °C", value: 25 }, { label: "50 °C", value: 50 }, { label: "75 °C", value: 75 }]} onChange={(temperature) => setCondition({ ...condition, temperature })} />
    <Text style={styles.fieldLabel}>Concentração</Text><Choice value={condition.concentration} options={[{ label: "1×", value: 1 }, { label: "2×", value: 2 }]} onChange={(concentration) => setCondition({ ...condition, concentration })} />
    <Text style={styles.fieldLabel}>Superfície</Text><Choice value={condition.surface} options={[{ label: "Peças", value: "Peças" }, { label: "Pó", value: "Pó" }]} onChange={(surface) => setCondition({ ...condition, surface })} />
    <Text style={styles.fieldLabel}>Catalisador</Text><Choice value={condition.catalyst} options={[{ label: "Sem", value: false }, { label: "Com", value: true }]} onChange={(catalyst) => setCondition({ ...condition, catalyst })} />
  </View>;
}

export default function ComparePage({ onBack }: { onBack: () => void }) {
  const [conditionA, setConditionA] = useState<Condition>(initialA);
  const [conditionB, setConditionB] = useState<Condition>(initialB);
  const speed = (condition: Condition) => 1 * (condition.temperature === 25 ? 1 : condition.temperature === 50 ? 1.8 : 2.8) * (condition.concentration === 1 ? 1 : 1.7) * (condition.surface === "Peças" ? 1 : 1.5) * (condition.catalyst ? 2.2 : 1);
  const result = useMemo(() => { const a = speed(conditionA); const b = speed(conditionB); return { a, b, difference: Math.abs(a - b), faster: a === b ? "As duas reações têm velocidade igual" : a > b ? "A reação A é mais rápida" : "A reação B é mais rápida" }; }, [conditionA, conditionB]);
  const max = Math.max(result.a, result.b, 1);

  return <SafeAreaView style={styles.screen}><StatusBar barStyle="dark-content" backgroundColor="#FFFEFA" />
    <View style={styles.topBar}><TouchableOpacity onPress={onBack} style={styles.back}><Text style={styles.backText}>← Início</Text></TouchableOpacity><Text style={styles.pageTitle}>Comparar reações</Text><View style={{ width: 60 }} /></View>
    <ScrollView contentContainerStyle={styles.content}><Text style={styles.intro}>Altere uma condição por vez para entender como cada fator atua na velocidade.</Text>
      <View style={styles.comparisonCards}><ReactionCard title="Reação A" condition={conditionA} setCondition={setConditionA} color="#18569B" /><ReactionCard title="Reação B" condition={conditionB} setCondition={setConditionB} color="#F4A51C" /></View>
      <View style={styles.card}><Text style={styles.cardTitle}>Velocidade relativa</Text><Text style={styles.body}>O valor 1 representa a reação básica de referência.</Text><View style={styles.resultBarRow}><Text style={styles.resultBarLabel}>A</Text><View style={styles.resultBarTrack}><View style={[styles.resultBarA, { width: `${Math.min(100, result.a / max * 100)}%` }]} /></View><Text style={styles.resultValue}>{result.a.toFixed(1)}×</Text></View><View style={styles.resultBarRow}><Text style={styles.resultBarLabel}>B</Text><View style={styles.resultBarTrack}><View style={[styles.resultBarB, { width: `${Math.min(100, result.b / max * 100)}%` }]} /></View><Text style={styles.resultValue}>{result.b.toFixed(1)}×</Text></View></View>
      <View style={styles.quiz}><Text style={styles.cardTitle}>Conclusão</Text><Text style={styles.answer}>{result.faster}</Text>{result.difference > 0 && <Text style={styles.body}>A diferença aproximada é de {result.difference.toFixed(1)} ponto(s) de velocidade relativa.</Text>}<Text style={styles.body}>Os fatores multiplicam o efeito uns dos outros: temperatura, concentração, superfície e catalisador podem acelerar a reação em conjunto.</Text></View>
    </ScrollView>
  </SafeAreaView>;
}

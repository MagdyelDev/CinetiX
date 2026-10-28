import { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../features/styles";

type LawId = "rate" | "zero" | "first" | "second" | "half" | "arrhenius";
const laws: { id: LawId; name: string; formula: string; explanation: string }[] = [
  { id: "rate", name: "Lei da velocidade", formula: "v = k[A]ᵐ[B]ⁿ", explanation: "Os expoentes m e n são as ordens da reação. Eles mostram como cada concentração influencia a velocidade." },
  { id: "zero", name: "Ordem zero", formula: "[A] = [A]₀ − kt", explanation: "A velocidade não depende da concentração de A. A concentração diminui de forma constante ao longo do tempo." },
  { id: "first", name: "Primeira ordem", formula: "ln[A] = ln[A]₀ − kt", explanation: "Dobrar [A] duplica a velocidade. O logaritmo da concentração diminui linearmente com o tempo." },
  { id: "second", name: "Segunda ordem", formula: "1/[A] = 1/[A]₀ + kt", explanation: "Dobrar [A] multiplica a velocidade por quatro. Esse comportamento é comum em reações entre moléculas." },
  { id: "half", name: "Tempo de meia-vida", formula: "t₁/₂ = 0,693/k", explanation: "Tempo necessário para a concentração inicial cair pela metade. Na primeira ordem, esse tempo é constante." },
  { id: "arrhenius", name: "Equação de Arrhenius", formula: "k = A · e⁻ᵃ/ᵣᵀ", explanation: "Relaciona a velocidade com a temperatura. Aquecer a reação aumenta k e facilita os choques efetivos." },
];

export default function LawPage({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<LawId>("rate");
  const [lawAnswer, setLawAnswer] = useState("");
  const [k, setK] = useState("");
  const current = laws.find(item => item.id === selected)!;
  const rows = [["1", "0,10", "0,10", "2,0"], ["2", "0,20", "0,10", "4,0"], ["3", "0,10", "0,20", "8,0"]];
  const halfLife = Number(k.replace(",", "."));
  return <SafeAreaView style={styles.screen}><StatusBar barStyle="dark-content" backgroundColor="#FFFEFA" />
    <View style={styles.topBar}><TouchableOpacity onPress={onBack} style={styles.back}><Text style={styles.backText}>← Início</Text></TouchableOpacity><Text style={styles.pageTitle}>Leis da cinética</Text><View style={{ width: 60 }} /></View>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.intro}>Escolha uma lei para ver a fórmula, o significado e um exemplo prático.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.lawTabs}>{laws.map(law => <TouchableOpacity key={law.id} style={[styles.lawTab, selected === law.id && styles.lawTabActive]} onPress={() => setSelected(law.id)}><Text style={[styles.lawTabText, selected === law.id && styles.lawTabTextActive]}>{law.name}</Text></TouchableOpacity>)}</ScrollView>
      <View style={styles.card}><Text style={styles.cardTitle}>{current.name}</Text><Text style={styles.formula}>{current.formula}</Text><Text style={styles.body}>{current.explanation}</Text></View>
      {selected === "rate" && <><View style={styles.table}><View style={styles.tableRow}><Text style={styles.tableHead}>Exp.</Text><Text style={styles.tableHead}>[A]</Text><Text style={styles.tableHead}>[B]</Text><Text style={styles.tableHead}>Velocidade</Text></View>{rows.map(row => <View style={styles.tableRow} key={row[0]}>{row.map((cell, i) => <Text key={i} style={styles.tableCell}>{cell}</Text>)}</View>)}</View><View style={styles.card}><Text style={styles.cardTitle}>Pratique: descubra a ordem</Text><Text style={styles.body}>Ao dobrar [A] mantendo [B], a velocidade dobrou. Qual é a ordem em A?</Text><TextInput style={styles.input} value={lawAnswer} onChangeText={setLawAnswer} placeholder="Digite 0, 1 ou 2" keyboardType="numeric" /><Text style={styles.answer}>{lawAnswer === "1" ? "Correto! A ordem em A é 1." : "Compare o fator pelo qual a concentração mudou com o fator da velocidade."}</Text><Text style={styles.body}>Ao dobrar [B], a velocidade ficou quatro vezes maior: ordem em B = 2. Portanto, v = k[A][B]².</Text></View></>}
      {selected === "half" && <View style={styles.card}><Text style={styles.cardTitle}>Calcular meia-vida</Text><Text style={styles.body}>Informe a constante k de uma reação de primeira ordem (em s⁻¹).</Text><TextInput style={styles.input} value={k} onChangeText={setK} placeholder="Ex.: 0,0693" keyboardType="decimal-pad" />{halfLife > 0 && <View style={styles.quiz}><Text style={styles.answer}>t₁/₂ ≈ {halfLife.toFixed(3)} s</Text><Text style={styles.body}>A cada {halfLife.toFixed(3)} segundos, metade do reagente restante é consumida.</Text></View>}</View>}
    </ScrollView>
  </SafeAreaView>;
}

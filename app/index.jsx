import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Collapsible from "@/components/Collapsible";

// Import your JSON data for each subject
import banglaGrammar from "@/assets/json/bangla_grammar.json";
import banglaLiterature from "@/assets/json/bangla_literature.json";
import englishGrammar from "@/assets/json/english_grammar.json";
import englishLiterature from "@/assets/json/english_literature.json";
import mathematicalReasoning from "@/assets/json/mathematics.json";
import mentalAbility from "@/assets/json/Mental Ability.json";
import bangladeshPolitics from "@/assets/json/bangladesh_affairs.json";
import internationalPolitics from "@/assets/json/international_affairs.json";
import science from "@/assets/json/science.json";
import computerIct from "@/assets/json/computer_ict.json";
import geography from "@/assets/json/geography.json";
import EthicsValuesAndGoodGovernance from "@/assets/json/ethics_values ​_good_governance.json";
import { Link } from "expo-router";

const subjects = [
  { name: "Bangla Grammar", data: banglaGrammar },
  { name: "Bangla Literature", data: banglaLiterature },
  { name: "English Grammar", data: englishGrammar },
  { name: "English Literature", data: englishLiterature },
  { name: "Mathematics", data: mathematicalReasoning },
  { name: "Mental Ability", data: mentalAbility },
  { name: "Bangladesh Affairs", data: bangladeshPolitics },
  { name: "International Affairs", data: internationalPolitics },
  { name: "Science", data: science },
  { name: "Computer & ICT", data: computerIct },
  { name: "Geography", data: geography },
  {
    name: "Ethics, Values ​​and Good Governance",
    data: EthicsValuesAndGoodGovernance,
  },
];

const Index = () => {
  const renderSubject = ({ item }) => (
    <Collapsible title={item.name} data={item.data} />
  );

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        ListHeaderComponent={
          <Text className="text-2xl font-bold text-center mt-4 mb-2">
            {`বিসিএস প্রিলিমিনারি কোর্স (রেকর্ডেড)`}
          </Text>
        }
        showsVerticalScrollIndicator={false}
        data={subjects}
        renderItem={renderSubject}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};
export default Index;

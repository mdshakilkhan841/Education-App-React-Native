import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useWatchHistory } from "@/store/watchHistory";

const Collapsible = ({ title, data, children }) => {
  const router = useRouter();
  const { watchHistory, loadWatchHistory, saveWatchHistory } =
    useWatchHistory();
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the collapsible section
  const toggleCollapsible = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Effect to load last watched item once when the component mounts
  useEffect(() => {
    loadWatchHistory();
  }, []);

  // Function to handle item press
  const handleItemPress = (item) => {
    router.push({
      pathname: "/videoWatch",
      params: {
        subject: title,
        item: JSON.stringify(item),
        playlist: JSON.stringify(data),
      },
    });
    saveWatchHistory({ id: item.id, subject: title }); // Save when a new item is watched
  };

  // Render function for each item in the list
  const renderItem = ({ item }) => (
    <View
      className={`${
        title === watchHistory?.subject && item.id === watchHistory?.id
          ? "bg-red-100"
          : "bg-white"
      } flex-row px-4 py-2 border border-dashed`}
    >
      <Text className="text-base font-semibold w-8">{item.id} .</Text>
      <View className="flex-1">
        <TouchableOpacity onPress={() => handleItemPress(item)}>
          <Text className="text-base font-semibold" numberOfLines={0}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
      {title === watchHistory?.subject && item.id === watchHistory?.id ? (
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="play-pause" size={30} color="black" />
        </View>
      ) : null}
    </View>
  );

  return (
    <View className="my-1">
      <TouchableOpacity
        onPress={toggleCollapsible}
        className={`${
          title === watchHistory?.subject ? "bg-red-200" : "bg-cyan-200"
        } flex-row items-center p-2 space-x-2 border border-black-300`}
      >
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={"black"}
        />
        <Text className="text-lg font-semibold flex-1" numberOfLines={0}>
          {title}
        </Text>
        {watchHistory?.subject === title ? (
          <View className="flex-row items-center space-x-2">
            <Text className="text-xs italic">Last watched</Text>
            <Text className="text-lg font-semibold italic">
              L-{watchHistory.id}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
      {isOpen && (
        <View className="bg-cyan-100">
          {children}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

export default Collapsible;

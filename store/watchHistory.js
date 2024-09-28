import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useWatchHistory = create((set) => ({
    watchHistory: null,

    loadWatchHistory: async () => {
        try {
            const lastWatchedItem = await AsyncStorage.getItem("watchHistory");
            if (lastWatchedItem) {
                set({ watchHistory: JSON.parse(lastWatchedItem) });
            }
        } catch (error) {
            console.error("Error loading last watched item:", error);
        }
    },

    saveWatchHistory: async (item) => {
        try {
            await AsyncStorage.setItem("watchHistory", JSON.stringify(item));
            set({ watchHistory: item });
        } catch (error) {
            console.error("Error saving last watched item:", error);
        }
    },

    clearWatchHistory: async () => {
        try {
            await AsyncStorage.clear();
            set({ watchHistory: null });
        } catch (error) {
            console.error("Error clearing watch history:", error);
        }
    },
}));
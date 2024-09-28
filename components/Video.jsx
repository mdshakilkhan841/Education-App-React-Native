import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import * as ScreenOrientation from "expo-screen-orientation";
import { useWatchHistory } from "@/store/watchHistory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

const Video = ({ videoNo, videoId, title, subject, playlist }) => {
  const playerRef = useRef(null);
  const { saveWatchHistory } = useWatchHistory();
  const handleFullScreenChange = (isFullScreen) => {
    if (isFullScreen) {
      // Switch to landscape mode
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      // Switch back to portrait mode
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };

  const [currentVideoNo, setCurrentVideoNo] = useState(videoNo);
  const [currentVideoId, setCurrentVideoId] = useState(videoId);
  const [currentTitle, setCurrentTitle] = useState(title);

  const handleVideoPress = (newVideoNo, newVideoId, newTitle) => {
    setCurrentVideoNo(newVideoNo);
    setCurrentVideoId(newVideoId);
    setCurrentTitle(newTitle);

    saveWatchHistory({ id: newVideoNo, subject });
  };

  return (
    <View className="flex-1 bg-gray-100">
      <YoutubePlayer
        play
        ref={playerRef}
        height={(width * 9) / 16}
        videoId={currentVideoId}
        onFullScreenChange={handleFullScreenChange}
        onChangeState={(event) => {
          if (event === "ended") {
            handleFullScreenChange(false); // Exit fullscreen mode if video ends or is paused
          }
        }}
      />
      <View className="flex-row px-4 py-2 bg-white border-b border-gray-300">
        <Text className="text-base font-bold w-8">{currentVideoNo} .</Text>
        <View className="flex-1">
          <Text className="text-base font-bold" numberOfLines={0}>
            {currentTitle}
          </Text>
        </View>
      </View>
      <ScrollView className="flex-1">
        <View className="flex-row items-center justify-between px-4 py-2 bg-slate-200 border-b border-dashed">
          <Text className="text-lg font-bold">Next in playlist</Text>
          <MaterialIcons name="playlist-add" size={30} color="black" />
        </View>
        {playlist?.map((item) => (
          <TouchableOpacity
            key={item.id}
            className={`${
              item.videoId === currentVideoId ? "bg-red-100" : "bg-slate-100"
            } flex-row px-4 py-2 border-b border-dashed`}
            onPress={() => {
              handleVideoPress(item.id, item.videoId, item.title);
            }}
          >
            <Text className="text-base font-semibold w-8">{item.id} .</Text>
            <View className="flex-1">
              <Text className="text-base font-semibold" numberOfLines={0}>
                {item.title}
              </Text>
            </View>
            {item.videoId === currentVideoId ? (
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="play-pause"
                  size={30}
                  color="black"
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Video;

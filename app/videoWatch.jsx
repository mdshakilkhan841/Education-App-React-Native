import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "@/components/Video";
import { useLocalSearchParams } from "expo-router";

const videoWatch = () => {
  const params = useLocalSearchParams();
  // Parse the stringified JSON data
  const item = JSON.parse(params?.item);
  const subject = params?.subject;
  const playlist = JSON.parse(params?.playlist);

  return (
    <SafeAreaView className="flex-1">
      <Video
        videoNo={item.id}
        videoId={item.videoId}
        title={item.title}
        subject={subject}
        playlist={playlist}
      />
    </SafeAreaView>
  );
};

export default videoWatch;

import icons from "@/constants/icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { formatName, getColorFromName, getInitials } from "../utils/nameUtils";

interface AvatarProps {
  name?: string;
  avatar?: string;
  onImageChange?: (uri: string) => void;
}

const Avatar = ({ name, avatar, onImageChange }: AvatarProps) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImageUri(selectedUri);
      setImageError(false);
      onImageChange?.(selectedUri);
    }
  };

  return (
    <View className="flex flex-col items-center relative mt-5">
      {(imageUri || (avatar && !imageError)) ? (
        <Image
          source={{ uri: imageUri || avatar }}
          className="size-44 rounded-full"
          onError={() => setImageError(true)}
        />
      ) : (
        <View
          className="size-44 rounded-full flex items-center justify-center"
          style={{ backgroundColor: getColorFromName(name) }}
        >
          <Text className="text-4xl font-rubik-bold text-white">
            {getInitials(name)}
          </Text>
        </View>
      )}

      <TouchableOpacity
        className="absolute bottom-12 right-9 bg-white p-2 rounded-full shadow"
        onPress={pickImage}
      >
        <Image source={icons.edit} className="size-6" />
      </TouchableOpacity>

      <Text className="text-2xl font-rubik-bold mt-2">{formatName(name)}</Text>
    </View>
  );
};

export default Avatar;

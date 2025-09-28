/**
 * Avatar Component
 * -----------------------------------------------------------------------------
 * Displays a circular user avatar.
 *  - Shows uploaded image if available
 *  - Falls back to initials with color background
 *  - Supports inline editing via Image Picker
 *
 * Props:
 *  - name?: string               → User’s name (for initials & color)
 *  - avatar?: string             → Existing avatar URI
 *  - onImageChange?: (uri) => {} → Callback when a new image is selected
 *  - size?: number               → Avatar size in pixels
 *  - editable?: boolean          → Enable edit button
 *  - minimal?: boolean           → Hide edit button & name label
 */

import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import icons from "@/constants/icons";
import { formatName, getColorFromName, getInitials } from "@/utils/nameUtils";

/* -------------------------------------------------------------------------- */
/*                              TYPE DEFINITIONS                               */
/* -------------------------------------------------------------------------- */

interface AvatarProps {
  name?: string;
  avatar?: string;
  onImageChange?: (uri: string) => void;
  size?: number;
  editable?: boolean;
  minimal?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               AVATAR COMPONENT                              */
/* -------------------------------------------------------------------------- */

const Avatar: React.FC<AvatarProps> = ({
  name,
  avatar,
  onImageChange,
  size = 176,
  editable = true,
  minimal = false,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  /* -------------------------- IMAGE PICKER HANDLER ------------------------- */
  const pickImage = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      setImageError(false);
      onImageChange?.(uri);
    }
  }, [onImageChange]);

  /* ---------------------------- AVATAR CONTENT ----------------------------- */
  const avatarContent =
    imageUri || (avatar && !imageError) ? (
      <Image
        source={{ uri: imageUri || avatar }}
        className="rounded-full"
        style={{ width: size, height: size }}
        onError={() => setImageError(true)}
      />
    ) : (
      <View
        className="rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          backgroundColor: getColorFromName(name),
        }}
      >
        <Text className="text-white font-rubik-bold" style={{ fontSize: size / 3 }}>
          {getInitials(name)}
        </Text>
      </View>
    );

  /* ------------------------------ RENDER ----------------------------------- */
  return (
    <View className="relative items-center">
      {avatarContent}

      {!minimal && editable && (
        <TouchableOpacity
          className="absolute bg-white p-2 rounded-full shadow"
          style={{ bottom: size / 6, right: size / 6 }}
          onPress={pickImage}
          activeOpacity={0.7}
        >
          <Image source={icons.edit} className="w-6 h-6" />
        </TouchableOpacity>
      )}

      {!minimal && (
        <Text className="text-2xl font-rubik-bold mt-2">{formatName(name)}</Text>
      )}
    </View>
  );
};

export default Avatar;

import SettingsPage from "@/components/SettingsPage";
import React from "react";

const PrivacyScreen = () => {
  return (
    <SettingsPage 
      title="Privacy Settings" 
      description="Control your privacy preferences and account security."
    >
      {/* هنا تضيف سويتشز (toggles) زي: إظهار/إخفاء البريد */}
    </SettingsPage>
  );
};

export default PrivacyScreen;

import SettingsPage from "@/components/SettingsPage";
import React from "react";

const WalletScreen = () => {
  return (
    <SettingsPage 
      title="My Wallet" 
      description="Manage your balance, transactions, and payment methods."
    >
      {/* هنا ممكن تضيف زر Add Card أو قائمة معاملات */}
    </SettingsPage>
  );
};

export default WalletScreen;

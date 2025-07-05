
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import MapComponent from "@/components/MapComponent";
import { DataPetani } from "@/components/DataPetani";
import { DataSawah } from "@/components/DataSawah";
import { Marketplace } from "@/components/Marketplace";
import { ManajemenPupuk } from "@/components/ManajemenPupuk";
import { Statistik } from "@/components/Statistik";
import { Pengaturan } from "@/components/Pengaturan";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'peta':
        return <MapComponent />;
      case 'petani':
        return <DataPetani />;
      case 'sawah':
        return <DataSawah />;
      case 'marketplace':
        return <Marketplace />;
      case 'pupuk':
        return <ManajemenPupuk />;
      case 'statistik':
        return <Statistik />;
      case 'pengaturan':
        return <Pengaturan />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;


import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Layers, Palette } from "lucide-react";
import { CoordinateManagement } from "./pengaturan/CoordinateManagement";
import { LayerManagement } from "./pengaturan/LayerManagement";
import { LegendManagement } from "./pengaturan/LegendManagement";
import { Koordinat, LayerDemografi, LegendaItem } from "./pengaturan/pengaturan-types";

export const Pengaturan = () => {
  // State untuk koordinat
  const [koordinatList, setKoordinatList] = useState<Koordinat[]>([
    {
      id: 1,
      nama: "Kantor Desa Sukamaju",
      latitude: -7.2575,
      longitude: 112.7521,
      tipe: "Fasilitas Umum",
      deskripsi: "Kantor pemerintahan desa"
    },
    {
      id: 2,
      nama: "Pasar Desa",
      latitude: -7.2580,
      longitude: 112.7530,
      tipe: "Ekonomi",
      deskripsi: "Pusat perdagangan lokal"
    }
  ]);

  // State untuk layer demografi
  const [layerList, setLayerList] = useState<LayerDemografi[]>([
    {
      id: 1,
      nama: "Kepadatan Penduduk",
      warna: "#3B82F6",
      properti: "populasi",
      rentangNilai: "0-1000 jiwa/km²",
      visible: true
    },
    {
      id: 2,
      nama: "Tingkat Pendidikan",
      warna: "#10B981",
      properti: "pendidikan",
      rentangNilai: "SD-Sarjana",
      visible: true
    }
  ]);

  // State untuk legenda
  const [legendaList, setLegendaList] = useState<LegendaItem[]>([
    {
      id: 1,
      label: "Sawah Produktif",
      warna: "#22c55e",
      simbol: "polygon",
      kategori: "Pertanian"
    },
    {
      id: 2,
      label: "Sawah Non-Produktif",
      warna: "#f59e0b",
      simbol: "polygon",
      kategori: "Pertanian"
    },
    {
      id: 3,
      label: "Fasilitas Umum",
      warna: "#3b82f6",
      simbol: "marker",
      kategori: "Infrastruktur"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Peta Tematik</h1>
      </div>

      <Tabs defaultValue="koordinat" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="koordinat" className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Koordinat</span>
          </TabsTrigger>
          <TabsTrigger value="layer" className="flex items-center space-x-2">
            <Layers className="h-4 w-4" />
            <span>Layer Demografi</span>
          </TabsTrigger>
          <TabsTrigger value="legenda" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span>Legenda</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="koordinat" className="space-y-4">
          <CoordinateManagement 
            koordinatList={koordinatList}
            setKoordinatList={setKoordinatList}
          />
        </TabsContent>

        <TabsContent value="layer" className="space-y-4">
          <LayerManagement 
            layerList={layerList}
            setLayerList={setLayerList}
          />
        </TabsContent>

        <TabsContent value="legenda" className="space-y-4">
          <LegendManagement 
            legendaList={legendaList}
            setLegendaList={setLegendaList}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

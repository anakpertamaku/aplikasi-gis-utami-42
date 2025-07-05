
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CrudForm, FormField } from "@/components/ui/crud-form";
import { MapPicker } from "@/components/MapPicker";
import { Koordinat } from "./pengaturan-types";

interface CoordinateManagementProps {
  koordinatList: Koordinat[];
  setKoordinatList: React.Dispatch<React.SetStateAction<Koordinat[]>>;
}

export const CoordinateManagement: React.FC<CoordinateManagementProps> = ({
  koordinatList,
  setKoordinatList
}) => {
  const { toast } = useToast();
  
  // Form states
  const [isKoordinatFormOpen, setIsKoordinatFormOpen] = useState(false);
  const [editingKoordinat, setEditingKoordinat] = useState<Koordinat | null>(null);

  // Map picker states
  const [selectedLatitude, setSelectedLatitude] = useState(-7.2575);
  const [selectedLongitude, setSelectedLongitude] = useState(112.7521);

  // Form fields untuk koordinat
  const koordinatFields: FormField[] = [
    { name: 'nama', label: 'Nama Lokasi', type: 'text', required: true },
    { 
      name: 'tipe', 
      label: 'Tipe Lokasi', 
      type: 'select', 
      required: true,
      options: [
        { value: 'Fasilitas Umum', label: 'Fasilitas Umum' },
        { value: 'Ekonomi', label: 'Ekonomi' },
        { value: 'Pertanian', label: 'Pertanian' },
        { value: 'Pemukiman', label: 'Pemukiman' }
      ]
    },
    { name: 'deskripsi', label: 'Deskripsi', type: 'text' }
  ];

  // Handler functions untuk koordinat
  const handleAddKoordinat = (data: any) => {
    const newKoordinat: Koordinat = {
      id: koordinatList.length + 1,
      nama: data.nama,
      latitude: selectedLatitude,
      longitude: selectedLongitude,
      tipe: data.tipe,
      deskripsi: data.deskripsi || ''
    };
    setKoordinatList([...koordinatList, newKoordinat]);
    toast({
      title: "Berhasil",
      description: "Koordinat baru telah ditambahkan"
    });
  };

  const handleEditKoordinat = (data: any) => {
    if (!editingKoordinat) return;
    const updatedKoordinat: Koordinat = {
      ...editingKoordinat,
      nama: data.nama,
      latitude: selectedLatitude,
      longitude: selectedLongitude,
      tipe: data.tipe,
      deskripsi: data.deskripsi || ''
    };
    setKoordinatList(koordinatList.map(k => k.id === editingKoordinat.id ? updatedKoordinat : k));
    setEditingKoordinat(null);
    toast({
      title: "Berhasil",
      description: "Koordinat telah diperbarui"
    });
  };

  const handleDeleteKoordinat = (id: number) => {
    setKoordinatList(koordinatList.filter(k => k.id !== id));
    toast({
      title: "Berhasil",
      description: "Koordinat telah dihapus"
    });
  };

  const handleCoordinateSelect = (lat: number, lng: number) => {
    setSelectedLatitude(lat);
    setSelectedLongitude(lng);
  };

  const handleOpenKoordinatForm = (koordinat: Koordinat | null = null) => {
    if (koordinat) {
      setEditingKoordinat(koordinat);
      setSelectedLatitude(koordinat.latitude);
      setSelectedLongitude(koordinat.longitude);
    } else {
      setEditingKoordinat(null);
      setSelectedLatitude(-7.2575);
      setSelectedLongitude(112.7521);
    }
    setIsKoordinatFormOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manajemen Titik Koordinat</CardTitle>
          <Button onClick={() => handleOpenKoordinatForm()}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Koordinat
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {koordinatList.map((koordinat) => (
              <div key={koordinat.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{koordinat.nama}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Koordinat:</span> {koordinat.latitude.toFixed(6)}, {koordinat.longitude.toFixed(6)}
                      </div>
                      <div>
                        <span className="font-medium">Tipe:</span>
                        <Badge variant="outline" className="ml-2">{koordinat.tipe}</Badge>
                      </div>
                    </div>
                    {koordinat.deskripsi && (
                      <p className="text-sm text-gray-600">{koordinat.deskripsi}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenKoordinatForm(koordinat)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteKoordinat(koordinat.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Modal with Map Integration */}
      {isKoordinatFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingKoordinat ? "Edit Koordinat" : "Tambah Koordinat Baru"}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsKoordinatFormOpen(false);
                    setEditingKoordinat(null);
                  }}
                >
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Pilih Lokasi pada Peta</h3>
                  <MapPicker
                    latitude={selectedLatitude}
                    longitude={selectedLongitude}
                    onCoordinateSelect={handleCoordinateSelect}
                    height="350px"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Detail Koordinat</h3>
                  <CrudForm
                    isOpen={true}
                    onClose={() => {}}
                    onSubmit={editingKoordinat ? handleEditKoordinat : handleAddKoordinat}
                    fields={koordinatFields}
                    title=""
                    description=""
                    initialData={editingKoordinat}
                    mode={editingKoordinat ? "edit" : "create"}
                    hideDialog={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

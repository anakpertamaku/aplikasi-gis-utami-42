
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CrudForm, FormField } from "@/components/ui/crud-form";
import { LegendaItem } from "./pengaturan-types";

interface LegendManagementProps {
  legendaList: LegendaItem[];
  setLegendaList: React.Dispatch<React.SetStateAction<LegendaItem[]>>;
}

export const LegendManagement: React.FC<LegendManagementProps> = ({
  legendaList,
  setLegendaList
}) => {
  const { toast } = useToast();
  
  // Form states
  const [isLegendaFormOpen, setIsLegendaFormOpen] = useState(false);
  const [editingLegenda, setEditingLegenda] = useState<LegendaItem | null>(null);

  // Form fields untuk legenda
  const legendaFields: FormField[] = [
    { name: 'label', label: 'Label', type: 'text', required: true },
    { name: 'warna', label: 'Warna (Hex)', type: 'text', required: true, placeholder: '#22c55e' },
    { 
      name: 'simbol', 
      label: 'Simbol', 
      type: 'select', 
      required: true,
      options: [
        { value: 'polygon', label: 'Polygon' },
        { value: 'marker', label: 'Marker' },
        { value: 'line', label: 'Line' },
        { value: 'circle', label: 'Circle' }
      ]
    },
    { 
      name: 'kategori', 
      label: 'Kategori', 
      type: 'select', 
      required: true,
      options: [
        { value: 'Pertanian', label: 'Pertanian' },
        { value: 'Infrastruktur', label: 'Infrastruktur' },
        { value: 'Demografi', label: 'Demografi' },
        { value: 'Ekonomi', label: 'Ekonomi' }
      ]
    }
  ];

  // Handler functions untuk legenda
  const handleAddLegenda = (data: any) => {
    const newLegenda: LegendaItem = {
      id: legendaList.length + 1,
      label: data.label,
      warna: data.warna,
      simbol: data.simbol,
      kategori: data.kategori
    };
    setLegendaList([...legendaList, newLegenda]);
    toast({
      title: "Berhasil",
      description: "Item legenda baru telah ditambahkan"
    });
  };

  const handleEditLegenda = (data: any) => {
    if (!editingLegenda) return;
    const updatedLegenda: LegendaItem = {
      ...editingLegenda,
      label: data.label,
      warna: data.warna,
      simbol: data.simbol,
      kategori: data.kategori
    };
    setLegendaList(legendaList.map(l => l.id === editingLegenda.id ? updatedLegenda : l));
    setEditingLegenda(null);
    toast({
      title: "Berhasil",
      description: "Item legenda telah diperbarui"
    });
  };

  const handleDeleteLegenda = (id: number) => {
    setLegendaList(legendaList.filter(l => l.id !== id));
    toast({
      title: "Berhasil",
      description: "Item legenda telah dihapus"
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manajemen Legenda Peta</CardTitle>
          <Button onClick={() => setIsLegendaFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Legenda
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {legendaList.map((legenda) => (
              <div key={legenda.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: legenda.warna }}
                      ></div>
                      <h3 className="font-semibold">{legenda.label}</h3>
                      <Badge variant="outline">{legenda.kategori}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Simbol:</span> {legenda.simbol}
                      </div>
                      <div>
                        <span className="font-medium">Warna:</span> {legenda.warna}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingLegenda(legenda);
                        setIsLegendaFormOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteLegenda(legenda.id)}
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

      <CrudForm
        isOpen={isLegendaFormOpen}
        onClose={() => {
          setIsLegendaFormOpen(false);
          setEditingLegenda(null);
        }}
        onSubmit={editingLegenda ? handleEditLegenda : handleAddLegenda}
        fields={legendaFields}
        title={editingLegenda ? "Edit Legenda" : "Tambah Legenda Baru"}
        description="Kelola item legenda peta"
        initialData={editingLegenda}
        mode={editingLegenda ? "edit" : "create"}
      />
    </>
  );
};

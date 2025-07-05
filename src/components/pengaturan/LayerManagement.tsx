
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CrudForm, FormField } from "@/components/ui/crud-form";
import { LayerDemografi } from "./pengaturan-types";

interface LayerManagementProps {
  layerList: LayerDemografi[];
  setLayerList: React.Dispatch<React.SetStateAction<LayerDemografi[]>>;
}

export const LayerManagement: React.FC<LayerManagementProps> = ({
  layerList,
  setLayerList
}) => {
  const { toast } = useToast();
  
  // Form states
  const [isLayerFormOpen, setIsLayerFormOpen] = useState(false);
  const [editingLayer, setEditingLayer] = useState<LayerDemografi | null>(null);

  // Form fields untuk layer
  const layerFields: FormField[] = [
    { name: 'nama', label: 'Nama Layer', type: 'text', required: true },
    { name: 'warna', label: 'Warna (Hex)', type: 'text', required: true, placeholder: '#3B82F6' },
    { name: 'properti', label: 'Properti Data', type: 'text', required: true },
    { name: 'rentangNilai', label: 'Rentang Nilai', type: 'text', required: true }
  ];

  // Handler functions untuk layer
  const handleAddLayer = (data: any) => {
    const newLayer: LayerDemografi = {
      id: layerList.length + 1,
      nama: data.nama,
      warna: data.warna,
      properti: data.properti,
      rentangNilai: data.rentangNilai,
      visible: true
    };
    setLayerList([...layerList, newLayer]);
    toast({
      title: "Berhasil",
      description: "Layer baru telah ditambahkan"
    });
  };

  const handleEditLayer = (data: any) => {
    if (!editingLayer) return;
    const updatedLayer: LayerDemografi = {
      ...editingLayer,
      nama: data.nama,
      warna: data.warna,
      properti: data.properti,
      rentangNilai: data.rentangNilai
    };
    setLayerList(layerList.map(l => l.id === editingLayer.id ? updatedLayer : l));
    setEditingLayer(null);
    toast({
      title: "Berhasil",
      description: "Layer telah diperbarui"
    });
  };

  const handleDeleteLayer = (id: number) => {
    setLayerList(layerList.filter(l => l.id !== id));
    toast({
      title: "Berhasil",
      description: "Layer telah dihapus"
    });
  };

  const toggleLayerVisibility = (id: number) => {
    setLayerList(layerList.map(l => 
      l.id === id ? { ...l, visible: !l.visible } : l
    ));
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manajemen Layer Demografi</CardTitle>
          <Button onClick={() => setIsLayerFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Layer
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {layerList.map((layer) => (
              <div key={layer.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: layer.warna }}
                      ></div>
                      <h3 className="font-semibold">{layer.nama}</h3>
                      <Badge variant={layer.visible ? "default" : "secondary"}>
                        {layer.visible ? "Visible" : "Hidden"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Properti:</span> {layer.properti}
                      </div>
                      <div>
                        <span className="font-medium">Rentang:</span> {layer.rentangNilai}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleLayerVisibility(layer.id)}
                    >
                      {layer.visible ? "Hide" : "Show"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingLayer(layer);
                        setIsLayerFormOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteLayer(layer.id)}
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
        isOpen={isLayerFormOpen}
        onClose={() => {
          setIsLayerFormOpen(false);
          setEditingLayer(null);
        }}
        onSubmit={editingLayer ? handleEditLayer : handleAddLayer}
        fields={layerFields}
        title={editingLayer ? "Edit Layer" : "Tambah Layer Baru"}
        description="Kelola layer demografi pada peta"
        initialData={editingLayer}
        mode={editingLayer ? "edit" : "create"}
      />
    </>
  );
};

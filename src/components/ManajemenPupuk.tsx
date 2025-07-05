
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Beaker, Package2, Calendar, AlertTriangle, Plus, Eye } from "lucide-react";

export const ManajemenPupuk = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const pupukData = [
    {
      id: 1,
      nama: "Urea",
      jenis: "Nitrogen",
      stok: 500,
      satuan: "kg",
      harga: 2500,
      supplier: "PT Pupuk Indonesia",
      tanggalBeli: "2024-01-15",
      tanggalKadaluarsa: "2024-12-31",
      lokasi: "Gudang A",
      status: "Tersedia",
      penggunaan: [
        { tanggal: "2024-01-20", jumlah: 50, petani: "Budi Santoso", lahan: "Sawah A" },
        { tanggal: "2024-01-25", jumlah: 30, petani: "Sari Wati", lahan: "Sawah B" }
      ]
    },
    {
      id: 2,
      nama: "NPK 16-16-16",
      jenis: "Majemuk",
      stok: 300,
      satuan: "kg",
      harga: 3500,
      supplier: "PT Pupuk Majemuk",
      tanggalBeli: "2024-02-01",
      tanggalKadaluarsa: "2025-01-31",
      lokasi: "Gudang A",
      status: "Tersedia",
      penggunaan: [
        { tanggal: "2024-02-05", jumlah: 25, petani: "Joko Widodo", lahan: "Sawah C" }
      ]
    },
    {
      id: 3,
      nama: "TSP (Triple Super Phosphate)",
      jenis: "Fosfor",
      stok: 150,
      satuan: "kg",
      harga: 4000,
      supplier: "PT Agro Kimia",
      tanggalBeli: "2024-01-10",
      tanggalKadaluarsa: "2024-06-30",
      lokasi: "Gudang B",
      status: "Segera Habis",
      penggunaan: [
        { tanggal: "2024-01-15", jumlah: 40, petani: "Rina Sari", lahan: "Sawah D" }
      ]
    },
    {
      id: 4,
      nama: "KCl (Kalium Klorida)",
      jenis: "Kalium",
      stok: 0,
      satuan: "kg",
      harga: 3200,
      supplier: "PT Pupuk Kalium",
      tanggalBeli: "2023-12-01",
      tanggalKadaluarsa: "2024-11-30",
      lokasi: "Gudang B",
      status: "Habis",
      penggunaan: [
        { tanggal: "2024-01-10", jumlah: 35, petani: "Budi Santoso", lahan: "Sawah A" }
      ]
    }
  ];

  const filteredPupuk = pupukData.filter(pupuk =>
    pupuk.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pupuk.jenis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tersedia": return "bg-green-100 text-green-800";
      case "Segera Habis": return "bg-yellow-100 text-yellow-800";
      case "Habis": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStokWarning = (stok: number) => {
    if (stok === 0) return "text-red-600";
    if (stok < 100) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manajemen Pupuk</h2>
          <p className="text-gray-600">Kelola stok dan distribusi pupuk untuk petani</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Package2 className="h-4 w-4" />
          <span>{pupukData.length} Jenis Pupuk</span>
        </div>
      </div>

      <div className="flex space-x-4 items-center">
        <Input
          placeholder="Cari nama pupuk atau jenis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Pupuk
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Stok Pupuk Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nama">Nama Pupuk</Label>
                <Input id="nama" placeholder="Masukkan nama pupuk" />
              </div>
              <div>
                <Label htmlFor="jenis">Jenis</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis pupuk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nitrogen">Nitrogen</SelectItem>
                    <SelectItem value="fosfor">Fosfor</SelectItem>
                    <SelectItem value="kalium">Kalium</SelectItem>
                    <SelectItem value="majemuk">Majemuk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stok">Stok</Label>
                  <Input id="stok" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="harga">Harga/kg</Label>
                  <Input id="harga" type="number" placeholder="0" />
                </div>
              </div>
              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <Input id="supplier" placeholder="Nama supplier" />
              </div>
              <div>
                <Label htmlFor="kadaluarsa">Tanggal Kadaluarsa</Label>
                <Input id="kadaluarsa" type="date" />
              </div>
              <Button className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPupuk.map((pupuk) => (
          <Card key={pupuk.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{pupuk.nama}</CardTitle>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Beaker className="h-4 w-4 mr-1" />
                    {pupuk.jenis}
                  </div>
                </div>
                <Badge className={getStatusColor(pupuk.status)}>
                  {pupuk.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Stok</p>
                    <p className={`font-semibold ${getStokWarning(pupuk.stok)}`}>
                      {pupuk.stok} {pupuk.satuan}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Harga</p>
                    <p className="font-semibold">Rp {pupuk.harga.toLocaleString()}/kg</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Supplier</p>
                    <p className="text-sm font-medium">{pupuk.supplier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lokasi</p>
                    <p className="text-sm font-medium">{pupuk.lokasi}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Kadaluarsa</p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <p className="text-sm font-medium">{pupuk.tanggalKadaluarsa}</p>
                    {new Date(pupuk.tanggalKadaluarsa) < new Date(Date.now() + 30*24*60*60*1000) && (
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Detail
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Detail Pupuk - {pupuk.nama}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Jenis</p>
                            <p className="text-sm text-gray-600">{pupuk.jenis}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Stok</p>
                            <p className="text-sm text-gray-600">{pupuk.stok} {pupuk.satuan}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Supplier</p>
                            <p className="text-sm text-gray-600">{pupuk.supplier}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Lokasi</p>
                            <p className="text-sm text-gray-600">{pupuk.lokasi}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">Riwayat Penggunaan</p>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {pupuk.penggunaan.map((usage, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <div>
                                  <p className="text-sm font-medium">{usage.petani}</p>
                                  <p className="text-xs text-gray-600">{usage.lahan} - {usage.tanggal}</p>
                                </div>
                                <p className="text-sm font-semibold">{usage.jumlah} kg</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" disabled={pupuk.stok === 0}>
                    Distribusi
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

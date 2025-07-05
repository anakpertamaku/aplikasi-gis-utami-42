
import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DataTable } from "@/components/ui/data-table"
import { CrudForm, FormField } from "@/components/ui/crud-form"
import { useToast } from "@/hooks/use-toast"

interface Sawah {
  id: number
  nama: string
  petani: string
  luas: number
  koordinat: string
  jenisVarietas: string
  musimTanam: string
  hasilPanen: number
  statusTanam: string
  tanggalTanam?: string
  tanggalPanen?: string
  irigasi?: string
  jenisLahan?: string
  catatan?: string
}

export const DataSawah = () => {
  const { toast } = useToast()
  const [sawahData, setSawahData] = useState<Sawah[]>([
    {
      id: 1,
      nama: "Sawah Pak Budi - Blok A",
      petani: "Budi Santoso",
      luas: 2.5,
      koordinat: "-7.2575, 112.7521",
      jenisVarietas: "IR64",
      musimTanam: "Gadu 2024",
      hasilPanen: 8.2,
      statusTanam: "Panen",
      tanggalTanam: "2024-01-15",
      tanggalPanen: "2024-05-20",
      irigasi: "Teknis",
      jenisLahan: "Sawah Irigasi",
      catatan: "Hasil panen memuaskan, kualitas gabah baik"
    },
    {
      id: 2,
      nama: "Sawah Bu Sari - Blok B",
      petani: "Sari Wati",
      luas: 1.8,
      koordinat: "-7.2585, 112.7531",
      jenisVarietas: "Ciherang",
      musimTanam: "Rendeng 2024",
      hasilPanen: 6.5,
      statusTanam: "Tanam",
      tanggalTanam: "2024-11-01",
      tanggalPanen: "2025-03-15",
      irigasi: "Semi Teknis",
      jenisLahan: "Sawah Irigasi",
      catatan: "Pertumbuhan normal, perlu pupuk tambahan"
    },
    {
      id: 3,
      nama: "Sawah Pak Joko - Blok C",
      petani: "Joko Widodo",
      luas: 3.2,
      koordinat: "-7.2565, 112.7511",
      jenisVarietas: "Inpari 32",
      musimTanam: "Gadu 2024",
      hasilPanen: 10.1,
      statusTanam: "Panen",
      tanggalTanam: "2024-02-01",
      tanggalPanen: "2024-06-10",
      irigasi: "Teknis",
      jenisLahan: "Sawah Irigasi",
      catatan: "Hasil tertinggi musim ini, varietas unggul"
    },
    {
      id: 4,
      nama: "Sawah Bu Rina - Blok D",
      petani: "Rina Sari",
      luas: 2.1,
      koordinat: "-7.2595, 112.7541",
      jenisVarietas: "IR64",
      musimTanam: "Rendeng 2024",
      hasilPanen: 7.8,
      statusTanam: "Vegetatif",
      tanggalTanam: "2024-10-15",
      tanggalPanen: "2025-02-28",
      irigasi: "Sederhana",
      jenisLahan: "Sawah Tadah Hujan",
      catatan: "Bergantung curah hujan, perlu monitoring"
    },
  ])

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [selectedSawah, setSelectedSawah] = useState<Sawah | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sawahToDelete, setSawahToDelete] = useState<Sawah | null>(null)

  const formFields: FormField[] = [
    { name: "nama", label: "Nama/Kode Sawah", type: "text", required: true, placeholder: "Contoh: Sawah Pak Budi - Blok A" },
    { name: "petani", label: "Nama Petani Pemilik", type: "text", required: true, placeholder: "Nama pemilik sawah" },
    { name: "luas", label: "Luas Lahan (Ha)", type: "number", required: true, placeholder: "Luas dalam hektar", step: "0.1" },
    { name: "koordinat", label: "Koordinat GPS", type: "text", required: true, placeholder: "Contoh: -7.2575, 112.7521" },
    { 
      name: "jenisLahan", 
      label: "Jenis Lahan", 
      type: "select", 
      required: true,
      options: [
        { value: "Sawah Irigasi", label: "Sawah Irigasi" },
        { value: "Sawah Tadah Hujan", label: "Sawah Tadah Hujan" },
        { value: "Sawah Rawa", label: "Sawah Rawa" },
        { value: "Sawah Lebak", label: "Sawah Lebak" }
      ]
    },
    { 
      name: "irigasi", 
      label: "Sistem Irigasi", 
      type: "select", 
      required: true,
      options: [
        { value: "Teknis", label: "Teknis" },
        { value: "Semi Teknis", label: "Semi Teknis" },
        { value: "Sederhana", label: "Sederhana" },
        { value: "Tadah Hujan", label: "Tadah Hujan" }
      ]
    },
    { 
      name: "jenisVarietas", 
      label: "Jenis Varietas Padi", 
      type: "select", 
      required: true,
      options: [
        { value: "IR64", label: "IR64" },
        { value: "Ciherang", label: "Ciherang" },
        { value: "Inpari 32", label: "Inpari 32" },
        { value: "Segreng", label: "Segreng" },
        { value: "Mapan", label: "Mapan" },
        { value: "Mekongga", label: "Mekongga" }
      ]
    },
    { name: "musimTanam", label: "Musim Tanam", type: "text", required: true, placeholder: "Contoh: Gadu 2024 atau Rendeng 2024" },
    { name: "tanggalTanam", label: "Tanggal Tanam", type: "date", required: false },
    { name: "tanggalPanen", label: "Tanggal Panen (Estimasi/Aktual)", type: "date", required: false },
    { name: "hasilPanen", label: "Hasil Panen (Ton/Ha)", type: "number", required: true, placeholder: "Hasil panen per hektar", step: "0.1" },
    { 
      name: "statusTanam", 
      label: "Status Pertumbuhan", 
      type: "select", 
      required: true,
      options: [
        { value: "Persiapan", label: "Persiapan Lahan" },
        { value: "Tanam", label: "Masa Tanam" },
        { value: "Vegetatif", label: "Fase Vegetatif" },
        { value: "Generatif", label: "Fase Generatif" },
        { value: "Panen", label: "Siap Panen/Sudah Panen" },
        { value: "Bera", label: "Masa Bera" }
      ]
    },
    { name: "catatan", label: "Catatan Tambahan", type: "textarea", required: false, placeholder: "Catatan kondisi lahan, kendala, atau informasi lainnya" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Panen": return "bg-green-100 text-green-800";
      case "Tanam": return "bg-blue-100 text-blue-800";
      case "Vegetatif": return "bg-yellow-100 text-yellow-800";
      case "Generatif": return "bg-purple-100 text-purple-800";
      case "Persiapan": return "bg-orange-100 text-orange-800";
      case "Bera": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  const handleAdd = () => {
    setFormMode("create")
    setSelectedSawah(null)
    setIsFormOpen(true)
  }

  const handleEdit = (sawah: Sawah) => {
    setFormMode("edit")
    setSelectedSawah(sawah)
    setIsFormOpen(true)
  }

  const handleDelete = (sawah: Sawah) => {
    setSawahToDelete(sawah)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (sawahToDelete) {
      setSawahData(prev => prev.filter(s => s.id !== sawahToDelete.id))
      toast({
        title: "Berhasil",
        description: `Data sawah ${sawahToDelete.nama} berhasil dihapus.`,
      })
      setSawahToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleFormSubmit = (data: any) => {
    if (formMode === "create") {
      const newId = Math.max(...sawahData.map(s => s.id)) + 1
      const newSawah: Sawah = {
        id: newId,
        nama: data.nama,
        petani: data.petani,
        luas: data.luas,
        koordinat: data.koordinat,
        jenisVarietas: data.jenisVarietas,
        musimTanam: data.musimTanam,
        hasilPanen: data.hasilPanen,
        statusTanam: data.statusTanam,
        tanggalTanam: data.tanggalTanam,
        tanggalPanen: data.tanggalPanen,
        irigasi: data.irigasi,
        jenisLahan: data.jenisLahan,
        catatan: data.catatan
      }
      setSawahData(prev => [...prev, newSawah])
      toast({
        title: "Berhasil",
        description: `Data sawah ${data.nama} berhasil ditambahkan.`,
      })
    } else if (formMode === "edit" && selectedSawah) {
      const updatedSawah: Sawah = {
        ...selectedSawah,
        nama: data.nama,
        petani: data.petani,
        luas: data.luas,
        koordinat: data.koordinat,
        jenisVarietas: data.jenisVarietas,
        musimTanam: data.musimTanam,
        hasilPanen: data.hasilPanen,
        statusTanam: data.statusTanam,
        tanggalTanam: data.tanggalTanam,
        tanggalPanen: data.tanggalPanen,
        irigasi: data.irigasi,
        jenisLahan: data.jenisLahan,
        catatan: data.catatan
      }
      setSawahData(prev => prev.map(s => s.id === selectedSawah.id ? updatedSawah : s))
      toast({
        title: "Berhasil",
        description: `Data sawah ${data.nama} berhasil diperbarui.`,
      })
    }
    setIsFormOpen(false)
  }

  const columns: ColumnDef<Sawah>[] = [
    {
      accessorKey: "nama",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Sawah
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("nama")}</div>,
    },
    {
      accessorKey: "petani",
      header: "Petani",
    },
    {
      accessorKey: "luas",
      header: "Luas",
      cell: ({ row }) => <div>{row.getValue("luas")} Ha</div>,
    },
    {
      accessorKey: "jenisVarietas",
      header: "Varietas",
    },
    {
      accessorKey: "musimTanam",
      header: "Musim Tanam",
    },
    {
      accessorKey: "hasilPanen",
      header: "Hasil Panen",
      cell: ({ row }) => {
        const hasil = row.getValue("hasilPanen") as number
        const colorClass = hasil > 8 ? "text-green-600" : hasil > 6 ? "text-yellow-600" : "text-red-600"
        return <div className={colorClass}>{hasil} Ton/Ha</div>
      },
    },
    {
      accessorKey: "statusTanam",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("statusTanam") as string
        return (
          <Badge className={getStatusColor(status)}>
            {status}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const sawah = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Buka menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(sawah)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleDelete(sawah)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data Sawah</h2>
        <p className="text-gray-600">Kelola data lahan sawah dengan fitur CRUD lengkap dan informasi detail</p>
      </div>

      <DataTable
        columns={columns}
        data={sawahData}
        searchKey="nama"
        onAdd={handleAdd}
        addButtonLabel="Tambah Sawah"
        title="Data Sawah"
      />

      <CrudForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        fields={formFields}
        title={formMode === "create" ? "Tambah Data Sawah Baru" : "Edit Data Sawah"}
        description={formMode === "create" ? "Masukkan data sawah baru dengan informasi lengkap" : "Perbarui data sawah"}
        initialData={selectedSawah}
        mode={formMode}
        wide={true}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data Sawah</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data sawah {sawahToDelete?.nama}? 
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

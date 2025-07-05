
import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { CrudForm } from "@/components/ui/crud-form"
import { useToast } from "@/hooks/use-toast"
import { Sawah } from "./data-sawah/types"
import { sawahFormFields } from "./data-sawah/formFields"
import { createSawahColumns } from "./data-sawah/SawahColumns"
import { DeleteSawahDialog } from "./data-sawah/DeleteSawahDialog"

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

  const columns = createSawahColumns({
    onEdit: handleEdit,
    onDelete: handleDelete
  })

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
        fields={sawahFormFields}
        title={formMode === "create" ? "Tambah Data Sawah Baru" : "Edit Data Sawah"}
        description={formMode === "create" ? "Masukkan data sawah baru dengan informasi lengkap" : "Perbarui data sawah"}
        initialData={selectedSawah}
        mode={formMode}
        wide={true}
      />

      <DeleteSawahDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        sawah={sawahToDelete}
      />
    </div>
  )
}

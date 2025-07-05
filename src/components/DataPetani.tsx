
import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { CrudForm } from "@/components/ui/crud-form"
import { useToast } from "@/hooks/use-toast"
import { Petani } from "./data-petani/types"
import { petaniFormFields } from "./data-petani/formFields"
import { createPetaniColumns } from "./data-petani/PetaniColumns"
import { DeletePetaniDialog } from "./data-petani/DeletePetaniDialog"

export const DataPetani = () => {
  const { toast } = useToast()
  const [petaniData, setPetaniData] = useState<Petani[]>([
    {
      id: 1,
      nama: "Budi Santoso",
      umur: 45,
      alamat: "Desa Sukamaju RT 02/03",
      jumlahSawah: 2,
      totalLuas: 2.5,
      totalHasil: 20.5,
      status: "Aktif",
      noTelepon: "081234567890",
      email: "budi.santoso@email.com",
      jenisKelamin: "Laki-laki",
      pendidikan: "SMA",
      pengalaman: 20
    },
    {
      id: 2,
      nama: "Sari Wati",
      umur: 38,
      alamat: "Desa Sukamaju RT 01/02",
      jumlahSawah: 1,
      totalLuas: 1.8,
      totalHasil: 11.7,
      status: "Aktif",
      noTelepon: "081234567891",
      email: "sari.wati@email.com",
      jenisKelamin: "Perempuan",
      pendidikan: "SMP",
      pengalaman: 15
    },
    {
      id: 3,
      nama: "Joko Widodo",
      umur: 52,
      alamat: "Desa Sukamaju RT 03/04",
      jumlahSawah: 3,
      totalLuas: 3.2,
      totalHasil: 32.3,
      status: "Aktif",
      noTelepon: "081234567892",
      email: "joko.widodo@email.com",
      jenisKelamin: "Laki-laki",
      pendidikan: "SD",
      pengalaman: 25
    },
    {
      id: 4,
      nama: "Rina Sari",
      umur: 41,
      alamat: "Desa Sukamaju RT 02/04",
      jumlahSawah: 1,
      totalLuas: 2.1,
      totalHasil: 16.4,
      status: "Aktif",
      noTelepon: "081234567893",
      email: "rina.sari@email.com",
      jenisKelamin: "Perempuan",
      pendidikan: "SMA",
      pengalaman: 18
    },
  ])

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [selectedPetani, setSelectedPetani] = useState<Petani | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [petaniToDelete, setPetaniToDelete] = useState<Petani | null>(null)

  const handleAdd = () => {
    setFormMode("create")
    setSelectedPetani(null)
    setIsFormOpen(true)
  }

  const handleEdit = (petani: Petani) => {
    setFormMode("edit")
    setSelectedPetani(petani)
    setIsFormOpen(true)
  }

  const handleDelete = (petani: Petani) => {
    setPetaniToDelete(petani)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (petaniToDelete) {
      setPetaniData(prev => prev.filter(p => p.id !== petaniToDelete.id))
      toast({
        title: "Berhasil",
        description: `Data petani ${petaniToDelete.nama} berhasil dihapus.`,
      })
      setPetaniToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleFormSubmit = (data: any) => {
    if (formMode === "create") {
      const newId = Math.max(...petaniData.map(p => p.id)) + 1
      const newPetani: Petani = {
        id: newId,
        nama: data.nama,
        umur: data.umur,
        alamat: data.alamat,
        jumlahSawah: data.jumlahSawah,
        totalLuas: data.totalLuas,
        totalHasil: data.totalHasil,
        status: data.status,
        noTelepon: data.noTelepon,
        email: data.email,
        jenisKelamin: data.jenisKelamin,
        pendidikan: data.pendidikan,
        pengalaman: data.pengalaman
      }
      setPetaniData(prev => [...prev, newPetani])
      toast({
        title: "Berhasil",
        description: `Data petani ${data.nama} berhasil ditambahkan.`,
      })
    } else if (formMode === "edit" && selectedPetani) {
      const updatedPetani: Petani = {
        ...selectedPetani,
        nama: data.nama,
        umur: data.umur,
        alamat: data.alamat,
        jumlahSawah: data.jumlahSawah,
        totalLuas: data.totalLuas,
        totalHasil: data.totalHasil,
        status: data.status,
        noTelepon: data.noTelepon,
        email: data.email,
        jenisKelamin: data.jenisKelamin,
        pendidikan: data.pendidikan,
        pengalaman: data.pengalaman
      }
      setPetaniData(prev => prev.map(p => p.id === selectedPetani.id ? updatedPetani : p))
      toast({
        title: "Berhasil",
        description: `Data petani ${data.nama} berhasil diperbarui.`,
      })
    }
    setIsFormOpen(false)
  }

  const columns = createPetaniColumns({
    onEdit: handleEdit,
    onDelete: handleDelete
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data Petani</h2>
        <p className="text-gray-600">Kelola data petani dengan fitur CRUD lengkap dan form yang lebih detail</p>
      </div>

      <DataTable
        columns={columns}
        data={petaniData}
        searchKey="nama"
        onAdd={handleAdd}
        addButtonLabel="Tambah Petani"
        title="Data Petani"
      />

      <CrudForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        fields={petaniFormFields}
        title={formMode === "create" ? "Tambah Petani Baru" : "Edit Data Petani"}
        description={formMode === "create" ? "Masukkan data petani baru dengan lengkap" : "Perbarui data petani"}
        initialData={selectedPetani}
        mode={formMode}
        wide={true}
      />

      <DeletePetaniDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        petani={petaniToDelete}
      />
    </div>
  )
}

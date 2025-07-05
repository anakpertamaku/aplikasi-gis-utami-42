
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

interface Petani {
  id: number
  nama: string
  umur: number
  alamat: string
  jumlahSawah: number
  totalLuas: number
  totalHasil: number
  status: string
  noTelepon?: string
  email?: string
  jenisKelamin?: string
  pendidikan?: string
  pengalaman?: number
}

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

  const formFields: FormField[] = [
    { name: "nama", label: "Nama Lengkap", type: "text", required: true, placeholder: "Masukkan nama lengkap petani" },
    { name: "umur", label: "Umur", type: "number", required: true, placeholder: "Masukkan umur" },
    { 
      name: "jenisKelamin", 
      label: "Jenis Kelamin", 
      type: "select", 
      required: true,
      options: [
        { value: "Laki-laki", label: "Laki-laki" },
        { value: "Perempuan", label: "Perempuan" }
      ]
    },
    { name: "alamat", label: "Alamat Lengkap", type: "textarea", required: true, placeholder: "Masukkan alamat lengkap" },
    { name: "noTelepon", label: "No. Telepon", type: "tel", required: false, placeholder: "Contoh: 081234567890" },
    { name: "email", label: "Email", type: "email", required: false, placeholder: "Contoh: petani@email.com" },
    { 
      name: "pendidikan", 
      label: "Pendidikan Terakhir", 
      type: "select", 
      required: false,
      options: [
        { value: "SD", label: "SD" },
        { value: "SMP", label: "SMP" },
        { value: "SMA", label: "SMA" },
        { value: "Diploma", label: "Diploma" },
        { value: "Sarjana", label: "Sarjana" }
      ]
    },
    { name: "pengalaman", label: "Pengalaman Bertani (Tahun)", type: "number", required: false, placeholder: "Lama pengalaman dalam tahun" },
    { name: "jumlahSawah", label: "Jumlah Lahan Sawah", type: "number", required: true, placeholder: "Jumlah lahan sawah" },
    { name: "totalLuas", label: "Total Luas Lahan (Ha)", type: "number", required: true, placeholder: "Total luas dalam hektar", step: "0.1" },
    { name: "totalHasil", label: "Total Hasil Panen (Ton)", type: "number", required: true, placeholder: "Total hasil panen terakhir", step: "0.1" },
    { 
      name: "status", 
      label: "Status", 
      type: "select", 
      required: true,
      options: [
        { value: "Aktif", label: "Aktif" },
        { value: "Tidak Aktif", label: "Tidak Aktif" }
      ]
    }
  ]

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

  const columns: ColumnDef<Petani>[] = [
    {
      accessorKey: "nama",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "umur",
      header: "Umur",
      cell: ({ row }) => <div>{row.getValue("umur")} tahun</div>,
    },
    {
      accessorKey: "alamat",
      header: "Alamat",
      cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("alamat")}</div>,
    },
    {
      accessorKey: "jumlahSawah",
      header: "Jumlah Sawah",
      cell: ({ row }) => <div>{row.getValue("jumlahSawah")} lokasi</div>,
    },
    {
      accessorKey: "totalLuas",
      header: "Total Luas",
      cell: ({ row }) => <div>{row.getValue("totalLuas")} Ha</div>,
    },
    {
      accessorKey: "totalHasil",
      header: "Total Hasil",
      cell: ({ row }) => <div>{row.getValue("totalHasil")} Ton</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "Aktif" ? "default" : "secondary"}>
            {status}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const petani = row.original

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
              <DropdownMenuItem onClick={() => handleEdit(petani)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleDelete(petani)}
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
        fields={formFields}
        title={formMode === "create" ? "Tambah Petani Baru" : "Edit Data Petani"}
        description={formMode === "create" ? "Masukkan data petani baru dengan lengkap" : "Perbarui data petani"}
        initialData={selectedPetani}
        mode={formMode}
        wide={true}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data Petani</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data petani {petaniToDelete?.nama}? 
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


import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { CrudForm } from "@/components/ui/crud-form"
import { useToast } from "@/hooks/use-toast"
import { Produk } from "./marketplace/types"
import { ProductDetailDialog } from "./marketplace/ProductDetailDialog"
import { DeleteConfirmationDialog } from "./marketplace/DeleteConfirmationDialog"
import { createProductColumns } from "./marketplace/ProductColumns"
import { formFields } from "./marketplace/formFields"

export const Marketplace = () => {
  const { toast } = useToast()
  const [produkData, setProdukData] = useState<Produk[]>([
    {
      id: 1,
      nama: "Beras Premium",
      petani: "Budi Santoso",
      lokasi: "Desa Sukamaju RT 02/03",
      harga: 12000,
      stok: 500,
      satuan: "kg",
      kualitas: "A",
      deskripsi: "Beras berkualitas premium dari sawah organik",
      kontak: "081234567890"
    },
    {
      id: 2,
      nama: "Beras Merah Organik",
      petani: "Sari Wati",
      lokasi: "Desa Sukamaju RT 01/02",
      harga: 15000,
      stok: 250,
      satuan: "kg",
      kualitas: "Premium",
      deskripsi: "Beras merah organik tanpa pestisida",
      kontak: "081234567891"
    },
    {
      id: 3,
      nama: "Gabah Kering",
      petani: "Joko Widodo",
      lokasi: "Desa Sukamaju RT 03/04",
      harga: 8000,
      stok: 1000,
      satuan: "kg",
      kualitas: "B",
      deskripsi: "Gabah kering siap giling dengan kadar air 14%",
      kontak: "081234567892"
    },
    {
      id: 4,
      nama: "Beras Putih",
      petani: "Rina Sari",
      lokasi: "Desa Sukamaju RT 02/04",
      harga: 10000,
      stok: 750,
      satuan: "kg",
      kualitas: "A",
      deskripsi: "Beras putih berkualitas tinggi",
      kontak: "081234567893"
    }
  ])

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [selectedProduk, setSelectedProduk] = useState<Produk | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [produkToDelete, setProdukToDelete] = useState<Produk | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [produkDetail, setProdukDetail] = useState<Produk | null>(null)

  const handleAdd = () => {
    setFormMode("create")
    setSelectedProduk(null)
    setIsFormOpen(true)
  }

  const handleEdit = (produk: Produk) => {
    setFormMode("edit")
    setSelectedProduk(produk)
    setIsFormOpen(true)
  }

  const handleDelete = (produk: Produk) => {
    setProdukToDelete(produk)
    setDeleteDialogOpen(true)
  }

  const handleViewDetail = (produk: Produk) => {
    setProdukDetail(produk)
    setDetailDialogOpen(true)
  }

  const confirmDelete = () => {
    if (produkToDelete) {
      setProdukData(prev => prev.filter(p => p.id !== produkToDelete.id))
      toast({
        title: "Berhasil",
        description: `Produk ${produkToDelete.nama} berhasil dihapus.`,
      })
      setProdukToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleFormSubmit = (data: any) => {
    if (formMode === "create") {
      const newId = Math.max(...produkData.map(p => p.id)) + 1
      const newProduk: Produk = {
        id: newId,
        nama: data.nama,
        petani: data.petani,
        lokasi: data.lokasi,
        harga: data.harga,
        stok: data.stok,
        satuan: data.satuan,
        kualitas: data.kualitas,
        deskripsi: data.deskripsi,
        kontak: data.kontak
      }
      setProdukData(prev => [...prev, newProduk])
      toast({
        title: "Berhasil",
        description: `Produk ${data.nama} berhasil ditambahkan.`,
      })
    } else if (formMode === "edit" && selectedProduk) {
      const updatedProduk: Produk = {
        ...selectedProduk,
        nama: data.nama,
        petani: data.petani,
        lokasi: data.lokasi,
        harga: data.harga,
        stok: data.stok,
        satuan: data.satuan,
        kualitas: data.kualitas,
        deskripsi: data.deskripsi,
        kontak: data.kontak
      }
      setProdukData(prev => prev.map(p => p.id === selectedProduk.id ? updatedProduk : p))
      toast({
        title: "Berhasil",
        description: `Produk ${data.nama} berhasil diperbarui.`,
      })
    }
    setIsFormOpen(false)
  }

  const columns = createProductColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onViewDetail: handleViewDetail
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Marketplace Hasil Pertanian</h2>
        <p className="text-gray-600">Kelola produk marketplace dengan fitur CRUD lengkap dan modal yang lebih luas</p>
      </div>

      <DataTable
        columns={columns}
        data={produkData}
        searchKey="nama"
        onAdd={handleAdd}
        addButtonLabel="Tambah Produk"
        title="Marketplace"
      />

      <CrudForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        fields={formFields}
        title={formMode === "create" ? "Tambah Produk Baru" : "Edit Produk"}
        description={formMode === "create" ? "Masukkan data produk baru dengan lengkap" : "Perbarui data produk"}
        initialData={selectedProduk}
        mode={formMode}
        wide={true}
      />

      <ProductDetailDialog
        isOpen={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        product={produkDetail}
      />

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        product={produkToDelete}
      />
    </div>
  )
}

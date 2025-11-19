import React, { useEffect, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../AdminLayout/AdminLayout";
import { RootState, AppDispatch } from "../store";
import {
  AdminProduct,
  setProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../adminProductSlice";
import { Trash } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/products";

const AdminToppicksPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.adminProducts.products
  );

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(
    null
  );
  const [formProduct, setFormProduct] = useState<Partial<AdminProduct>>({});

  // Load products
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => console.error("Failed to load products", err));
  }, [dispatch]);

  // Add or Edit product
  const handleFormSubmit = async () => {
    if (!formProduct.name || !formProduct.price || !formProduct.img)
      return alert("Fill all required fields");

    try {
      // Ensure variants array exists
      if (!formProduct.variants) formProduct.variants = [];

      if (editingProduct) {
        const updated = {
          ...editingProduct,
          ...formProduct,
          price: Number(formProduct.price),
          stock: Number(formProduct.stock) || 0,
          updatedAt: new Date().toISOString(),
        };

        const res = await axios.put(`${API_URL}/${editingProduct.id}`, updated);
        dispatch(updateProduct(res.data));
        setEditingProduct(null);
      } else {
        const newProduct: AdminProduct = {
          id: Date.now().toString(),
          name: formProduct.name!,
          price: Number(formProduct.price),
          img: formProduct.img!,
          category: formProduct.category || "N/A",
          stock: Number(formProduct.stock) || 0,
          description: formProduct.description || "",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          variants: formProduct.variants || [],
        };

        const res = await axios.post(API_URL, newProduct);
        dispatch(addProduct(res.data));
      }

      setFormProduct({});
      setShowForm(false);
    } catch (err) {
      console.error("Error saving product", err);
    }
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch(deleteProduct(id));
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormProduct({ ...formProduct, img: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 px-24 bg-secondaray">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Admin Top Picks
        </h2>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingProduct(null);
            setFormProduct({});
          }}
          className="mb-4 p-2 bg-primary text-white rounded"
        >
          {showForm
            ? "Close Form"
            : editingProduct
            ? "Edit Product"
            : "Add Product"}
        </button>

        {showForm && (
          <div className="mb-6 flex flex-col gap-2 border p-4 rounded bg-secondaray">
            <input
              placeholder="Name"
              value={formProduct.name || ""}
              onChange={(e) =>
                setFormProduct({ ...formProduct, name: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              placeholder="Price"
              type="number"
              value={formProduct.price || ""}
              onChange={(e) =>
                setFormProduct({ ...formProduct, price: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="p-2 border rounded"
            />
            {formProduct.img && (
              <img
                src={formProduct.img}
                alt="Preview"
                className="w-32 h-32 object-cover rounded my-2"
              />
            )}
            <input
              placeholder="Category"
              value={formProduct.category || ""}
              onChange={(e) =>
                setFormProduct({ ...formProduct, category: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              placeholder="Stock"
              type="number"
              value={formProduct.stock || ""}
              onChange={(e) =>
                setFormProduct({ ...formProduct, stock: e.target.value })
              }
              className="p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={formProduct.description || ""}
              onChange={(e) =>
                setFormProduct({ ...formProduct, description: e.target.value })
              }
              className="p-2 border rounded"
            />
            {/* Sizes input */}
            <input
              placeholder="Sizes (comma separated)"
              value={
                formProduct.variants
                  ?.find((v) => v.type === "size")
                  ?.options.join(", ") || ""
              }
              onChange={(e) =>
                setFormProduct({
                  ...formProduct,
                  variants: [
                    {
                      type: "size",
                      options: e.target.value.split(",").map((s) => s.trim()),
                    },
                  ],
                })
              }
              className="p-2 border rounded"
            />
            <button
              onClick={handleFormSubmit}
              className="p-2 bg-primary text-white rounded mt-2"
            >
              {editingProduct ? "Save Changes" : "Add Product"}
            </button>
          </div>
        )}

        {products.length > 0 ? (
          <div className="p-6 overflow-x-auto border rounded shadow">
            <table className="min-w-full border-collapse">
              <thead className="border-b">
                <tr>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-left">Sizes</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">Rs {p.price}</td>
                    <td className="px-4 py-2">{p.category}</td>
                    <td className="px-4 py-2">{p.stock}</td>
                    <td className="px-4 py-2">
                      {p.variants
                        ?.find((v) => v.type === "size")
                        ?.options.join(", ") || "N/A"}
                    </td>
                    <td className="px-4 py-2">{p.description}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1 bg-primary text-white rounded hover:bg-[#5c1621] transition"
                      >
                        Edit
                      </button>
                      <Trash
                        className="cursor-pointer text-primary hover:text-red-600 transition"
                        onClick={() => handleDelete(p.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-primary mt-4">No products found</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminToppicksPage;

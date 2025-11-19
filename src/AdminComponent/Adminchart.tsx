import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import adminData from "../../adminProducts.json";

const PRIMARY_COLOR = "#f97316"; // your primary color

const AdminCharts = () => {
  const [productData, setProductData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    setProductData(adminData.products || []);
    setTotalUsers(adminData.users.length || 0);

    // Prepare pie chart data: products per category
    const categoryMap: Record<string, number> = {};
    (adminData.products || []).forEach((product) => {
      if (categoryMap[product.category]) categoryMap[product.category] += 1;
      else categoryMap[product.category] = 1;
    });
    const categories = Object.keys(categoryMap).map((key) => ({
      category: key,
      count: categoryMap[key],
    }));
    setCategoryData(categories);
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Cards */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
        <h3 className="text-gray-500 mb-2">Total Products</h3>
        <p className="text-2xl font-bold text-orange-500">
          {productData.length}
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
        <h3 className="text-gray-500 mb-2">Total Users</h3>
        <p className="text-2xl font-bold text-blue-500">{totalUsers}</p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
        <h3 className="text-gray-500 mb-2">Active Products</h3>
        <p className="text-2xl font-bold text-green-500">
          {productData.filter((p) => p.isActive).length}
        </p>
      </div>

      {/* BAR CHART: Stock per Product */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Product Stock</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={productData}
            barCategoryGap="15%"
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                backgroundColor: "#f9fafb",
              }}
            />
            <Bar dataKey="stock" fill={PRIMARY_COLOR} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART: Products per Category */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:col-span-2 lg:col-span-3">
        <h2 className="text-lg font-semibold mb-4">Products by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PRIMARY_COLOR} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LINE CHART: Stock Trend */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:col-span-2 lg:col-span-3">
        <h2 className="text-lg font-semibold mb-4">Stock Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={productData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                backgroundColor: "#f9fafb",
              }}
            />
            <Line
              type="monotone"
              dataKey="stock"
              stroke={PRIMARY_COLOR}
              strokeWidth={4} // thicker line
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminCharts;

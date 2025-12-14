export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 shadow rounded-xl border">
        <h3 className="text-gray-500">Total Users</h3>
        <p className="text-3xl font-bold">{stats.users}</p>
      </div>

      <div className="bg-white p-6 shadow rounded-xl border">
        <h3 className="text-gray-500">Total Categories</h3>
        <p className="text-3xl font-bold">{stats.categories}</p>
      </div>

      <div className="bg-white p-6 shadow rounded-xl border">
        <h3 className="text-gray-500">Total Listings</h3>
        <p className="text-3xl font-bold">{stats.listings}</p>
      </div>
    </div>
  );
}

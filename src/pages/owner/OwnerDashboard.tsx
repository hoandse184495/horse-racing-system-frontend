import DashboardHeader from "../../components/common/DashboardHeader";

export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <DashboardHeader
        title="Horse Owner Dashboard"
        description="Quản lý ngựa, đăng ký giải đấu và chọn jockey."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-slate-800">My Horses</h2>
          <p className="text-slate-500 mt-2">Quản lý danh sách ngựa của tôi</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-slate-800">Register Tournament</h2>
          <p className="text-slate-500 mt-2">Đăng ký ngựa vào giải đấu</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-slate-800">Choose Jockey</h2>
          <p className="text-slate-500 mt-2">Chọn jockey cho ngựa</p>
        </div>
      </div>
    </div>
  );
}
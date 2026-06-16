import DashboardHeader from "../../components/common/DashboardHeader";

export default function RefereeDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <DashboardHeader
        title="Race Referee Dashboard"
        description="Xem cuộc đua được phân công và nhập kết quả."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-slate-800">Assigned Races</h2>
          <p className="text-slate-500 mt-2">Danh sách race được phân công</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-slate-800">Input Results</h2>
          <p className="text-slate-500 mt-2">Nhập kết quả cuộc đua</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-slate-800">Violations</h2>
          <p className="text-slate-500 mt-2">Ghi nhận vi phạm</p>
        </div>
      </div>
    </div>
  );
}
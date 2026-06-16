import DashboardHeader from "../../components/common/DashboardHeader";

export default function SpectatorHome() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <DashboardHeader
        title="Spectator Home"
        description="Xem giải đấu, lịch đua, kết quả và bảng xếp hạng."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-slate-800">Tournaments</h2>
          <p className="text-slate-500 mt-2">Xem danh sách giải đấu</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-slate-800">Race Schedule</h2>
          <p className="text-slate-500 mt-2">Xem lịch thi đấu</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-slate-800">Results</h2>
          <p className="text-slate-500 mt-2">Xem kết quả cuộc đua</p>
        </div>
      </div>
    </div>
  );
}
import DashboardHeader from "../../components/common/DashboardHeader";

export default function JockeyDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <DashboardHeader
        title="Jockey Dashboard"
        description="Xem lời mời, xác nhận tham gia và theo dõi lịch thi đấu."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-slate-800">Invitations</h2>
          <p className="text-slate-500 mt-2">Xem lời mời từ Horse Owner</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-slate-800">Assigned Races</h2>
          <p className="text-slate-500 mt-2">Xem cuộc đua được phân công</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-slate-800">My Results</h2>
          <p className="text-slate-500 mt-2">Theo dõi kết quả cá nhân</p>
        </div>
      </div>
    </div>
  );
}
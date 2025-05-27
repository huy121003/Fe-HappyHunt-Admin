import CHeaderCard from '@/components/CHeaderCard';
import Data from '@/features/dashboard/components/Data';
import GenderChart from '@/features/dashboard/components/GenderChart';
import NewUserCard from '@/features/dashboard/components/NewUserCard';
import PostCategory from '@/features/dashboard/components/PostCategory';

import Topup from '@/features/dashboard/components/Topup';

function DashBoardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CHeaderCard title="Dashboard" actions={null} />
      <div className="p-6 space-y-6">
        {/* Overview Cards */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <Data />
        </div>

        {/* Charts Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          {/* First Row - Larger Cards */}
          <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
            <NewUserCard />
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Topup />
          </div>

          {/* Second Row - Mixed Sizes */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <GenderChart />
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
            <PostCategory />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardPage;

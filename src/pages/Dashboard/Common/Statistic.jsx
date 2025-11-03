import useRole from "../../../hooks/useRole";
import AdminStatistic from "../Admin/AdminStatistic";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import HostStatistic from "../Host/HostStatistic";
import GuestStatistic from "../Guest/GuestStatistic";
import { useLocation } from "react-router-dom";

const Statistic = () => {
  const [role, isLoading] = useRole();
  const location = useLocation();

  // Get viewMode from URL parameters
  const getViewMode = () => {
    const params = new URLSearchParams(location.search);
    return params.get('view') || 'host';
  };

  const viewMode = getViewMode();

  console.log('Current role:', role, 'View mode:', viewMode);

  if (isLoading) return <LoadingSpinner />;

  if (role === "admin") return <AdminStatistic />;
  
  if (role === "host") {
    return viewMode === 'guest' ? <GuestStatistic /> : <HostStatistic />;
  }
  
  if (role === "guest") return <GuestStatistic />;

  return (
    <div className="text-center py-20 text-gray-600">
      <h2 className="text-2xl font-semibold">You don't have access to this page</h2>
    </div>
  );
};

export default Statistic;
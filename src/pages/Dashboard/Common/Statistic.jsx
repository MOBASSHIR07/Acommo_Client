import useRole from "../../../hooks/useRole";
import AdminStatistic from "../Admin/AdminStatistic";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import HostStatistic from "../Host/HostStatistic";
import GuestStatistic from "../Guest/GuestStatistic";

const Statistic = () => {
  const [ role, isLoading ] = useRole();
  console.log(role);

  if (isLoading) return <LoadingSpinner />;

  if (role === "admin") return <AdminStatistic />;
  if (role === "host") return <HostStatistic/>
  if (role === "guest") return <GuestStatistic/>

  return (
    <div className="text-center py-20 text-gray-600">
      <h2 className="text-2xl font-semibold">You don’t have access to this page</h2>
    </div>
  );
};

export default Statistic;

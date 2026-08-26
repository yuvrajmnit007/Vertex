import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Loading from "../../components/Loading";

const Layout = () => {
  const { isAdmin, isAdminLoading } = useAppContext();

  if (isAdminLoading) {
    return <Loading />;
  }

  return isAdmin ? (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <p className="text-gray-400">Admin access is not available for this account.</p>
    </div>
  );
};

export default Layout;
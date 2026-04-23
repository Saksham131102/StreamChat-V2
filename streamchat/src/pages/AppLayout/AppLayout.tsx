import { Outlet } from "react-router-dom";
import AppNavbar from "../../components/AppNavbar/AppNavbar";

const AppLayout = () => {
  return (
    <div>
      <AppNavbar />
      <main className="px-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

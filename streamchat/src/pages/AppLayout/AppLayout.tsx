import { Outlet } from "react-router-dom";
import AppNavbar from "../../components/AppNavbar/AppNavbar";

const AppLayout = () => {
  return (
    <div>
      <AppNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

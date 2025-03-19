import { AuthProvider } from "@/context/AuthContext";
import AdminLogin from ".";

const AdminLoginWrap = () => {
  return (
    <AuthProvider>
      <AdminLogin />
    </AuthProvider>
  );
};
export default AdminLoginWrap;

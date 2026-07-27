import { useAuth } from "../context/AuthContext";
import DashboardLayout from "./layout/DashboardLayout";
import EditCourse from "../pages/EditCourse";

function EditCourseWrapper() {
  const { user } = useAuth();
  //console.log("WRAPPER ROLE:", user.role);

  return (
    <DashboardLayout role={user.role}>
      <EditCourse />
    </DashboardLayout>
  )
}

export default EditCourseWrapper;
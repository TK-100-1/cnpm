import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Layouts
import MentorLayout from "../layouts/MentorLayout";
import MenteeLayout from "../layouts/MenteeLayout";
import CoordinatorLayout from "../layouts/CoordinatorLayout";
import PDTLayout from "../layouts/PDTLayout";

// Pages — Mentor
import MentorHome from "../pages/mentor/mentorHome";
import MentorClassesList from "../pages/mentor/mentorClassesList";
import MentorClassDetail from "../pages/mentor/classes";
import MentorStudentList from "../pages/mentor/studentList";
import MentorTeachingSchedule from "../pages/mentor/teachingSchedule";
import MentorOpenClass from "../pages/mentor/openClass";

// Pages — Mentee
import MenteeHome from "../pages/mentee/menteeHome";
import MenteeClassesList from "../pages/mentee/MenteeClassesList";
import MenteeClassDetail from "../pages/mentee/classes";
import MenteeExamSchedule from "../pages/mentee/examSchedule";
import MenteeRegisterClass from "../pages/mentee/register";

// Pages — Coordinator
import CoordinatorHome from "../pages/coordinator/coordinatorHome";
import ManageCoordinator from "../pages/coordinator/manageCoordinator";
import CoordinatorComplaints from "../pages/coordinator/complaints";
import ManualClassAssign from "../pages/coordinator/manualClass";
import CoordinatorReport from "../pages/coordinator/report";

// Pages — PDT
import PdtHome from "../pages/PDT/pdtHome";
import PdtEvaluationData from "../pages/PDT/evaluationData";
import PdtOverviewReport from "../pages/PDT/overviewReport";
import PdtStudentParticipation from "../pages/PDT/studentParticipation";
import PdtOverallReport from "../pages/PDT/overallReport";

// Other
import RoleRoute from "./RoleRoute";
import NotAuthorized from "../pages/NotAuthorized";
import Login from "../components/Login";

const router = createBrowserRouter([
  // LOGIN
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },

  // =====================
  // MENTOR
  // =====================
  {
    path: "/mentor",
    element: (
      <RoleRoute allow={["mentor"]}>
        <MentorLayout />
      </RoleRoute>
    ),
    children: [
      { path: "", element: <MentorHome /> },
      { path: "classes", element: <MentorClassesList /> },
      { path: "classes/:id", element: <MentorClassDetail /> },
      { path: "classes/:id/students", element: <MentorStudentList /> },
      { path: "teaching-schedule", element: <MentorTeachingSchedule /> },
      { path: "open-class", element: <MentorOpenClass /> },
    ],
  },

  // =====================
  // MENTEE
  // =====================
  {
    path: "/mentee",
    element: (
      <RoleRoute allow={["mentee"]}>
        <MenteeLayout />
      </RoleRoute>
    ),
    children: [
      { path: "", element: <MenteeHome /> },
      { path: "classes", element: <MenteeClassesList /> },
      // đợi classes của mentee làm xong 
      { path: "classes/:id", element: <MenteeClassDetail /> },
      { path: "exam-schedule", element: <MenteeExamSchedule /> },
      { path: "register", element: <MenteeRegisterClass /> },
    ],
  },

  // =====================
  // COORDINATOR
  // =====================
  {
    path: "/coordinator",
    element: (
      <RoleRoute allow={["coordinator"]}>
        <CoordinatorLayout />
      </RoleRoute>
    ),
    children: [
      { path: "", element: <CoordinatorHome /> },
      { path: "manage", element: <ManageCoordinator /> },
      { path: "complaints", element: <CoordinatorComplaints /> },
      { path: "manual-class", element: <ManualClassAssign /> },
      { path: "report", element: <CoordinatorReport /> },
    ],
  },

  // =====================
  // PDT
  // =====================
  {
    path: "/pdt",
    element: (
      <RoleRoute allow={["pdt"]}>
        <PDTLayout />
      </RoleRoute>
    ),
    children: [
      { path: "", element: <PdtHome /> },
      { path: "evaluation-data", element: <PdtEvaluationData /> },
      { path: "overview-report", element: <PdtOverviewReport /> },
      { path: "student-participation", element: <PdtStudentParticipation /> },
      { path: "overall-report", element: <PdtOverallReport /> },
    ],
  },

  // NOT AUTHORIZED
  { path: "/not-authorized", element: <NotAuthorized /> },
]);

export default router;

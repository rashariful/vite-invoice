import InvoiceForm from "./components/InvoiceForm";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import AllInvoices from "./components/invoices/AllInvoice.jsx";
import InvoiceFileUpload from "./components/InvoiceFileUpload.jsx";
import Shop from "./pages/Shop.jsx";
import Login from "./components/invoices/Login.jsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard/create-invoice",
        element: <InvoiceForm />,
      },
      {
        path: "/dashboard/invoices",
        element: <AllInvoices />,
      },
      {
        path: "/dashboard/invoice-upload",
        element: <InvoiceFileUpload />,
      },
      {
        path: "/dashboard/shop",
        element: <Shop />,
      },
    ]
  }
]);
export default router;
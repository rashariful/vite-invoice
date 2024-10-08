import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import InvoiceForm from "./components/InvoiceForm";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllInvoices from "./components/invoices/AllInvoice.jsx";
import InvoiceFileUpload from "./components/InvoiceFileUpload.jsx";
import { Toaster } from "react-hot-toast";
import Shop from "./pages/Shop.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <InvoiceForm />,
      },
      {
        path: "/invoices",
        element: <AllInvoices />,
      },
      {
        path: "/invoice-upload",
        element: <InvoiceFileUpload />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>
);

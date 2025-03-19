
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import router from "./Routes";


const App = () => {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
export default App;

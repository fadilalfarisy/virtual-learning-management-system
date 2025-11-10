import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "./App.css";

import { ConfigProvider } from "antd";
function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Inter, Arial, sans-serif",
          },
        }}
      >
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </ConfigProvider>
    </>
  );
}

export default App;

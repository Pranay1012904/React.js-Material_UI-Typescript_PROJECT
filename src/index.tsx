import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { AuthProvider } from "./providers/AuthProvider";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root") as HTMLDivElement
);

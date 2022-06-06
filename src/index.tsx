import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { AuthProvider } from "./providers/AuthProvider";
import { PostProvider } from "./providers/postProvider";

ReactDOM.render(
  <AuthProvider>
    <PostProvider>
      <App />
    </PostProvider>
  </AuthProvider>,
  document.getElementById("root") as HTMLDivElement
);

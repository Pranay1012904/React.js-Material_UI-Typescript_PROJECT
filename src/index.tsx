import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

/*const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);
root.render(
  <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
    <App />
  </ToastProvider>
);*/
ReactDOM.render(<App />, document.getElementById("root") as HTMLDivElement);

import * as React from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";

import App from "./components/App";

const container = document.getElementById("main");
const root = createRoot(container!);
root.render(<App />);

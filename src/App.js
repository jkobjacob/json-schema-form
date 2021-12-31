import { useState } from "react";
import "./styles.css";
import JSONForm from "./JSONFrom";

const schema = {
  id: "string",
  isActive: "boolean"
};

export default function App() {
  return (
    <div className="App">
      <JSONForm schema={schema} />
    </div>
  );
}

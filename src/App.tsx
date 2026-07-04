import { useState } from "react";
import { Card } from "./components/Card";
import { Input } from "./components/Input";
import { Button } from "./components/Button";

function App() {
  const [name, setName] = useState("");

  const handleSave = () => {
    console.log("Saved value");
  };

  return (
    <main className="App">
      <h1>Resuable Components</h1>

      <Card title="Profile">
        <Input label="Name" value={name} onChange={setName} />

        <p>Preview: {name || "No name entered"}</p>

        <Button onClick={handleSave} disabled={!name}>
          Save
        </Button>
      </Card>
    </main>
  );
}

export default App;

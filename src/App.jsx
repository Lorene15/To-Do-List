import React, { useState } from "react";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import CardContent from "@mui/joy/CardContent";
import Grid from "@mui/joy/Grid";

function App() {
  const [tasks, setTasks] = useState([]);

  function handleAddTasks(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <Form onHandleAddTasks={handleAddTasks} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <Typography color="success" level="h1" variant="plain">
        To Do List
      </Typography>
    </div>
  );
}

function Form({ onHandleAddTasks }) {
  const [tasks, setTasks] = useState("");

  function handleTasks(e) {
    setTasks(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newTask = { id: Date.now(), tasks, packed: false };
    if (!tasks) return;
    onHandleAddTasks(newTask);
    setTasks("");
  }
  return (
    <Card sx={{ width: 600 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid xs={6} md={8}>
              <Input
                color="success"
                placeholder="Add a task..."
                type="text"
                size="md"
                variant="solid"
                onChange={handleTasks}
                value={tasks}
              />
            </Grid>
            <Grid xs={6} md={4}>
              <Button type="submit" variant="solid" size="md" color="success">
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default App;

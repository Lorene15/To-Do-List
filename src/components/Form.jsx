import React, { useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";

function Form({ onHandleAddItems, setShowList }) {
  const [tasks, setTasks] = useState("");

  function handleTasks(e) {
    e.preventDefault();
    setTasks(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { id: Date.now(), tasks, packed: false };
    if (!tasks) return;
    onHandleAddItems(newItem);
    setTasks("");
    setShowList(true);
  }
  return (
    <Card sx={{ width: 600 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ flexGrow: 1, marginLeft: "30px" }}>
            <Grid xs={9}>
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
            <Grid xs={3}>
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
export default Form;

import React, { useState } from "react";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import CardContent from "@mui/joy/CardContent";
import Grid from "@mui/joy/Grid";
import Checkbox from "@mui/joy/Checkbox";
import Sheet from "@mui/joy/Sheet";
import { Box } from "@mui/joy";

function App() {
  const [items, setItems] = useState([]);
  const [showList, setShowList] = useState(false);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    setShowList(true);
  }

  function handleEditItem(itemId, editedItemText) {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, tasks: editedItemText } : item
      )
    );
  }

  function handleDeleteItem(itemId) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (isConfirmed) {
      setItems(items.filter((item) => item.id !== itemId));
    }
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <Form onHandleAddItems={handleAddItems} setShowList={setShowList} />
        {showList && (
          <div className="spacer">
            <ListTasks
              items={items}
              onDeleteItem={handleDeleteItem}
              onEditItem={handleEditItem}
            />
          </div>
        )}
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
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
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

function ListTasks({ items, onDeleteItem, onEditItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [editedTaskId, setEditedTaskId] = useState("");

  const handleEditClick = (taskId, taskText) => {
    setIsEditing(true);
    setEditedTaskText(taskText);
    setEditedTaskId(taskId);
  };

  const handleSaveEdit = () => {
    onEditItem(editedTaskId, editedTaskText);
    setIsEditing(false);
    setEditedTaskText("");
    setEditedTaskId("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTaskText("");
    setEditedTaskId("");
  };

  return (
    <Card sx={{ width: 600 }}>
      <CardContent>
        <ul>
          {items.map((item) => (
            <Sheet key={item.id}>
              <Grid
                container
                spacing={3}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid xs={7}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={item.packed}
                      onChange={() => console.log("Checkbox changed")}
                      color="success"
                      variant="outlined"
                    />
                    <Grid xs={11}>
                      <Input
                        color="success"
                        type="text"
                        size="md"
                        variant="solid"
                        value={
                          isEditing && editedTaskId === item.id
                            ? editedTaskText
                            : item.tasks
                        }
                        onChange={(e) => setEditedTaskText(e.target.value)}
                        readOnly={!isEditing || editedTaskId !== item.id}
                      />
                    </Grid>
                  </div>
                </Grid>
                <Grid xs={5}>
                  {isEditing && editedTaskId === item.id ? (
                    <div style={{ display: "flex" }}>
                      <Button
                        variant="plain"
                        size="md"
                        color="success"
                        onClick={handleSaveEdit}
                      >
                        Save✔️
                      </Button>
                      <span style={{ margin: "0 5px" }}></span>
                      <Button
                        variant="plain"
                        size="md"
                        color="success"
                        onClick={handleCancelEdit}
                      >
                        Cancel🚫
                      </Button>
                    </div>
                  ) : (
                    <div style={{ display: "flex" }}>
                      <Button
                        variant="plain"
                        size="md"
                        color="success"
                        onClick={() => handleEditClick(item.id, item.tasks)}
                      >
                        Edit✏️
                      </Button>
                      <span style={{ margin: "0 5px" }}></span>
                      <Button
                        variant="plain"
                        size="md"
                        color="success"
                        onClick={() => onDeleteItem(item.id)}
                      >
                        Delete❌
                      </Button>
                    </div>
                  )}
                </Grid>
              </Grid>
            </Sheet>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default App;

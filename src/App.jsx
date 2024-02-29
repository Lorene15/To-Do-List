import React, { useState, useEffect } from "react";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import CardContent from "@mui/joy/CardContent";
import Grid from "@mui/joy/Grid";
import Checkbox from "@mui/joy/Checkbox";
import Sheet from "@mui/joy/Sheet";
import Slider from "@mui/joy/Slider";

function App() {
  const [items, setItems] = useState([]);
  const [showList, setShowList] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const checkedCount = items.filter((item) => item.packed).length;
    const totalCount = items.length;
    const percentage = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;
    setProgress(percentage);
  }, [items]);

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

  function handleCheckboxToggle(itemId) {
    setItems(
      items
        .map((item) => {
          if (item.id === itemId) {
            return { ...item, packed: !item.packed };
          }
          return item;
        })
        .sort((a, b) => a.packed - b.packed)
    );
  }

  const updateItems = (updateItems) => {
    setItems(updateItems);
  };

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
              onCheckboxToggle={handleCheckboxToggle}
              progress={progress}
              updateItems={updateItems}
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
        To Do List 🗒️
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

function ListTasks({
  items,
  onDeleteItem,
  onEditItem,
  onCheckboxToggle,
  progress,
  updateItems,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [editedTaskId, setEditedTaskId] = useState(null);

  const handleEditClick = (taskId, taskText) => {
    setIsEditing(true);
    setEditedTaskText(taskText);
    setEditedTaskId(taskId);
  };

  const handleSaveEdit = () => {
    onEditItem(editedTaskId, editedTaskText);
    setIsEditing(false);
    setEditedTaskText("");
    setEditedTaskId(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTaskText("");
    setEditedTaskId(null);
  };

  const handleClearAll = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to clear all tasks?"
    );

    if (isConfirmed) {
      const updatedItems = items.filter((item) => !item.packed);
      updateItems(updatedItems);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <Card
      sx={{
        overflowY: "auto",
        maxWidth: "600px",
        maxHeight: "500px",
      }}
    >
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
                      color="success"
                      variant="outlined"
                      onChange={() => onCheckboxToggle(item.id)}
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

        <Grid container spacing={2} sx={{ flexGrow: 1, marginLeft: "30px" }}>
          <Grid xs={9}>
            <Slider color="success" value={progress} />
          </Grid>
          <Grid xs={3}>
            <Button color="success" onClick={handleClearAll}>
              Clear All
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default App;

import React, { useState } from "react";
import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import CardContent from "@mui/joy/CardContent";
import Grid from "@mui/joy/Grid";
import Checkbox from "@mui/joy/Checkbox";
import Sheet from "@mui/joy/Sheet";
import Slider from "@mui/joy/Slider";

function ListTasks({
  items,
  onDeleteItem,
  onEditItem,
  onCheckboxToggle,
  progress,
  updateItems,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ id: null, text: "" });

  const handleEditClick = (taskId, taskText) => {
    setIsEditing(true);
    setEditedTask({ id: taskId, text: taskText });
  };

  const handleSaveEdit = () => {
    onEditItem(editedTask.id, editedTask.text);
    setIsEditing(false);
    setEditedTask({ id: null, text: "" });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTask({ id: null, text: "" });
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
                          isEditing && editedTask.id === item.id
                            ? editedTask.text
                            : item.tasks
                        }
                        onChange={(e) =>
                          setEditedTask({ ...editedTask, text: e.target.value })
                        }
                        readOnly={!isEditing || editedTask.id !== item.id}
                      />
                    </Grid>
                  </div>
                </Grid>
                <Grid xs={5}>
                  {isEditing && editedTask.id === item.id ? (
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
export default ListTasks;

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import ListTasks from "./components/ListTasks";

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
export default App;

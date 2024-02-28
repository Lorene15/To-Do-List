import Typography from "@mui/joy/Typography";

function App() {
  return (
    <div>
      <Header />
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

export default App;

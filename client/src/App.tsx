// import './App.css'
import { Route, Routes } from "react-router-dom"
import Games from "./components/Games"
import AddGame from "./components/AddGame"
import EditGame from "./components/EditGame"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"

export function App() {
  return (
    <Routes>

      <Route path="/" element={<Games />} />

      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/add" element={<AddGame />} />
      <Route path="/edit/:id" element={<EditGame />} />

      <Route path="*" element={404} />
    </Routes>
  )
}
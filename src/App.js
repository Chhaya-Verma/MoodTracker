import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components2/Navbar";
import HomePage from "./components2/HomePage";
import HistoryPage from "./components2/HistoryPage";
import Emoji from "./components2/Emoji"; // Import Emoji page

const App = () => {
  const [journalEntries, setJournalEntries] = useState(
    JSON.parse(localStorage.getItem("journalEntries")) || []
  );
  const [selectedMood, setSelectedMood] = useState(""); // State for selected mood

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
  }, [journalEntries]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/homepage"
            element={<HomePage setJournalEntries={setJournalEntries} selectedMood={selectedMood} />}
          />
          <Route
            path="/history"
            element={<HistoryPage journalEntries={journalEntries} />}
          />
          <Route
            path="/"
            element={<Emoji setSelectedMood={setSelectedMood} />} // Add Emoji route
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

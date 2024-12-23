import React, { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import { Bar } from "react-chartjs-2";
import "react-calendar/dist/Calendar.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./HistoryPage.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HistoryPage = ({ selectedMood }) => {  // Add selectedMood as prop
  const [journalEntries, setJournalEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch entries from localStorage when the component mounts
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("journalEntries"));
    if (storedEntries) {
      setJournalEntries(storedEntries);
    }
  }, []);

  // Filter entries for selected date
  const moodHistory = journalEntries.filter(
    (entry) => entry.date === selectedDate.toLocaleDateString()
  );

  // Get overall mood distribution for graph
  const getMoodDistribution = () => {
    const moodCount = {};

    // Count occurrences of each mood
    journalEntries.forEach((entry) => {
      moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
    });

    const labels = Object.keys(moodCount);
    const data = Object.values(moodCount);

    // Increment current day's mood by 5% of total
    const totalMoods = data.reduce((acc, count) => acc + count, 0);
    if (moodHistory.length > 0) {
      const todayMood = moodHistory[0].mood;
      const moodIndex = labels.indexOf(todayMood);

      if (moodIndex !== -1) {
        data[moodIndex] += totalMoods * 0.05; // Add 5% of total moods
      }
    }

    // Remove undefined or empty labels
    const filteredLabels = labels.filter((label, index) => label && data[index]);
    const filteredData = data.filter((_, index) => labels[index]);

    const colors = filteredLabels.map(
      () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.7)`
    );

    return {
      labels: filteredLabels,
      datasets: [
        {
          label: "Mood Distribution",
          data: filteredData,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("0.7", "1")),
          borderWidth: 1,
        },
      ],
    };
  };

  // Delete journal entry
  const handleDelete = (index) => {
    const updatedEntries = journalEntries.filter((_, i) => i !== index);
    setJournalEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries)); // Update localStorage
  };

  // Edit journal entry
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditText(journalEntries[index].text);
  };

  const handleEditSave = () => {
    const updatedEntries = [...journalEntries];
    updatedEntries[editingIndex].text = editText;
    setJournalEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries)); // Update localStorage
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div className="history-container">
      <h2>Your Mood History</h2>

      <div className="calendar-container">
        <Calendar onChange={setSelectedDate} value={selectedDate} />
        <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
        
        {/* Display selected mood here */}
        <p>Your Mood: {selectedMood || "No mood selected yet"}</p>  {/* This is where the mood is displayed */}
      </div>

      <div className="graph-container">
        <h3>Mood Distribution Over Time</h3>
        <Bar data={getMoodDistribution()} />
      </div>

      <div id="journalEntries">
        {journalEntries.map((entry, index) => (
          <div key={index} className="entry">
            {editingIndex === index ? (
              <div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleEditSave}>Save</button>
                <button onClick={() => setEditingIndex(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{entry.text}</p>
                <p className="sentiment">
                  Mood: {entry.mood} | Date: {entry.timestamp}
                </p>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

// Function to get suggestions using the AdviceSlip API (no API key required)
const getSuggestionFromContentAndMood = async () => {
  const url = "https://api.adviceslip.com/advice"; // AdviceSlip API URL

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.slip.advice;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return "An error occurred while generating a suggestion.";
  }
};

// Hardcoded suggestions for different moods
const hardcodedSuggestions = {
  Happy: "Take a moment to celebrate your happiness and share it with someone!",
  Sad: "It's okay to feel sad. Talk to a friend or listen to comforting music.",
  Neutral: "Explore a new hobby or plan something productive.",
  Romantic: "Plan a surprise for your partner to make their day special.",
  Angry: "Take deep breaths and try to channel your energy creatively.",
  Excited: "Channel your excitement into something creative or share it with others!",
  Sleepy: "Take a short nap or relax to recharge your energy.",
  Confused: "Try breaking down the problem or ask someone for clarification.",
  Surprised: "Share your surprise with someone or write about what amazed you!",
  Silly: "Let loose and enjoy the moment. Laughter is the best medicine!",
  Scared: "Take a deep breath, and remind yourself of your inner strength.",
  Bored: "Try exploring a new hobby or watch something interesting.",
  "In Love": "Express your feelings to the one you love or write them a sweet note.",
  Cool: "Stay calm and enjoy your relaxed vibe. You’ve got this!",
  Proud: "Celebrate your achievements and treat yourself to something special.",
  Hungry: "Grab your favorite snack or prepare a delicious meal.",
  Crying: "Let it out. It's okay to cry. Talk to someone who cares.",
  Grateful: "Take a moment to thank someone or write about what you're thankful for.",
  Laughing: "Spread the joy by sharing a joke or a funny story.",
  Winking: "Show your playful side and brighten someone’s day.",
  Blushing: "Embrace your shy moment and take it as a compliment!",
  Relieved: "Enjoy the moment of calm and reflect on your success.",
  Shy: "Take small steps to come out of your shell. Confidence grows with time.",
  Thinking: "Let your curiosity guide you. Research or brainstorm ideas.",
  Dizzy: "Pause and take a moment to relax. Don’t push yourself too hard.",
  Party: "Let loose and celebrate with your friends or loved ones.",
  Sick: "Take rest and hydrate yourself. Self-care is essential.",
  Nerdy: "Dive into your favorite topic or teach someone about it!",
  "Star-Struck": "Share your admiration with someone who understands.",
  Celebrating: "Enjoy the moment and invite others to join the celebration.",
  Reluctant: "Take one step at a time. Trust yourself and move forward.",
  Embarrassed: "Laugh it off! Everyone has embarrassing moments.",
  Skeptical: "Gather facts and analyze the situation carefully.",
  Heartbroken: "Talk to a friend or journal your feelings to process them.",
  "Love-Struck": "Plan something special for the one who stole your heart.",
  Victory: "Celebrate your win and inspire others with your story.",
  Blessed: "Share your blessings by helping someone in need.",
  Yawning: "Get some rest or have a warm drink to recharge.",
  Tired: "Take a break and pamper yourself with some relaxation.",
  "Mind-Blown": "Write down your thoughts and explore the possibilities.",
  Determined: "Set your goals and tackle them step by step with confidence.",
  Celebratory: "Toast to your achievements with friends or loved ones.",
  Clever: "Use your wit to solve a problem or try a challenging puzzle.",
  Mischievous: "Spread some harmless fun to lighten the mood.",
  Content: "Savor the moment and share your positivity with others.",
  Focused: "Keep your eyes on the prize and push through with determination.",
  Zen: "Take time to meditate or enjoy the calmness around you.",
  Annoyed: "Step back and take deep breaths to clear your mind.",
  Frustrated: "Channel your frustration into a productive activity.",
  Triumphant: "Celebrate your victory and plan your next challenge.",
  Energetic: "Use your energy to accomplish something amazing!",
  Clapping: "Appreciate yourself or someone else for their achievements.",
  "Thumbs Up": "Keep up the great work and inspire others to do the same!"
};

const HomePage = ({ setJournalEntries, selectedMood }) => {
  const [entryInput, setEntryInput] = useState("");
  const [suggestion, setSuggestion] = useState({ api: "", hardcoded: "" });
  const navigate = useNavigate();

  // Fetch journal entries from localStorage
  const getStoredEntries = () => {
    const storedEntries = JSON.parse(localStorage.getItem("journalEntries"));
    return storedEntries || [];
  };

  const handleAddEntry = async () => {
    if (!entryInput.trim() || !selectedMood) {
      alert("Please choose a mood and write something!");
      return;
    }

    // Fetch API suggestion
    const apiSuggestion = await getSuggestionFromContentAndMood();

    // Get hardcoded suggestion
    const hardcodedSuggestion =
      hardcodedSuggestions[selectedMood] ||
      "Stay positive and take care of yourself!";

    const newEntry = {
      text: entryInput.trim(),
      mood: selectedMood,
      timestamp: new Date().toLocaleString(),
      date: new Date().toLocaleDateString(),
    };

    // Get existing entries, add the new one, and save back to localStorage
    const updatedEntries = [...getStoredEntries(), newEntry];
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));

    setJournalEntries(updatedEntries); // Update state to reflect changes
    setEntryInput("");
    setSuggestion({ api: apiSuggestion, hardcoded: hardcodedSuggestion });
  };

  const handleGoToHistory = () => {
    navigate("/history"); // Navigate to History page
  };

  return (
    <div className="home-container">
      <h1>Write Your Journal and Get Suggestions</h1>

      <textarea
        value={entryInput}
        onChange={(e) => setEntryInput(e.target.value)}
        placeholder="Write your thoughts here..."
        rows="5"
        className="text-area"
      ></textarea>

      <button onClick={handleAddEntry} className="submit-button">
        Add Entry
      </button>

      {suggestion.api && suggestion.hardcoded && (
        <div className="suggestion">
          <h3>Suggestions Based on Your Content and Mood:</h3>
          <p><strong></strong> {suggestion.hardcoded}</p>
          <p><strong></strong> {suggestion.api}</p>
          
        </div>
      )}

      <button onClick={handleGoToHistory} className="history-button">
        Check History
      </button>
    </div>
  );
};

export default HomePage;

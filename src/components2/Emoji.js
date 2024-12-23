import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import "./Emoji.css";

const Emoji = ({ setSelectedMood }) => {
  const navigate = useNavigate();
  const [mood, setMood] = useState("");

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
    setSelectedMood(selectedMood);
  };

  const handleEditClick = () => {
    navigate("/homepage");
  };

  const emojis = [
    { name: "Happy", icon: "😊" },
    { name: "Sad", icon: "😢" },
    { name: "Neutral", icon: "😐" },
    { name: "Romantic", icon: "😘" },
    { name: "Angry", icon: "😡" },
    { name: "Excited", icon: "🤩" },
    { name: "Sleepy", icon: "😴" },
    { name: "Confused", icon: "😕" },
    { name: "Surprised", icon: "😲" },
    { name: "Silly", icon: "😜" },
    { name: "Scared", icon: "😱" },
    { name: "Bored", icon: "😒" },
    { name: "In Love", icon: "😍" },
    { name: "Cool", icon: "😎" },
    { name: "Proud", icon: "😌" },
    { name: "Hungry", icon: "😋" },
    { name: "Crying", icon: "😭" },
    { name: "Grateful", icon: "🙏" },
    { name: "Laughing", icon: "😂" },
    { name: "Winking", icon: "😉" },
    { name: "Blushing", icon: "😊" },
    { name: "Relieved", icon: "😅" },
    { name: "Shy", icon: "🤭" },
    { name: "Thinking", icon: "🤔" },
    { name: "Dizzy", icon: "😵" },
    { name: "Party", icon: "🥳" },
    { name: "Sick", icon: "🤢" },
    { name: "Nerdy", icon: "🤓" },
    { name: "Star-Struck", icon: "🤩" },
    { name: "Celebrating", icon: "🎉" },
    { name: "Reluctant", icon: "😬" },
    { name: "Surprised", icon: "😯" },
    { name: "Embarrassed", icon: "😳" },
    { name: "Skeptical", icon: "🤨" },
    { name: "Heartbroken", icon: "💔" },
    { name: "Love-Struck", icon: "💖" },
    { name: "Victory", icon: "✌️" },
    { name: "Blessed", icon: "😇" },
    { name: "Yawning", icon: "🥱" },
    { name: "Tired", icon: "😪" },
    { name: "Mind-Blown", icon: "🤯" },
    { name: "Determined", icon: "😤" },
    { name: "Relieved", icon: "😌" },
    { name: "Celebratory", icon: "🥂" },
    { name: "Clever", icon: "🧐" },
    { name: "Mischievous", icon: "😏" },
    { name: "Content", icon: "🙂" },
    { name: "Focused", icon: "😶‍🌫️" },
    { name: "Zen", icon: "🧘" },
    { name: "Annoyed", icon: "😠" },
    { name: "Frustrated", icon: "😖" },
    { name: "Triumphant", icon: "😤" },
    { name: "Energetic", icon: "⚡" },
    { name: "Clapping", icon: "👏" },
    { name: "Thumbs Up", icon: "👍" }
  ];

  return (
    <div className="emoji-container">
      <h1 className="title">Choose Your Mood</h1>
      <div className="emoji-selection">
        {emojis.map((emoji, index) => (
          <div
            key={index}
            onClick={() => handleMoodSelection(emoji.name)}
            className="emoji"
          >
            <div className="emoji-icon">{emoji.icon}</div>
            <div className="emoji-name">{emoji.name}</div>
          </div>
        ))}
      </div>

      <div className="edit-icon" onClick={handleEditClick}>
        <FaPencilAlt /> <span>Write Journal</span>
      </div>

      {mood && (
        <div className="selected-mood">
          <p>You selected: <strong>{mood}</strong> mood</p>
        </div>
      )}
    </div>
  );
};

export default Emoji;
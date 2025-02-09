import React, { useState } from "react";
import "./SeminarItem.css";
import EditModal from "../EditModal/EditModal";

function SeminarItem({ seminar, setSeminars, onDelete }) {
  const [modal, setModal] = useState(false);
  const [currentSeminar, setCurrentSeminar] = useState({
    id: seminar.id,
    title: seminar.title,
    description: seminar.description,
    date: seminar.date,
    time: seminar.time,
    photo: seminar.photo,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentSeminar((prev) => ({ ...prev, [name]: value }));
  };
  //Функция редактирования семинаров
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/seminars/${currentSeminar.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentSeminar),
    })
      .then((response) => response.json())
      .then((updatedSeminar) => {
        setSeminars((prev) =>
          prev.map((seminar) =>
            seminar.id === updatedSeminar.id ? updatedSeminar : seminar
          )
        );
        setModal(false);
      })
      .catch((error) => console.error("Error updating seminar:", error));
  };

  return (
    <div className="seminar-item">
      <h2>{seminar.title}</h2>
      <p>{seminar.description}</p>
      <p>
        {seminar.date} в {seminar.time}
      </p>
      <img src={seminar.photo} alt={seminar.title} />
      <div>
        <button onClick={() => setModal(true)}>Редактировать</button>
        <button onClick={() => onDelete(seminar.id)}>Удалить</button>
      </div>
      <EditModal open={modal}>
        <h2>Редактировать семинар</h2>
        <form>
          <input
            type="text"
            name="title"
            value={currentSeminar.title}
            onChange={handleChange}
          />
          <textarea
            type="text"
            name="description"
            value={currentSeminar.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="date"
            value={currentSeminar.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            value={currentSeminar.time}
            onChange={handleChange}
          />
          <input
            type="text"
            name="photo"
            value={currentSeminar.photo}
            onChange={handleChange}
          />
        </form>
        <button onClick={handleSubmit}>Редактировать</button>
        <button onClick={() => setModal(false)}>Закрыть</button>
      </EditModal>
    </div>
  );
}

export default SeminarItem;

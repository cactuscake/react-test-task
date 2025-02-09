import React from "react";
import SeminarItem from "../SeminarItem/SeminarItem";
import "./SeminarList.css";

function SeminarList({ seminars, setSeminars }) {
  //Функция удаления семинаров
  const handleDelete = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить семинар?")) {
      await fetch(`http://localhost:3000/seminars/${id}`, { method: "DELETE" });
      setSeminars(seminars.filter((seminar) => seminar.id !== id));
    }
  };

  return (
    <div className="seminar-list">
      {seminars.map((seminar) => (
        <SeminarItem
          key={seminar.id}
          seminar={seminar}
          setSeminars={setSeminars}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default SeminarList;

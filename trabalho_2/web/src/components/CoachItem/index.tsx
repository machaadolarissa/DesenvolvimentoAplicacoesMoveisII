// CoachItem.tsx
import React from 'react';
import api from '../../services/api';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import convertMinutesToHours from '../../utils/convertMinutesToHours';
import getWeekDayName from '../../utils/getWeekDayName';

export interface Coach {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
  week_day: number;
  from: string;
  to: string;
  week_days: number[];
  listFrom: string[];
  listTo: string[];
}

interface CoachItemProps {
  coach: Coach;
}

const CoachItem: React.FC<CoachItemProps> = ({ coach }) => {
  function createNewConnection() {
    api.post('connections', {
      coach_id: coach.id,
    });
  }

  return (
    <article className="coach-item">
      <header>
        <img src={coach.avatar} alt={coach.name} />
        <div>
          <strong>{coach.name}</strong>
          <span>{coach.subject}</span>
        </div>
      </header>

      <p>{coach.bio}</p>

      <footer>
  <p>
    <strong className="info-label">Preço/Hora:</strong><br />
    R$ {coach.cost}
  </p>

  <p>
    <strong className="info-label">Horários:</strong><br />
    {coach.week_days.map((day, index) => (
      <span key={index}>
        {getWeekDayName(day)} - {convertMinutesToHours(coach.listFrom[index])} ao {convertMinutesToHours(coach.listTo[index])}<br />
      </span>
    ))}
  </p>

  <a
    target="_blank"
    onClick={createNewConnection}
    href={`https://wa.me/${coach.whatsapp}`} rel="noreferrer"
  >
    <img src={whatsappIcon} alt="Whatsapp"/>
    Entrar em contato
  </a>
</footer>

    </article>
  );
}

export default CoachItem;
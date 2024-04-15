import React, { FormEvent, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import CoachItem, { Coach } from '../../components/CoachItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';
import './styles.css';

function CoachList() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchCoaches(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time,
        },
      });

      const groupedCoaches: { [key: string]: Coach } = {};
      response.data.forEach((coachData: Coach) => {
        const key = `${coachData.id}_${coachData.subject}`;
        if (!groupedCoaches[key]) {
          groupedCoaches[key] = { ...coachData, week_days: [], listFrom: [], listTo: [] };
        }
        groupedCoaches[key].week_days.push(coachData.week_day);
        groupedCoaches[key].listFrom.push(coachData.from);
        groupedCoaches[key].listTo.push(coachData.to);
      });

      const coachesArray = Object.values(groupedCoaches);

      setCoaches(coachesArray);

    } catch (error) {
      console.error('Erro ao buscar os coaches:', error);
    }
  }

  return (
    <div id="page-coach-list" className="container">
      <PageHeader title="Estes são os coaches disponíveis.">
        <form id="search-coaches" onSubmit={searchCoaches}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação física', label: 'Educação física' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
            ]}
          />

          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />

          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {coaches.map((coach: Coach, index: number) => (
          <div key={index}>
            <CoachItem key={index} coach={coach} />
          </div>
        ))}
      </main>
    </div>
  );
}

export default CoachList;

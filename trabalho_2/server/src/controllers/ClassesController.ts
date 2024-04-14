import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    try {
      const { subject, week_day, time } = request.query;
  
      if (!subject || !week_day || !time) {
        return response.status(400).json({
          error: 'Missing filters to search classes'
        });
      }
  
  
      const timeInMinutes = convertHourToMinutes(time as string);
  
      const classes = await db('classes')
        .whereExists(function() {
          this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
        .where('classes.subject', '=', subject as string)
        .join('coaches', 'classes.coach_id', '=', 'coaches.id')
        .join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')
        .select([
          'classes.*',
          'coaches.name',
          'coaches.avatar',
          'coaches.whatsapp',
          'coaches.bio',
          'class_schedule.week_day',
          'class_schedule.from',
          'class_schedule.to'
        ]);
    
      return response.json(classes);
    } catch (error) {
      console.error('Error fetching classes:', error);
      return response.status(500).json({
        error: 'Unexpected error while fetching classes'
      });
    }
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;

    const trx = await db.transaction();

    try {
      const insertedCoachesIds = await trx('coaches').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const coach_id = insertedCoachesIds[0];

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        coach_id,
      });

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      });
    }
  }
}

import {Request, response, Response} from 'express'
import db from '../database/connection';
import convertHourToMinute from '../utils/convertHourToMinute';




interface ScheduleItem {
    week_day: number,
    from: string,
    to:string
}

export default class ClassesController {

    async index(req: Request ,res:Response){
        const filters = req.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.subject || !filters.week_day|| !filters.time){
            response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinute(time);
        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `class`.´id´')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??' , [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??' , [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users','classes.user_id', '=', 'user.id')
            .select(['classes.*', 'users.*'])

        return res.json(classes)    

    }
    
    async create(req: Request ,res:Response)  {
        const {
            name,
            Avatar,
            bio,
            whatsapp,
            subject,
            cost,
            schedule
    
        } = req.body;
    
        const trx = await db.transaction();
        try{
            
        
            const insertdUsersIDs = await trx('users').insert({
                name,
                Avatar,
                whatsapp,
                bio,
            });
        
            const user_id = insertdUsersIDs[0];
            
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
                
            })
        
            const class_id = insertedClassesIds[0];
        
            console.log(req.body);
            const classSchedule= schedule.map((scheduleItem:ScheduleItem ) =>{
                
                
                return{
                    class_id,
                    week_day : scheduleItem.week_day,
                    from: convertHourToMinute(scheduleItem.from),
                    to: convertHourToMinute(scheduleItem.to)
                }
            })
        
            console.log("variavel  ", classSchedule);
        
            await trx('class_schedule').insert(classSchedule)
            
            await trx.commit();
    
            res.send().status(201);
    
        }catch(err){
            trx.rollback();
    
            return res.status(400).json({
                error: 'deu bosta'
            })
        }
    
    
    }
}
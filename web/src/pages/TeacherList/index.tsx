import React, { FormEvent, useState } from 'react'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'

import './style.css'

interface teacherID{
    id:number;
}

const  TeacherList = () =>{
    const [teachers, setTeachers] = useState([])
    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function  searchTeachers(e:FormEvent){
        e.preventDefault();

        const result = await api.get(`classes`, {
            params:{
                subject,
                weekDay,
                time
            }
        })
        setTeachers(result.data);


    }
    return(
        <div id="page-teacher-list" className="container">
           <PageHeader  title="Esses são os Proffs disponiveis" >
               <form  id="search-teachers" onSubmit={searchTeachers}>
               <Select
                        name="subject"
                        label="Materia"
                        value={subject}
                        onChange={e=>setSubject(e.target.value)}
                        options={[
                            {value: 'Artes', label:'Artes'},
                            {value: 'Biologia', label:'Biologia'},
                            {value: 'Ciencias', label:'Ciencias'},
                            {value: 'Matematica', label:'Matematica'},
                            {value: 'Fisica', label:'Fisica'},
                            {value: 'Ingles', label:'Ingles'},
                        ]} />
                     <Select
                        name="subject"
                        label="Materia"
                        value={weekDay}
                        onChange={e=>setWeekDay(e.target.value)}
                        options={[
                            {value: '0', label:'domingo'},
                            {value: '1', label:'segunda'},
                            {value: '2', label:'terça'},
                            {value: '3', label:'quarta'},
                            {value: '4', label:'quinta'},
                            {value: '5', label:'sexta'},
                            {value: '5', label:'sabado'},
                        ]} />
                    <Input 
                        label='hora' 
                        name='time' 
                        type="time"
                        value={time}
                        onChange={e=>{
                        setTime(e.target.value)
                       
                        }}/>   

                    <button type="submit"> Buscar </button>    
               </form>
           </PageHeader>
            <main>

                {teachers.map((item : Teacher)=>{
                    return <TeacherItem key={item.id} Teacher={item}/>

                })}
              
               
            </main>

        </div>
    )

}

export default TeacherList
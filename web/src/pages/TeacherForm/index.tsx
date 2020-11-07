import React, {FormEvent, useState} from 'react'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import warnningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import api from '../../services/api'
import {useHistory} from 'react-router-dom'
import ./style.css'

const TeacherForm = () =>{

    const histoy = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    
    const [scheduleItem,setScheduleItens] = useState( [
        {
            week_day: 0,
            from: '',
            to: ''
        }
    ])
    function setScheduleItensValue(index: number, filed : string, value: string){
        const updateScheduleItens =scheduleItem.map((item, i) =>{
            if(i===index){
                return{...item,[filed]:value};
            }

            return item;
        })

        setScheduleItens(updateScheduleItens);
    }

    function handleCreateClass(e:FormEvent){
        e.preventDefault();

        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItem

        }).then(()=>{histoy.push('/')})
    }

    function addNewScheduleItem(){

        setScheduleItens([
            ...scheduleItem,
            {
                week_day: 0,
                from: '',
                to: ''
            }
        ]);
    
    }
    return(
        <div id="page-teacher-form" className="container">
           <PageHeader 
                title="Que incrivel dar aulas!"
                description="O primeiro passo é preeencher esse formulario de inscrição" 
                />

            <main>
                <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus Dados</legend>

                    <Input 
                        name="name" 
                        label="Nome Completo"
                         value={name} 
                         onChange={(e)=>{setName(e.target.value)}} />
                    <Input 
                        name="avatar" 
                        label="Avatar"
                        value={avatar} 
                         onChange={(e)=>{setAvatar(e.target.value)}}
                         />
                    <Input
                         name="whatsapp" 
                         label="whatsapp" 
                         value={whatsapp} 
                         onChange={(e)=>{setWhatsapp(e.target.value)}}
                         />
                    <Textarea 
                    name="bio" 
                    label="Biografia" 
                    value={bio} 
                        onChange={(e)=>{setBio(e.target.value)}}
                    />
            
                </fieldset>
                <fieldset>
                    <legend>Sobre a aula</legend>

                    <Select value={subject} onChange={e=> setSubject(e.target.value)}
                        name="subject"
                        label="Materia"
                        options={[
                            {value: 'Artes', label:'Artes'},
                            {value: 'Biologia', label:'Biologia'},
                            {value: 'Ciencias', label:'Ciencias'},
                            {value: 'Matematica', label:'Matematica'},
                            {value: 'Fisica', label:'Fisica'},
                            {value: 'Ingles', label:'Ingles'},
                        ]} />

                
                    <Input name="cost" label="Custo hora aula" value={cost} onChange={e=> setCost(e.target.value)}/>
            
                </fieldset>
                <fieldset>
                    <legend>Horarios disponiveis
                    <button type="button" onClick={addNewScheduleItem}>
                    + novo horario
                </button>
                 </legend>

               {scheduleItem.map((item, index) =>{
                   return(
                <div key={item.week_day} className="schedule-item">
                   <Select
                          name="subject"
                          label="Materia"
                          value={item.week_day}
                          onChange={e=>setScheduleItensValue(index,'week_day', e.target.value)}
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
                  name="from"
                   label="das"
                    type="time" 
                    value={item.from}
                   onChange={e=>setScheduleItensValue(index,'from', e.target.value)}></Input>   
                  <Input
                   name="to"
                    label="ate" 
                    type="time"
                    value={item.to}
                    onChange={e=>setScheduleItensValue(index,'to', e.target.value)}></Input>      
                </div>
                   );
               })}
                
                </fieldset>
                </form>
                <footer>
                    <p>
                        <img src={warnningIcon} alt="aviso importante "/>
                        Importante <br/>
                        Preecha todos os Dados
                    </p>
                    <button type="submit"> Salvar Cadastro</button>
                </footer>
            </main>

        </div>
    )

}

export default TeacherForm
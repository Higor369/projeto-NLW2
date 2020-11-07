import React from   'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

export interface Teacher{

        avatar: string;
        bio: string;
        cost: number
        id:number;
        name: string;
        user_id: number;
        whatsapp: string;
        subject: string;
}

  interface TeacherItemProps{
    Teacher: Teacher
}

const TeacherItem:React.FC<TeacherItemProps> = ({Teacher}) =>{

    return(
        <article className="teacher-item">
            <header>
                <img src={Teacher.avatar} alt="tobirama"/>
                <div>
                    <strong>{Teacher.name}</strong>
                    <span>{Teacher.subject}</span>
                </div>
            </header>
                <p>
                    {Teacher.bio}
                </p>
            <footer>
                <p>
                 preço/hora: <strong>{Teacher.cost}</strong>
                </p>
                <a href={`https://wa.me/${Teacher.whatsapp}`}>
                    <img src={whatsappIcon} alt=""/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'


import './styles.css'
import api from '../../services/api'
const Landing = () => {

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(()=>{
        api.get('connections').then(res =>{
            setTotalConnections(res.data.total)
        })
    },[])

    return(
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="nosso logo"></img>
                    <h2>Sua plataforma de estudos online</h2>
                </div>
                <img 
                    className="hero-image" 
                    src={landingImg}
                    alt="" />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="estudar"/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Estudar"/>
                        Dar Aula
                    </Link>
                </div>   
                <span className="total-connections">
                    total de {totalConnections} conexões já relizadas <img src={purpleHeartIcon}alt="corção roxo"/>
                </span>
            </div>
        </div>
    )
}

export default Landing;
import { motion } from 'motion/react'
import './App.css'
import penLogo from "./assets/pen-logo-white.svg"
import github from "./assets/github-logo-white.svg"
import {useEffect, useState} from "react";

type CardProps = {
    service: string;
    logo: string;
};

const Card: React.FC<CardProps> = ({service, logo}) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/links.json');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, [])

   return (
       <motion.div whileHover={{scale: 1.25, transition: {duration: 0.25, type: "easeInOut"}}}>
           <div className="card" onClick={() => {
               if (data != null)
                   window.open(data[service], "_blank")
           }}>
               <h1>{service}</h1>
               <img src={logo} alt={service}/>
           </div>
       </motion.div>
   )
};

type ContactProps = {
    name: string;
}

const Contact: React.FC<ContactProps> = ({name}) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/contacts.json');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, [])

    return (
        <p>{name}: {data != null ? data[name] : ""}</p>
    )
};

function App() {
    return (
        <>
            <div className="card-container">
                <Card service="Blog" logo={penLogo} />
                <Card service="GitHub" logo={github} />
            </div>
            <footer className="contact">
                <p style={{textAlign: "center"}}>Contact me</p>
                <div className="contact-container">
                    <Contact name="Email" />
                </div>
            </footer>
        </>
    )
}

export default App

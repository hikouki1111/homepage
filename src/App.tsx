import { motion } from 'motion/react'
import './App.css'
import github from "./assets/github-logo-white.svg"
import xLogo from "./assets/x-logo-white.svg"
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
    })

   return (
       <motion.div whileHover={{scale: 1.25, transition: {duration: 0.25, type: "easeInOut"}}}>
           <div className="card" onClick={() => window.open(data[service], "_blank")}>
               <img src={logo} alt={service}/>
               <p>{service}</p>
           </div>
       </motion.div>
   )
};

function App() {
    return (
        <>
            <Card service="GitHub" logo={github} />
            <Card service="X" logo={xLogo} />
        </>
    )
}

export default App

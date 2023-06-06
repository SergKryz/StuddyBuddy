import React, {useEffect, useState, useRef} from 'react'
// import { ReactComponent as TrashTimer } from '../../Assests/Svg/trash-timer.svg'
// import { ReactComponent as AddTimer } from '../../Assests/Svg/add-timer.svg'
import {ReactComponent as Start} from '../../Assests/Svg/start.svg'
import {ReactComponent as Pause} from '../../Assests/Svg/pause.svg'
function Pomodoro() {

    const [timer, setTimer] = useState(25 * 60); // Initial timer value in seconds
    const [isBreak, setIsBreak] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef();

    useEffect(() => {
        if (isRunning) {
        intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        } else {
        clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    useEffect(() => {
        if (timer === 0) {
        clearInterval(intervalRef.current);
        setIsBreak((prevIsBreak) => !prevIsBreak);
        setTimer(isBreak ? 25 * 60 : 5 * 60);
        alert("BREAK TIME! Please Enjoy!");
        setIsRunning(false);

        }
        // if(isBreak){
        // }
    }, [timer, isBreak]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleResume = () => {
        setIsRunning(true);
    };

    const handleReset = () => {
        clearInterval(intervalRef.current);
        setIsBreak(false);
        setTimer(25 * 60);
        setIsRunning(false);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        if(isBreak){
            setIsRunning(true);
        }
    }, [isBreak])


    return (
        <div className="container-fluid">
            <div className="row justify-content-center " style={{marginBottom:'25px'}}>
                <div className="col-lg-11 my-5">
                    <div className="row">
                        <div className="col-lg-5">
                            <h1>Pomodoro Timer</h1>
                            <p className='p-4'>
                                To use the Pomodoro technique, you simply set a timer for 25 minutes and work on a task without interruption until the timer goes off. Then, take a short break, typically 5 minutes, before starting another Pomodoro. After four Pomodoros, take a longer break, typically 15-30 minutes. This cycle can be repeated throughout the day to help  stay focused and productive.The Pomodoro technique is a simple but effective way to manage time and improve productivity. Enjoy !    
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-8 " >
                                    <div className="ml-auto" style={{ width: "fit-content" }}>
                                        <div className="btn  m-2 timer-btn-1" onClick={()=>{setTimer(25 * 60);}} >25/5</div>
                                        <div className="btn  m-2 timer-btn-2" onClick={()=>{setTimer(50 * 60);}}>50/10</div>
                                    </div>
                                </div>
                                <div className="col-lg-4 d-flex justify-content-center align-items-center">
                                    <img src="./trash-timer.svg" alt=""  onClick={handleReset}/>

                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="col-lg-12 d-flex  timer-box justify-content-center">
                                    <h1 className='timer-time'>{formatTime(timer)}</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <button className="pause m-2">
                                        <Pause button onClick={handlePause}/>
                                    </button>
                                    <button className="start m-2">
                                        <Start onClick={handleStart}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pomodoro

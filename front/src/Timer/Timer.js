import React from 'react';
import {useState, useRef} from 'react'

const Timer = () => {

  // задаем часы и минуты и секунды через стейт
  const [timerHours, setTimerHours] = useState('00')
  const [timerMinutes, setTimerMinutes] = useState('00')
  const [timerSeconds, setTimerSeconds] = useState('00')

  let interval = useRef()

  const startTimer = () => {
    const countdownDate = new Date('December 20, 2020 00:00:00').getTime()// время из заданной строки

    interval = setInterval(() => {// отсчет по одной секунде
      const now = new Date().getTime()
      const distance = countdownDate - now// время, которое нужно отсчитать назад 
      const hours = 

    },1000)



  }
 
  return ( 
    <div>

    </div>
   );
}
 
export default Timer;

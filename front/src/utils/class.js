export default class Checker {
  constructor() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  dateFromBase (start, length) {// добавляем к дате длительность марафона
    let startDate = new Date(start);
    let newDate = startDate.setDate(startDate.getDate() + length);
    return newDate// в миллисекундах
  }

  checkMarathonStarted(marathonId) {// находим марафон и возвращаем тру, если он начался
    const curMarathon = this.user.marathons.filter((marathon) => marathon._id === marathonId);
    // console.log(curMarathon);
    if (curMarathon.length === 0) return false
    return (new Date(curMarathon[0].start) < Date.now())// 
  }

  checkMarathonFinished (marathonId) {// вернет тру, если марафон закончился
    const curMarathon = this.user.marathons.filter((marathon) => marathon._id === marathonId);
    const endDate = this.dateFromBase(curMarathon[0].start, curMarathon[0].duration);
    return (new Date(endDate) < Date.now())
  }

  // checkCanPublish (marathonId, day) {
  //   let day1 = day-1;
  //   const curMarathon = this.user.marathons.filter((marathon) => marathon._id === marathonId);
  //   const changedTime = this.timeMaker(curMarathon[0].start, curMarathon[0].timeResponse)


  //   let arrayOfDays = []
  //   let newDate = new Date(changedTime)
   
    

  //   for (let i = 1; i <= curMarathon[0].duration; i++) {
      
  //     newDate = new Date(newDate.getTime()+86400000)
  //     arrayOfDays.push(newDate);
  //     // console.log(arrayOfDays);
      
  //   }
    
  //   return Date.now() > arrayOfDays[day1]


  // }
  
  
  
  //уже можно сдавать
  checkCanPass (marathonId, day) {
    let day1 = day-1;
    const curMarathon = this.user.marathons.filter((marathon) => marathon._id === marathonId);
    const changedTime = this.timeMaker(curMarathon[0].start, curMarathon[0].timeResponse)// меняем время на время начала марафона

    
    
    let arrayOfDays = []
    let newDate = new Date(changedTime)
   
    

    for (let i = 1; i <= curMarathon[0].duration; i++) {
      
      newDate = new Date(newDate.getTime()+86400000)
      arrayOfDays.push(newDate);
      // console.log(arrayOfDays);
      
    }
    
    return Date.now() > arrayOfDays[day1]

  }
  // проверка дедлайна
  checkDeadline (marathonId, day) {// возвращает тру, если дедлайн еще не наступил
    let day1 = day-1;
    const curMarathon = this.user.marathons.filter((marathon) => marathon._id === marathonId);
    const changedTime = this.timeMaker(curMarathon[0].start, curMarathon[0].deadline)// меняем время на время начала марафона
     
    
    let arrayOfDays = []
    let newDate = new Date(changedTime)
   
    

    for (let i = 1; i <= curMarathon[0].duration; i++) {
      
      newDate = new Date(newDate.getTime()+86400000)
      arrayOfDays.push(newDate);
      // console.log(arrayOfDays);
      
    }
    
    console.log(arrayOfDays[day1]);
    // если текущая дата меньше, чем дедлайн, то возвращает тру
    return Date.now() < arrayOfDays[day1]

  }

  checkTimeVideo (marathonId, day) {// возвращает фолс, если время публикации ответа еще не наступило
    let day1 = day-1;
    const curMarathon = this.user.marathons.filter((marathon) => marathon._id === marathonId);
    const changedTime = this.timeMaker(curMarathon[0].start, curMarathon[0].timeVideo)// меняем время на время начала марафона
     
    
    let arrayOfDays = []
    let newDate = new Date(changedTime)
   
    

    for (let i = 1; i <= curMarathon[0].duration; i++) {
      
      newDate = new Date(newDate.getTime()+86400000)
      arrayOfDays.push(newDate);
      // console.log(arrayOfDays);
      
    }
    
    console.log(arrayOfDays[day1]);
    // если текущая дата меньше, чем время публикации, то возвращает фолс
    return Date.now() > arrayOfDays[day1]

  }

// функция для замены времени в дне начала, возвращает объект времени с новым временем (старт или дедлайн)
timeMaker (date, setTime) {
  const splitedSetTime = setTime.split('');
  const timeToString = String(new Date(date))
  const array = timeToString.split('')
  array.splice(16,5, ...splitedSetTime)
  const finalArray = array.join('')
  return new Date(finalArray)

}

 

}




//   const a = "2020-12-20T15:05:00.000Z";
//   const time = "13:00"
//   const splTime = time.split('')
//   // console.log(splTime);

// const str = String(new Date(a))
// // console.log(str);
// const arr = str.split('')
// // console.log(arr);
// arr.splice(16, 5, ...splTime)
// const arr2 = arr.join('')
// const arr3 = new Date(arr2)
// console.log(arr3);

// let newDate = arr3.setHours(arr3.getHours() + 24);
// console.log(new Date(newDate));
// // let newDate1 = newDate.toLocaleDateString()
// // let newDate1 = arr3.setDate(arr3.getDate() + 1);
// // console.log(newDate1);

// // b.setDate(b.getDate() + 3);
// const y = b.getFullYear()
// const m = b.getMonth()+1
// const d = b.getDate()
// const h = b.getHours()


// console.log(y, m, d);

// const date = new Date().toLocaleDateString();
// // const s = date.toString()

// console.log(Date.now());

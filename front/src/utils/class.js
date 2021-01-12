export default class Checker {
    constructor() {
        this.user = JSON.parse(localStorage.getItem("user"));
    }

    dateFromBase(start, length) {// добавляем к дате длительность марафона
        let startDate = new Date(start);
        return startDate.setDate(startDate.getDate() + length)// в миллисекундах
    }

    checkMarathonStarted(marathonId) {// находим марафон и возвращаем тру, если он начался
        const curMarathon = this.user.marathons.filter((marathon) => marathon._id === marathonId);
        if (curMarathon.length === 0) return false
        return (new Date(curMarathon[0].start) < Date.now())
    }

    checkMarathonFinished(marathonId) {// вернет тру, если марафон закончился
        const curMarathon = this.user.marathons.filter((marathon) => marathon._id === marathonId);
        const endDate = this.dateFromBase(curMarathon[0].start, curMarathon[0].duration);
        return (new Date(endDate) < Date.now())
    }

    //уже можно сдавать
    checkCanPass(marathonId, day) {
        let day1 = day - 1;
        const curMarathon = this.user.marathons.filter((marathon) => marathon._id === marathonId);
        const changedTime = this.timeMaker(curMarathon[0].start, curMarathon[0].timeResponse)// меняем время на время начала марафона
        let arrayOfDays = []
        let newDate = new Date(changedTime)

        for (let i = 1; i <= curMarathon[0].duration; i++) {

            arrayOfDays.push(newDate);
            newDate = new Date(newDate.getTime() + 86400000)

        }
        return Date.now() > arrayOfDays[day1]
    }

    // проверка дедлайна
    checkDeadline(marathonId, day) {// возвращает тру, если дедлайн еще не наступил
        let day1 = day - 1;
        const curMarathon = this.user.marathons.filter((marathon) => marathon._id === marathonId);
        const changedTime = this.timeMaker(curMarathon[0].start, curMarathon[0].deadline)// меняем время на время начала марафона

        let arrayOfDays = []
        let newDate = new Date(changedTime)

        for (let i = 1; i <= curMarathon[0].duration; i++) {

            newDate = new Date(newDate.getTime() + 86400000)
            arrayOfDays.push(newDate);

        }
        return Date.now() < arrayOfDays[day1]
    }

    checkTimeVideo(marathonId, day) {// возвращает фолс, если время публикации ответа еще не наступило
        let day1 = day - 1;
        const curMarathon = this.user.marathons.filter((marathon) => marathon._id === marathonId);
        const changedTime = this.timeMaker(curMarathon[0].start, curMarathon[0].timeVideo)// меняем время на время начала марафона

        let arrayOfDays = []
        let newDate = new Date(changedTime)

        for (let i = 1; i <= curMarathon[0].duration; i++) {

            newDate = new Date(newDate.getTime() + 86400000)
            arrayOfDays.push(newDate);

        }
        // если текущая дата меньше, чем время публикации, то возвращает фолс
        return Date.now() > arrayOfDays[day1]
    }

    // функция для замены времени в дне начала, возвращает объект времени с новым временем (старт или дедлайн)
    timeMaker(date, setTime) {
        const splitedSetTime = setTime.split('');
        const timeToString = String(new Date(date))
        const array = timeToString.split('')
        array.splice(16, 5, ...splitedSetTime)
        const finalArray = array.join('')
        return new Date(finalArray)
    }

    checkAnswer(marathonId, userId, day, task) {
        let flag = false;
        this.user.marathons.filter((marathon) => marathon._id === marathonId)[0].tasks[day - 1].task[task].answers.map(answer => {
            if (answer.student._id === userId) flag = true
        })
        return flag
    }

    checkFeedback(marathonId, userId, day, task) {
        let flag = false;
        this.user.marathons.filter((marathon) => marathon._id === marathonId)[0].tasks[day - 1].task[task].feedbacks.map(feedback => {
            if (feedback.student._id === userId) flag = true
        })
        return flag
    }
}

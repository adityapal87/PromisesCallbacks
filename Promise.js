// Dated - 23rd Nov, 2021

// Link to follow -> https://www.youtube.com/watch?v=F8xANXY0kaU
// Article to follow -> https://www.freecodecamp.org/news/javascript-promise-tutorial-how-to-resolve-or-reject-promises-in-js/

// Promises are used to handle async result.
/*
How to Handle Multiple Promises
Apart from the handler methods (.then, .catch, and .finally), 
there are six static methods available in the Promise API. 
The first four methods accept an array of promises and run them in PARALLEL.
Promise.all
Promise.any
Promise.allSettled
Promise.race
Promise.resolve
Promise.reject
*/

/*
NOTE:
A Promise executor should call only one resolve or one reject. Once one state is changed (pending => fulfilled or pending => rejected), 
that's all. Any further calls to resolve or reject will be ignored.

let promise = new Promise(function(resolve, reject) {
  resolve("I am surely going to get resolved!");

  reject(new Error('Will this be ignored?')); // ignored
  resolve("Ignored?"); // ignored
});
*/

const isMeeting=true;
const getDetails = new Promise((resolve, reject) => {
    if(isMeeting){
        const meeting = {
            name: 'Marketing',
            location: 'Skype'
        }
        // console.log(meeting)
        resolve(meeting);
    }
    else reject(new Error('Not Scheduled.'));
});

const addCalendar = meeting =>{
    const data = `The meeting details are ${meeting.name} and location is ${meeting.location}`;
    return Promise.resolve(data); 
}

// classic way of dealing with promises
const consumer = () => {  // consumer function
    getDetails    
    .then(addCalendar)
    .then(
        result => console.log(result),
        error => {}
    )
}

// consumer();

// async await example but in the following code, error handling is not available.
// To handle errors, we use try() catch() blocks where catch() takes care of error handling.
const AsyncConsumer = async () => {
    const meetingInfo = await getDetails;  // "await getDetails()" is not valid as getDetails is a PROMISE not a method. 
    const calendar = await addCalendar(meetingInfo);
    console.log(calendar);
}

// AsyncConsumer();

const AsyncConsumerTryCatch = async () => {
    try {
        const meetingInfo = await getDetails;  // "await getDetails()" is not valid as getDetails is a PROMISE not a method. 
        const calendar = await addCalendar(meetingInfo);
        console.log(calendar); 
    } catch (error) {
        console.log(error.message);
    }
}

// AsyncConsumerTryCatch();

// Using fetch()
fetch('/api/user.json')
.then(response => {
    return response.json();
})
.then(json => {
    console.log(json); // {"name": "tapas", "blog": "freeCodeCamp"}
});

/*
const isMeeting=true;
const details = () => {
    const getDetails = new Promise((resolve, reject) => {
        if(isMeeting){
            const meeting = {
                name: 'Marketing',
                location: 'Skype'
            }
            // console.log(meeting)
            resolve(meeting);
        }
        else reject(new Error('Not Scheduled.'));
    });
    return getDetails;
}
const addCalendar = details()

const consumer = () => {
    addCalendar
    .then(
        result => console.log(result)
    )
}

consumer();
*/

const promise2 = new Promise(( resolve, reject )=>{
    setTimeout(()=>{
        resolve('This is Shivaji - The Cool')
    }, 5000)
})

Promise.all([getDetails, promise2]).then(res => console.log(res));

// Promise.race([getDetails, promise2]).then(res => console.log(res));


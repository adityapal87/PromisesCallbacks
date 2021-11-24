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


// Video to follow -> https://www.youtube.com/watch?v=NsQ2QIrQShU
// Promise + Generator function = async/await
// Async/await is a thin layer of syntax over Promises and Generators.
// Generator is used to pause the execution and yield the result later.

    function generatorFunc(){
        let result = fetch('/users');
        //Pause execution by yielding
        yield result;
        //Later something caused us to resume.
        console.log('We are back!');
    }

    // In the following code, async/await pause the execution of the code.
    //  We wait and let the event loop do the other stuff.
    // Eventually when the fetch is completed, this function gets resumed.
    // Then we have our result which can be console logged.

    // Video to follow -> https://www.youtube.com/watch?v=PoRJizFvM7s
    async function getUsers() {
        // Here's the magic
        let result = await fetchJSON('/users');   // fetchJSON is promise.
        console.log(result);
    }

    getUsers();

    // Another exmaple of Async/await 
    async function readConfig() {
        try {
            let content = await readFile('config.JSON');
            let obj = JSON.parse(content.toString());
            console.log(obj);
        } catch(err) {
            console.log(err);
        }
    }

    async function animate(element) {
        for(let i=0;i<100;i++) {
            element.style.left = i + 'px';
            await sleep(16);
        }
    }

    async function getUserFriends() {
        let user = await fetchJSON('/users/me');
        let friendIDs = await fetchJSON(`/friends/${user.id}`);
        let promises = friendIDs.map(id => {
            return fetchJSON(`/users/${id}`);
        });

        let friends = await Promise.all(promises);
        console.log(friends);
    }

    let promise = getUserFriends(); // getUserFriends() is a promise as async is used in line 106.

    /*
    IMPORTANT POINTS :-
    1. An async function always returns a promise.
    2. When we await a promise, our function pauses until the promise is resolved.
    3. We can still use our promise helpers such as Promise.all()
    */



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
// The fetch method returns a promise. So we can call the .then handler method on it
fetch('/api/user.json')
.then(response => {
    return response.json();
})  // this .then() can be rewritten as .then(response => response.json())
.then(json => {
    console.log(json); // {"name": "tapas", "blog": "freeCodeCamp"}
});

// // OR
fetch('https://cooldogs.org')
.then(data => data.json())
.then(dogs => pet(dogs));

// Async/Await with Fetch
 async function getUsers() {
    const res = await fetch('https://cooldogs.org');
    const data = await res.json();
    console.log(data);
}

// // Using axios
axios.get('https:cooldogs.org')
.then(dogs => pet(dogs));


const promise2 = new Promise(( resolve, reject )=>{
    setTimeout(()=>{
        resolve('This is Shivaji - The Cool')
    }, 5000)
})

// Promise.all([getDetails, promise2]).then(res => console.log(res));

// Promise.race([getDetails, promise2]).then(res => console.log(res));


// Content from Wes Bos ->  https://www.youtube.com/watch?v=DwQJ_NPQWWo
function sleep(amount) {
    return new Promise((resolve, reject) => {
        if(amount<300){
            reject('Less sleep');
        }
        setTimeout(() => {
            resolve(`Slept for ${amount}`)
        }, amount);
    })
}

sleep(500)
.then(result => {
    console.log(result);
    return sleep(1000);
})
.then(result => {
    console.log(result);
    return sleep(750);
})
.then(result => {
    console.log(result);
    console.log('Done');
})


// IMPORTANT -> Any code that needs to come after the promise still needs to be in final .then() callback.
// That's where async await comes into picture.

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



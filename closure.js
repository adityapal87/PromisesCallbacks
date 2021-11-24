// CLOSURE - function bundled together with its LEXICAL SCOPE forms CLOSURE.

// function x() {
//     var a=7;
//     function y() {
//         console.log(a);  // a is not defined within y(). Still y can access a's value.
//                         // Just bcoz of CLOSURE. a comes in LEXICAL SCOPE of y.
//     }
//     y();
// }
// x();


/*
function x() {
    var a=7;
    function y() {
        console.log(a);  // a is not defined within y(). Still y can access a's value.
                        // Just bcoz of CLOSURE. a comes in LEXICAL SCOPE of y.
    }
    a=100;  // value of 'a' does not persist. But reference of 'a' persists.
    return y;
}
var z = x();
console.log(z);
z();    // this line will result in console logging of a's value.
        // Even if, a is not in scope of z, still a's value is accessible through z
        // Just bcoz of CLOSURE.
*/

function z() {
    var b=10;
    function x() {
        var a=7;
        function y() {
            console.log(a, b);  // a is not defined within y(). Still y can access a's value.
                            // Just bcoz of CLOSURE. a comes in LEXICAL SCOPE of y.
        }
        a=100;  // value of 'a' does not persist. But reference of 'a' persists.
        y();
    }
    x();
}
z(); // prints 100 10

// In the above example, y forms CLOSURE with x and z.


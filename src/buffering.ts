console.log("running buffering.ts")

import { interval,  timer, pipe } from 'rxjs'

import { buffer, take, bufferTime, bufferCount, bufferToggle, tap, bufferWhen} from 'rxjs/operators'

import { window, switchMap, toArray, windowCount, windowTime, windowToggle, windowWhen, mergeAll } from 'rxjs/operators'


//#region  buffer
//Con buffer tomas los valores que han sido pasados hasta ese momento y los une en un array
// add values into a buffer
// emit buffered values as array whenever
// inner observable emits

// console.log('# emit the buffer after 1000 ms');
// interval(100)
//     .pipe(
//         buffer(interval(1000)),
//         take(3) // <-- just to limit the life of the source Observable
//     )
//     .subscribe(d => {
//         console.log(d);
//     });
// Output:
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
// [ 9, 10, 11, 12, 13, 14, 15, 16, 17 ]
// [ 18, 19, 20, 21, 22, 23, 24, 25, 26 ]

//#endregion

//#region  bufferCount       

// // es lo mismo que buffer pero puedes elegir cuantos elementos tiene el buffer

// // add value into buffer until full
// // then emit the buffer

// // const { of } = require('rxjs');
// // const { bufferCount } = require('rxjs/operators');

// //#region example 1
// console.log('# emit buffer of 2 values or when complete');
// of(1, 2, 3)
//     .pipe(bufferCount(2))
//     .subscribe(sequence => {
//         console.log(sequence);
//     });
// // Output:
// // [ 1, 2 ]
// // [ 3 ]
// //#endregion

// //#region example 2
// console.log();
// console.log('# emit buffer of 2 values');
// console.log('# start a new buffer when a new value emitted');
// console.log('# multiple buffers can coexist!');
// of(1, 2, 3)
//     .pipe(bufferCount(2, 1))
//     .subscribe(sequence => {
//         console.log(sequence);
//     });
// // Output:
// // [ 1, 2 ]
// // [ 2, 3 ]
// // [ 3 ]
// //#endregion

//#endregion

//#region  bufferTime

// //   determine the lifetime of a buffer
// //   emit the created buffer after a given period

// console.log('# create a new buffer every 1 seconds');
// console.log('# and emit it after 2 seconds');
// interval(1000)
//     .pipe(
//         take(6),
//         bufferTime(2000, 1000)
//     )
//     .subscribe(sequence => {
//         console.log(sequence);
//     });

// // Output:
// // [ 0 ]
// // [ 0, 1 ]
// // [ 1, 2 ]
// // [ 2, 3 ]
// // [ 3, 4 ]
// // [ 4, 5 ]
// // [ 5 ]

//#endregion

//#region bufferToggle

// //define our open/close signals
// const opening = interval(400).pipe(tap(() => console.log('open')));
// const closing = () => interval(300).pipe(tap(() => console.log('close')));
// // each buffer closes 300 ms after opening
// interval(100)
//     .pipe(
//         tap(x => console.log(x)),
//         bufferToggle(opening, closing),
//         take(3) // <-- just to limit the life of the source Observable
//     )
//     .subscribe(sequence => {
//         console.log(sequence);
//     });

// /*
//  Output:
//       0
//       1
//       2
//       open
//       3
//       4
//       5
//       close
//       [ 3, 4, 5 ]
//       6
//       open
//       7
//       8
//       9
//       close
//       [ 7, 8, 9 ]
//       10
//       open
//       11
//       12
//       13
//       close
//       [ 11, 12, 13 ]

// */
//#endregion

//#region bufferWhen


// console.log('# vary buffer clearing based on value from interval');
// let x = 0;
// interval(500)
//     .pipe(
//         take(10), // <-- just to limit the life of the source Observable
//         tap(i => (x = i)),
//         bufferWhen(() => {
//             // vary buffer closing:
//             if (x < 5) {
//                 return interval(1000);
//             }
//             return interval(500);
//         })
//     )
//     .subscribe(values => {
//         console.log(values);
//     });
// // Output:
// // [ 0 ]
// // [ 1, 2 ]
// // [ 3, 4 ]
// // [ 5, 6 ]
// // [ 7 ]
// // [ 8 ]
// // [ 9 ]

//#endregion

//#region Window

// console.log('# emit the buffer after 1000 ms');
// interval(100)
//     .pipe(
//         window(interval(1000)),
//         take(3), // <-- just to limit the life of the source Observable
//         switchMap(w => w.pipe(toArray()))
//     )
//     .subscribe(d => {
//         console.log(d);
//     });

//#endregion

//#region windowCount 

// //#region example 1
// const source = timer(0, 100).pipe(take(9));
// console.log('# buffer 2 items');
// source
//     .pipe(
//         windowCount(2),
//         switchMap(w => w.pipe(toArray()))
//     )
//     .subscribe(v => console.log(v));
// // Output:
// // [0, 1]
// // [2, 3]
// // [4, 5]
// // [6, 7]
// // [8]
// //#endregion

// //#region example 2
// /*
// setTimeout(() => {
//     console.log('# buffer 2 items then skip 1 items');
//     source
//         .pipe(
//             windowCount(2, 3), // cut after 3 values but add only 2 values to the buffer
//             switchMap(w => w.pipe(toArray()))
//         )
//         .subscribe(v => console.log(v));
//     // Output:
//     // [0, 1]
//     // [3, 4]
//     // [6, 7]
//     // []
// }, 100);
// */
// //#endregion

//#endregion

//#region windowTime


// const source = timer(0, 100).pipe(take(9));
// console.log('# emit buffer after 200 ms');
// source
//     .pipe(
//         windowTime(200),
//         switchMap(w => w.pipe(toArray()))
//     )
//     .subscribe(v => console.log(v));
// // Output:
// // [0, 1]
// // [2, 3]
// // [4, 5]
// // [6, 7]
// // [8]

//#endregion

//#region windowToggle


// console.log('# open a new buffer every 500ms');
// console.log('# close the buffer 200ms after opening');
// console.log('# hence, ignore those come between 200ms and 500ms');
// const openings = timer(0, 500);
// const closing = () => timer(200);

// timer(0, 100)
//     .pipe(
//         take(36),
//         windowToggle(openings, closing),
//         switchMap(s => s.pipe(toArray()))
//     )
//     .subscribe(sequence => {
//         console.log(sequence);
//     });

// // Output:
// // [ 0, 1 ]
// // [ 5, 6 ]
// // [ 10, 11 ]
// // [ 15, 16 ]
// // [ 20, 21 ]
// // [ 25, 26 ]
// // [ 30, 31 ]
// // [ 35 ]


//#endregion

//#region windowWhen

// //    buffer values
// //    on receiving signals from the notifier
// //      send the buffer as an observable
// //    when the source complete
// //      send the last buffer as an observable

// const source = timer(0, 100).pipe(take(9));
// const notifier = () => timer(200);

// console.log('# emit buffer after 200 ms');

// source
//     .pipe(
//         windowWhen(notifier),
//         tap(() => console.log('new buffer')),
//         mergeAll()
//     )
//     .subscribe(v => console.log(v));
// // Output:
// // new buffer
// // 0
// // 1
// // new buffer
// // 2
// // 3
// // new buffer
// // 4
// // 5
// // new buffer
// // 6
// // 7
// // new buffer


//#endregion
console.log("Running Filtering to Multiple Results");

//#region skip

// // skip
// //  ignore the first n values 

// const { of } = require('rxjs');
// const { skip } = require('rxjs/operators');

// console.log('# skip the first 2 values');

// of(1, 2, 3).pipe(
//     skip(2)
// ).subscribe(val => console.log(val));

// // Output: 
// // 3

//#endregion

//#region skipLast

// // skipLast
// //  ignore the last n values

// const { of, interval } = require('rxjs');
// const { skipLast } = require('rxjs/operators');

// console.log('# skip the last 2 values');
// of(1, 2, 3)
//     .pipe(skipLast(2))
//     .subscribe(val => console.log(val));
// // Output:
// // 1

// setTimeout(() => {
//     // ^^^ delay until previous examples complete
//     console.log('# Observable must complete');
//     interval(100)
//         .pipe(skipLast(1))
//         .subscribe(val => console.log(val));
// }, 3000);
// // Output:
// // (nothing skipped - runs forever))

//#endregion

//#region skipUntil

// // skipUntil
// //  skip the value until the notifier sends signal

// const { timer } = require('rxjs');
// const { skipUntil, take } = require('rxjs/operators');

// console.log('# ignore values before the notifier sends the signal at 3s');
// timer(0, 1000)
//     .pipe(
//         take(6),
//         skipUntil(timer(3000))
//     )
//     .subscribe(val => console.log(val));
// // Output:
// // Skip emits values until inner observable emits (3s)
// // 3
// // 4
// // 5

//#endregion

//#region skipWhile

// // skipWhile
// //    skip the value while the condition held true
// //    once the condition becomes false, emit the coming values as
// //    normal

// const { of } = require('rxjs');
// const { skipWhile } = require('rxjs/operators');

// console.log('# skip while the condition is true');
// of(1, 2, 3, 1, 2, 3, 4)
//     //   ^ condition false
//     .pipe(skipWhile(val => val < 3))
//     .subscribe(val => console.log(val));
// // Output:
// // 3
// // 1
// // 2
// // 3
// // 4

//#endregion

//#region take

// // take
// //   the first n values and complete

// const { timer } = require('rxjs');
// const { take } = require('rxjs/operators');

// const source = timer(0, 100);
// console.log('# take the first 5 values');
// source.pipe(
//     take(5)
// ).subscribe(
//     d => console.log(d), 
//     null, 
//     () => console.log('complete')
// );

// // Output: 
// // 0
// // 1
// // 2
// // 3
// // 4
// // complete

//#endregion

//#region takeLast

// // takeLast
// //   emit the last n values and complete

// const { of, interval } = require('rxjs');
// const { takeLast } = require('rxjs/operators');

// const source = of(1, 2, 3, 4, 5, 6, 7, 8, 9);
// console.log('# take the last 3 values');
// source.pipe(takeLast(3)).subscribe(d => console.log(d), null, () => console.log('complete'));

// // Output:
// // 7
// // 8
// // 9
// // complete

// console.log('\r\n____________________\r\n');
// console.log('# Only get 3 values, even though take specified 5');
// of(1, 2, 3)
//     .pipe(takeLast(5))
//     .subscribe(x => console.log(x));

// const source3 = interval(100);
// console.log('\r\n____________________\r\n');
// console.log(`this will never emit anything, and never end, because interval doesn't have a 'last' value`);
// source3.pipe(takeLast(5)).subscribe(d => console.log(d), null, () => console.log('complete'));


//#endregion

//#region takeUntil

// // takeUntil
// //  take the value until the notifier sends signal

// const { timer } = require('rxjs');
// const { takeUntil } = require('rxjs/operators');

// console.log('# take the values until the notifier sends the signal at 300ms')
// timer(0, 100).pipe(
//     takeUntil(timer(300))
// ).subscribe(
//     val => console.log(val),
//     null,
//     () => console.log('complete')
// );

// // Output: 
// // 0
// // 1
// // 2
// // complate

//#endregion

//#region takeWhile

// // takeWhile
// //    take the value while the condition held true
// //    once the condition becomes false, emit complete event

// const { of } = require('rxjs');
// const { takeWhile } = require('rxjs/operators');

// console.log('# take while condition is true');
// of(1, 2, 3, 1)
//     .pipe(takeWhile(val => val < 3))
//     .subscribe(val => console.log(val));
// // Output:
// // 1
// // 2

//#endregion

//#region distinct

// // distinct
// // emit unique values across whole source
// const { of } = require('rxjs');
// const { distinct } = require('rxjs/operators');

// console.log('# select unique values within source');
// of(1, 2, 3, 3, 2, 1)
//     .pipe(distinct())
//     .subscribe(x => console.log(x));
// // Output:
// // 1
// // 2
// // 3

// console.log('________________________________');
// console.log('# select source-unique values as determined by function ');
// of(1, -1, 2, 3, 2)
//     .pipe(distinct(x => Math.abs(x)))
//     .subscribe(x => console.log(x));
// // Output:
// // 1
// // 2
// // 3

// console.log('________________________________');
// console.log('# select distinct objects based on properties');
// console.log('see also distinctUntilKeyChanged');
// of({ name: 'Dave', isAuthor: true }, { name: 'Mary', isAuthor: true }, { name: 'Dave', isAuthor: false })
//     .pipe(distinct(item => item.name))
//     .subscribe(x => console.log(x));

// //Output:
// // { name: 'Dave', isAuthor: true }
// // { name: 'Mary', isAuthor: true }

//#endregion

//#region distinctUntilChange

// // distinctUntilChanged
// // do not emit value until changed

// const { of } = require('rxjs');
// const { distinctUntilChanged } = require('rxjs/operators');

// console.log('#emit only values if changed from the previous one');
// of(1, 1, 1, 2, 1, 2, 3)
//     .pipe(distinctUntilChanged())
//     .subscribe(x => console.log(x));
// // Output:
// // 1
// // 2
// // 1
// // 2
// // 3

// console.log();
// console.log('#emit only values if mapper function return value that changes from the previous one');
// of(1, -1, 2, -2, 1, 2)
//     .pipe(distinctUntilChanged((x, y) => Math.abs(x) === Math.abs(y)))
//     .subscribe(x => console.log(x));
// // Output:
// // 1
// // 2
// // 1
// // 2

//#endregion

//#region distinctUntilKeyChange

// // distinctUntilKeyChanged
// // pick the value of the given field
// //   do not emit value until changed

// const { of } = require('rxjs');
// const { distinctUntilKeyChanged } = require('rxjs/operators');

// const posts = [
//     { postId: 1, likes: 2, author: { id: 11 } },
//     { postId: 2, likes: 6, author: { id: 12 } },
//     { postId: 3, likes: 6, author: { id: 12 } }, // <-- dropped
//     { postId: 4, likes: 9, author: { id: 14 } },
//     { postId: 5, likes: 2, author: { id: 15 } }
// ];

// console.log('#show only changes in "likes" property from previous');
// of(...posts)
//     .pipe(distinctUntilKeyChanged('likes'))
//     .subscribe(x => console.log(x.postId + ', ' + x.likes));
// // Output
// // 1, 2
// // 2, 6
// // 4, 9
// // 5, 2

// console.log();
// console.log('____________________________');
// console.log();

// console.log('#show only changes in nested property from previous');
// of(...posts)
//     .pipe(distinctUntilKeyChanged('author', (a1, a2) => a1.id === a2.id))
//     .subscribe(x => console.log(x.postId + ', ' + x.author.id));
// // Output
// // 1, 11
// // 2, 12
// // 4, 14
// // 5, 15

//#endregion

//#region filter

// // filter
// // emit only values matching a given condition

// const { of } = require('rxjs');
// const { filter } = require('rxjs/operators');

// console.log('# filter even numbers');
// of(1, 2, 3, 4, 5, 6, 7, 8)
//     .pipe(filter(x => x % 2 === 0))
//     .subscribe(x => console.log(x));
// // Output:
// // 2
// // 4
// // 6
// // 8

//#endregion

//#region sample

// // sample
// // emit the most recent value when the notifier sends signal
// // parameter is an Observable

// const { Observable, interval } = require('rxjs');
// const { sample, take } = require('rxjs/operators');

// const source = interval(100);
// const notifier = new Observable(observer => {
//     setTimeout(() => observer.next(), 150);
//     setTimeout(() => observer.next(), 350);
//     setTimeout(() => observer.complete(), 750);
// });

// console.log('# the source emit values every 100 ms');
// console.log('# the notifier signals at 150 ms, 350 ms and 750 ms');
// console.log('# at 150ms, the latest value is 0');
// console.log('# at 350ms, the latest value is 2');
// console.log('# at 750ms, the latest value is 6');
// source
//     .pipe(
//         sample(notifier),
//         take(3)
//     )
//     .subscribe(d => console.log(d));
// // Output:
// // 0
// // 2
// // 6

//#endregion

//#region audit

// const { interval, timer } = require('rxjs');
// const { tap, take, audit } = require('rxjs/operators');

// source = interval(100);

// source
//     .pipe(
//         take(10),
//         tap(x => console.log('emitted from source: ' + x)),
//         audit(y => {
//             console.log('used to calculate next Observable: ' + y);
//             return timer(500);
//         })
//     )
//     .subscribe(z => console.log('received by subscribers:' + z));
// //Output:
// // emitted from source: 0
// // used to calculate next Observable: 0
// // emitted from source: 1
// // emitted from source: 2
// // emitted from source: 3
// // emitted from source: 4
// // received by subscribers:4
// // emitted from source: 5
// // used to calculate next Observable: 5
// // emitted from source: 6
// // emitted from source: 7
// // emitted from source: 8
// // emitted from source: 9

//#endregion

//#region throttle

// const { interval, timer } = require('rxjs');
// const { throttle, tap, take } = require('rxjs/operators');

// source = interval(100);

// source
//     .pipe(
//         take(10),
//         tap(x => console.log('emitted from source: ' + x)),
//         throttle(y => {
//             console.log('used to calculate next Observable: ' + y);
//             return timer(500);
//         })
//     )
//     .subscribe(x => console.log('received by subscribers:' + x));
// //Output:
// // emitted from source: 0
// // received by subscribers:0
// // used to calculate next Observable: 0
// // emitted from source: 1
// // emitted from source: 2
// // emitted from source: 3
// // emitted from source: 4
// // emitted from source: 5
// // received by subscribers:5
// // used to calculate next Observable: 5
// // emitted from source: 6
// // emitted from source: 7
// // emitted from source: 8
// // emitted from source: 9

//#endregion





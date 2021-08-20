console.log("Running errorHandling")

import { throwError, of, interval, Observable, } from 'rxjs'

import { catchError, map, throwIfEmpty, onErrorResumeNext, retry, retryWhen, scan, takeWhile, tap, timeout, timeoutWith  } from 'rxjs/operators'

//#region catchError

// // catchError
// // prevent the error from stopping the stream
// // replace the error with a new source


// console.log('# catch then rethrow the error');
// throwError('error')
//     .pipe(
//         catchError(err => {
//             console.log(`caught an error: ${err}`);
//             return throwError(`rethrown: ${err}!`);
//         }),
//         catchError(err => {
//             console.log(err);
//             return of(undefined);
//         })
//     )
//     .subscribe(
//         d => {
//             if (d) {
//                 console.log(d);
//             }
//         },
//         err => console.log('oops'),
//         () => console.log('complete')
//     );

// // Output:
// // caught an error: error
// // rethrown: error!
// // complete

// console.log('\r\n******************************\r\n');
// console.log('# catch something unexpected');
// of('a', 1)
//     .pipe(
//         map(v => v.toUpperCase()),
//         catchError(err => {
//             return of(undefined);
//         })
//     )
//     .subscribe(
//         d => {
//             if (d) {
//                 console.log(d);
//             }
//         },
//         err => console.log('oops'),
//         () => console.log('complete')
//     );
// // Output:
// // A
// // complete

//#endregion

//#region throwlfEmpty

of()
    .pipe(throwIfEmpty())
    .subscribe(v => console.log(v), err => console.log(err.message));


//#endregion

//#region  onErrorResumeNext

// // onErrorResumeNext
// //  - on error, skip the current stream
// //  - use a new stream as a replacement
// console.log('# on error, use another stream');
// const source = of('feed1', 'feed2', 'feed3');
// const backup = of(
//     'handle error',
//     "but don't complete original",
//     "and don't get any info about thrown error",
//     'Oh, **also called on COMPLETE!**'
// );
// source
//     .pipe(
//         map(feed => {
//             if (feed === 'feed2a') {
//                 throw new Error(`oops - but we'll never see this!`);
//             }
//             return feed;
//         }),
//         onErrorResumeNext(backup)
//     )
//     .subscribe(v => console.log(v));

//#endregion

//#region retry

// resubscribe on error

// console.log('# retry two times');
// of('a', 1)
//     .pipe(
//         map(x => x.toUpperCase()),
//         retry(2)
//     )
//     .subscribe(x => console.log(x), e => console.log('error:', e.message));
// // Output:
// // A     <-- original attempt
// // A     <-- retry #1
// // A     <-- retry #2
// // error: x.toUpperCase is not a function

//#endregion

//#region retryWhen

// let swallowError = false;
// interval(200)
//     .pipe(
//         map(x => {
//             console.log('attempting: ' + x);
//             if (x === 1) {
//                 throw 'error processing: ' + x;
//             }
//             return x;
//         }),
//         retryWhen(errors => {
//             if (swallowError) {
//                 return errors.pipe(
//                     tap(err => console.log(err)),
//                     scan(acc => acc + 1, 0),
//                     tap(retryCount => {
//                         if (retryCount === 2) {
//                             console.log('Swallowing error and completing');
//                         } else {
//                             console.log('Retrying whole source - retry #' + retryCount);
//                         }
//                     }),
//                     takeWhile(retryCount => retryCount < 2)
//                 );
//             } else {
//                 return errors.pipe(
//                     tap(err => console.log(err)),
//                     scan(acc => acc + 1, 0),
//                     tap(retryCount => {
//                         if (retryCount === 2) {
//                             console.log('Failing');
//                             throw 'oops';
//                         } else {
//                             console.log('Retrying whole source - retry #' + retryCount);
//                         }
//                     })
//                 );
//             }
//         })
//     )
//     .subscribe(
//         x => console.log('successfully processed: ' + x),
//         err => console.log('*****error: ' + err),
//         () => console.log('completed successfully')
//     );


//#endregion

//#region timeOut

// // timeout 
// // The timeout is a number:
// //    Use it as a period in milliseconds
// //    The source must emit next or complete within the period
// //    Otherwise, a timeout error occurs

// const source = Observable.create(observer => {
//     observer.next('A');
//     setTimeout(() => observer.next('B'), 100); // emitted at 100 ms
//     setTimeout(() => observer.next('C'), 300); // emitted 200 ms later
//     setTimeout(() => observer.complete(), 600); // emitted 300 ms later
// });

// console.log('# It takes less than 350 ms from A --> B, B --> C, and C --> complete');
// source.pipe(timeout(350)).subscribe(d => console.log(d), null, () => console.log('complete'));
// // Output:
// // A
// // B
// // C
// // Complete



//#endregion

//#region timeOutWith

// timeoutWith
//    use the source until a timeout occur
//    then, replace the source with a new source

const fallback = of('a', 'b', 'c');
const source = Observable.create(observer => {
    observer.next('A');
    setTimeout(() => observer.next('B'), 100); // emitted at 100 ms
    setTimeout(() => observer.next('C'), 300); // emitted 200 ms later
    setTimeout(() => observer.complete(), 600); // emitted 300 ms later
});

console.log('# Timeout occur from B --> C');
console.log('# So C is ignored, and a fallback source is emitted');
source.pipe(timeoutWith(150, fallback)).subscribe(d => console.log(d), null, () => console.log('complete'));
// Output:
// A
// B
// a
// b
// c
// complete

//#endregion



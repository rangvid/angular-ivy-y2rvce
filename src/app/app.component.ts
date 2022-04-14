import { Component, OnInit, VERSION } from '@angular/core';
import {of, from, tap, map, take} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent   implements OnInit{
  name = 'Angular ' + VERSION.major;

  ngOnInit() {
    
    // of(0, 2, 4, 6, 8, 10, 12).subscribe( item => console.log(`Item from of: `+ item));

    from([20, 15, 10, 5]).pipe(
      tap(item => console.log(`Emitted item value: ${item}`)),
      map(item => item *2),
      map(item => item - 10),
      tap(item => console.log(`After -10 value: ${item}`)),
      map(item => {
        if (item === 0) {
          throw new Error ('Zero detected');
        }
        return item;
      }),
      take(3)
    )
    .subscribe({
      next: (item) => console.log(`Resulting item: ${item}`),
      error: (err) => console.log(`Error Occured: ${err}`),
      complete: () => console.log(`Process Complete!`),
    });

    // from(['Apple-01', 'Apple-02', 'Apple-03']).subscribe({
    //   next: (apple) => console.log(`Apple picked: ${apple}`),
    //   error: (err) => console.log(`Error Occured: ${err}`),
    //   complete: () => console.log(`Process Complete! No more Apples to pick!`),
    // });

    of(2, 4, 6, 8).pipe(
      map(i => {
        if (i === 6) {
          throw 'Error!';          
        }
        return i;
      }), catchError(err => of('six'))
    )
    .subscribe({
      next: x=> console.log(x),
      error: err => console.log(err)
    });

  }

  ngOnDestroy() {
    console.log("This method is called when ngOnDetroy is initiated");
  }

}

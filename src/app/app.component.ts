import { Component, OnInit, VERSION } from '@angular/core';
import {of, from} from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent   implements OnInit{
  name = 'Angular ' + VERSION.major;

  ngOnInit() {
    of(0, 2, 4, 6, 8, 10, 12).subscribe( item => console.log(`Item from of: `+ item));

    from([10, 20, 30, 40, 50, 60]).subscribe({
      next: (item) => console.log(`Resulting item: ${item}`),
      error: (err) => console.log(`Error Occured: ${err}`),
      complete: () => console.log(`Process Complete!`),
    });

    from(['Apple-01', 'Apple-02', 'Apple-03']).subscribe({
      next: (apple) => console.log(`Apple picked: ${apple}`),
      error: (err) => console.log(`Error Occured: ${err}`),
      complete: () => console.log(`Process Complete! No more Apples to pick!`),
    });

  }
}

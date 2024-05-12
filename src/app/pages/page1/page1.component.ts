import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Student } from 'src/app/core/services/data.service';

enum Type {
  stratocaster, jazzmaster, semiacoustic
}

enum Scale {
  s25_5,
  s25_7,
  s25_8
}

enum Color {
  red,
  white,
  black,
  pink
}

enum Strings {
  s9,
  s10,
  s11
}


enum Wire {
  yes,
  no
}

export class Autotransport {
  constructor(public num: number, public type: Type, public scale: Scale, public strings: Strings, public wire: Wire, public color: Color) {

  }
}
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  users: Autotransport[] = [];
  students: Student[] = [];

  num = 0;
  type = 0;
  scale = 0;
  strings = 0;
  wire = 0;
  color = 0;

  constructor(private dataService: DataService) {
    
  }

  ngOnInit(): void {
      this.dataService.getStudents()
      .pipe(
        filter(data => data != null),
        map((data => (data.map(student => ({...student, group: student.group + ' 1 курс'})))))
      )
      .subscribe((students) => {
          this.students = students;
      })

  }


  addUser() {
    this.users.push(new Autotransport(this.num, this.type, this.scale, this.strings, this.wire, this.color));
    this.num = 0;
    this.type = 0;
    this.scale = 0;
    this.strings = 0;
    this.wire = 0;
    this.color = 0;
  }

  onNameChange(): void {
    console.log('Что-то изменилось в поле ' + this.type)
  }
}

import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Student } from 'src/app/core/services/data.service';

enum Type {
  acoustic, electroacoustic, slide
}
enum Material {
  maple, rosewood, mahogany
}
enum Body {
  parlor, jumbo, dreadnought
}
enum Color {
  red, white, black
}



export class Acoustic {
  constructor(public num: string, public type: Type, public material: Material, public body: Body, public color: Color) {

  }
}
@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  users: Acoustic[] = [];
  students: Student[] = [];

  num = " ";
  type = 0;
  material = 0;
  body = 0;
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
    this.users.push(new Acoustic(this.num, this.type, this.material, this.body, this.color));
    this.num = " ";
    this.type = 0;
    this.material = 0;
    this.body = 0;
    this.color = 0;
  }

  onNameChange(): void {
    console.log('Что-то изменилось в поле ' + this.type)
  }
}


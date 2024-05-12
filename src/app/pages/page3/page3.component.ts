import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Student } from 'src/app/core/services/data.service';

enum Company {
  fedex, mail, amazon
}

export class Delivery {
  constructor(public num: number, public name: string, public address: string, public index: number, public company: Company) {

  }
}
@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit {

  users: Delivery[] = [];
  students: Student[] = [];

  num = 0;
  name = ' ';
  address = ' ';
  index = 0;
  company = 0;

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
    this.users.push(new Delivery(this.num, this.name, this.address, this.index, this.company));
    this.num = 0;
    this.name = ' ';
    this.address = ' ';
    this.index = 7927;
    this.company = 0;

  }

  onNameChange(): void {
    console.log('Что-то изменилось в поле ' + this.name)
  }
}

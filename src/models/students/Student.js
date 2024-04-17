import { v4 as uuidv4 } from "uuid";

export class Student {
  constructor(name, age, email, code, grade) {
    this.id = this.generateId();
    this.name = name;
    this.age = age;
    this.email = email;
    this.code = code;
    this.grade = grade;
  }

  generateId() {
    return uuidv4();
  }
}

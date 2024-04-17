export class StudentsRepository {
  constructor() {
    this.students = [];
  }

  getStudents() {
    return this.students;
  }

  getStudentById(id) {
    return this.students.find((student) => student.id === id);
  }

  addStudent(student) {
    this.students.push(student);
  }

  updateStudent(id, name, age, email, code, grade) {
    const student = this.getStudentById(id);

    if (student) {
      student.name = name;
      student.age = age;
      student.email = email;
      student.code = code;
      student.grade = grade;
    }

    return student;
  }

  deleteStudent(id) {
    this.students = this.students.filter((student) => student.id !== id);
  }
}

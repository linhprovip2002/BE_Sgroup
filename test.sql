Create table student(
    id_student primary key AUTO_INCREMENT,
    name varchar(20) not null,
)

Create table Course(
    id_course primary key AUTO_INCREMENT,
    name varchar(20) not null,
)

Create table register(
    id primary key AUTO_INCREMENT,
    student int,
    course int,
    register_date Datetime,
    FOREIGN KEY (student)REFERENCES student(id_student),
    FOREIGN KEY (course)REFERENCES Course(id_course),
)

INSERT INTO student(name) value('Tuong'),('Nguyen'),('Huy'),('HeHe')
INSERT INTO Course(name) value('C++'),('Java')
INSERT INTO register(student,course,register_date) value(1,1,'2023-04-13 20:16:16'),(1,2,'2023-04-13 20:16:16'),
(2,2,'2023-04-13 20:16:16'),(2,1,'2023-04-13 21:05:59'),(3,1,'2023-04-13 21:06:03'),(4,1,'2023-04-13 21:06:06')


-- select all student has course name = 'C++'
SELECT student.name FROM student JOIN register ON student.id_student = register.student JOIN course ON course.id_course = register.course
WHERE course.name = 'C++'
-- another way
SELECT student.name FROM student WHERE student.id_student IN (SELECT student FROM register WHERE register.course = 1)
--lấy tất cả tên sv,tên khóa học đã đăng kí 
SELECT student.name AS student_name, Course.name AS course_name
FROM student
JOIN register ON student.id_student = register.student
JOIN Course ON Course.id_course = register.course;
--lấy tất cả sinh viên đã từng đăng kí khóa học
SELECT student.name FROM student WHERE student.id_student IN (SELECT register.student FROM register)
-- thống kê số lượt đăng ký mỗi khóa học
SELECT Course.name AS course_name, COUNT(*) AS registration_count
FROM register
JOIN Course ON Course.id_course = register.course
GROUP BY Course.name;
-- thống kê 3 lượt đăng kí khóa c++ sớm nhất
SELECT student.name AS student_name, Course.name AS course_name, register.register_date
FROM register
JOIN student ON student.id_student = register.student
JOIN Course ON Course.id_course = register.course
WHERE Course.name = 'C++'
ORDER BY register.register_date ASC
LIMIT 3;


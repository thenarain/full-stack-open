const Total = ({ parts }) => {
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return <h3>total of {total} exercises</h3>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  return parts.map((part) => (
    <Part key={part.id} name={part.name} exercise={part.exercises} />
  ));
};

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;

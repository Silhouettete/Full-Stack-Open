const Header = (props) => {
  return <h1>{props.name}</h1>;
};
const Content = (props) => {
  return props.courses.map((course) => {
    return (
      <div key={course.id}>
        <h2>{course.name}</h2>
        <Part parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  });
};
const Part = (props) => {
  return props.parts.map((part) => {
    return (
      <div key={part.id}>
        {part.name} {part.exercises}
      </div>
    );
  });
};
const Total = (props) => {
  const total = props.parts.reduce(
    (previousValue, currentValue) => previousValue + currentValue.exercises,
    0
  );
  return (
    <div>
      <strong>total of {total} courses</strong>
    </div>
  );
};
const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Courses courses={courses} />;
};

const Courses = (props) => {
  return (
    <>
      <Header name={"Web Development Curriculum"} />
      <Content courses={props.courses} />
    </>
  );
};

export default App;

import styles from './About.module.scss';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  team: string[];
  githubUrl: string;
}

const quizzyProject: Project = {
  name: "Quizzy",
  description:
    "Quizzy - это интерактивный веб-приложение для проведения викторин различной тематики. Здесь вы можете создавать свои собственные викторины, участвовать в викторинах, созданных другими пользователями, и делиться своими результатами с друзьями.",
  technologies: ["React", "TypeScript", "Scss", "Bootstrap"],
  team: ["Иван Иванов", "Анна Петрова", "Петр Сидоров"],
  githubUrl: "https://github.com/Kussasin/Meduzzen_Frontend_internship",
};

const About = () => {
  return (
    <main className={styles.container}>
      <h1>{quizzyProject.name}</h1>
      <p>{quizzyProject.description}</p>
      <h2>Используемые технологии:</h2>
      <ul>
        {quizzyProject.technologies.map((technology, index) => (
          <li key={index}>{technology}</li>
        ))}
      </ul>
      <h2>Команда:</h2>
      <ul>
        {quizzyProject.team.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
      <p>Репозиторий на GitHub: {quizzyProject.githubUrl}</p>
    </main>
  );
};

export default About;

import "./about.scss";
import mission from "../images/mission.jpg";
import vision from "../images/vision.jpg";
import apart from "../images/apart.jpg";

const About = () => {
  return (
    <section id="about">
      <div className="about-overlay">
        <div className="about-welcome">
          <h1>About Us</h1>
          <p>
            Welcome to StuDox, where education meets innovation and
            accessibility. At StuDox, we believe in the transformative power of
            education and the boundless potential within every student. Our
            mission is to revolutionize the learning experience by providing a
            platform that empowers students globally through accessible, free,
            and high-quality educational resources.
          </p>
        </div>
      </div>
      <div className="about__container">
        <h2 className="heading">Our Vision</h2>
        <div className="vision">
          <div className="vision-points">
            <div className="vision-point">
              <h3>Pioneering Innovative Learning Solutions:</h3>
              <p>
                StuDox aspires to be a leader in innovative learning solutions.
                Our vision is to continuously push the boundaries of educational
                technology, creating a dynamic platform that evolves with the
                ever-changing needs of students and educators.
              </p>
            </div>
            <div className="vision-point">
              <h3>Cultivating a Community of Lifelong Learners:</h3>
              <p>
                We envision StuDox as a thriving ecosystem that cultivates a
                community of lifelong learners. Our goal is to inspire a passion
                for learning that extends beyond exams, fostering curiosity,
                critical thinking, and a love for knowledge.
              </p>
            </div>
            <div className="vision-point">
              <h3>Empowering the Next Generation of Leaders:</h3>
              <p>
                StuDox&apos;s vision is to empower the next generation of
                leaders and innovators. By providing a platform that facilitates
                collaborative learning, skill development, and global
                connections, we aim to equip students with the tools they need
                to excel in a rapidly changing world.
              </p>
            </div>
          </div>
          <div className="vision-image">
            <img src={vision} alt="" />
          </div>
        </div>
        <h2 className="mission-title">Our Mission</h2>
        <div className="mission">
          <div className="mission-image">
            <img src={mission} alt="" />
          </div>
          <div className="mission-points">
            <div className="mission-point">
              <h3>Empowering Education for All:</h3>
              <p>
                StuDox is committed to democratizing education by providing
                accessible and free resources, empowering students worldwide to
                excel academically and reach their full potential.
              </p>
            </div>
            <div className="mission-point">
              <h3>Fostering Knowledge Equality:</h3>
              <p>
                At StuDox, our mission is to eliminate educational disparities
                by offering a platform where every student can access
                high-quality past question papers and solutions, fostering a
                level playing field for learning.
              </p>
            </div>
            <div className="mission-point">
              <h3>Inspiring Lifelong Learning:</h3>
              <p>
                StuDox is dedicated to inspiring a love for learning that lasts
                a lifetime. We strive to create an environment where students
                can freely explore, engage with educational content, and develop
                the skills needed for continuous personal and academic growth.
              </p>
            </div>
            <div className="mission-point">
              <h3>Building a Global Learning Community:</h3>
              <p>
                Our mission at StuDox is to build a vibrant global learning
                community. By providing a hub for past question papers and
                collaborative learning, we aim to connect students across
                borders, fostering a diverse and enriching educational
                experience.
              </p>
            </div>
            <div className="mission-point">
              <h3>Enabling Academic Excellence Through Innovation:</h3>
              <p>
                StuDox is on a mission to revolutionize the way students prepare
                for exams. By leveraging innovative technology and collaborative
                learning, we aim to enable academic excellence and contribute to
                the success stories of learners worldwide.
              </p>
            </div>
          </div>
        </div>
        <h2 className="heading">What Sets Us Apart</h2>
        <div className="apart">
          <div className="apart-points">
            <div className="apart-point">
              <h3>Quality and Accessibility:</h3>
              <p>
                StuDox is dedicated to offering high-quality educational content
                that is not only accessible but also free of charge. We believe
                that education should be within reach for everyone, and our
                commitment to quality ensures that every resource we provide
                contributes to meaningful learning experiences.
              </p>
            </div>
            <div className="apart-point">
              <h3>Innovation in Technology:</h3>
              <p>
                Our platform leverages the latest advancements in technology to
                create an engaging and effective learning environment. From
                AI-powered study assistance to interactive features, StuDox is
                where traditional education meets the future.
              </p>
            </div>
            <div className="apart-point">
              <h3>Community-Driven:</h3>
              <p>
                StuDox is more than a platform; it is a community. We encourage
                collaboration, knowledge-sharing, and support among our users.
                Whether you are preparing for exams, exploring new subjects, or
                seeking guidance, StuDox is your virtual companion on your
                educational journey.
              </p>
            </div>
          </div>
          <div className="apart-image">
            <img src={apart} alt="" />
          </div>
        </div>
        <div className="join-us">
          <h2>Join Us in Shaping the Future of Education</h2>
          <p>
            StuDox is not just a platform; it is a movement. Join us in shaping
            the future of education, where learning is inclusive, innovative,
            and transformative. Together, we can break down barriers and empower
            the next generation of thinkers, dreamers, and achievers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

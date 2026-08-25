import BlankDocument from "@/assets/work/blank-document.svg";
import BusinessLetter from "@/assets/work/business-letter.svg";
import CoverLetter from "@/assets/work/cover-letter.svg";
import Letter from "@/assets/work/letter.svg";
import ProjectProposal from "@/assets/work/project-proposal.svg";
import Resume from "@/assets/work/resume.svg";
import SoftwareProposal from "@/assets/work/software-proposal.svg";

export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    image: BlankDocument,
    initialContent: `
      <h1>Untitled Document</h1>
      <p>Start writing your document here...</p>
    `,
  },

  {
    id: "business-letter",
    label: "Business Letter",
    image: BusinessLetter,
    initialContent: `
      <p><strong>John Smith</strong><br>
      123 Business Street<br>
      New York, NY 10001<br>
      john.smith@example.com<br>
      +1 (555) 123-4567</p>

      <p><strong>August 25, 2026</strong></p>

      <p>
        <strong>Jane Doe</strong><br>
        Hiring Manager<br>
        Acme Corporation<br>
        456 Corporate Avenue<br>
        New York, NY 10002
      </p>

      <p><strong>Subject: Business Partnership Proposal</strong></p>

      <p>Dear Ms. Doe,</p>

      <p>
        I am writing on behalf of our organization to discuss a potential
        business partnership between our companies. We believe that combining
        our expertise and resources could create significant value for both
        organizations.
      </p>

      <p>
        Our team has extensive experience in delivering innovative solutions
        that improve operational efficiency, customer satisfaction, and
        long-term business growth.
      </p>

      <h3>Proposed Partnership</h3>

      <ul>
        <li>Shared expertise and industry knowledge</li>
        <li>Joint marketing and promotional opportunities</li>
        <li>Access to complementary resources</li>
        <li>Long-term strategic collaboration</li>
      </ul>

      <p>
        I would appreciate the opportunity to discuss this proposal with you
        in more detail and explore how we can build a mutually beneficial
        relationship.
      </p>

      <p>
        Please let me know a convenient time for a meeting. I look forward to
        hearing from you.
      </p>

      <p>Kind regards,</p>

      <p>
        <strong>John Smith</strong><br>
        Business Development Manager
      </p>
    `,
  },

  {
    id: "cover-letter",
    label: "Cover Letter",
    image: CoverLetter,
    initialContent: `
      <h1>Cover Letter</h1>

      <p>
        <strong>John Smith</strong><br>
        New York, NY<br>
        john.smith@example.com<br>
        +1 (555) 123-4567
      </p>

      <p>August 25, 2026</p>

      <p>
        <strong>Hiring Manager</strong><br>
        Acme Corporation
      </p>

      <p><strong>Re: Frontend Developer Position</strong></p>

      <p>Dear Hiring Manager,</p>

      <p>
        I am excited to apply for the Frontend Developer position at
        <strong>Acme Corporation</strong>. With a strong background in modern
        web development and a passion for creating intuitive user experiences,
        I am confident that I can contribute effectively to your team.
      </p>

      <p>
        Throughout my experience, I have worked with technologies including
        <strong>React, Next.js, TypeScript, JavaScript, Tailwind CSS</strong>,
        and modern API architectures.
      </p>

      <h3>What I Bring</h3>

      <ul>
        <li>Strong experience building responsive web applications</li>
        <li>Excellent understanding of React and component architecture</li>
        <li>Experience with TypeScript and modern JavaScript</li>
        <li>Strong attention to UI/UX and accessibility</li>
        <li>Ability to collaborate effectively with cross-functional teams</li>
      </ul>

      <p>
        I am particularly interested in this opportunity because of your
        company's focus on building high-quality digital products. I would
        welcome the opportunity to bring my technical skills and creative
        problem-solving approach to your team.
      </p>

      <p>
        Thank you for considering my application. I would be pleased to discuss
        my qualifications and experience in more detail.
      </p>

      <p>Sincerely,</p>

      <p>
        <strong>John Smith</strong>
      </p>
    `,
  },

  {
    id: "letter",
    label: "Letter",
    image: Letter,
    initialContent: `
      <p><strong>John Smith</strong><br>
      123 Main Street<br>
      New York, NY 10001</p>

      <p>August 25, 2026</p>

      <p>Dear Friend,</p>

      <p>
        I hope this letter finds you well. I wanted to take a moment to write
        and share some exciting news with you.
      </p>

      <p>
        The past few months have been an incredible journey filled with new
        experiences, opportunities, and challenges. I have learned a great deal
        and I am excited about what lies ahead.
      </p>

      <blockquote>
        <p>
          "Every new beginning comes from some other beginning's end."
        </p>
      </blockquote>

      <p>
        I would love to hear about what you have been working on recently.
        Hopefully, we can catch up soon and spend some time together.
      </p>

      <p>
        Take care and stay in touch.
      </p>

      <p>
        Warm regards,<br>
        <strong>John</strong>
      </p>
    `,
  },

  {
    id: "project-proposal",
    label: "Project Proposal",
    image: ProjectProposal,
    initialContent: `
      <h1>Project Proposal</h1>

      <p>
        <strong>Project:</strong> Digital Transformation Platform<br>
        <strong>Prepared by:</strong> John Smith<br>
        <strong>Date:</strong> August 25, 2026<br>
        <strong>Version:</strong> 1.0
      </p>

      <hr>

      <h2>1. Executive Summary</h2>

      <p>
        This proposal outlines the development of a modern digital platform
        designed to improve business operations, streamline workflows, and
        provide users with an intuitive and scalable experience.
      </p>

      <h2>2. Project Objectives</h2>

      <ul>
        <li>Improve operational efficiency</li>
        <li>Centralize business information</li>
        <li>Automate repetitive workflows</li>
        <li>Improve collaboration between teams</li>
        <li>Provide actionable insights through analytics</li>
      </ul>

      <h2>3. Proposed Solution</h2>

      <p>
        The proposed solution will consist of a responsive web application
        supported by a scalable backend architecture and secure data storage.
      </p>

      <h3>Core Features</h3>

      <ol>
        <li>User authentication and authorization</li>
        <li>Dashboard and analytics</li>
        <li>Document and project management</li>
        <li>Real-time collaboration</li>
        <li>Notifications and activity tracking</li>
      </ol>

      <h2>4. Technology Stack</h2>

      <table>
        <thead>
          <tr>
            <th>Technology</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Next.js</td>
            <td>Frontend application</td>
          </tr>
          <tr>
            <td>TypeScript</td>
            <td>Application development</td>
          </tr>
          <tr>
            <td>Node.js</td>
            <td>Backend services</td>
          </tr>
          <tr>
            <td>Database</td>
            <td>Data persistence</td>
          </tr>
        </tbody>
      </table>

      <h2>5. Timeline</h2>

      <table>
        <thead>
          <tr>
            <th>Phase</th>
            <th>Duration</th>
            <th>Deliverables</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Planning</td>
            <td>1 Week</td>
            <td>Requirements and architecture</td>
          </tr>
          <tr>
            <td>Development</td>
            <td>4 Weeks</td>
            <td>Core application</td>
          </tr>
          <tr>
            <td>Testing</td>
            <td>1 Week</td>
            <td>QA and bug fixing</td>
          </tr>
          <tr>
            <td>Deployment</td>
            <td>1 Week</td>
            <td>Production release</td>
          </tr>
        </tbody>
      </table>

      <h2>6. Expected Outcomes</h2>

      <p>
        Upon completion, the project is expected to reduce manual processes,
        improve collaboration, increase productivity, and provide a scalable
        foundation for future business growth.
      </p>

      <h2>7. Conclusion</h2>

      <p>
        We believe this project represents a valuable opportunity to modernize
        existing workflows and create a reliable digital platform capable of
        supporting long-term organizational goals.
      </p>
    `,
  },

  {
    id: "resume",
    label: "Resume",
    image: Resume,
    initialContent: `
      <h1>John Smith</h1>

      <p>
        <strong>Frontend Developer</strong><br>
        New York, NY · john.smith@example.com · +1 (555) 123-4567
      </p>

      <hr>

      <h2>Professional Summary</h2>

      <p>
        Frontend Developer with experience building modern, responsive, and
        user-focused web applications. Skilled in React, Next.js, TypeScript,
        JavaScript, and modern CSS frameworks.
      </p>

      <h2>Technical Skills</h2>

      <ul>
        <li><strong>Frontend:</strong> React, Next.js, TypeScript, JavaScript</li>
        <li><strong>Styling:</strong> Tailwind CSS, CSS, Sass</li>
        <li><strong>Backend:</strong> Node.js, Express</li>
        <li><strong>Database:</strong> MongoDB, SQL</li>
        <li><strong>Tools:</strong> Git, GitHub, VS Code, REST APIs</li>
      </ul>

      <h2>Professional Experience</h2>

      <h3>Frontend Developer — Tech Company</h3>

      <p><em>2023 – Present</em></p>

      <ul>
        <li>
          Developed responsive web applications using React and Next.js.
        </li>
        <li>
          Built reusable UI components and scalable frontend architectures.
        </li>
        <li>
          Improved application performance and user experience.
        </li>
        <li>
          Collaborated with designers and backend developers.
        </li>
      </ul>

      <h3>Junior Frontend Developer — Digital Agency</h3>

      <p><em>2022 – 2023</em></p>

      <ul>
        <li>Implemented responsive interfaces from Figma designs.</li>
        <li>Integrated REST APIs into frontend applications.</li>
        <li>Fixed bugs and improved existing application features.</li>
      </ul>

      <h2>Education</h2>

      <p>
        <strong>Bachelor's Degree in Computer Science</strong><br>
        University Name<br>
        2021 – 2025
      </p>

      <h2>Projects</h2>

      <ul>
        <li><strong>Project Management Platform</strong> — React, Next.js</li>
        <li><strong>E-commerce Application</strong> — MERN Stack</li>
        <li><strong>Document Collaboration App</strong> — Next.js, Convex</li>
      </ul>
    `,
  },

  {
    id: "software-proposal",
    label: "Software Proposal",
    image: SoftwareProposal,
    initialContent: `
      <h1>Software Development Proposal</h1>

      <p>
        <strong>Project:</strong> Enterprise Management System<br>
        <strong>Prepared for:</strong> Client Organization<br>
        <strong>Prepared by:</strong> Development Team<br>
        <strong>Date:</strong> August 25, 2026
      </p>

      <hr>

      <h2>1. Introduction</h2>

      <p>
        This proposal presents a comprehensive plan for designing and
        developing a modern software solution that addresses the organization's
        operational and business requirements.
      </p>

      <h2>2. Business Requirements</h2>

      <ul>
        <li>Centralized management system</li>
        <li>Secure user authentication</li>
        <li>Role-based access control</li>
        <li>Real-time data synchronization</li>
        <li>Reporting and analytics</li>
        <li>Responsive user interface</li>
      </ul>

      <h2>3. Proposed Architecture</h2>

      <p>
        The system will follow a modular architecture designed for scalability,
        maintainability, security, and performance.
      </p>

      <h3>Application Layers</h3>

      <ol>
        <li>Presentation Layer</li>
        <li>Application Layer</li>
        <li>Business Logic Layer</li>
        <li>Data Access Layer</li>
        <li>Database Layer</li>
      </ol>

      <h2>4. Key Features</h2>

      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Description</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Authentication</td>
            <td>Secure login and account management</td>
            <td>High</td>
          </tr>
          <tr>
            <td>Dashboard</td>
            <td>Centralized overview of system data</td>
            <td>High</td>
          </tr>
          <tr>
            <td>Reports</td>
            <td>Generate and export business reports</td>
            <td>Medium</td>
          </tr>
          <tr>
            <td>Notifications</td>
            <td>Real-time system notifications</td>
            <td>Medium</td>
          </tr>
        </tbody>
      </table>

      <h2>5. Technology Stack</h2>

      <ul>
        <li><strong>Frontend:</strong> React / Next.js</li>
        <li><strong>Language:</strong> TypeScript</li>
        <li><strong>Backend:</strong> Node.js</li>
        <li><strong>Database:</strong> PostgreSQL / MongoDB</li>
        <li><strong>Authentication:</strong> Secure OAuth / JWT</li>
        <li><strong>Deployment:</strong> Cloud Infrastructure</li>
      </ul>

      <h2>6. Development Process</h2>

      <p>
        The project will be developed using an iterative approach with regular
        reviews and feedback cycles.
      </p>

      <ol>
        <li>Requirements analysis</li>
        <li>UI/UX design</li>
        <li>System architecture</li>
        <li>Frontend development</li>
        <li>Backend development</li>
        <li>Integration</li>
        <li>Testing and quality assurance</li>
        <li>Deployment and monitoring</li>
      </ol>

      <h2>7. Estimated Timeline</h2>

      <table>
        <thead>
          <tr>
            <th>Phase</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Discovery & Planning</td>
            <td>1 Week</td>
          </tr>
          <tr>
            <td>Design</td>
            <td>1–2 Weeks</td>
          </tr>
          <tr>
            <td>Development</td>
            <td>4–6 Weeks</td>
          </tr>
          <tr>
            <td>Testing</td>
            <td>1–2 Weeks</td>
          </tr>
          <tr>
            <td>Deployment</td>
            <td>1 Week</td>
          </tr>
        </tbody>
      </table>

      <h2>8. Security</h2>

      <p>
        Security will be considered throughout the development lifecycle.
        Authentication, authorization, input validation, data protection, and
        secure API communication will be implemented according to modern
        security best practices.
      </p>

      <h2>9. Conclusion</h2>

      <p>
        The proposed software solution will provide a scalable and reliable
        foundation for improving business operations while delivering an
        intuitive experience for end users.
      </p>

      <blockquote>
        <p>
          A well-designed software system should not only solve today's
          problems, but also provide a foundation for tomorrow's growth.
        </p>
      </blockquote>
    `,
  },
];

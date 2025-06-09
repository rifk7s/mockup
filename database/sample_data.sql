-- Insert sample companies
INSERT INTO companies (name, description, website, location, industry, size, founded_year) VALUES
('TechCorp Solutions', 'Leading technology solutions provider specializing in cloud computing and AI development.', 'https://techcorp.com', 'San Francisco, CA', 'TECHNOLOGY', 'LARGE', 2010),
('FinanceMax', 'Premier financial services company offering investment and banking solutions.', 'https://financemax.com', 'New York, NY', 'FINANCE', 'ENTERPRISE', 1995),
('HealthPlus Medical', 'Innovative healthcare provider focused on digital health solutions.', 'https://healthplus.com', 'Boston, MA', 'HEALTHCARE', 'MEDIUM', 2015),
('EduLearn Systems', 'Educational technology company creating online learning platforms.', 'https://edulearn.com', 'Austin, TX', 'EDUCATION', 'SMALL', 2018),
('GreenEnergy Corp', 'Renewable energy company developing solar and wind power solutions.', 'https://greenenergy.com', 'Portland, OR', 'ENERGY', 'MEDIUM', 2012),
('DataMinds Analytics', 'Data science and analytics consulting firm.', 'https://dataminds.com', 'Seattle, WA', 'TECHNOLOGY', 'SMALL', 2020),
('RetailFlow', 'E-commerce platform and retail technology solutions.', 'https://retailflow.com', 'Chicago, IL', 'RETAIL', 'MEDIUM', 2016),
('AutoDrive Innovations', 'Autonomous vehicle technology development company.', 'https://autodrive.com', 'Detroit, MI', 'AUTOMOTIVE', 'LARGE', 2008),
('MediaStream', 'Digital media and content streaming platform.', 'https://mediastream.com', 'Los Angeles, CA', 'MEDIA', 'LARGE', 2011),
('BuildSmart Construction', 'Smart construction technology and project management.', 'https://buildsmart.com', 'Denver, CO', 'MANUFACTURING', 'MEDIUM', 2014);

-- Insert sample jobs
INSERT INTO jobs (title, description, requirements, company_id, location, type, experience_level, salary_min, salary_max, is_remote, deadline) VALUES
('Senior Software Engineer', 'We are looking for a senior software engineer to join our development team. You will be responsible for designing and implementing scalable web applications using modern technologies.', 'Bachelor''s degree in Computer Science or related field. 5+ years of experience in software development. Proficiency in JavaScript, Python, or Java. Experience with cloud platforms (AWS, Azure, GCP).', 1, 'San Francisco, CA', 'FULL_TIME', 'SENIOR', 120000.00, 160000.00, TRUE, '2025-07-15 23:59:59'),

('Data Scientist', 'Join our data science team to analyze large datasets and build predictive models. You will work on machine learning projects that drive business decisions.', 'Master''s degree in Data Science, Statistics, or related field. 3+ years of experience in data analysis. Proficiency in Python, R, SQL. Experience with machine learning frameworks (TensorFlow, PyTorch).', 1, 'San Francisco, CA', 'FULL_TIME', 'MID', 100000.00, 140000.00, TRUE, '2025-06-30 23:59:59'),

('Financial Analyst', 'Seeking a detail-oriented financial analyst to support investment decisions and financial planning. You will analyze market trends and prepare financial reports.', 'Bachelor''s degree in Finance, Economics, or related field. 2+ years of experience in financial analysis. Strong Excel skills. Knowledge of financial modeling and valuation techniques.', 2, 'New York, NY', 'FULL_TIME', 'JUNIOR', 70000.00, 90000.00, FALSE, '2025-07-01 23:59:59'),

('Product Manager', 'Lead product development initiatives and work cross-functionally to deliver innovative financial products to our customers.', 'Bachelor''s degree in Business, Engineering, or related field. 4+ years of product management experience. Strong analytical and communication skills. Experience with Agile methodologies.', 2, 'New York, NY', 'FULL_TIME', 'MID', 110000.00, 150000.00, FALSE, '2025-06-25 23:59:59'),

('Healthcare Software Developer', 'Develop and maintain healthcare applications that improve patient outcomes. Work with medical professionals to create user-friendly solutions.', 'Bachelor''s degree in Computer Science or related field. 3+ years of software development experience. Knowledge of healthcare regulations (HIPAA). Experience with web technologies (React, Node.js).', 3, 'Boston, MA', 'FULL_TIME', 'MID', 90000.00, 120000.00, TRUE, '2025-07-20 23:59:59'),

('UX/UI Designer', 'Design intuitive user interfaces for our digital health platform. Collaborate with product teams to create engaging user experiences.', 'Bachelor''s degree in Design, HCI, or related field. 3+ years of UX/UI design experience. Proficiency in design tools (Figma, Sketch, Adobe Creative Suite). Strong portfolio showcasing digital design work.', 3, 'Boston, MA', 'FULL_TIME', 'MID', 80000.00, 110000.00, TRUE, '2025-06-28 23:59:59'),

('Instructional Designer', 'Create engaging online learning content and course materials. Work with subject matter experts to develop educational programs.', 'Master''s degree in Education, Instructional Design, or related field. 2+ years of instructional design experience. Experience with e-learning authoring tools. Strong writing and communication skills.', 4, 'Austin, TX', 'FULL_TIME', 'JUNIOR', 60000.00, 80000.00, TRUE, '2025-07-10 23:59:59'),

('Software Engineering Intern', 'Summer internship opportunity for students interested in educational technology. Work on real projects and gain hands-on experience.', 'Currently pursuing a degree in Computer Science or related field. Basic programming knowledge (any language). Eager to learn and contribute to team projects.', 4, 'Austin, TX', 'INTERNSHIP', 'ENTRY', 25.00, 30.00, FALSE, '2025-06-15 23:59:59'),

('Renewable Energy Engineer', 'Design and optimize solar and wind energy systems. Conduct feasibility studies and support project implementation.', 'Bachelor''s degree in Engineering (Electrical, Mechanical, or Environmental). 3+ years of experience in renewable energy. Knowledge of energy modeling software. Strong problem-solving skills.', 5, 'Portland, OR', 'FULL_TIME', 'MID', 85000.00, 115000.00, FALSE, '2025-07-05 23:59:59'),

('Project Manager - Green Energy', 'Manage renewable energy projects from conception to completion. Coordinate with stakeholders and ensure projects meet timeline and budget requirements.', 'Bachelor''s degree in Engineering, Business, or related field. 4+ years of project management experience. PMP certification preferred. Experience in the energy sector is a plus.', 5, 'Portland, OR', 'FULL_TIME', 'SENIOR', 95000.00, 125000.00, FALSE, '2025-06-22 23:59:59'),

('Data Analyst', 'Analyze client data to provide actionable insights and recommendations. Create visualizations and reports for stakeholder presentations.', 'Bachelor''s degree in Statistics, Mathematics, or related field. 2+ years of data analysis experience. Proficiency in SQL, Python, and visualization tools (Tableau, Power BI).', 6, 'Seattle, WA', 'FULL_TIME', 'JUNIOR', 70000.00, 90000.00, TRUE, '2025-07-12 23:59:59'),

('Machine Learning Engineer', 'Build and deploy machine learning models for client projects. Work with large datasets to solve complex business problems.', 'Master''s degree in Computer Science, Statistics, or related field. 3+ years of ML experience. Proficiency in Python, TensorFlow/PyTorch. Experience with cloud ML platforms.', 6, 'Seattle, WA', 'FULL_TIME', 'MID', 110000.00, 140000.00, TRUE, '2025-06-30 23:59:59'),

('E-commerce Developer', 'Develop and maintain our e-commerce platform. Implement new features and optimize performance for high-traffic scenarios.', 'Bachelor''s degree in Computer Science or related field. 3+ years of web development experience. Proficiency in JavaScript, PHP, or similar languages. Experience with e-commerce platforms.', 7, 'Chicago, IL', 'FULL_TIME', 'MID', 85000.00, 110000.00, FALSE, '2025-07-08 23:59:59'),

('Digital Marketing Specialist', 'Drive online marketing campaigns and analyze performance metrics. Manage social media presence and content marketing initiatives.', 'Bachelor''s degree in Marketing, Communications, or related field. 2+ years of digital marketing experience. Experience with Google Analytics, social media platforms, and email marketing tools.', 7, 'Chicago, IL', 'FULL_TIME', 'JUNIOR', 55000.00, 75000.00, TRUE, '2025-06-20 23:59:59'),

('Autonomous Systems Engineer', 'Develop software for autonomous vehicle systems. Work on perception, planning, and control algorithms for self-driving cars.', 'Master''s degree in Computer Science, Robotics, or related field. 4+ years of experience in autonomous systems. Proficiency in C++, Python. Knowledge of computer vision and sensor fusion.', 8, 'Detroit, MI', 'FULL_TIME', 'SENIOR', 130000.00, 170000.00, FALSE, '2025-07-25 23:59:59'),

('Test Engineer - Automotive', 'Design and execute test plans for automotive systems. Ensure quality and safety standards are met for vehicle components.', 'Bachelor''s degree in Engineering or related field. 2+ years of testing experience. Knowledge of automotive standards and regulations. Strong attention to detail and analytical skills.', 8, 'Detroit, MI', 'FULL_TIME', 'JUNIOR', 75000.00, 95000.00, FALSE, '2025-06-18 23:59:59'),

('Content Producer', 'Create engaging video and audio content for our streaming platform. Collaborate with creative teams to produce high-quality media.', 'Bachelor''s degree in Media Production, Film, or related field. 3+ years of content production experience. Proficiency in video editing software. Strong creative and storytelling skills.', 9, 'Los Angeles, CA', 'FULL_TIME', 'MID', 80000.00, 105000.00, FALSE, '2025-07-03 23:59:59'),

('Backend Developer - Streaming', 'Build and maintain backend infrastructure for our streaming platform. Optimize for high availability and scalability.', 'Bachelor''s degree in Computer Science or related field. 4+ years of backend development experience. Proficiency in Java, Go, or similar languages. Experience with microservices and cloud platforms.', 9, 'Los Angeles, CA', 'FULL_TIME', 'SENIOR', 115000.00, 145000.00, TRUE, '2025-06-27 23:59:59'),

('Construction Technology Specialist', 'Implement and support construction management software and IoT solutions on job sites.', 'Bachelor''s degree in Construction Management, Engineering, or related field. 2+ years of experience in construction technology. Knowledge of project management software and building information modeling (BIM).', 10, 'Denver, CO', 'FULL_TIME', 'JUNIOR', 65000.00, 85000.00, FALSE, '2025-07-15 23:59:59'),

('DevOps Engineer', 'Manage cloud infrastructure and deployment pipelines. Ensure system reliability and implement monitoring solutions.', 'Bachelor''s degree in Computer Science or related field. 3+ years of DevOps experience. Proficiency in AWS/Azure, Docker, Kubernetes. Experience with CI/CD tools and infrastructure as code.', 10, 'Denver, CO', 'FULL_TIME', 'MID', 95000.00, 125000.00, TRUE, '2025-06-25 23:59:59');

-- Insert sample users (passwords will be hashed by the application - raw password is 'password123')
INSERT INTO users (username, email, password, full_name, phone, location, bio, role) VALUES
('john_doe', 'john.doe@email.com', 'password123', 'John Doe', '+1-555-0101', 'San Francisco, CA', 'Experienced software engineer passionate about web development and cloud technologies.', 'USER'),
('jane_smith', 'jane.smith@email.com', 'password123', 'Jane Smith', '+1-555-0102', 'New York, NY', 'Data scientist with expertise in machine learning and statistical analysis.', 'USER'),
('mike_johnson', 'mike.johnson@email.com', 'password123', 'Mike Johnson', '+1-555-0103', 'Boston, MA', 'Product manager focused on healthcare technology and user experience.', 'USER'),
('sarah_wilson', 'sarah.wilson@email.com', 'password123', 'Sarah Wilson', '+1-555-0104', 'Austin, TX', 'UX/UI designer creating intuitive digital experiences.', 'USER'),
('admin_user', 'admin@jobfinder.com', 'password123', 'Admin User', '+1-555-0100', 'San Francisco, CA', 'System administrator for JobFinder platform.', 'ADMIN'),
('test_user', 'test@example.com', 'password123', 'Test User', '+1-555-0105', 'Test City, TS', 'This is a test user account.', 'USER'),
('testuser123', 'testuser123@example.com', 'password123', 'Test User 123', '+1-555-0106', 'Test City, TS', 'This is testuser123 account.', 'USER');

-- Insert sample job applications
INSERT INTO job_applications (user_id, job_id, status, cover_letter) VALUES
(1, 1, 'PENDING', 'I am excited to apply for the Senior Software Engineer position. With over 6 years of experience in full-stack development, I believe I would be a great fit for your team.'),
(1, 2, 'REVIEWED', 'As a software engineer with strong analytical skills, I am interested in transitioning to data science. I have been working on personal ML projects and would love to contribute to your data team.'),
(2, 2, 'SHORTLISTED', 'I am passionate about data science and have 4 years of experience building predictive models. I would love to bring my expertise to TechCorp Solutions.'),
(2, 6, 'PENDING', 'With my background in both technology and design, I believe I can create exceptional user experiences for healthcare applications.'),
(3, 4, 'INTERVIEWED', 'I have extensive experience in product management within the healthcare industry and am excited about the opportunity to work in fintech.'),
(3, 5, 'PENDING', 'Healthcare technology is my passion. I have developed several applications that comply with HIPAA regulations and would love to contribute to your team.'),
(4, 6, 'ACCEPTED', 'I am thrilled to apply for the UX/UI Designer position. My portfolio demonstrates my ability to create user-centered designs for healthcare applications.');

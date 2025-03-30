CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  images JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data for projects
INSERT INTO projects (title, description, images) VALUES
('HDD Pipeline Installation', 'Horizontal directional drilling for urban pipeline installation', '["/images/project1-1.jpg", "/images/project1-2.jpg"]'),
('Industrial Dredging Project', 'Large-scale dredging for port expansion', '["/images/project2-1.jpg", "/images/project2-2.jpg"]'),
('Municipal Water Pipeline', 'City-wide water pipeline replacement project', '["/images/project3-1.jpg"]');

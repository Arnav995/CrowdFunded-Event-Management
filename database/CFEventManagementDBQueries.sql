-- QUERY 1
CREATE DATABASE event_management
USE event_management

-- QUERY 2
CREATE TABLE users(
	user_id INT auto_increment PRIMARY KEY,
    name varchar(100) NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    password varchar(30) NOT NULL,
    role ENUM('user','admin') DEFAULT 'user',
    created_at timestamp DEFAULT current_timestamp
);

CREATE TABLE events(
	event_id INT auto_increment PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description text,
	target_amount DECIMAL(10,2) NOT NULL,
    current_amount DECIMAL(10,2) DEFAULT 0,
    deadline datetime NOT NULL,
    status ENUM('pending', 'approved', 'funded', 'failed') DEFAULT 'pending',
    created_by INT,
    approved_by INT,
    
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    FOREIGN KEY (approved_by) REFERENCES users(user_id)
);

CREATE TABLE contributions(
	contribution_id INT auto_increment PRIMARY KEY,
	user_id INT NOT NULL,
    event_id INT NOT NULL,
    amount decimal(10,2) NOT NULL,
	created_at TIMESTAMP default current_timestamp,	
    
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (event_id) REFERENCES events(event_id)
);
CREATE TABLE transactions(
	transaction_id INT auto_increment PRIMARY KEY,
    user_id INT NOT NULL,
    amount decimal(10,2),
    status ENUM('sucess', 'failed'),
    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id)

);




-- Query 3

INSERT INTO users(name, email,password, role) 
VALUES
('Admin User', 'admin@test.com', 'adminPass123', 'admin'),
('Student User 1', 'student@thapar.edu', 'studentPass123', 'user');

INSERT INTO events(title, description, target_amount, deadline, created_by) VALUES
('Tech Fest', 'Super Cool Event', 90000, '2026-12-11', 2),
('Dhurandhar Screening', 'Pretty decent hindi movie', '10000', '2026-09-11',2);


# JOINS

SELECT e.title, u.name AS creator 
FROM events e JOIN users u 
ON e.created_by = u.user_id;


-- QUERY 4
ALTER TABLE events
MODIFY target_amount DECIMAL(10,2) NOT NULL CHECK(target_amount > 0),
MODIFY current_amount DECIMAL(10,2) DEFAULT 0 NOT NULL CHECK(current_amount >=0);

ALTER TABLE contributions
MODIFY amount DECIMAL(10,2) NOT NULL CHECK(amount > 0);


-- Query 5
# GOAL-> If FUND TARGET REACHED --> Mark event as  'Funded'
DELIMITER $$

CREATE TRIGGER update_event_status
AFTER INSERT ON events
FOR EACH ROW
BEGIN
	IF NEW.current_amount >=  NEW.target_amount THEN 
    UPDATE events
    SET status = 'funded'
    WHERE event_id = NEW.event_id;
    END IF;
END$$
    
DELIMITER ;   

-- Query 6
CREATE VIEW event_summary AS
SELECT
	e.event_id,
    e.title,
    e.target_amount,
    e.current_amount,
    e.status,
    u.name AS creator
FROM events e
JOIN users u ON e.created_by = u.user_id;

-- Query 7
SELECT event_id, SUM(amount) as total_funding
FROM contributions
GROUP BY event_id;	

-- Query 8
DELIMITER $$
CREATE PROCEDURE contribute_to_event(
	IN uid INT,
    IN eid INT,
    IN amt DECIMAL(10,2)
)
BEGIN
	INSERT INTO contributions(user_id, event_id, amount)
    VALUES(uid,eid, amt);
	END$$
    DELIMITER ;
    
SHOW procedure status where Db="event_management";

CALL contribute_to_event(1,1,500);


-- Query 9
DELIMITER $$

DROP TRIGGER IF EXISTS after_contribution_insert $$

CREATE TRIGGER after_contribution_insert
AFTER INSERT ON contributions
FOR EACH ROW
BEGIN
	UPDATE events
	SET current_amount = current_amount + NEW.amount
	WHERE event_id = NEW.event_id;
END$$
DELIMITER ;


-- Query 10
DELIMITER $$


CREATE TRIGGER after_event_update
AFTER UPDATE ON events 
FOR EACH ROW
BEGIN
	IF NEW.current_amount >= NEW.target_amount THEN
    UPDATE events
    SET status = 'funded'
    WHERE event_id = NEW.event_id;
    END IF;
END$$

DELIMITER ;

-- Query 11
SELECT 
	u.name AS user_name,
	e.title AS event_title,
    c.amount,
    c.created_at
FROM contributions c 
JOIN users u ON c.user_id = u.user_id
JOIN events e ON c.event_id = e.event_id;

-- Query 12 

SELECT event_id, SUM(amount) AS total_funding
FROM contributions
GROUP BY event_id;

-- Query 13
SELECT event_id, SUM(amount)
FROM contributions
GROUP BY event_id
HAVING sum(amount) > 1000;

-- Query 14
SELECT name
FROM users
WHERE user_id IN(
	SELECT created_by
    FROM events
    WHERE status = 'approved'
);

SELECT * FROM event_summary;

-- Query 15
START TRANSACTION;

SELECT current_amount
FROM events
WHERE event_id = 1
FOR UPDATE;

UPDATE events
SET current_amount = current_amount + 500
WHERE event_id = 1;

COMMIT;


-- Query 16
SELECT event_id, SUM(amount) as total_funding
FROM contributions
GROUP BY event_id
ORDER BY total_funding DESC
LIMIT 1;

-- Query 17
ALTER TABLE users
ADD wallet_balance DECIMAL(10,2) DEFAULT 0;

CREATE TABLE wallet_transactions(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2),
    type ENUM('credit','debit'),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT current_timestamp,
    foreign key(user_id) REFERENCES users(user_id)
    );

DELIMITER $$
CREATE PROCEDURE add_money(
	IN uid INT,
    IN amt DECIMAL(10,2)
)
BEGIN
IF amt<=0 THEN
	SIGNAL SQLSTATE '45000'
    SET message_text = 'Invalid Amount';
END IF;

START TRANSACTION;

UPDATE users
SET wallet_balance = wallet_balance + amt
WHERE user_id = uid;

INSERT INTO wallet_transactions(user_id, amount,type, description)
VALUES (uid, amt,'credit','Added Funds');
COMMIT;
END$$
DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS contribute_to_event $$
CREATE PROCEDURE contribute_to_event(
	IN uid INT,
    IN eid INT,
    IN amt DECIMAL(10,2)
)

BEGIN
	DECLARE user_balance DECIMAL(10,2);
    
    START TRANSACTION;
    
    SELECT wallet_balance INTO user_balance
    FROM users
    WHERE user_id = uid
    FOR UPDATE;
IF user_balance < amt THEN
	SIGNAL SQLSTATE '45000'
    SET message_text = 'INSUFFICIENT WALLET BALANCE';
END IF;

UPDATE users
SET wallet_balance = wallet_balance - amt
WHERE user_id = uid;

INSERT INTO wallet_transactions(user_id,amount,type,description)
VALUES (uid,amt,'debit','Contribution');

INSERT INTO contributions(user_id,event_id,amount)
VALUES (uid,eid,amt);

COMMIT;
END$$
DELIMITER ;


DELIMITER $$
DROP PROCEDURE IF EXISTS process_refunds $$ 
CREATE PROCEDURE process_refunds(IN eid INT)
BEGIN 
	DECLARE done INT DEFAULT FALSE;
    DECLARE uid INT;
    DECLARE amt DECIMAL(10,2);
	
	DECLARE cur CURSOR FOR
		SELECT user_id, amount 
        FROM contributions
		WHERE event_id = eid;
	
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    START TRANSACTION;
    
    UPDATE events
    SET status = 'failed'
    WHERE event_id = eid;
    
    OPEN cur;
    
    read_loop: LOOP
		FETCH cur INTO uid,amt;
        
	IF done THEN 
		LEAVE read_loop;
	END IF;
    
    UPDATE users
    SET wallet_balance = wallet_balance + amt
    WHERE user_id = uid;

	INSERT INTO wallet_transactions(user_id,amount,type,description)
    VALUES(uid, amt, 'credit', 'Refund for failed event');
    
    END LOOP;
    CLOSE cur;
    
    COMMIT;
    
END$$
DELIMITER ;


DELIMITER $$

CREATE TRIGGER after_contribution_insert
AFTER INSERT ON contributions
FOR EACH ROW
BEGIN 
	UPDATE events
    SET current_amount = current_amount + NEW.amount
    WHERE event_id = NEW.event_id; 
END$$
DELIMITER ;

-- Query 18
-- ─────────────────────────────────────────
INSERT INTO users (name, email, password, role) VALUES
('Admin User',   'admin@cfevents.com',  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVNugQ.0mS', 'admin'),
('Arjun Sharma', 'arjun@example.com',   '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVNugQ.0mS', 'user'),
('Priya Mehta',  'priya@example.com',   '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVNugQ.0mS', 'user'),
('Rohit Verma',  'rohit@example.com',   '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVNugQ.0mS', 'user'),
('Sneha Kapoor', 'sneha@example.com',   '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVNugQ.0mS', 'user'),
('Dev Anand',    'dev@example.com',     '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVNugQ.0mS', 'user');
-- user_id: admin=1, arjun=2, priya=3, rohit=4, sneha=5, dev=6
 
-- ─────────────────────────────────────────
-- EVENTS
-- approved_by references admin user (id=1)
-- ─────────────────────────────────────────
INSERT INTO events (title, description, target_amount, current_amount, deadline, status, created_by, approved_by) VALUES
 
-- 1. APPROVED — partially funded
('Annual College Cultural Fest 2025',
 'Our college annual cultural fest "Tarang" brings together 2000+ students from 15 colleges across Delhi NCR. Funds go toward stage setup, sound systems, lighting, celebrity performances, and food stalls. Help us make this the biggest fest yet!',
 150000.00, 0.00, '2025-08-30', 'approved', 2, 1),
 
-- 2. APPROVED — partially funded
('Rooftop Astronomy Night',
 'A special astronomy event on the college rooftop with 6 high-powered telescopes, guided star-gazing sessions, astrophotography workshop, and a guest lecture by an ISRO scientist. Open to all science enthusiasts.',
 45000.00, 0.00, '2025-07-20', 'approved', 3, 1),
 
-- 3. APPROVED — partially funded
('Inter-College Hackathon: Build for Bharat',
 'A 36-hour hackathon focused on solving real Indian problems in healthcare, agriculture, fintech, and education. Cash prizes worth ₹1,00,000, mentorship from industry leaders, and internship offers from top startups.',
 200000.00, 0.00, '2025-09-15', 'approved', 4, 1),
 
-- 4. APPROVED — nearly funded
('Campus Mental Health & Wellness Week',
 'A week-long series of events including therapy sessions, yoga workshops, stress management talks, and anonymous counseling booths. Breaking the stigma around mental health on campus.',
 60000.00, 0.00, '2025-07-10', 'approved', 5, 1),
 
-- 5. FUNDED — fully raised
('Photography Exhibition: Faces of Delhi',
 'A curated photo exhibition showcasing 200 portraits of everyday Delhiites — street vendors, students, elderly residents — printed on large canvas and displayed in the college auditorium for a week.',
 35000.00, 0.00, '2025-05-01', 'funded', 2, 1),
 
-- 6. PENDING — awaiting admin approval
('E-Sports Tournament: Valorant & BGMI',
 'A 2-day e-sports tournament with 128 participants across Valorant and BGMI. Prize pool of ₹50,000. Needs funds for gaming setup rental, streaming equipment, trophies, and refreshments.',
 80000.00, 0.00, '2025-08-05', 'pending', 6, NULL),
 
-- 7. PENDING
('Open Mic & Spoken Word Night',
 'Monthly open mic event for poets, comedians, musicians, and storytellers. Provides a safe platform for student expression. Funds go toward audio equipment, venue decoration, and promotion.',
 25000.00, 0.00, '2025-07-25', 'pending', 3, NULL),
 
-- 8. FAILED — deadline passed, not funded
('Winter Sports Meet 2024',
 'Inter-departmental winter sports competition featuring football, basketball, badminton, and kabaddi. Unfortunately the campaign deadline passed before we reached our target.',
 120000.00, 0.00, '2024-12-15', 'failed', 4, 1);
 
-- ─────────────────────────────────────────
-- CONTRIBUTIONS (via stored procedure)
-- This also fires your after_contribution_insert trigger
-- which updates current_amount automatically
-- ─────────────────────────────────────────
 
-- Cultural Fest (event_id=1, target=150000)
CALL contribute_to_event(3, 1, 15000.00);  -- Priya
CALL contribute_to_event(4, 1, 25000.00);  -- Rohit
CALL contribute_to_event(5, 1, 20000.00);  -- Sneha
CALL contribute_to_event(6, 1, 10000.00);  -- Dev
CALL contribute_to_event(2, 1, 17500.00);  -- Arjun
-- Running total: 87500 / 150000 (58%)
 
-- Astronomy Night (event_id=2, target=45000)
CALL contribute_to_event(2, 2, 12000.00);  -- Arjun
CALL contribute_to_event(4, 2,  8000.00);  -- Rohit
CALL contribute_to_event(6, 2, 11200.00);  -- Dev
-- Running total: 31200 / 45000 (69%)
 
-- Hackathon (event_id=3, target=200000)
CALL contribute_to_event(2, 3, 30000.00);  -- Arjun
CALL contribute_to_event(5, 3, 45000.00);  -- Sneha
CALL contribute_to_event(6, 3, 25000.00);  -- Dev
-- Running total: 100000 / 200000 (50%)
 
-- Mental Health Week (event_id=4, target=60000)
CALL contribute_to_event(2, 4, 20000.00);  -- Arjun
CALL contribute_to_event(3, 4, 15000.00);  -- Priya
CALL contribute_to_event(6, 4, 18000.00);  -- Dev
-- Running total: 53000 / 60000 (88%)
 
-- Photography Exhibition (event_id=5, target=35000) — FUNDED
CALL contribute_to_event(3, 5, 10000.00);  -- Priya
CALL contribute_to_event(4, 5, 15000.00);  -- Rohit
CALL contribute_to_event(5, 5, 10000.00);  -- Sneha
-- Running total: 35000 / 35000 (100%) → trigger should set status=funded
 
-- ─────────────────────────────────────────
-- VERIFY — run these SELECT statements to confirm everything loaded
-- ─────────────────────────────────────────
SELECT '=== USERS ===' as '';
SELECT user_id, name, email, role FROM users;
 
SELECT '=== EVENTS ===' as '';
SELECT event_id, title, target_amount, current_amount,
       CONCAT(ROUND(current_amount/target_amount*100), '%') as funded_pct,
       status, deadline FROM events;
 
SELECT '=== CONTRIBUTIONS ===' as '';
SELECT c.contribution_id, u.name as contributor, e.title as event,
       c.amount, c.created_at
FROM contributions c
JOIN users u ON c.user_id = u.user_id
JOIN events e ON c.event_id = e.event_id
ORDER BY c.created_at;
 
SELECT '=== SUMMARY VIEW ===' as '';
SELECT * FROM event_summary;


-- Query 19  SET ADMIN

UPDATE users
SET role = 'admin'
WHERE email = 'arnavgandhi14@gmail.com';

SELECT * FROM users;
SELECT * FROM events ;
SELECT * FROM events WHERE status = 'pendingupdate_event_statusafter_event_update';


-- Query 20 
DELIMITER $$

DROP TRIGGER IF EXISTS after_contribution_insert $$

CREATE TRIGGER after_contribution_insert
AFTER INSERT ON contributions
FOR EACH ROW
BEGIN
  -- update amount
  UPDATE events
  SET current_amount = current_amount + NEW.amount
  WHERE event_id = NEW.event_id;

  -- update status ONLY if fully funded
  UPDATE events
  SET status = 'funded'
  WHERE event_id = NEW.event_id
  AND current_amount + NEW.amount >= target_amount;

END$$

DELIMITER ;

SHOW TRIGGERS WHERE `Table` = 'events';
SHOW TRIGGERS WHERE `Table` = 'contributions';
SHOW PROCEDURE STATUS WHERE Db = DATABASE();

SHOW CREATE PROCEDURE add_money;
SHOW CREATE PROCEDURE process_refunds;
SHOW CREATE PROCEDURE contribute_to_event;

-- Step 1: Drop all three broken triggers
DROP TRIGGER IF EXISTS after_contribution_insert;
DROP TRIGGER IF EXISTS update_event_status;
DROP TRIGGER IF EXISTS after_event_update;

-- Step 2: Create ONE clean trigger on contributions only
DELIMITER //
DELIMITER $$

DROP TRIGGER IF EXISTS after_contribution_insert $$

CREATE TRIGGER after_contribution_insert
AFTER INSERT ON contributions
FOR EACH ROW
BEGIN
    -- Update running total
    UPDATE events 
    SET current_amount = current_amount + NEW.amount
    WHERE event_id = NEW.event_id;

    -- Mark funded only if target reached
    UPDATE events
    SET status = 'funded'
    WHERE event_id = NEW.event_id
    AND status = 'approved'
    AND current_amount >= target_amount;

END$$

DELIMITER ;
-- Step 3: Fix all currently corrupted events
SET SQL_SAFE_UPDATES = 0;

UPDATE events
SET status = 'approved'
WHERE status = 'funded'
  AND current_amount < target_amount;

SET SQL_SAFE_UPDATES = 1;

SET SQL_SAFE_UPDATES = 0;
UPDATE events SET status = 'approved' WHERE title = 'sup dawg';
SET SQL_SAFE_UPDATES = 1;
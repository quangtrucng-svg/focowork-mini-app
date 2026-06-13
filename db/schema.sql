-- FocoWork MySQL Schema
-- Run: mysql -u root -p < db/schema.sql

CREATE DATABASE IF NOT EXISTS focowork_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE focowork_db;

CREATE TABLE companies (
    id CHAR(36) PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE departments (
    id CHAR(36) PRIMARY KEY,
    company_id CHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_vacant BOOLEAN DEFAULT FALSE,
    UNIQUE KEY uq_dept (company_id, name),
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
  );

CREATE TABLE employees (
    id CHAR(36) PRIMARY KEY,
    zalo_user_id VARCHAR(100) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    role ENUM('sep','pgd','tp','cv') NOT NULL,
    company_id CHAR(36),
    department_id CHAR(36),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
  );

CREATE TABLE attendance (
    id CHAR(36) PRIMARY KEY,
    employee_id CHAR(36) NOT NULL,
    work_date DATE NOT NULL,
    check_in_at TIMESTAMP NULL,
    check_out_at TIMESTAMP NULL,
    location VARCHAR(255),
    lat DOUBLE,
    lng DOUBLE,
    status ENUM('in','out') DEFAULT 'in',
    UNIQUE KEY uq_att (employee_id, work_date),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
  );

CREATE TABLE requests (
    id CHAR(36) PRIMARY KEY,
    type ENUM('advance','trip','leave') NOT NULL,
    requester_id CHAR(36) NOT NULL,
    company_id CHAR(36),
    department_id CHAR(36),
    title VARCHAR(255),
    reason TEXT,
    amount BIGINT DEFAULT 0,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    current_level ENUM('tp','pgd','sep'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES employees(id)
  );

CREATE TABLE approvals (
    id CHAR(36) PRIMARY KEY,
    request_id CHAR(36) NOT NULL,
    step_order INT NOT NULL,
    level ENUM('tp','pgd','sep') NOT NULL,
    approver_id CHAR(36),
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    note TEXT,
    decided_at TIMESTAMP NULL,
    UNIQUE KEY uq_appr (request_id, step_order),
    FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE
  );

CREATE TABLE tasks (
    id CHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigner_id CHAR(36),
    assignee_id CHAR(36) NOT NULL,
    company_id CHAR(36),
    department_id CHAR(36),
    due_date DATE,
    status ENUM('doing','done') DEFAULT 'doing',
    report TEXT,
    quality ENUM('fast','ontime','slow','fail'),
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assignee_id) REFERENCES employees(id)
  );

CREATE TABLE notifications (
    id CHAR(36) PRIMARY KEY,
    recipient_id CHAR(36),
    channel VARCHAR(20) DEFAULT 'zns',
    template VARCHAR(255),
    payload JSON,
    status VARCHAR(20) DEFAULT 'queued',
    sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipient_id) REFERENCES employees(id)
  );

-- Seed companies
INSERT INTO companies (id, code, name) VALUES
 (UUID(), 'PTMN', 'PTMN'),
 (UUID(), 'FORZ', 'FORZ'),
 (UUID(), 'TEAFIT', 'Teafit');

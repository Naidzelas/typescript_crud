USE master;
GO

-- Create database if not exists
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ts')
BEGIN
    CREATE DATABASE ts;
END
GO

USE ts;
GO

-- Clients table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[clients]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[clients] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [name] NVARCHAR(255) NOT NULL,
        [address] NVARCHAR(500) NOT NULL,
        [postcode] NVARCHAR(20) NOT NULL,
        [created_at] DATETIME2 DEFAULT GETDATE(),
        [updated_at] DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- App Activity Log table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[app_activity_log]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[app_activity_log] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [code] INT NOT NULL,
        [action] NVARCHAR(255) NOT NULL,
        [payload] JSON NOT NULL,
        [created_at] DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- App Activity Log table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[outgoing_requests]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[outgoing_requests] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [endpoint] NVARCHAR(255) NOT NULL,
        [method] NVARCHAR(10) NOT NULL,
        [payload] JSON NOT NULL,
        [code] INT NOT NULL,
        [created_at] DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- Indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Clients_Name' AND object_id = OBJECT_ID('dbo.clients'))
BEGIN
    CREATE INDEX IX_Clients_Name ON [dbo].[clients]([name]);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_ActivityLog_CreatedAt' AND object_id = OBJECT_ID('dbo.app_activity_log'))
BEGIN
    CREATE INDEX IX_ActivityLog_CreatedAt ON [dbo].[app_activity_log]([created_at] DESC);
END
GO

PRINT 'Database schema created successfully!';
GO

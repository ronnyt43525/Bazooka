﻿CREATE TABLE [dbo].[Packages]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,
	Identifier NVARCHAR(100) NOT NULL,
	Version NVARCHAR(100) NOT NULL, 
    [UploadDate] DATETIME NOT NULL 
)
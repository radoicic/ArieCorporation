/****** Object:  Table [dbo].[Role]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[RoleId] [smallint] IDENTITY(1,1) NOT NULL,
	[RoleName] [varchar](20) NOT NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRole]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRole](
	[UserRoleId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[RoleId] [smallint] NOT NULL,
 CONSTRAINT [PK_UserRole] PRIMARY KEY CLUSTERED 
(
	[UserRoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[PasswordHash] [varchar](max) NOT NULL,
	[Name] [varchar](50) NULL,
	[Phone] [varchar](50) NULL,
	[OtpHash] [varchar](max) NULL,
	[PasswordResetCodeHash] [varchar](max) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Module]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Module](
	[ModuleId] [smallint] IDENTITY(1,1) NOT NULL,
	[ModuleName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Module] PRIMARY KEY CLUSTERED 
(
	[ModuleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RoleModuleAccess]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleModuleAccess](
	[RoleModuleAccessId] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [smallint] NOT NULL,
	[ModuleId] [smallint] NOT NULL,
	[View] [bit] NOT NULL,
	[Add] [bit] NOT NULL,
	[Edit] [bit] NOT NULL,
	[Delete] [bit] NOT NULL,
 CONSTRAINT [PK_RoleModuleAccess] PRIMARY KEY CLUSTERED 
(
	[RoleModuleAccessId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[UserModuleAccessView]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[UserModuleAccessView]
AS
SELECT dbo.Role.RoleId, dbo.Role.RoleName, dbo.RoleModuleAccess.[View], dbo.RoleModuleAccess.[Add], dbo.RoleModuleAccess.Edit, dbo.RoleModuleAccess.[Delete], dbo.Module.ModuleName, dbo.Module.ModuleId, dbo.[User].UserId
FROM   dbo.Role INNER JOIN
             dbo.RoleModuleAccess ON dbo.Role.RoleId = dbo.RoleModuleAccess.RoleId INNER JOIN
             dbo.UserRole ON dbo.Role.RoleId = dbo.UserRole.RoleId INNER JOIN
             dbo.[User] ON dbo.UserRole.UserId = dbo.[User].UserId INNER JOIN
             dbo.Module ON dbo.RoleModuleAccess.ModuleId = dbo.Module.ModuleId
GO
/****** Object:  Table [dbo].[Child]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Child](
	[ChildId] [int] NOT NULL,
	[TravelerId] [int] NOT NULL,
	[ChildName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Child] PRIMARY KEY CLUSTERED 
(
	[ChildId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Country]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Country](
	[CountryId] [smallint] IDENTITY(1,1) NOT NULL,
	[CountryName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Country] PRIMARY KEY CLUSTERED 
(
	[CountryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[District]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[District](
	[DistrictId] [int] IDENTITY(1,1) NOT NULL,
	[ProvinceId] [int] NULL,
	[DistrictName] [varchar](50) NULL,
 CONSTRAINT [PK_District] PRIMARY KEY CLUSTERED 
(
	[DistrictId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Flow]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Flow](
	[FlowId] [int] NOT NULL,
	[FlowDataId] [int] NOT NULL,
	[TravelerId] [int] NOT NULL,
	[Age] [tinyint] NOT NULL,
	[Sex] [char](1) NOT NULL,
	[NationalityCountryId] [smallint] NOT NULL,
	[ReasonForTravel] [nvarchar](max) NOT NULL,
	[ComingFromCountryId] [smallint] NOT NULL,
	[ComingFromProvinceId] [int] NULL,
	[ComingFromDistrictId] [int] NULL,
	[ComingFromVillageId] [int] NULL,
	[GoingToCountryId] [smallint] NOT NULL,
	[GoingToProvinceId] [int] NULL,
	[GoingToDistrictId] [int] NULL,
	[GoingToVillageId] [int] NULL,
 CONSTRAINT [PK_Flow] PRIMARY KEY CLUSTERED 
(
	[FlowId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FlowData]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FlowData](
	[FlowDataId] [int] IDENTITY(1,1) NOT NULL,
	[FlowDate] [date] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Tel] [varchar](12) NOT NULL,
	[Location] [varchar](50) NOT NULL,
	[ModeOfTransportation] [tinyint] NOT NULL,
 CONSTRAINT [PK_FlowData] PRIMARY KEY CLUSTERED 
(
	[FlowDataId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log](
	[LogId] [bigint] IDENTITY(1,1) NOT NULL,
	[Timestamp] [datetime] NOT NULL,
	[LogLevel] [tinyint] NOT NULL,
	[Message] [varchar](100) NOT NULL,
	[Details] [varchar](max) NULL,
	[LoggedInUserId] [int] NULL,
 CONSTRAINT [PK_Log] PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Province]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Province](
	[ProvinceId] [int] IDENTITY(1,1) NOT NULL,
	[CountryId] [smallint] NOT NULL,
	[ProvinceName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Province] PRIMARY KEY CLUSTERED 
(
	[ProvinceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sdp]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sdp](
	[SdpId] [int] IDENTITY(1,1) NOT NULL,
	[SdpName] [varchar](50) NOT NULL,
	[VillageId] [int] NOT NULL,
 CONSTRAINT [PK_Sdp] PRIMARY KEY CLUSTERED 
(
	[SdpId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Traveler]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Traveler](
	[TravelerId] [int] IDENTITY(1,1) NOT NULL,
	[TravelerName] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Traveler] PRIMARY KEY CLUSTERED 
(
	[TravelerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRegionAssignment]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRegionAssignment](
	[UserRegionAssignmentId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[CountryId] [smallint] NOT NULL,
	[ProvinceId] [int] NULL,
	[DistrictId] [int] NULL,
	[VillageId] [int] NULL,
	[SdpId] [int] NULL,
 CONSTRAINT [PK_UserRegionAssignment] PRIMARY KEY CLUSTERED 
(
	[UserRegionAssignmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VaccinationHistory]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VaccinationHistory](
	[VaccinationHistoryId] [int] NOT NULL,
	[VaccineDoseId] [smallint] NOT NULL,
	[ChildId] [int] NOT NULL,
	[VaccinationDateTime] [smalldatetime] NULL,
 CONSTRAINT [PK_VaccinationHistory] PRIMARY KEY CLUSTERED 
(
	[VaccinationHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VaccineCategoryMaster]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VaccineCategoryMaster](
	[VaccineCategoryId] [smallint] IDENTITY(1,1) NOT NULL,
	[VaccineCategoryName] [nvarchar](50) NULL,
 CONSTRAINT [PK_VaccineCategory] PRIMARY KEY CLUSTERED 
(
	[VaccineCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VaccineDoseMaster]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VaccineDoseMaster](
	[VaccineDoseId] [smallint] IDENTITY(1,1) NOT NULL,
	[VaccineCategoryId] [smallint] NOT NULL,
	[VaccineDoseName] [nvarchar](50) NOT NULL,
	[IsBirthDose] [bit] NOT NULL,
	[Comments] [varchar](100) NULL,
 CONSTRAINT [PK_VaccineDose] PRIMARY KEY CLUSTERED 
(
	[VaccineDoseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Village]    Script Date: 15-02-2023 00:06:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Village](
	[VillageId] [int] IDENTITY(1,1) NOT NULL,
	[DistrictId] [int] NULL,
	[ProvinceId] [int] NULL,
	[CountryId] [smallint] NULL,
	[VillageName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Village] PRIMARY KEY CLUSTERED 
(
	[VillageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Country] ON 

INSERT [dbo].[Country] ([CountryId], [CountryName]) VALUES (1, N'Afghanistan')
SET IDENTITY_INSERT [dbo].[Country] OFF
GO
SET IDENTITY_INSERT [dbo].[Module] ON 

INSERT [dbo].[Module] ([ModuleId], [ModuleName]) VALUES (1, N'Dashboard')
INSERT [dbo].[Module] ([ModuleId], [ModuleName]) VALUES (2, N'Children')
INSERT [dbo].[Module] ([ModuleId], [ModuleName]) VALUES (3, N'Traveler')
INSERT [dbo].[Module] ([ModuleId], [ModuleName]) VALUES (4, N'SDP')
INSERT [dbo].[Module] ([ModuleId], [ModuleName]) VALUES (5, N'Flow Records')
INSERT [dbo].[Module] ([ModuleId], [ModuleName]) VALUES (6, N'Immunizations - Vaccine Records')
INSERT [dbo].[Module] ([ModuleId], [ModuleName]) VALUES (7, N'Immunizations - Dose Setup')
INSERT [dbo].[Module] ([ModuleId], [ModuleName]) VALUES (8, N'Vaccine Inventory')
INSERT [dbo].[Module] ([ModuleId], [ModuleName]) VALUES (9, N'Users')
INSERT [dbo].[Module] ([ModuleId], [ModuleName]) VALUES (10, N'Reporting')
INSERT [dbo].[Module] ([ModuleId], [ModuleName]) VALUES (11, N'Organization')
INSERT [dbo].[Module] ([ModuleId], [ModuleName]) VALUES (12, N'Settings')
SET IDENTITY_INSERT [dbo].[Module] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([RoleId], [RoleName]) VALUES (1, N'Super User')
INSERT [dbo].[Role] ([RoleId], [RoleName]) VALUES (2, N'Admin')
INSERT [dbo].[Role] ([RoleId], [RoleName]) VALUES (3, N'Data entry clerk')
INSERT [dbo].[Role] ([RoleId], [RoleName]) VALUES (4, N'EPI Coordinator')
INSERT [dbo].[Role] ([RoleId], [RoleName]) VALUES (5, N'Provincial EPR')
INSERT [dbo].[Role] ([RoleId], [RoleName]) VALUES (6, N'NEPI Coordinator')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[RoleModuleAccess] ON 

INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (1, 1, 1, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (2, 1, 2, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (3, 1, 3, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (4, 1, 4, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (5, 1, 5, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (6, 1, 6, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (7, 1, 7, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (8, 1, 8, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (9, 1, 9, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (10, 1, 10, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (11, 1, 11, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (12, 1, 12, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (14, 2, 1, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (15, 2, 2, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (16, 2, 3, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (17, 2, 4, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (18, 2, 5, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (19, 2, 6, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (20, 2, 7, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (21, 2, 8, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (22, 2, 9, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (23, 2, 10, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (24, 2, 11, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (25, 2, 12, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (26, 3, 1, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (27, 3, 2, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (28, 3, 3, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (29, 3, 4, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (30, 3, 5, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (31, 3, 6, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (32, 3, 7, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (33, 3, 8, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (34, 3, 9, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (35, 3, 10, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (36, 3, 11, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (37, 3, 12, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (38, 4, 1, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (39, 4, 2, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (40, 4, 3, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (41, 4, 4, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (42, 4, 5, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (43, 4, 6, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (45, 4, 7, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (46, 4, 8, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (47, 4, 9, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (48, 4, 10, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (49, 4, 11, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (50, 4, 12, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (51, 5, 1, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (52, 5, 2, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (53, 5, 3, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (54, 5, 4, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (55, 5, 5, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (56, 5, 6, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (57, 5, 7, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (58, 5, 8, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (59, 5, 9, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (60, 5, 10, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (61, 5, 11, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (62, 5, 12, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (63, 6, 1, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (64, 6, 2, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (65, 6, 3, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (66, 6, 4, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (67, 6, 5, 1, 0, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (68, 6, 6, 1, 0, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (69, 6, 7, 1, 0, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (70, 6, 8, 1, 0, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (71, 6, 9, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (72, 6, 10, 1, 1, 1, 1)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (73, 6, 11, 0, 0, 0, 0)
INSERT [dbo].[RoleModuleAccess] ([RoleModuleAccessId], [RoleId], [ModuleId], [View], [Add], [Edit], [Delete]) VALUES (74, 6, 12, 0, 0, 0, 0)
SET IDENTITY_INSERT [dbo].[RoleModuleAccess] OFF
GO
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([UserId], [Email], [PasswordHash], [Name], [Phone], [OtpHash], [PasswordResetCodeHash]) VALUES (1, N'kevin@arie.com', N'$HASH|V1$10000$oYwJljBvTOROZl1AoXbn1gouacIJQkXvlxpkq/H3ISShiZyP', N'Kevin', N'+18045570068', NULL, NULL)
INSERT [dbo].[User] ([UserId], [Email], [PasswordHash], [Name], [Phone], [OtpHash], [PasswordResetCodeHash]) VALUES (6, N'adriyaman@hotmail.com', N'$HASH|V1$10000$IwTXyxLH0hP7QIjDILkVSQR7Nzn/Fbq0eJ08tignsoq5tg5g', N'Adri', N'+18045570068', NULL, NULL)
SET IDENTITY_INSERT [dbo].[User] OFF
GO
SET IDENTITY_INSERT [dbo].[UserRegionAssignment] ON 

INSERT [dbo].[UserRegionAssignment] ([UserRegionAssignmentId], [UserId], [CountryId], [ProvinceId], [DistrictId], [VillageId], [SdpId]) VALUES (1, 1, 1, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[UserRegionAssignment] OFF
GO
SET IDENTITY_INSERT [dbo].[UserRole] ON 

INSERT [dbo].[UserRole] ([UserRoleId], [UserId], [RoleId]) VALUES (1, 1, 1)
SET IDENTITY_INSERT [dbo].[UserRole] OFF
GO
SET IDENTITY_INSERT [dbo].[VaccineCategoryMaster] ON 

INSERT [dbo].[VaccineCategoryMaster] ([VaccineCategoryId], [VaccineCategoryName]) VALUES (1, N'BCG')
INSERT [dbo].[VaccineCategoryMaster] ([VaccineCategoryId], [VaccineCategoryName]) VALUES (2, N'HEP B')
INSERT [dbo].[VaccineCategoryMaster] ([VaccineCategoryId], [VaccineCategoryName]) VALUES (3, N'POLIO')
INSERT [dbo].[VaccineCategoryMaster] ([VaccineCategoryId], [VaccineCategoryName]) VALUES (4, N'PENTA')
INSERT [dbo].[VaccineCategoryMaster] ([VaccineCategoryId], [VaccineCategoryName]) VALUES (5, N'PCV')
INSERT [dbo].[VaccineCategoryMaster] ([VaccineCategoryId], [VaccineCategoryName]) VALUES (6, N'ROTAVIRUS')
INSERT [dbo].[VaccineCategoryMaster] ([VaccineCategoryId], [VaccineCategoryName]) VALUES (7, N'MEASLES')
SET IDENTITY_INSERT [dbo].[VaccineCategoryMaster] OFF
GO
SET IDENTITY_INSERT [dbo].[VaccineDoseMaster] ON 

INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (1, 1, N'BCG', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (2, 2, N'Hepatitis B', 1, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (3, 3, N'Polio 0', 1, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (4, 3, N'Polio 1', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (5, 3, N'Polio 2', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (7, 3, N'Polio 3', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (8, 4, N'Pentavalent 1', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (9, 4, N'Pentavalent 2', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (10, 4, N'Pentavalent 3', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (12, 5, N'PCV 1', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (13, 5, N'PCV 2', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (14, 5, N'PCV 3', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (15, 6, N'Rotavirus 1', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (16, 6, N'Rotavirus 2', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (17, 6, N'Rotavirus 3', 0, NULL)
INSERT [dbo].[VaccineDoseMaster] ([VaccineDoseId], [VaccineCategoryId], [VaccineDoseName], [IsBirthDose], [Comments]) VALUES (18, 7, N'Measles', 0, NULL)
SET IDENTITY_INSERT [dbo].[VaccineDoseMaster] OFF
GO
ALTER TABLE [dbo].[Child]  WITH CHECK ADD  CONSTRAINT [FK_Child_Traveler] FOREIGN KEY([TravelerId])
REFERENCES [dbo].[Traveler] ([TravelerId])
GO
ALTER TABLE [dbo].[Child] CHECK CONSTRAINT [FK_Child_Traveler]
GO
ALTER TABLE [dbo].[District]  WITH CHECK ADD  CONSTRAINT [FK_District_Province] FOREIGN KEY([ProvinceId])
REFERENCES [dbo].[Province] ([ProvinceId])
GO
ALTER TABLE [dbo].[District] CHECK CONSTRAINT [FK_District_Province]
GO
ALTER TABLE [dbo].[Flow]  WITH CHECK ADD  CONSTRAINT [FK_Flow_Country_ComingFrom] FOREIGN KEY([ComingFromCountryId])
REFERENCES [dbo].[Country] ([CountryId])
GO
ALTER TABLE [dbo].[Flow] CHECK CONSTRAINT [FK_Flow_Country_ComingFrom]
GO
ALTER TABLE [dbo].[Flow]  WITH CHECK ADD  CONSTRAINT [FK_Flow_Country_GoingTo] FOREIGN KEY([GoingToCountryId])
REFERENCES [dbo].[Country] ([CountryId])
GO
ALTER TABLE [dbo].[Flow] CHECK CONSTRAINT [FK_Flow_Country_GoingTo]
GO
ALTER TABLE [dbo].[Flow]  WITH CHECK ADD  CONSTRAINT [FK_Flow_Country_Nationality] FOREIGN KEY([NationalityCountryId])
REFERENCES [dbo].[Country] ([CountryId])
GO
ALTER TABLE [dbo].[Flow] CHECK CONSTRAINT [FK_Flow_Country_Nationality]
GO
ALTER TABLE [dbo].[Flow]  WITH CHECK ADD  CONSTRAINT [FK_Flow_District_ComingFrom] FOREIGN KEY([ComingFromDistrictId])
REFERENCES [dbo].[District] ([DistrictId])
GO
ALTER TABLE [dbo].[Flow] CHECK CONSTRAINT [FK_Flow_District_ComingFrom]
GO
ALTER TABLE [dbo].[Flow]  WITH CHECK ADD  CONSTRAINT [FK_Flow_District_GoingTo] FOREIGN KEY([GoingToDistrictId])
REFERENCES [dbo].[District] ([DistrictId])
GO
ALTER TABLE [dbo].[Flow] CHECK CONSTRAINT [FK_Flow_District_GoingTo]
GO
ALTER TABLE [dbo].[Flow]  WITH CHECK ADD  CONSTRAINT [FK_Flow_FlowData] FOREIGN KEY([FlowDataId])
REFERENCES [dbo].[FlowData] ([FlowDataId])
GO
ALTER TABLE [dbo].[Flow] CHECK CONSTRAINT [FK_Flow_FlowData]
GO
ALTER TABLE [dbo].[Flow]  WITH CHECK ADD  CONSTRAINT [FK_Flow_Province_ComingFrom] FOREIGN KEY([ComingFromProvinceId])
REFERENCES [dbo].[Province] ([ProvinceId])
GO
ALTER TABLE [dbo].[Flow] CHECK CONSTRAINT [FK_Flow_Province_ComingFrom]
GO
ALTER TABLE [dbo].[Flow]  WITH CHECK ADD  CONSTRAINT [FK_Flow_Traveler] FOREIGN KEY([FlowId])
REFERENCES [dbo].[Traveler] ([TravelerId])
GO
ALTER TABLE [dbo].[Flow] CHECK CONSTRAINT [FK_Flow_Traveler]
GO
ALTER TABLE [dbo].[Flow]  WITH CHECK ADD  CONSTRAINT [FK_Flow_Village_ComingFrom] FOREIGN KEY([ComingFromVillageId])
REFERENCES [dbo].[Village] ([VillageId])
GO
ALTER TABLE [dbo].[Flow] CHECK CONSTRAINT [FK_Flow_Village_ComingFrom]
GO
ALTER TABLE [dbo].[Flow]  WITH CHECK ADD  CONSTRAINT [FK_Flow_Village_GoingTo] FOREIGN KEY([GoingToVillageId])
REFERENCES [dbo].[Village] ([VillageId])
GO
ALTER TABLE [dbo].[Flow] CHECK CONSTRAINT [FK_Flow_Village_GoingTo]
GO
ALTER TABLE [dbo].[Log]  WITH CHECK ADD  CONSTRAINT [FK_Log_User] FOREIGN KEY([LoggedInUserId])
REFERENCES [dbo].[User] ([UserId])
GO
ALTER TABLE [dbo].[Log] CHECK CONSTRAINT [FK_Log_User]
GO
ALTER TABLE [dbo].[Province]  WITH CHECK ADD  CONSTRAINT [FK_Province_Country] FOREIGN KEY([CountryId])
REFERENCES [dbo].[Country] ([CountryId])
GO
ALTER TABLE [dbo].[Province] CHECK CONSTRAINT [FK_Province_Country]
GO
ALTER TABLE [dbo].[RoleModuleAccess]  WITH CHECK ADD  CONSTRAINT [FK_RoleModuleAccess_Module] FOREIGN KEY([ModuleId])
REFERENCES [dbo].[Module] ([ModuleId])
GO
ALTER TABLE [dbo].[RoleModuleAccess] CHECK CONSTRAINT [FK_RoleModuleAccess_Module]
GO
ALTER TABLE [dbo].[RoleModuleAccess]  WITH CHECK ADD  CONSTRAINT [FK_RoleModuleAccess_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([RoleId])
GO
ALTER TABLE [dbo].[RoleModuleAccess] CHECK CONSTRAINT [FK_RoleModuleAccess_Role]
GO
ALTER TABLE [dbo].[Sdp]  WITH CHECK ADD  CONSTRAINT [FK_Sdp_Village] FOREIGN KEY([VillageId])
REFERENCES [dbo].[Village] ([VillageId])
GO
ALTER TABLE [dbo].[Sdp] CHECK CONSTRAINT [FK_Sdp_Village]
GO
ALTER TABLE [dbo].[UserRegionAssignment]  WITH CHECK ADD  CONSTRAINT [FK_UserRegionAssignment_Country] FOREIGN KEY([CountryId])
REFERENCES [dbo].[Country] ([CountryId])
GO
ALTER TABLE [dbo].[UserRegionAssignment] CHECK CONSTRAINT [FK_UserRegionAssignment_Country]
GO
ALTER TABLE [dbo].[UserRegionAssignment]  WITH CHECK ADD  CONSTRAINT [FK_UserRegionAssignment_District] FOREIGN KEY([DistrictId])
REFERENCES [dbo].[District] ([DistrictId])
GO
ALTER TABLE [dbo].[UserRegionAssignment] CHECK CONSTRAINT [FK_UserRegionAssignment_District]
GO
ALTER TABLE [dbo].[UserRegionAssignment]  WITH CHECK ADD  CONSTRAINT [FK_UserRegionAssignment_Province] FOREIGN KEY([ProvinceId])
REFERENCES [dbo].[Province] ([ProvinceId])
GO
ALTER TABLE [dbo].[UserRegionAssignment] CHECK CONSTRAINT [FK_UserRegionAssignment_Province]
GO
ALTER TABLE [dbo].[UserRegionAssignment]  WITH CHECK ADD  CONSTRAINT [FK_UserRegionAssignment_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO
ALTER TABLE [dbo].[UserRegionAssignment] CHECK CONSTRAINT [FK_UserRegionAssignment_User]
GO
ALTER TABLE [dbo].[UserRegionAssignment]  WITH CHECK ADD  CONSTRAINT [FK_UserRegionAssignment_Village] FOREIGN KEY([VillageId])
REFERENCES [dbo].[Village] ([VillageId])
GO
ALTER TABLE [dbo].[UserRegionAssignment] CHECK CONSTRAINT [FK_UserRegionAssignment_Village]
GO
ALTER TABLE [dbo].[UserRole]  WITH CHECK ADD  CONSTRAINT [FK_UserRole_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([RoleId])
GO
ALTER TABLE [dbo].[UserRole] CHECK CONSTRAINT [FK_UserRole_Role]
GO
ALTER TABLE [dbo].[UserRole]  WITH CHECK ADD  CONSTRAINT [FK_UserRole_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO
ALTER TABLE [dbo].[UserRole] CHECK CONSTRAINT [FK_UserRole_User]
GO
ALTER TABLE [dbo].[VaccinationHistory]  WITH CHECK ADD  CONSTRAINT [FK_VaccinationHistory_Child] FOREIGN KEY([ChildId])
REFERENCES [dbo].[Child] ([ChildId])
GO
ALTER TABLE [dbo].[VaccinationHistory] CHECK CONSTRAINT [FK_VaccinationHistory_Child]
GO
ALTER TABLE [dbo].[VaccinationHistory]  WITH CHECK ADD  CONSTRAINT [FK_VaccinationHistory_VaccineDose] FOREIGN KEY([VaccineDoseId])
REFERENCES [dbo].[VaccineDoseMaster] ([VaccineDoseId])
GO
ALTER TABLE [dbo].[VaccinationHistory] CHECK CONSTRAINT [FK_VaccinationHistory_VaccineDose]
GO
ALTER TABLE [dbo].[VaccineDoseMaster]  WITH CHECK ADD  CONSTRAINT [FK_VaccineDose_VaccineCategory] FOREIGN KEY([VaccineCategoryId])
REFERENCES [dbo].[VaccineCategoryMaster] ([VaccineCategoryId])
GO
ALTER TABLE [dbo].[VaccineDoseMaster] CHECK CONSTRAINT [FK_VaccineDose_VaccineCategory]
GO
ALTER TABLE [dbo].[Village]  WITH CHECK ADD  CONSTRAINT [FK_Village_Country] FOREIGN KEY([CountryId])
REFERENCES [dbo].[Country] ([CountryId])
GO
ALTER TABLE [dbo].[Village] CHECK CONSTRAINT [FK_Village_Country]
GO
ALTER TABLE [dbo].[Village]  WITH CHECK ADD  CONSTRAINT [FK_Village_District] FOREIGN KEY([DistrictId])
REFERENCES [dbo].[District] ([DistrictId])
GO
ALTER TABLE [dbo].[Village] CHECK CONSTRAINT [FK_Village_District]
GO
ALTER TABLE [dbo].[Village]  WITH CHECK ADD  CONSTRAINT [FK_Village_Province] FOREIGN KEY([ProvinceId])
REFERENCES [dbo].[Province] ([ProvinceId])
GO
ALTER TABLE [dbo].[Village] CHECK CONSTRAINT [FK_Village_Province]
GO
--
DROP TABLE IF EXISTS [dbo].[LookupCountry]
GO

CREATE TABLE [dbo].[LookupCountry](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](3) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[SmallCode] [varchar](2) NOT NULL
 CONSTRAINT [PK_LookupCountry] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


INSERT INTO [LookupCountry] ([Code], [Name], [SmallCode])
VALUES
('AFG','Afghanistan','AF'),
('ALA','Åland','AX'),
('ALB','Albania','AL'),
('DZA','Algeria','DZ'),
('ASM','American Samoa','AS'),
('AND','Andorra','AD'),
('AGO','Angola','AO'),
('AIA','Anguilla','AI'),
('ATA','Antarctica','AQ'),
('ATG','Antigua and Barbuda','AG'),
('ARG','Argentina','AR'),
('ARM','Armenia','AM'),
('ABW','Aruba','AW'),
('AUS','Australia','AU'),
('AUT','Austria','AT'),
('AZE','Azerbaijan','AZ'),
('BHS','Bahamas','BS'),
('BHR','Bahrain','BH'),
('BGD','Bangladesh','BD'),
('BRB','Barbados','BB'),
('BLR','Belarus','BY'),
('BEL','Belgium','BE'),
('BLZ','Belize','BZ'),
('BEN','Benin','BJ'),
('BMU','Bermuda','BM'),
('BTN','Bhutan','BT'),
('BOL','Bolivia','BO'),
('BES','Bonaire','BQ'),
('BIH','Bosnia and Herzegovina','BA'),
('BWA','Botswana','BW'),
('BVT','Bouvet Island','BV'),
('BRA','Brazil','BR'),
('IOT','British Indian Ocean Territory','IO'),
('VGB','British Virgin Islands','VG'),
('BRN','Brunei','BN'),
('BGR','Bulgaria','BG'),
('BFA','Burkina Faso','BF'),
('BDI','Burundi','BI'),
('KHM','Cambodia','KH'),
('CMR','Cameroon','CM'),
('CAN','Canada','CA'),
('CPV','Cape Verde','CV'),
('CYM','Cayman Islands','KY'),
('CAF','Central African Republic','CF'),
('TCD','Chad','TD'),
('CHL','Chile','CL'),
('CHN','China','CN'),
('CXR','Christmas Island','CX'),
('CCK','Cocos [Keeling] Islands','CC'),
('COL','Colombia','CO'),
('COM','Comoros','KM'),
('COK','Cook Islands','CK'),
('CRI','Costa Rica','CR'),
('HRV','Croatia','HR'),
('CUB','Cuba','CU'),
('CUW','Curacao','CW'),
('CYP','Cyprus','CY'),
('CZE','Czech Republic','CZ'),
('COD','Democratic Republic of the Congo','CD'),
('DNK','Denmark','DK'),
('DJI','Djibouti','DJ'),
('DMA','Dominica','DM'),
('DOM','Dominican Republic','DO'),
('TLS','East Timor','TL'),
('ECU','Ecuador','EC'),
('EGY','Egypt','EG'),
('SLV','El Salvador','SV'),
('GNQ','Equatorial Guinea','GQ'),
('ERI','Eritrea','ER'),
('EST','Estonia','EE'),
('ETH','Ethiopia','ET'),
('FLK','Falkland Islands','FK'),
('FRO','Faroe Islands','FO'),
('FJI','Fiji','FJ'),
('FIN','Finland','FI'),
('FRA','France','FR'),
('GUF','French Guiana','GF'),
('PYF','French Polynesia','PF'),
('ATF','French Southern Territories','TF'),
('GAB','Gabon','GA'),
('GMB','Gambia','GM'),
('GEO','Georgia','GE'),
('DEU','Germany','DE'),
('GHA','Ghana','GH'),
('GIB','Gibraltar','GI'),
('GRC','Greece','GR'),
('GRL','Greenland','GL'),
('GRD','Grenada','GD'),
('GLP','Guadeloupe','GP'),
('GUM','Guam','GU'),
('GTM','Guatemala','GT'),
('GGY','Guernsey','GG'),
('GIN','Guinea','GN'),
('GNB','Guinea-Bissau','GW'),
('GUY','Guyana','GY'),
('HTI','Haiti','HT'),
('HMD','Heard Island and McDonald Islands','HM'),
('HND','Honduras','HN'),
('HKG','Hong Kong','HK'),
('HUN','Hungary','HU'),
('ISL','Iceland','IS'),
('IND','India','IN'),
('IDN','Indonesia','ID'),
('IRN','Iran','IR'),
('IRQ','Iraq','IQ'),
('IRL','Ireland','IE'),
('IMN','Isle of Man','IM'),
('ISR','Israel','IL'),
('ITA','Italy','IT'),
('CIV','Ivory Coast','CI'),
('JAM','Jamaica','JM'),
('JPN','Japan','JP'),
('JEY','Jersey','JE'),
('JOR','Jordan','JO'),
('KAZ','Kazakhstan','KZ'),
('KEN','Kenya','KE'),
('KIR','Kiribati','KI'),
('XKX','Kosovo','XK'),
('KWT','Kuwait','KW'),
('KGZ','Kyrgyzstan','KG'),
('LAO','Laos','LA'),
('LVA','Latvia','LV'),
('LBN','Lebanon','LB'),
('LSO','Lesotho','LS'),
('LBR','Liberia','LR'),
('LBY','Libya','LY'),
('LIE','Liechtenstein','LI'),
('LTU','Lithuania','LT'),
('LUX','Luxembourg','LU'),
('MAC','Macao','MO'),
('MKD','Macedonia','MK'),
('MDG','Madagascar','MG'),
('MWI','Malawi','MW'),
('MYS','Malaysia','MY'),
('MDV','Maldives','MV'),
('MLI','Mali','ML'),
('MLT','Malta','MT'),
('MHL','Marshall Islands','MH'),
('MTQ','Martinique','MQ'),
('MRT','Mauritania','MR'),
('MUS','Mauritius','MU'),
('MYT','Mayotte','YT'),
('MEX','Mexico','MX'),
('FSM','Micronesia','FM'),
('MDA','Moldova','MD'),
('MCO','Monaco','MC'),
('MNG','Mongolia','MN'),
('MNE','Montenegro','ME'),
('MSR','Montserrat','MS'),
('MAR','Morocco','MA'),
('MOZ','Mozambique','MZ'),
('MMR','Myanmar [Burma]','MM'),
('NAM','Namibia','NA'),
('NRU','Nauru','NR'),
('NPL','Nepal','NP'),
('NLD','Netherlands','NL'),
('NCL','New Caledonia','NC'),
('NZL','New Zealand','NZ'),
('NIC','Nicaragua','NI'),
('NER','Niger','NE'),
('NGA','Nigeria','NG'),
('NIU','Niue','NU'),
('NFK','Norfolk Island','NF'),
('PRK','North Korea','KP'),
('MNP','Northern Mariana Islands','MP'),
('NOR','Norway','NO'),
('OMN','Oman','OM'),
('PAK','Pakistan','PK'),
('PLW','Palau','PW'),
('PSE','Palestine','PS'),
('PAN','Panama','PA'),
('PNG','Papua New Guinea','PG'),
('PRY','Paraguay','PY'),
('PER','Peru','PE'),
('PHL','Philippines','PH'),
('PCN','Pitcairn Islands','PN'),
('POL','Poland','PL'),
('PRT','Portugal','PT'),
('PRI','Puerto Rico','PR'),
('QAT','Qatar','QA'),
('COG','Republic of the Congo','CG'),
('REU','Réunion','RE'),
('ROU','Romania','RO'),
('RUS','Russia','RU'),
('RWA','Rwanda','RW'),
('BLM','Saint Barthélemy','BL'),
('SHN','Saint Helena','SH'),
('KNA','Saint Kitts and Nevis','KN'),
('LCA','Saint Lucia','LC'),
('MAF','Saint Martin','MF'),
('SPM','Saint Pierre and Miquelon','PM'),
('VCT','Saint Vincent and the Grenadines','VC'),
('WSM','Samoa','WS'),
('SMR','San Marino','SM'),
('STP','São Tomé and Príncipe','ST'),
('SAU','Saudi Arabia','SA'),
('SEN','Senegal','SN'),
('SRB','Serbia','RS'),
('SYC','Seychelles','SC'),
('SLE','Sierra Leone','SL'),
('SGP','Singapore','SG'),
('SXM','Sint Maarten','SX'),
('SVK','Slovakia','SK'),
('SVN','Slovenia','SI'),
('SLB','Solomon Islands','SB'),
('SOM','Somalia','SO'),
('ZAF','South Africa','ZA'),
('SGS','South Georgia and the South Sandwich Islands','GS'),
('KOR','South Korea','KR'),
('SSD','South Sudan','SS'),
('ESP','Spain','ES'),
('LKA','Sri Lanka','LK'),
('SDN','Sudan','SD'),
('SUR','Suriname','SR'),
('SJM','Svalbard and Jan Mayen','SJ'),
('SWZ','Swaziland','SZ'),
('SWE','Sweden','SE'),
('CHE','Switzerland','CH'),
('SYR','Syria','SY'),
('TWN','Taiwan','TW'),
('TJK','Tajikistan','TJ'),
('TZA','Tanzania','TZ'),
('THA','Thailand','TH'),
('TGO','Togo','TG'),
('TKL','Tokelau','TK'),
('TON','Tonga','TO'),
('TTO','Trinidad and Tobago','TT'),
('TUN','Tunisia','TN'),
('TUR','Turkey','TR'),
('TKM','Turkmenistan','TM'),
('TCA','Turks and Caicos Islands','TC'),
('TUV','Tuvalu','TV'),
('UMI','U.S. Minor Outlying Islands','UM'),
('VIR','U.S. Virgin Islands','VI'),
('UGA','Uganda','UG'),
('UKR','Ukraine','UA'),
('ARE','United Arab Emirates','AE'),
('GBR','United Kingdom','GB'),
('USA','United States','US'),
('URY','Uruguay','UY'),
('UZB','Uzbekistan','UZ'),
('VUT','Vanuatu','VU'),
('VAT','Vatican City','VA'),
('VEN','Venezuela','VE'),
('VNM','Vietnam','VN'),
('WLF','Wallis and Futuna','WF'),
('ESH','Western Sahara','EH'),
('YEM','Yemen','YE'),
('ZMB','Zambia','ZM'),
('ZWE','Zimbabwe','ZW')
GO

IF COL_LENGTH('dbo.Country','LookupCountryId') IS NULL
BEGIN
	Alter Table [dbo].[Country]
	Add LookupCountryId SmallInt Default NULL
END
GO

-- To Push data for couple of countries
Update Country Set LookupCountryId = 1 Where CountryName = 'Afghanistan'
GO
--Select * from LookupCountry where Name = 'Cameroon';
Update Country Set LookupCountryId = 40 Where CountryName = 'Cameroon'
GO

/****** Updated the View for List | Object:  View [dbo].[CountSubRegionsView]    Script Date: 18-03-2023 01:33:08 ******/
DROP VIEW IF EXISTS [dbo].[CountSubRegionsView]
GO

CREATE VIEW [dbo].[CountSubRegionsView]
AS
	SELECT CAST(c.CountryId AS INT) AS Id, c.CountryName AS [Name], LC.[SmallCode], c.Lat, c.Long, COUNT(provinceSubquery.ProvinceId) AS ProvinceCount, SUM(provinceSubquery.DistrictCount) AS DistrictCount, SUM(provinceSubquery.VillageCount) AS VillageCount, SUM(provinceSubquery.SdpCount) AS SdpCount, 0 AS RegionType FROM
		Country c LEFT JOIN
			(SELECT p.ProvinceId, p.CountryId, COUNT(districtSubquery.DistrictId) AS DistrictCount, SUM(districtSubquery.VillageCount) AS VillageCount, SUM(districtSubquery.SdpCount) AS SdpCount FROM
				Province p LEFT JOIN
					(SELECT d.DistrictId, d.ProvinceId, COUNT(villageSubquery.VillageId) AS VillageCount, SUM(villageSubquery.SdpCount) AS SdpCount FROM 
						District d LEFT JOIN
							(SELECT sdpSubquery.DistrictId, sdpSubquery.VillageId, COUNT(sdpSubquery.SdpId) AS SdpCount FROM
								(SELECT v.VillageId, v.DistrictId, s.SdpId FROM Village v left join Sdp s on v.VillageId = s.VillageId) AS sdpSubquery
							GROUP BY VillageId, DistrictId) AS villageSubquery
						ON d.DistrictId = VillageSubquery.DistrictId
					GROUP BY d.DistrictId, d.ProvinceId) AS DistrictSubquery
				ON districtSubquery.ProvinceId = p.ProvinceId
			GROUP BY p.ProvinceId, p.CountryId) AS provinceSubquery
		ON provinceSubquery.CountryId = c.CountryId
		Left Join LookupCountry LC on LC.Id = C.LookupCountryId
	GROUP BY c.CountryId, c.CountryName, LC.[SmallCode], c.Lat, c.Long
GO
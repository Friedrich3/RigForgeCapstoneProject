using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CapstoneProject.Migrations
{
    /// <inheritdoc />
    public partial class Seeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FormFactors",
                columns: table => new
                {
                    FormFactorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormFactors", x => x.FormFactorId);
                });

            migrationBuilder.CreateTable(
                name: "Manufacturers",
                columns: table => new
                {
                    ManufacturerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Manufacturers", x => x.ManufacturerId);
                });

            migrationBuilder.CreateTable(
                name: "RamTypes",
                columns: table => new
                {
                    RamTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RamTypes", x => x.RamTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Sockets",
                columns: table => new
                {
                    SocketId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sockets", x => x.SocketId);
                });

            migrationBuilder.CreateTable(
                name: "StorageTypes",
                columns: table => new
                {
                    StorageTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StorageTypes", x => x.StorageTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Cases",
                columns: table => new
                {
                    CaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FanSupportCount = table.Column<int>(type: "int", nullable: true),
                    HasGlassPanel = table.Column<bool>(type: "bit", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(8,2)", precision: 8, scale: 2, nullable: false),
                    ReleaseYear = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false),
                    FormFactorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cases", x => x.CaseId);
                    table.ForeignKey(
                        name: "FK_Cases_FormFactors_FormFactorId",
                        column: x => x.FormFactorId,
                        principalTable: "FormFactors",
                        principalColumn: "FormFactorId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cases_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "ManufacturerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CpuCoolers",
                columns: table => new
                {
                    CpuCoolerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Tdp = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(8,2)", precision: 8, scale: 2, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CpuCoolers", x => x.CpuCoolerId);
                    table.ForeignKey(
                        name: "FK_CpuCoolers_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "ManufacturerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Gpus",
                columns: table => new
                {
                    GpuId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Vram = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(8,2)", precision: 8, scale: 2, nullable: false),
                    Tdp = table.Column<int>(type: "int", nullable: false),
                    PcieVersion = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    ReleaseYear = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gpus", x => x.GpuId);
                    table.ForeignKey(
                        name: "FK_Gpus_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "ManufacturerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PowerSupplies",
                columns: table => new
                {
                    PowerSupplyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Wattage = table.Column<int>(type: "int", nullable: false),
                    EfficiencyRating = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Modular = table.Column<bool>(type: "bit", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(8,2)", precision: 8, scale: 2, nullable: false),
                    ReleaseYear = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PowerSupplies", x => x.PowerSupplyId);
                    table.ForeignKey(
                        name: "FK_PowerSupplies_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "ManufacturerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rams",
                columns: table => new
                {
                    RamId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Capacity = table.Column<int>(type: "int", nullable: false),
                    Modules = table.Column<int>(type: "int", nullable: false),
                    Speed = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(8,2)", precision: 8, scale: 2, nullable: false),
                    ReleaseYear = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false),
                    RamTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rams", x => x.RamId);
                    table.ForeignKey(
                        name: "FK_Rams_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "ManufacturerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rams_RamTypes_RamTypeId",
                        column: x => x.RamTypeId,
                        principalTable: "RamTypes",
                        principalColumn: "RamTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Cpus",
                columns: table => new
                {
                    CpuId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Cores = table.Column<int>(type: "int", nullable: false),
                    Threads = table.Column<int>(type: "int", nullable: false),
                    BaseClock = table.Column<double>(type: "float(2)", precision: 2, scale: 1, nullable: false),
                    BoostClock = table.Column<double>(type: "float(2)", precision: 2, scale: 1, nullable: false),
                    Tdp = table.Column<int>(type: "int", nullable: false),
                    IntegratedGraphics = table.Column<bool>(type: "bit", nullable: false),
                    ReleaseYear = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(8,2)", precision: 8, scale: 2, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false),
                    SocketId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cpus", x => x.CpuId);
                    table.ForeignKey(
                        name: "FK_Cpus_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "ManufacturerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cpus_Sockets_SocketId",
                        column: x => x.SocketId,
                        principalTable: "Sockets",
                        principalColumn: "SocketId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Motherboards",
                columns: table => new
                {
                    MotherboardId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    MaxRam = table.Column<int>(type: "int", nullable: false),
                    RamSlots = table.Column<int>(type: "int", nullable: false),
                    Chipset = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    WifiIncluded = table.Column<bool>(type: "bit", nullable: false),
                    PcieSlots = table.Column<int>(type: "int", nullable: false),
                    M2Slots = table.Column<int>(type: "int", nullable: false),
                    ReleaseYear = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(8,2)", precision: 8, scale: 2, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RamTypeId = table.Column<int>(type: "int", nullable: false),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false),
                    SocketId = table.Column<int>(type: "int", nullable: false),
                    FormFactorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Motherboards", x => x.MotherboardId);
                    table.ForeignKey(
                        name: "FK_Motherboards_FormFactors_FormFactorId",
                        column: x => x.FormFactorId,
                        principalTable: "FormFactors",
                        principalColumn: "FormFactorId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Motherboards_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "ManufacturerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Motherboards_RamTypes_RamTypeId",
                        column: x => x.RamTypeId,
                        principalTable: "RamTypes",
                        principalColumn: "RamTypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Motherboards_Sockets_SocketId",
                        column: x => x.SocketId,
                        principalTable: "Sockets",
                        principalColumn: "SocketId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Storages",
                columns: table => new
                {
                    StorageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Capacity = table.Column<int>(type: "int", nullable: false),
                    Interface = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    FormFactor = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    NvmeSupport = table.Column<bool>(type: "bit", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(8,2)", precision: 8, scale: 2, nullable: false),
                    ReleaseYear = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StorageTypeId = table.Column<int>(type: "int", nullable: false),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Storages", x => x.StorageId);
                    table.ForeignKey(
                        name: "FK_Storages_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "ManufacturerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Storages_StorageTypes_StorageTypeId",
                        column: x => x.StorageTypeId,
                        principalTable: "StorageTypes",
                        principalColumn: "StorageTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CpuCoolerSockets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CpuCoolerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SocketId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CpuCoolerSockets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CpuCoolerSockets_CpuCoolers_CpuCoolerId",
                        column: x => x.CpuCoolerId,
                        principalTable: "CpuCoolers",
                        principalColumn: "CpuCoolerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CpuCoolerSockets_Sockets_SocketId",
                        column: x => x.SocketId,
                        principalTable: "Sockets",
                        principalColumn: "SocketId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Builds",
                columns: table => new
                {
                    BuildId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CpuId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    GpuId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    RamId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    StorageId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PowerSupplyId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    MotherboardId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CpuCoolerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Builds", x => x.BuildId);
                    table.ForeignKey(
                        name: "FK_Builds_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId");
                    table.ForeignKey(
                        name: "FK_Builds_CpuCoolers_CpuCoolerId",
                        column: x => x.CpuCoolerId,
                        principalTable: "CpuCoolers",
                        principalColumn: "CpuCoolerId");
                    table.ForeignKey(
                        name: "FK_Builds_Cpus_CpuId",
                        column: x => x.CpuId,
                        principalTable: "Cpus",
                        principalColumn: "CpuId");
                    table.ForeignKey(
                        name: "FK_Builds_Gpus_GpuId",
                        column: x => x.GpuId,
                        principalTable: "Gpus",
                        principalColumn: "GpuId");
                    table.ForeignKey(
                        name: "FK_Builds_Motherboards_MotherboardId",
                        column: x => x.MotherboardId,
                        principalTable: "Motherboards",
                        principalColumn: "MotherboardId");
                    table.ForeignKey(
                        name: "FK_Builds_PowerSupplies_PowerSupplyId",
                        column: x => x.PowerSupplyId,
                        principalTable: "PowerSupplies",
                        principalColumn: "PowerSupplyId");
                    table.ForeignKey(
                        name: "FK_Builds_Rams_RamId",
                        column: x => x.RamId,
                        principalTable: "Rams",
                        principalColumn: "RamId");
                    table.ForeignKey(
                        name: "FK_Builds_Storages_StorageId",
                        column: x => x.StorageId,
                        principalTable: "Storages",
                        principalColumn: "StorageId");
                });

            migrationBuilder.CreateTable(
                name: "UserBuilds",
                columns: table => new
                {
                    UserBuildId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BuildId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsCurrent = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBuilds", x => x.UserBuildId);
                    table.ForeignKey(
                        name: "FK_UserBuilds_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBuilds_Builds_BuildId",
                        column: x => x.BuildId,
                        principalTable: "Builds",
                        principalColumn: "BuildId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4992905D-7E33-49CE-9A27-D973E01E96E1", "4992905D-7E33-49CE-9A27-D973E01E96E1", "Moderator", "MODERATOR" },
                    { "51736DED-179A-415D-80EF-7129869E932E", "51736DED-179A-415D-80EF-7129869E932E", "User", "USER" },
                    { "8D4568F8-6945-4F04-8F6A-91641968BE13", "8D4568F8-6945-4F04-8F6A-91641968BE13", "Admin", "ADMIN" }
                });

            migrationBuilder.InsertData(
                table: "FormFactors",
                columns: new[] { "FormFactorId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, null, "ATX" },
                    { 2, null, "Micro-ATX" },
                    { 3, null, "Mini-ITX" },
                    { 4, null, "E-ATX" }
                });

            migrationBuilder.InsertData(
                table: "Manufacturers",
                columns: new[] { "ManufacturerId", "Name" },
                values: new object[,]
                {
                    { 1, "Intel" },
                    { 2, "AMD" },
                    { 3, "NVIDIA" },
                    { 4, "Corsair" },
                    { 5, "MSI" },
                    { 6, "ASUS" },
                    { 7, "Gigabyte" },
                    { 8, "Cooler Master" },
                    { 9, "Western Digital" },
                    { 10, "Seagate" },
                    { 11, "Noctua" }
                });

            migrationBuilder.InsertData(
                table: "RamTypes",
                columns: new[] { "RamTypeId", "Name" },
                values: new object[,]
                {
                    { 1, "DDR4" },
                    { 2, "DDR5" }
                });

            migrationBuilder.InsertData(
                table: "Sockets",
                columns: new[] { "SocketId", "Name" },
                values: new object[,]
                {
                    { 1, "LGA1200" },
                    { 2, "LGA1700" },
                    { 3, "AM4" },
                    { 4, "AM5" }
                });

            migrationBuilder.InsertData(
                table: "StorageTypes",
                columns: new[] { "StorageTypeId", "Name" },
                values: new object[,]
                {
                    { 1, "HDD" },
                    { 2, "SSD" },
                    { 3, "NVMe" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Builds_CaseId",
                table: "Builds",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Builds_CpuCoolerId",
                table: "Builds",
                column: "CpuCoolerId");

            migrationBuilder.CreateIndex(
                name: "IX_Builds_CpuId",
                table: "Builds",
                column: "CpuId");

            migrationBuilder.CreateIndex(
                name: "IX_Builds_GpuId",
                table: "Builds",
                column: "GpuId");

            migrationBuilder.CreateIndex(
                name: "IX_Builds_MotherboardId",
                table: "Builds",
                column: "MotherboardId");

            migrationBuilder.CreateIndex(
                name: "IX_Builds_PowerSupplyId",
                table: "Builds",
                column: "PowerSupplyId");

            migrationBuilder.CreateIndex(
                name: "IX_Builds_RamId",
                table: "Builds",
                column: "RamId");

            migrationBuilder.CreateIndex(
                name: "IX_Builds_StorageId",
                table: "Builds",
                column: "StorageId");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_FormFactorId",
                table: "Cases",
                column: "FormFactorId");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_ManufacturerId",
                table: "Cases",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_CpuCoolers_ManufacturerId",
                table: "CpuCoolers",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_CpuCoolerSockets_CpuCoolerId",
                table: "CpuCoolerSockets",
                column: "CpuCoolerId");

            migrationBuilder.CreateIndex(
                name: "IX_CpuCoolerSockets_SocketId",
                table: "CpuCoolerSockets",
                column: "SocketId");

            migrationBuilder.CreateIndex(
                name: "IX_Cpus_ManufacturerId",
                table: "Cpus",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Cpus_SocketId",
                table: "Cpus",
                column: "SocketId");

            migrationBuilder.CreateIndex(
                name: "IX_Gpus_ManufacturerId",
                table: "Gpus",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Motherboards_FormFactorId",
                table: "Motherboards",
                column: "FormFactorId");

            migrationBuilder.CreateIndex(
                name: "IX_Motherboards_ManufacturerId",
                table: "Motherboards",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Motherboards_RamTypeId",
                table: "Motherboards",
                column: "RamTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Motherboards_SocketId",
                table: "Motherboards",
                column: "SocketId");

            migrationBuilder.CreateIndex(
                name: "IX_PowerSupplies_ManufacturerId",
                table: "PowerSupplies",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Rams_ManufacturerId",
                table: "Rams",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Rams_RamTypeId",
                table: "Rams",
                column: "RamTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Storages_ManufacturerId",
                table: "Storages",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Storages_StorageTypeId",
                table: "Storages",
                column: "StorageTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBuilds_BuildId",
                table: "UserBuilds",
                column: "BuildId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBuilds_UserId",
                table: "UserBuilds",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CpuCoolerSockets");

            migrationBuilder.DropTable(
                name: "UserBuilds");

            migrationBuilder.DropTable(
                name: "Builds");

            migrationBuilder.DropTable(
                name: "Cases");

            migrationBuilder.DropTable(
                name: "CpuCoolers");

            migrationBuilder.DropTable(
                name: "Cpus");

            migrationBuilder.DropTable(
                name: "Gpus");

            migrationBuilder.DropTable(
                name: "Motherboards");

            migrationBuilder.DropTable(
                name: "PowerSupplies");

            migrationBuilder.DropTable(
                name: "Rams");

            migrationBuilder.DropTable(
                name: "Storages");

            migrationBuilder.DropTable(
                name: "FormFactors");

            migrationBuilder.DropTable(
                name: "Sockets");

            migrationBuilder.DropTable(
                name: "RamTypes");

            migrationBuilder.DropTable(
                name: "Manufacturers");

            migrationBuilder.DropTable(
                name: "StorageTypes");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4992905D-7E33-49CE-9A27-D973E01E96E1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "51736DED-179A-415D-80EF-7129869E932E");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8D4568F8-6945-4F04-8F6A-91641968BE13");
        }
    }
}

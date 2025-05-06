using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CapstoneProject.Migrations
{
    /// <inheritdoc />
    public partial class reShapeManufacturersAggiunta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Categories",
                table: "Manufacturers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 1,
                column: "Categories",
                value: "cpu,motherboard");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 2,
                column: "Categories",
                value: "cpu,gpu");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 3,
                column: "Categories",
                value: "gpu");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 4,
                column: "Categories",
                value: "ram,cpucooler,powersupply,case");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 5,
                column: "Categories",
                value: "gpu,motherboard,powersupply");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 6,
                column: "Categories",
                value: "gpu,motherboard,cpucooler");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 7,
                column: "Categories",
                value: "gpu,motherboard,powersupply");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 8,
                column: "Categories",
                value: "cpucooler,case,powersupply");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 9,
                column: "Categories",
                value: "storage");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 10,
                column: "Categories",
                value: "storage");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 11,
                column: "Categories",
                value: "cpucooler");

            migrationBuilder.InsertData(
                table: "Manufacturers",
                columns: new[] { "ManufacturerId", "Categories", "Name" },
                values: new object[,]
                {
                    { 12, "ram", "G.Skill" },
                    { 13, "ram,storage", "Kingston" },
                    { 14, "ram,storage", "ADATA" },
                    { 15, "ram,storage", "Crucial" },
                    { 16, "gpu,powersupply", "EVGA" },
                    { 17, "case,cpucooler,powersupply", "Thermaltake" },
                    { 18, "case,cpucooler", "NZXT" },
                    { 19, "case,powersupply", "Fractal Design" },
                    { 20, "cpucooler,powersupply,case", "Be Quiet!" },
                    { 21, "ram,storage", "TeamGroup" },
                    { 22, "storage,ram", "Samsung" },
                    { 23, "ram", "Patriot" },
                    { 24, "storage", "Inland" },
                    { 25, "motherboard", "ASRock" },
                    { 26, "motherboard", "Biostar" },
                    { 27, "case", "Lian Li" },
                    { 28, "case,cpucooler", "Phanteks" },
                    { 29, "ram,storage", "XPG" },
                    { 30, "case,powersupply", "SilverStone" },
                    { 31, "gpu", "Zotac" },
                    { 32, "gpu", "Palit" },
                    { 33, "gpu,storage", "PNY" },
                    { 34, "gpu,motherboard", "Colorful" },
                    { 35, "gpu", "XFX" },
                    { 36, "gpu", "PowerColor" },
                    { 37, "gpu", "Sapphire" },
                    { 38, "ram,storage", "Apacer" },
                    { 39, "storage,ram", "Lexar" },
                    { 40, "storage", "Toshiba" },
                    { 41, "storage", "Verbatim" },
                    { 42, "cpucooler,powersupply", "Enermax" },
                    { 43, "cpucooler,case", "DeepCool" },
                    { 44, "case,powersupply", "Rosewill" },
                    { 45, "case,powersupply", "Aerocool" },
                    { 46, "case,powersupply", "Sharkoon" },
                    { 47, "powersupply", "Chieftec" },
                    { 48, "case", "BitFenix" },
                    { 49, "case,powersupply", "SilverStone Technology" },
                    { 50, "cpucooler", "Thermalright" }
                });

            migrationBuilder.UpdateData(
                table: "RamTypes",
                keyColumn: "RamTypeId",
                keyValue: 1,
                column: "Name",
                value: "DDR");

            migrationBuilder.UpdateData(
                table: "RamTypes",
                keyColumn: "RamTypeId",
                keyValue: 2,
                column: "Name",
                value: "DDR2");

            migrationBuilder.InsertData(
                table: "RamTypes",
                columns: new[] { "RamTypeId", "Name" },
                values: new object[,]
                {
                    { 3, "DDR3" },
                    { 4, "DDR4" },
                    { 5, "DDR5" }
                });

            migrationBuilder.UpdateData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 1,
                column: "Name",
                value: "LGA1151");

            migrationBuilder.UpdateData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 2,
                column: "Name",
                value: "LGA1200");

            migrationBuilder.UpdateData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 3,
                column: "Name",
                value: "LGA1700");

            migrationBuilder.UpdateData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 4,
                column: "Name",
                value: "LGA2066");

            migrationBuilder.InsertData(
                table: "Sockets",
                columns: new[] { "SocketId", "Name" },
                values: new object[,]
                {
                    { 5, "LGA2011-v3" },
                    { 6, "AM3+" },
                    { 7, "AM4" },
                    { 8, "AM5" },
                    { 9, "sTRX4" },
                    { 10, "sWRX8" },
                    { 11, "SP3" },
                    { 12, "FM2+" },
                    { 13, "TR4" },
                    { 14, "Socket 939" }
                });

            migrationBuilder.UpdateData(
                table: "StorageTypes",
                keyColumn: "StorageTypeId",
                keyValue: 3,
                column: "Name",
                value: "M.2");

            migrationBuilder.InsertData(
                table: "StorageTypes",
                columns: new[] { "StorageTypeId", "Name" },
                values: new object[,]
                {
                    { 4, "U.2" },
                    { 5, "External HDD" },
                    { 6, "External SSD" },
                    { 7, "Hybrid (SSHD)" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "RamTypes",
                keyColumn: "RamTypeId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "RamTypes",
                keyColumn: "RamTypeId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "RamTypes",
                keyColumn: "RamTypeId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "StorageTypes",
                keyColumn: "StorageTypeId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "StorageTypes",
                keyColumn: "StorageTypeId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "StorageTypes",
                keyColumn: "StorageTypeId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "StorageTypes",
                keyColumn: "StorageTypeId",
                keyValue: 7);

            migrationBuilder.DropColumn(
                name: "Categories",
                table: "Manufacturers");

            migrationBuilder.UpdateData(
                table: "RamTypes",
                keyColumn: "RamTypeId",
                keyValue: 1,
                column: "Name",
                value: "DDR4");

            migrationBuilder.UpdateData(
                table: "RamTypes",
                keyColumn: "RamTypeId",
                keyValue: 2,
                column: "Name",
                value: "DDR5");

            migrationBuilder.UpdateData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 1,
                column: "Name",
                value: "LGA1200");

            migrationBuilder.UpdateData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 2,
                column: "Name",
                value: "LGA1700");

            migrationBuilder.UpdateData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 3,
                column: "Name",
                value: "AM4");

            migrationBuilder.UpdateData(
                table: "Sockets",
                keyColumn: "SocketId",
                keyValue: 4,
                column: "Name",
                value: "AM5");

            migrationBuilder.UpdateData(
                table: "StorageTypes",
                keyColumn: "StorageTypeId",
                keyValue: 3,
                column: "Name",
                value: "NVMe");
        }
    }
}

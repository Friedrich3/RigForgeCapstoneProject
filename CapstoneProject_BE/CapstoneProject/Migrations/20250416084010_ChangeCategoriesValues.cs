using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapstoneProject.Migrations
{
    /// <inheritdoc />
    public partial class ChangeCategoriesValues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 4,
                column: "Categories",
                value: "ram,cooler,powersupply,case");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 6,
                column: "Categories",
                value: "gpu,motherboard,cooler");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 8,
                column: "Categories",
                value: "cooler,case,powersupply");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 11,
                column: "Categories",
                value: "cooler");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 17,
                column: "Categories",
                value: "case,cooler,powersupply");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 18,
                column: "Categories",
                value: "case,cooler");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 20,
                column: "Categories",
                value: "cooler,powersupply,case");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 28,
                column: "Categories",
                value: "case,cooler");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 42,
                column: "Categories",
                value: "cooler,powersupply");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 43,
                column: "Categories",
                value: "cooler,case");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 50,
                column: "Categories",
                value: "cooler");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 4,
                column: "Categories",
                value: "ram,cpucooler,powersupply,case");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 6,
                column: "Categories",
                value: "gpu,motherboard,cpucooler");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 8,
                column: "Categories",
                value: "cpucooler,case,powersupply");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 11,
                column: "Categories",
                value: "cpucooler");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 17,
                column: "Categories",
                value: "case,cpucooler,powersupply");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 18,
                column: "Categories",
                value: "case,cpucooler");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 20,
                column: "Categories",
                value: "cpucooler,powersupply,case");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 28,
                column: "Categories",
                value: "case,cpucooler");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 42,
                column: "Categories",
                value: "cpucooler,powersupply");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 43,
                column: "Categories",
                value: "cpucooler,case");

            migrationBuilder.UpdateData(
                table: "Manufacturers",
                keyColumn: "ManufacturerId",
                keyValue: 50,
                column: "Categories",
                value: "cpucooler");
        }
    }
}

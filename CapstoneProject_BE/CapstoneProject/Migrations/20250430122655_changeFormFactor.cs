using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapstoneProject.Migrations
{
    /// <inheritdoc />
    public partial class changeFormFactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "FormFactors",
                keyColumn: "FormFactorId",
                keyValue: 1,
                column: "Name",
                value: "E-ATX");

            migrationBuilder.UpdateData(
                table: "FormFactors",
                keyColumn: "FormFactorId",
                keyValue: 2,
                column: "Name",
                value: "ATX");

            migrationBuilder.UpdateData(
                table: "FormFactors",
                keyColumn: "FormFactorId",
                keyValue: 3,
                column: "Name",
                value: "Micro-ATX");

            migrationBuilder.UpdateData(
                table: "FormFactors",
                keyColumn: "FormFactorId",
                keyValue: 4,
                column: "Name",
                value: "Mini-ITX");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "FormFactors",
                keyColumn: "FormFactorId",
                keyValue: 1,
                column: "Name",
                value: "ATX");

            migrationBuilder.UpdateData(
                table: "FormFactors",
                keyColumn: "FormFactorId",
                keyValue: 2,
                column: "Name",
                value: "Micro-ATX");

            migrationBuilder.UpdateData(
                table: "FormFactors",
                keyColumn: "FormFactorId",
                keyValue: 3,
                column: "Name",
                value: "Mini-ITX");

            migrationBuilder.UpdateData(
                table: "FormFactors",
                keyColumn: "FormFactorId",
                keyValue: 4,
                column: "Name",
                value: "E-ATX");
        }
    }
}

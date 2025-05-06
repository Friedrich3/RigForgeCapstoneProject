using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapstoneProject.Migrations
{
    /// <inheritdoc />
    public partial class ConnectedSHaredToUserBuild : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SharedBuildId",
                table: "UserBuilds",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserBuilds_SharedBuildId",
                table: "UserBuilds",
                column: "SharedBuildId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBuilds_SharedBuilds_SharedBuildId",
                table: "UserBuilds",
                column: "SharedBuildId",
                principalTable: "SharedBuilds",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBuilds_SharedBuilds_SharedBuildId",
                table: "UserBuilds");

            migrationBuilder.DropIndex(
                name: "IX_UserBuilds_SharedBuildId",
                table: "UserBuilds");

            migrationBuilder.DropColumn(
                name: "SharedBuildId",
                table: "UserBuilds");
        }
    }
}

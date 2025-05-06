using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapstoneProject.Migrations
{
    /// <inheritdoc />
    public partial class RemovedSharedBuildId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBuilds_SharedBuilds_SharedBuildId",
                table: "UserBuilds");

            migrationBuilder.DropIndex(
                name: "IX_UserBuilds_SharedBuildId",
                table: "UserBuilds");

            migrationBuilder.DropIndex(
                name: "IX_SharedBuilds_UserBuildId",
                table: "SharedBuilds");

            migrationBuilder.DropColumn(
                name: "SharedBuildId",
                table: "UserBuilds");

            migrationBuilder.CreateIndex(
                name: "IX_SharedBuilds_UserBuildId",
                table: "SharedBuilds",
                column: "UserBuildId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SharedBuilds_UserBuildId",
                table: "SharedBuilds");

            migrationBuilder.AddColumn<int>(
                name: "SharedBuildId",
                table: "UserBuilds",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserBuilds_SharedBuildId",
                table: "UserBuilds",
                column: "SharedBuildId");

            migrationBuilder.CreateIndex(
                name: "IX_SharedBuilds_UserBuildId",
                table: "SharedBuilds",
                column: "UserBuildId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBuilds_SharedBuilds_SharedBuildId",
                table: "UserBuilds",
                column: "SharedBuildId",
                principalTable: "SharedBuilds",
                principalColumn: "Id");
        }
    }
}

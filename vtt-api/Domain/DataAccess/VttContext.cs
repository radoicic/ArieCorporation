using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Vtt_Api.Domain.DataAccess;

public partial class VttContext : DbContext
{
    public VttContext(DbContextOptions<VttContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Child> Children { get; set; }

    public virtual DbSet<CountSubRegionsView> CountSubRegionsViews { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<District> Districts { get; set; }

    public virtual DbSet<Flow> Flows { get; set; }

    public virtual DbSet<FlowChild> FlowChildren { get; set; }

    public virtual DbSet<FlowRegistrationDraft> FlowRegistrationDrafts { get; set; }

    public virtual DbSet<FlowTraveler> FlowTravelers { get; set; }

    public virtual DbSet<Log> Logs { get; set; }

    public virtual DbSet<LookupCountry> LookupCountries { get; set; }

    public virtual DbSet<Module> Modules { get; set; }

    public virtual DbSet<PredictedDate> PredictedDates { get; set; }

    public virtual DbSet<Province> Provinces { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<RoleModuleAccess> RoleModuleAccesses { get; set; }

    public virtual DbSet<Sdp> Sdps { get; set; }

    public virtual DbSet<Traveler> Travelers { get; set; }

    public virtual DbSet<Unit> Units { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserModuleAccessView> UserModuleAccessViews { get; set; }

    public virtual DbSet<UserRegionAssignment> UserRegionAssignments { get; set; }

    public virtual DbSet<UserRole> UserRoles { get; set; }

    public virtual DbSet<UserSecondary> UserSecondaries { get; set; }

    public virtual DbSet<VaccinationHistory> VaccinationHistories { get; set; }

    public virtual DbSet<VaccineCardPhoto> VaccineCardPhotos { get; set; }

    public virtual DbSet<VaccineCategory> VaccineCategories { get; set; }

    public virtual DbSet<VaccineDose> VaccineDoses { get; set; }

    public virtual DbSet<VaccineManufacturer> VaccineManufacturers { get; set; }

    public virtual DbSet<Village> Villages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Child>(entity =>
        {
            entity.ToTable("Child");

            entity.Property(e => e.Address)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Dob)
                .HasColumnType("date")
                .HasColumnName("DOB");
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.MiddleName).HasMaxLength(50);
            entity.Property(e => e.PhotoDataUrl).IsUnicode(false);

            entity.HasOne(d => d.NationalityCountry).WithMany(p => p.Children)
                .HasForeignKey(d => d.NationalityCountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Child_Country");
        });

        modelBuilder.Entity<CountSubRegionsView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("CountSubRegionsView");

            entity.Property(e => e.Lat).HasColumnType("decimal(8, 6)");
            entity.Property(e => e.Long).HasColumnType("decimal(9, 7)");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SmallCode)
                .HasMaxLength(2)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.ToTable("Country");

            entity.Property(e => e.CountryName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Lat).HasColumnType("decimal(8, 6)");
            entity.Property(e => e.Long).HasColumnType("decimal(9, 7)");

            entity.HasOne(d => d.LookupCountry).WithMany(p => p.Countries)
                .HasForeignKey(d => d.LookupCountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Country_LookupCountry");
        });

        modelBuilder.Entity<District>(entity =>
        {
            entity.ToTable("District");

            entity.Property(e => e.DistrictName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Lat).HasColumnType("decimal(8, 6)");
            entity.Property(e => e.Long).HasColumnType("decimal(9, 6)");

            entity.HasOne(d => d.Province).WithMany(p => p.Districts)
                .HasForeignKey(d => d.ProvinceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_District_Province");
        });

        modelBuilder.Entity<Flow>(entity =>
        {
            entity.ToTable("Flow");

            entity.Property(e => e.DateAdded).HasColumnType("date");

            entity.HasOne(d => d.AddedByUser).WithMany(p => p.Flows)
                .HasForeignKey(d => d.AddedByUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Flow_User");

            entity.HasOne(d => d.ComingFromCountry).WithMany(p => p.FlowComingFromCountries)
                .HasForeignKey(d => d.ComingFromCountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Flow_Country_ComingFrom");

            entity.HasOne(d => d.ComingFromDistrict).WithMany(p => p.FlowComingFromDistricts)
                .HasForeignKey(d => d.ComingFromDistrictId)
                .HasConstraintName("FK_Flow_District_ComingFrom");

            entity.HasOne(d => d.ComingFromProvince).WithMany(p => p.Flows)
                .HasForeignKey(d => d.ComingFromProvinceId)
                .HasConstraintName("FK_Flow_Province_ComingFrom");

            entity.HasOne(d => d.ComingFromVillage).WithMany(p => p.FlowComingFromVillages)
                .HasForeignKey(d => d.ComingFromVillageId)
                .HasConstraintName("FK_Flow_Village_ComingFrom");

            entity.HasOne(d => d.GoingToCountry).WithMany(p => p.FlowGoingToCountries)
                .HasForeignKey(d => d.GoingToCountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Flow_Country_GoingTo");

            entity.HasOne(d => d.GoingToDistrict).WithMany(p => p.FlowGoingToDistricts)
                .HasForeignKey(d => d.GoingToDistrictId)
                .HasConstraintName("FK_Flow_District_GoingTo");

            entity.HasOne(d => d.GoingToVillage).WithMany(p => p.FlowGoingToVillages)
                .HasForeignKey(d => d.GoingToVillageId)
                .HasConstraintName("FK_Flow_Village_GoingTo");

            entity.HasOne(d => d.Sdp).WithMany(p => p.Flows)
                .HasForeignKey(d => d.SdpId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Flow_Sdp");
        });

        modelBuilder.Entity<FlowChild>(entity =>
        {
            entity.ToTable("FlowChild");

            entity.HasOne(d => d.Child).WithMany(p => p.FlowChildren)
                .HasForeignKey(d => d.ChildId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FlowChild_FlowChild");

            entity.HasOne(d => d.Flow).WithMany(p => p.FlowChildren)
                .HasForeignKey(d => d.FlowId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FlowChild_Flow");
        });

        modelBuilder.Entity<FlowRegistrationDraft>(entity =>
        {
            entity.ToTable("FlowRegistrationDraft");

            entity.Property(e => e.LastSavedAtUtc).HasColumnType("datetime");

            entity.HasOne(d => d.Sdp).WithMany(p => p.FlowRegistrationDrafts)
                .HasForeignKey(d => d.SdpId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FlowRegistrationDraft_Sdp");

            entity.HasOne(d => d.User).WithMany(p => p.FlowRegistrationDrafts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FlowRegistrationDraft_User");
        });

        modelBuilder.Entity<FlowTraveler>(entity =>
        {
            entity.ToTable("FlowTraveler");

            entity.HasOne(d => d.Flow).WithMany(p => p.FlowTravelers)
                .HasForeignKey(d => d.FlowId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FlowTraveler_Flow");

            entity.HasOne(d => d.Traveler).WithMany(p => p.FlowTravelers)
                .HasForeignKey(d => d.TravelerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FlowTraveler_Traveler");
        });

        modelBuilder.Entity<Log>(entity =>
        {
            entity.ToTable("Log");

            entity.Property(e => e.Details).IsUnicode(false);
            entity.Property(e => e.Message)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Timestamp).HasColumnType("datetime");

            entity.HasOne(d => d.LoggedInUser).WithMany(p => p.Logs)
                .HasForeignKey(d => d.LoggedInUserId)
                .HasConstraintName("FK_Log_User");
        });

        modelBuilder.Entity<LookupCountry>(entity =>
        {
            entity.ToTable("LookupCountry");

            entity.Property(e => e.Code)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SmallCode)
                .HasMaxLength(2)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Module>(entity =>
        {
            entity.ToTable("Module");

            entity.Property(e => e.ModuleName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PredictedDate>(entity =>
        {
            entity.ToTable("PredictedDate");

            entity.Property(e => e.PredictedDateName).HasMaxLength(50);
        });

        modelBuilder.Entity<Province>(entity =>
        {
            entity.ToTable("Province");

            entity.Property(e => e.Lat).HasColumnType("decimal(8, 6)");
            entity.Property(e => e.Long).HasColumnType("decimal(9, 6)");
            entity.Property(e => e.ProvinceName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Country).WithMany(p => p.Provinces)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Province_Country");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Role");

            entity.Property(e => e.RoleName)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RoleModuleAccess>(entity =>
        {
            entity.ToTable("RoleModuleAccess");

            entity.HasOne(d => d.Module).WithMany(p => p.RoleModuleAccesses)
                .HasForeignKey(d => d.ModuleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RoleModuleAccess_Module");

            entity.HasOne(d => d.Role).WithMany(p => p.RoleModuleAccesses)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RoleModuleAccess_Role");
        });

        modelBuilder.Entity<Sdp>(entity =>
        {
            entity.ToTable("Sdp");

            entity.Property(e => e.Lat).HasColumnType("decimal(9, 7)");
            entity.Property(e => e.Long).HasColumnType("decimal(10, 7)");
            entity.Property(e => e.SdpName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Village).WithMany(p => p.Sdps)
                .HasForeignKey(d => d.VillageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Sdp_Village");
        });

        modelBuilder.Entity<Traveler>(entity =>
        {
            entity.ToTable("Traveler");

            entity.Property(e => e.Address)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Dob)
                .HasColumnType("date")
                .HasColumnName("DOB");
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.MiddleName).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.NationalityCountry).WithMany(p => p.Travelers)
                .HasForeignKey(d => d.NationalityCountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Traveler_Country");
        });

        modelBuilder.Entity<Unit>(entity =>
        {
            entity.Property(e => e.UnitName).HasMaxLength(100);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.OtpHash).IsUnicode(false);
            entity.Property(e => e.PasswordHash).IsUnicode(false);
            entity.Property(e => e.PasswordResetCodeHash).IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.UserSecondary).WithMany(p => p.Users)
                .HasForeignKey(d => d.UserSecondaryId)
                .HasConstraintName("FK_User_UserSecondary");
        });

        modelBuilder.Entity<UserModuleAccessView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("UserModuleAccessView");

            entity.Property(e => e.ModuleName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.RoleName)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UserRegionAssignment>(entity =>
        {
            entity.ToTable("UserRegionAssignment");

            entity.HasOne(d => d.Country).WithMany(p => p.UserRegionAssignments)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserRegionAssignment_Country");

            entity.HasOne(d => d.District).WithMany(p => p.UserRegionAssignments)
                .HasForeignKey(d => d.DistrictId)
                .HasConstraintName("FK_UserRegionAssignment_District");

            entity.HasOne(d => d.Province).WithMany(p => p.UserRegionAssignments)
                .HasForeignKey(d => d.ProvinceId)
                .HasConstraintName("FK_UserRegionAssignment_Province");

            entity.HasOne(d => d.User).WithMany(p => p.UserRegionAssignments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserRegionAssignment_User");

            entity.HasOne(d => d.Village).WithMany(p => p.UserRegionAssignments)
                .HasForeignKey(d => d.VillageId)
                .HasConstraintName("FK_UserRegionAssignment_Village");
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.ToTable("UserRole");

            entity.HasOne(d => d.Role).WithMany(p => p.UserRoles)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserRole_Role");

            entity.HasOne(d => d.User).WithMany(p => p.UserRoles)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserRole_User");
        });

        modelBuilder.Entity<UserSecondary>(entity =>
        {
            entity.ToTable("UserSecondary");

            entity.HasOne(d => d.FlowRecordSdp).WithMany(p => p.UserSecondaries)
                .HasForeignKey(d => d.FlowRecordSdpId)
                .HasConstraintName("FK_UserSecondary_Sdp");
        });

        modelBuilder.Entity<VaccinationHistory>(entity =>
        {
            entity.ToTable("VaccinationHistory");

            entity.Property(e => e.VaccinationHistoryId).ValueGeneratedNever();
            entity.Property(e => e.VaccinationDateTime).HasColumnType("smalldatetime");

            entity.HasOne(d => d.Child).WithMany(p => p.VaccinationHistories)
                .HasForeignKey(d => d.ChildId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VaccinationHistory_Child");

            entity.HasOne(d => d.VaccineDose).WithMany(p => p.VaccinationHistories)
                .HasForeignKey(d => d.VaccineDoseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VaccinationHistory_VaccineDose");
        });

        modelBuilder.Entity<VaccineCardPhoto>(entity =>
        {
            entity.ToTable("VaccineCardPhoto");

            entity.Property(e => e.PhotoDataUrl).IsUnicode(false);
        });

        modelBuilder.Entity<VaccineCategory>(entity =>
        {
            entity.ToTable("VaccineCategory");

            entity.Property(e => e.VaccineCategoryName).HasMaxLength(50);
        });

        modelBuilder.Entity<VaccineDose>(entity =>
        {
            entity.ToTable("VaccineDose");

            entity.Property(e => e.Comments)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.VaccineDoseName).HasMaxLength(50);

            entity.HasOne(d => d.PredictedDateEnd).WithMany(p => p.VaccineDosePredictedDateEnds)
                .HasForeignKey(d => d.PredictedDateEndId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VaccineDose_PredictedEndDate");

            entity.HasOne(d => d.PredictedDateStart).WithMany(p => p.VaccineDosePredictedDateStarts)
                .HasForeignKey(d => d.PredictedDateStartId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VaccineDose_PredictedStartDate");

            entity.HasOne(d => d.VaccineCategory).WithMany(p => p.VaccineDoses)
                .HasForeignKey(d => d.VaccineCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VaccineDose_VaccineCategory");
        });

        modelBuilder.Entity<VaccineManufacturer>(entity =>
        {
            entity.ToTable("VaccineManufacturer");

            entity.Property(e => e.Dose).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Expiration).HasColumnType("smalldatetime");
            entity.Property(e => e.Lot)
                .HasMaxLength(100)
                .HasColumnName("LOT");
            entity.Property(e => e.ManufacturerName).HasMaxLength(100);
            entity.Property(e => e.RefillDose).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Visedition)
                .HasColumnType("smalldatetime")
                .HasColumnName("VISEdition");

            entity.HasOne(d => d.Unit).WithMany(p => p.VaccineManufacturers)
                .HasForeignKey(d => d.UnitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VaccineManufacturer_Units");

            entity.HasOne(d => d.VaccineCategory).WithMany(p => p.VaccineManufacturers)
                .HasForeignKey(d => d.VaccineCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VaccineManufacturer_VaccineCategory");
        });

        modelBuilder.Entity<Village>(entity =>
        {
            entity.ToTable("Village");

            entity.Property(e => e.Lat).HasColumnType("decimal(9, 7)");
            entity.Property(e => e.Long).HasColumnType("decimal(10, 7)");
            entity.Property(e => e.VillageName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.District).WithMany(p => p.Villages)
                .HasForeignKey(d => d.DistrictId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Village_District");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

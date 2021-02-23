using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {

        } 

        public DbSet<Customer> Customer { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Invoice> Invoice { get; set; }
        public DbSet<Shipment> Shipment { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<InvoiceProduct> InvoiceProduct { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //id
            modelBuilder.Entity<Customer>().HasKey(x => x.Id);
            modelBuilder.Entity<Product>().HasKey(x => x.Id);
            modelBuilder.Entity<Invoice>().HasKey(x => x.Id);
            modelBuilder.Entity<Shipment>().HasKey(x => x.Id);
            modelBuilder.Entity<Address>().HasKey(x => x.Id);
            modelBuilder.Entity<User>().HasKey(x => x.Id);
            modelBuilder.Entity<InvoiceProduct>().HasKey(x => x.Id);

            //relations
            modelBuilder.Entity<Address>().HasMany(x => x.Users).WithOne(y => y.Address);
            modelBuilder.Entity<Address>().HasMany(x => x.Customers).WithOne(y => y.Address);
            modelBuilder.Entity<Invoice>().HasMany(x => x.Shipments).WithOne(y => y.Invoice);
            modelBuilder.Entity<InvoiceProduct>()
               .HasOne(bc => bc.Invoice)
               .WithMany(b => b.InvoiceProducts)
               .HasForeignKey(bc => bc.InvoiceId);
            modelBuilder.Entity<InvoiceProduct>()
                .HasOne(bc => bc.Product)
                .WithMany(c => c.InvoiceProducts)
                .HasForeignKey(bc => bc.ProductId);
            modelBuilder.Entity<User>().HasMany(x => x.Invoices).WithOne(y => y.User);
            modelBuilder.Entity<Customer>().HasMany(x => x.Invoices).WithOne(y => y.Customer);
        }
    }
}

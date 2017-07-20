# pocs
List of Pocs done by me!

Please execute the following command after taking a clone of this repo

npm install

Also please change the database credentials in the file 

index.js

Create a database books in the schema dbo, in the MSSql database server.
Create a table books with fields booksId, title, price, pages.
Insert some book records in the above table\


Execute the following stored procedure at the database level

-- Create a new stored procedure called 'WithinPriceBooks' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'WithinPriceBooks'
)
DROP PROCEDURE dbo.WithinPriceBooks
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.WithinPriceBooks
    @book_price /*parameter name*/ int /*datatype_for_book_price*/ = 0
-- add more stored procedure parameters here
AS
    -- body of the stored procedure
    SELECT booksId, title, price, pages from dbo.books
    where price <= @book_price
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.WithinPriceBooks 700 /*value_for_book_price*/
GO

Run the following command

node server.js

Open the browser and hit the url

http://localhost:3000

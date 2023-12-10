create PROCEDURE ticketAvah
    @SeatNumbers nvarchar(MAX),
    @UserId int,
    @ShowtimeId int,
    @ReservationDate Date,
    @ReservationPrice FLOAT
AS
begin 
    declare @SeatNumber nvarchar(10);
    declare @UserBalance decimal(10, 2);


    begin transaction;

    select @UserBalance = balance from customers where customerId = @UserId;

    while LEN(@SeatNumbers) > 0
    BEGIN

        SET @SeatNumber = CAST(LEFT(@SeatNumbers, CHARINDEX(',', @SeatNumbers + ',') - 1) as int);
        if @UserBalance >= @ReservationPrice
        BEGIN

            UPDATE customers set balance = @UserBalance - @ReservationPrice where customerId = @UserId;
            set @UserBalance = @UserBalance - @ReservationPrice

            insert into tickets values 
            (@UserId, @ShowtimeId, @ReservationDate, @SeatNumber, @ReservationPrice);

            SET @SeatNumbers = STUFF(@SeatNumbers, 1, CHARINDEX(',', @SeatNumbers + ','), '');
        
        END
        ELSE
        BEGIN

            ROLLBACK;
            SELECT -1 AS ResultCode, 'Insufficient balance' AS ResultMessage;
            RETURN;
        END
    END;

    COMMIT;
    SELECT 0 AS ResultCode, 'Tickets reserved successfully' AS ResultMessage;
    RETURN;
END;


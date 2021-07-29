CREATE TABLE Covid(
    ID SERIAL PRIMARY KEY,
    class varchar(50),
    category varchar(50),
    indicator_name varchar(50),
    series_name varchar(50),
    sub_series_name varchar(50),
    parameter date,
    value integer,
    units varchar(50),
    date_last_updated date
);

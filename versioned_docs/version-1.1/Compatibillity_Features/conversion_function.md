---
sidebar_label: 'Compatible Conversion and Comparision and NULL-Related functions'
sidebar_position: 12
title: Compatible Conversion and Comparision and NULL-Related functions
---

# Conversion function

## TO_CHAR

### Purpose
TO_CHAR(str,[fmt]) convert input parameter to a value of TEXT data type according to the given format. if you omit fmt, then data will be converted to a TEXT value in the system default format. if str is null,then the function returns null.

### **Parameters**
```str```
	Input parameter (any type).  
```fmt```
	Input format pararmeter,see format attachment for details(fmt).  

### Examples
```
select to_char(interval '3 2:20:05' );
     to_char     
 -----------------
  3 days 02:20:05
 (1 row)
 
select to_char('4.00'::numeric);
  to_char 
 ---------
  4
 (1 row)
 
select to_char(NULL);
  to_char 
 ---------
  
 (1 row)
 
select to_char(123,'xx');
  to_char 
 ---------
  7b
 (1 row)
```

## TO_NUMBER

### Purpose
TO_NUMBER(str,[fmt1]) convert input parameter str to a value of NUMREIC data type according to the given format. if you omit fmt1, then data will be converted to a NUMERIC value in the system default format. if str is NUMERIC, then the function returns str.if str evaluates to null, then the function returns null. if it connot converted to NUMERIC data type, the function returns an error.

### **Parameters**
```str```
	Input parameter including the following data types(double precision, numeric, text, integer, etc.but it must be implicitly converted to the a numberic type).  
```fmt1```
	Input format pararmeter,see format attachment for details(fmt1).  

### Examples
```
select to_number('19f','xxx');
 to_number 
-----------
   415
(1 row)

select to_number(1210.73::numeric, 9999.99::numeric);
 to_number 
-----------
   1210.73
(1 row)

select to_number(NULL);
 to_number 
-----------
  
(1 row)

select to_number('123'::text);
 to_number 
-----------
   123
(1 row)
```

## HEX_TO_DECIMAL

### Purpose
HEX_TO_DECIMAL(str) convert hexadecimal to decimal, if the converted value exceeds the range of the return type bigint, the function returns an error.

### **Parameters**
```str```
	Input parameters(hexadecimal).  

## Examples
```
select hex_to_decimal('ffff'); 
 hex_to_decimal 
----------------
          65535
(1 row)

select hex_to_decimal('0x7fffffffffffffff');
   hex_to_decimal    
---------------------
 9223372036854775807
(1 row)
```

## TO_BINARY_DOUBLE

### Purpose
TO_BINARY_DOUBLE(str) convert input parameter str to a value of double-precision floating-point number. if str evaluates to null, then the function returns null. if it be connot converted to double-precision floating-point data type or exceeds the range of a double-precision floating-point number, the function returns an error.

### **Parameters**
```str```
	Input parameters(any type, but need to be implicitly converted to a double-precision floating-point number type).  

### Examples
```
select to_binary_double('1.2');
 to_binary_double 
------------------
              1.2
(1 row)

select to_binary_double('1.2'::text);
 to_binary_double 
------------------
              1.2
(1 row)

select to_binary_double(1.2::numeric);
 to_binary_double 
------------------
              1.2
(1 row)

select to_binary_double(123456789123456789.45566::numeric);
    to_binary_double    
------------------------
 1.2345678912345678e+17
(1 row)

select to_binary_double(NULL);
 to_binary_double 
------------------
                 
(1 row)
```

## TO_BINRAY_FLOAT

### Purpose
TO_BINARY_FLOAT(str) converts the input parameter str into a single-precision floating point number. if the result of str calculation is null, the function returns null. if it cannot be converted to a single-precision floating-point data type or exceeds the range of a single-precision floating-point number, the function returns an error.

### **Parameters**
```str```
	Input parameters(any type, but need to be implicitly converted to single-precision floating-point number type).  

### Examples
```
select to_binary_float(2.5555::float8);
 to_binary_float 
-----------------
          2.5555
(1 row)

select to_binary_float('123'::text);
 to_binary_float 
-----------------
             123
(1 row)

select to_binary_float(1.2::numeric);
 to_binary_float 
-----------------
             1.2
(1 row)

select to_binary_float(NULL);
 to_binary_float 
-----------------
                
(1 row)
```

## BIN_TO_NUM

### Purpose
BIN_TO_NUM(str) Convert binary numbers to decimal. if str cannot be calculated as a binary number, the function returns an error.

### **Parameter**
```str```
	Input parameters(any type, but it must be convertible or calculated as a binary number type).  

### Examples
```
select bin_to_num('1.3'::text, '1.2'::name);
 bin_to_num 
------------
          3
(1 row)

select bin_to_num(1.2::float8, 1::int4);
 bin_to_num 
------------
          3
(1 row)

select bin_to_num(NULL);
 bin_to_num 
------------
           
(1 row)

select bin_to_num(NULL, NULL, NULL);
 bin_to_num 
------------
           
(1 row)
```

## TO_MULTI_BYTE

### Purpose
TO_MULTI_BYTE(str) convert single-byte characters in the input parameter str into corresponding multi-byte characters. if str cannot be converted text type, the function returns an error.

### **Parameters**
```str```
	Input parameter(text, or can be implicitly converted to text type).  

### Examples
```
select to_multi_byte('abc'::text);
 to_multi_byte 
---------------
 ａｂｃ
(1 row)

select to_multi_byte(NULL);
 to_multi_byte 
---------------
 
(1 row)
```

## TO_SINGLE_BYTE

### Purpose
TO_SINGLE_BYTE(str) convert multi-byte characters in the input parameter str into corresponding single-byte characters. if str cannot be converted text type, the function returns an error.

### **Parameters**
```str```
	Input parameter(text, or can be implicitly converted to text type).  

### Examples
```
select to_single_byte('ａｂｃ');
 to_single_byte 
----------------
 abc
(1 row)

select to_single_byte('１．２');
 to_single_byte 
----------------
 1.2
(1 row)
```

## TO_DATE

### Purpose
TO_date(str,[fmt]) convert input parameter str to a value of date data type according to the given format. if you omit fmt, then data will be converted to a date value in the system default format. if str is null, then the function returns null. if fmt is J, for Julian, then char must be an integer. if cannot be converted to DATE, then the function returns an error.

### **Parameters**
```str```
	Input parameter(integer, text, and can be implicitly converted to the above types, a string conforming to the date).  
```fmt```
	Input format pararmeter,see format attachment for details(fmt).  

### Examples
```
select to_date('50-11-28 ','RR-MM-dd ');
       to_date       
---------------------
 1950-11-28 00:00:00
(1 row)

select to_date(2454336, 'J');
       to_date       
---------------------
 2007-08-23 00:00:00
(1 row)

select to_date('2019/11/22', 'yyyy-mm-dd');
       to_date       
---------------------
 2019-11-22 00:00:00
(1 row)

select to_date('20-11-28 10:14:22','YY-MM-dd hh24:mi:ss');
       to_date       
---------------------
 2020-11-28 10:14:22
(1 row)

select to_date('2019/11/22'); 
       to_date       
---------------------
 2019-11-22 00:00:00
(1 row)

select to_date('2019/11/27 10:14:22');
       to_date       
---------------------
 2019-11-27 10:14:22
(1 row)

select to_date('2020','RR');
       to_date       
---------------------
 2020-01-01 00:00:00
(1 row)

select to_date(NULL);
 to_date 
---------
 
(1 row)

select to_date('-4712-07-23 14:31:23', 'syyyy-mm-dd hh24:mi:ss');
       to_date        
----------------------
 -4712-07-23 14:31:23
(1 row)
```

## TO_TIMESTAMP

### Purpose
TO_TIMESTAMP(str,[fmt]) convert input parameter str to a value of timstamp without time zone data type according to the given format. if you omit fmt, then data will be converted to a timstamp without time zone value in the system default format. if str is null, then the function returns null. if cannot be converted to timstamp without time zone , then the function returns an error.

### **Parameters**
```str```
	Input parameter(double precision, text, can be implicitly converted to the above type).  
```fmt```
	Input format pararmeter,see format attachment for details(fmt).  

### Examples
```
select to_timestamp(1212121212.55::numeric);
       to_timestamp        
---------------------------
 2008-05-30 12:20:12.55
(1 row)

select to_timestamp('2020/03/03 10:13:18 +5:00', 'YYYY/MM/DD HH:MI:SS TZH:TZM');
      to_timestamp      
------------------------
 2020-03-03 13:13:18
(1 row)

select to_timestamp(NULL,NULL);
 to_timestamp 
--------------
 
(1 row)
```

##  INTERVAL_TO_SECONDS

### Purpose
INTERVAL_TO_SECONDS(str) convert the input parameter str time interval into seconds.the input parameter include: day, hour, minute, second, and microsecond.  if it is year and month, the function returns an error.

### **Parameters**
```str```
	Input parameter(interval, but it include: day, hour, minute, second, and microsecond).  

### Examples
```
select interval_to_seconds('3day 3 hours 3second ');
 interval_to_seconds 
---------------------
              270003
(1 row)

select interval_to_seconds('3day 3 hour 3.3555555555second ');
 interval_to_seconds 
---------------------
       270003.355556
(1 row)
```
## TO_YMINTERVAL

### Purpose
TO_YMINTERVAL(str) convert the input parameter str time interval to a time interval in the range of year to month. only the year and month are processed, and the other parts are omitted. if input parameter is NULL, the function return NULL, if the input parameter format is wrong, the function returns an error.

### **Parameters**
```str```
	Input parameter(text, and can be implicitly converted to text type, must be in time interval format.
	SQL interval format compatible with SQL standards,
	ISO duration format compatible with ISO 8601:2004 standard).  

### Examples
```
select to_yminterval('P1Y-2M2D');
 to_yminterval 
---------------
 10 mons
(1 row)

select to_yminterval('P1Y2M2D');
 to_yminterval 
---------------
 1 year 2 mons
(1 row)

select to_yminterval('-P1Y2M2D');
  to_yminterval   
------------------
 -1 years -2 mons
(1 row)

select to_yminterval('-P1Y2M2D');
  to_yminterval   
------------------
 -1 years -2 mons
(1 row)

select to_yminterval('-01-02');
  to_yminterval   
------------------
 -1 years -2 mons
(1 row)
```

## TO_DSINTERVAL

### Purpose
TO_DSINTERVAL(str) converts the time interval of the input parameter str into a time interval in the range of day to second. input parameters include: day, hour, minute, second and microsecond. if input parameter is NULL, the function return NULL, if the input parameter contains the year and month or the format is wrong, the function returns an error.

### **Parameters**
```str```
	Input parameter(text,and can be implicitly converted to text type,must be in time interval format.
	SQL interval format compatible with SQL standards,
	ISO duration format compatible with ISO 8601:2004 standard).  

### Examples
```
select to_dsinterval('100 00 :02 :00');
   to_dsinterval   
-------------------
 100 days 00:02:00
(1 row)

select to_dsinterval('-100 00:02:00');
    to_dsinterval    
---------------------
 -100 days -00:02:00
(1 row)

select to_dsinterval(NULL);
 to_dsinterval 
---------------
 
(1 row)

select to_dsinterval('-P100D');
 to_dsinterval 
---------------
 -100 days
(1 row)

select to_dsinterval('-P100DT20H');
    to_dsinterval    
---------------------
 -100 days -20:00:00
(1 row)

select to_dsinterval('-P100DT20S');
    to_dsinterval    
---------------------
 -100 days -00:00:20
(1 row)
```

## TO_TIMESTAMP_TZ

### Purpose
TO_TIMESTAMP_TZ(str,[fmt]) convert input parameter str to a value of timstamp with time zone data type according to the given format. if you omit fmt, then data will be converted to a timstamp with time zone value in the system default format. if str is null, then the function returns null. if cannot be converted to timstamp with time zone , then the function returns an error.

### **Parameters**
```str```
	Input parameter(text, can be implicitly converted to the text type).  
```fmt```
	Input format pararmeter,see format attachment for details(fmt).  

### Examples
```
select to_timestamp_tz('2019','yyyy');
    to_timestamp_tz     
------------------------
 2019-01-01 00:00:00+08
(1 row)

select to_timestamp_tz('2019-11','yyyy-mm');
    to_timestamp_tz     
------------------------
 2019-11-01 00:00:00+08
(1 row)

select to_timestamp_tz('2003/12/13 10:13:18 +7:00');
    to_timestamp_tz     
------------------------
 2003-12-13 11:13:18+08
(1 row)

select to_timestamp_tz('2019/12/13 10:13:18 +5:00', 'YYYY/MM/DD HH:MI:SS TZH:TZM');
    to_timestamp_tz     
------------------------
 2019-12-13 13:13:18+08
(1 row)

select to_timestamp_tz(NULL);
 to_timestamp_tz 
-----------------
 
(1 row)
```

# General Comparison Functions

## GREATEST

### Purpose
GREATEST(expr1,expr2,...) get the maximum value in the input list of one or more expressions. if any expr evaluates to NULL, the function returns NULL.

### **Parameters**
```expr1```
	Input parameter(any type).  
```expr2```
	Input parameter(any type).  
```...```

### Examples
```
select greatest('a','b','A','B');
 greatest 
----------
 b
(1 row)

select greatest(',','.','/',';','!','@','?');
 greatest 
----------
 @
(1 row)

select greatest('瀚','高','数','据','库');
 greatest 
----------
 高
(1 row)

SELECT greatest('HARRY', 'HARRIOT', 'HARRA');
 greatest 
----------
 HARRY
(1 row)

SELECT greatest('HARRY', 'HARRIOT', NULL);
 greatest 
----------
 
(1 row)

SELECT greatest(1.1, 2.22, 3.33);
 greatest 
----------
	 3.33
(1 row)

SELECT greatest('A', 6, 7, 5000, 'E', 'F','G') A;
 a 
---
 G
(1 row)
```

## LEAST

### Purpose
LEAST(expr1,expr2,...) get the minimum value in the input list of one or more expressions. if any expr evaluates to NULL, the function returns NULL.

### **Parameters**
```expr1```
	Input parameter(any type).  
```expr2```
	Input parameter(any type).  
```...```

### Examples
```
SELECT least(1,' 2', '3' );
 least 
-------
     1
(1 row)

SELECT least(NULL, NULL, NULL);
 least 
-------
 
(1 row)

SELECT least('A', 6, 7, 5000, 'E', 'F','G') A;
  a   
------
 5000
(1 row)

select least(1,3,5,10);
 least 
-------
     1
(1 row)

select least('a','A','b','B');
 least 
-------
 A
(1 row)

select least(',','.','/',';','!','@');
 least 
-------
 !
(1 row)

select least('瀚','高','据','库');
 least 
-------
 库
(1 row)

SELECT least('HARRY', 'HARRIOT', NULL);
 least 
-------
 
(1 row)
```

# NULL-Related Functions

## NANVL

### Purpose
NANVl(str1, str2) When str2 is NaN, it returns an alternative value str1 (when str2 and str1 are both NaN, NaN is returned; when str2 or str1 is null, null is returned). if the input parameter is not converted to real or float type, the function returns an error.

### **Parameters**
```str1```
	Input parameter(real, float8,can be implicitly converted to the above types).  
```str2```
	Input parameter(float8, real,can be implicitly converted to the above types).  

### Examples
```
SELECT nanvl('NaN', 'NaN');
 nanvl 
-------
   NaN
(1 row)

SELECT nanvl(12345::float4, 1), nanvl('NaN'::float4, 1);
 nanvl | nanvl 
-------+-------
 12345 |     1
(1 row)

SELECT nanvl(12345::float4, '1'::varchar), nanvl('NaN'::float4, '1'::varchar);
 nanvl | nanvl 
-------+-------
 12345 |     1
(1 row)

SELECT nanvl('12345', 'asdf');
 nanvl 
-------
 12345
(1 row)
```

### **fmt(Template Patterns for Date/Time Formatting)**
|Pattern|  Description																					 |
|:------|:-----------------------------------------------------------------------------------------------|
|HH		|hour of day (01–12)                                                                             |
|HH12	|hour of day (01–12)                                                                             |
|HH24	|hour of day (00–23)                                                                             |
|MI		|minute (00–59)                                                                                  |
|SS		|second (00–59)                                                                                  |
|MS		|millisecond (000–999)                                                                           |
|US		|microsecond (000000–999999)                                                                     |
|FF1	|	tenth of second (0–9)                                                                        |
|FF2	|	hundredth of second (00–99)                                                                  |
|FF3	|	millisecond (000–999)                                                                        |
|FF4	|	tenth of a millisecond (0000–9999)                                                           |
|FF5	|	hundredth of a millisecond (00000–99999)                                                     |
|FF6	|	microsecond (000000–999999)                                                                  |
|SSSS, SSSSS				|seconds past midnight (0–86399)                                             |
|AM, am, PM or pm			|meridiem indicator (without periods)                                        |
|A.M., a.m., P.M. or p.m.	|meridiem indicator (with periods)                                           |
|Y,YYY	|year (4 or more digits) with comma                                                              |
|YYYY	|year (4 or more digits)                                                                         |
|YYY	|last 3 digits of year                                                                           |
|YY		|last 2 digits of year                                                                           |
|Y		|last digit of year                                                                              |
|IYYY	|ISO 8601 week-numbering year (4 or more digits)                                                 |
|IYY	|last 3 digits of ISO 8601 week-numbering year                                                   |
|IY		|last 2 digits of ISO 8601 week-numbering year                                                   |
|I		|last digit of ISO 8601 week-numbering year                                                      |
|BC, bc, AD or ad			|era indicator (without periods)                                             |
|B.C., b.c., A.D. or a.d.	|era indicator (with periods)                                                |
|MONTH	|full upper case month name (blank-padded to 9 chars)                                            |
|Month	|full capitalized month name (blank-padded to 9 chars)                                           |
|month	|full lower case month name (blank-padded to 9 chars)                                            |
|MON	|abbreviated upper case month name (3 chars in English, localized lengths vary)                  |
|Mon	|abbreviated capitalized month name (3 chars in English, localized lengths vary)                 |
|mon	|abbreviated lower case month name (3 chars in English, localized lengths vary)                  |
|MM		|month number (01–12)                                                                            |
|DAY	|full upper case day name (blank-padded to 9 chars)                                              |
|Day	|full capitalized day name (blank-padded to 9 chars)                                             |
|day	|full lower case day name (blank-padded to 9 chars)                                              |
|DY		|abbreviated upper case day name (3 chars in English, localized lengths vary)                    |
|Dy		|abbreviated capitalized day name (3 chars in English, localized lengths vary)                   |
|dy		|abbreviated lower case day name (3 chars in English, localized lengths vary)                    |
|DDD	|day of year (001–366)                                                                           |
|IDDD	|day of ISO 8601 week-numbering year (001–371; day 1 of the year is Monday of the first ISO week)|
|DD		|day of month (01–31)                                                                            |
|D		|day of the week, Sunday (1) to Saturday (7)                                                     |
|ID		|ISO 8601 day of the week, Monday (1) to Sunday (7)                                              |
|W		|week of month (1–5) (the first week starts on the first day of the month)                       |
|WW		|week number of year (1–53) (the first week starts on the first day of the year)                 |
|IW		|week number of ISO 8601 week-numbering year (01–53; the first Thursday of the year is in week 1)|
|CC		|century (2 digits) (the twenty-first century starts on 2001-01-01)                              |
|J		|Julian Date (integer days since November 24, 4714 BC at local midnight; see Section B.7)        |
|Q		|quarter                                                                                         |
|RM		|month in upper case Roman numerals (I–XII; I=January)                                           |
|rm		|month in lower case Roman numerals (i–xii; i=January)                                           |
|TZ		|upper case time-zone abbreviation (only supported in to_char)                                   |
|tz		|lower case time-zone abbreviation (only supported in to_char)                                   |
|TZH	|time-zone hours                                                                                 |
|TZM	|time-zone minutes                                                                               |
|OF		|time-zone offset from UTC (only supported in to_char)                                           |

### **fmt1(Template Patterns for Numeric Formatting)**
|Pattern	|Description                                                |
|:----------|:----------------------------------------------------------|
|9			|digit position (can be dropped if insignificant)           |
|0			|digit position (will not be dropped, even if insignificant)|
|. (period)	|decimal point                                              |
|, (comma)	|group (thousands) separator                                |
|PR			|negative value in angle brackets                           |
|S			|sign anchored to number (uses locale)                      |
|L			|currency symbol (uses locale)                              |
|D			|decimal point (uses locale)                                |
|G			|group separator (uses locale)                              |
|MI			|minus sign in specified position (if number < 0)           |
|PL			|plus sign in specified position (if number > 0)            |
|SG			|plus/minus sign in specified position                      |
|RN			|Roman numeral (input between 1 and 3999)                   |
|TH or th	|ordinal number suffix                                      |
|V			|shift specified number of digits (see notes)               |
|EEEE		|exponent for scientific notation                           |

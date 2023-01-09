---
sidebar_label: 'Compatible with date and time function'
sidebar_position: 11
title: Compatible with date and time function
Tags:
 - date function
 - time function
---

# Compatible with date and time function Overview

## 1. from_tz

### 1.1 Purpose

    Convert the given timestamp without time zone to the timestamp with time zone in the specified time zone, if the specified time zone is NULL, return NULL.

### 1.2 Parameter Description

|    Parameter                         |  Description                                         |
|------------------------------------- | ---------------------------------------------------- |
| day                                  | Timestamp without time zone to be converted          |
| tz                                   | Specified time zone                                  |

### 1.3 Examples

```SQL
select oracle.from_tz('2021-11-08 09:12:39','Asia/Shanghai') from dual;
              from_tz
-----------------------------------
 2021-11-08 09:12:39 Asia/Shanghai
(1 row)

select oracle.from_tz('2021-11-08 09:12:39','SAST') from dual;
         from_tz          
--------------------------
 2021-11-08 09:12:39 SAST

select oracle.from_tz(NULL,'SAST') from dual;
 from_tz 
---------
 
(1 row)

select oracle.from_tz('2021-11-08 09:12:31',NULL) from dual;
 from_tz 
---------
 
(1 row)

```

## 2 numtodsinterval

### 2.1 Purpose

    The time to convert the given number to the specified string, the string can be'day','hour','minute','second'.

### 2.2 Parameter Description

|    Parameter or Type                 |  Description                                                      |
|------------------------------------- | ----------------------------------------------------------------- |
|value                                 | Number to be converted                                            |
|fmt                                   | Target time or date type, include 'day', 'hour', 'minute' 'second'|

### 2.3 Examples

```SQL
select oracle.numtodsinterval(2147483646.1232131232,'day') from dual;
                 numtodsinterval                  
--------------------------------------------------
 @ 2147483646 days 2 hours 57 mins 25.607758 secs
(1 row)

select oracle.numtodsinterval(2147483647.1232131232,'hour') from dual;
             numtodsinterval              
------------------------------------------
 @ 2147483647 hours 7 mins 23.567104 secs
(1 row)

select oracle.numtodsinterval(7730941132799.1232131232,'second') from dual;
              numtodsinterval              
-------------------------------------------
 @ 2147483647 hours 59 mins 59.123456 secs
(1 row)

select oracle.numtodsinterval(NULL,'second') from dual;
 numtodsinterval 
-----------------
 
(1 row)

select oracle.numtodsinterval(7730941132800.1232131232,NULL) from dual;
 numtodsinterval 
-----------------
 
(1 row)

```

## 3. numtoyminterval

### 3.1 Purpose

    Convert the given number to a date in the specified format,  the string can be'year','month'.

### 3.2 Parameter Description

|    Parameter or Type                 |  Description                                         |
|------------------------------------- | ---------------------------------------------------- |
|value                                 | Number to be converted                               |
|fmt                                   | Target time or date type ('year' or 'month'）        |

### 3.3 Examples

```SQL
select oracle.numtoyminterval(178956970.1232131232,'year') from dual;
                       numtoyminterval                       
-------------------------------------------------------------
 @ 178956970 years 1 mon 14 days 8 hours 33 mins 40.608 secs
(1 row)

select oracle.numtoyminterval(2147483646.1232131232,'month') from dual;
                        numtoyminterval                        
---------------------------------------------------------------
 @ 178956970 years 6 mons 3 days 16 hours 42 mins 48.2688 secs
(1 row)

select oracle.numtoyminterval(NULL,'month') from dual;
 numtoyminterval 
-----------------
 
(1 row)

select oracle.numtoyminterval(2147483647.1232131232,NULL) from dual;
 numtoyminterval 
-----------------
 
(1 row)

```

## 4. systimestamp

### 4.1 Purpose

    Get the timestamp of the current system.

### 4.2 Examples

```SQL
select oracle.systimestamp();
         systimestamp
-------------------------------
 2021-12-02 14:38:59.879642+08
(1 row)

select systimestamp;
      statement_timestamp
-------------------------------
 2021-12-02 14:39:33.262828+08

 ```

## 5. sys_extract_utc

### 5.1 Purpose

    Convert the given timestamp with time zone to UTC timestamp without time zone.

### 5.2 Parameter Description

|    Parameter or Type                 |  Description                                         |
|------------------------------------- | ---------------------------------------------------- |
| day                                  | Timestamp with time zone need to be converted        |

### 5.3 Examples

```SQL
select oracle.sys_extract_utc('2018-03-28 11:30:00.00 +09:00'::timestamptz) from dual;
   sys_extract_utc   
---------------------
 2018-03-28 02:30:00
(1 row)

select oracle.sys_extract_utc(NULL) from dual;
 sys_extract_utc 
-----------------
 
(1 row)

```

## 6. sessiontimezone

### 6.1 Purpose

    sessiontimezone returns the time zone of the current session.

### 6.2 Examples

```SQL
select oracle.sessiontimezone() from dual;
 sessiontimezone 
-----------------
 PRC
(1 row)

set timezone to UTC;

 select oracle.sessiontimezone();
 sessiontimezone
-----------------
 UTC
(1 row)

```

## 7. dbtimezone

### 7.1 Purpose

    dbtimezone returns the value of the database time zone.

### 7.2 Examples

```SQL
select oracle.dbtimezone();
 dbtimezone
------------
 PRC
(1 row)

```

## 8. days_between

### 8.1 Purpose

    Calculate the number of days between two timestamps.

### 8.2 Parameter Description

|    Parameter or Type                 |  Description                                         |
|------------------------------------- | ---------------------------------------------------- |
| day1                                 | first timestamp or oracle.date                       |
| day2                                 | second timestamp  or oracle.date                     |

### 8.3 Examples

```SQL

select oracle.days_between('2021-11-25 15:33:16'::timestamp,'2019-01-01 00:00:00'::timestamp) from dual;
   days_between   
------------------
 1059.64810185185
(1 row)

select oracle.days_between('2019-09-08 09:09:09'::timestamp,'2019-01-01 00:00:00'::timestamp) from dual;
   days_between   
------------------
 250.381354166667
(1 row)

select oracle.days_between('2021-11-25 09:09:09'::oracle.date,'2019-01-01 00:00:00'::oracle.date) from dual;
   days_between
------------------
 1059.38135416667
(1 row)

select oracle.days_between(NULL,NULL) from dual;
 days_between 
--------------

(1 row)

```

## 9. days_between_tmtz

### 9.1 Purpose

    Calculate the number of days between two timestamps with time zones.

### 9.2 Parameter Description

|    Parameter or Type                 |  Description                                         |
|------------------------------------- | ---------------------------------------------------- |
| tz1                                  | first timestamptz                                    |
| tz2                                  | second timestamptz                                   |

### 9.3 Examples

```SQL
select oracle.days_between_tmtz('2019-09-08 09:09:09+08'::timestamptz,'2019-05-08 12:34:09+08'::timestamptz) from dual;
 days_between_tmtz 
-------------------
  122.857638888889
(1 row)

select oracle.days_between_tmtz('2019-09-08 09:09:09+08'::timestamptz,'2019-05-08 12:34:09+09'::timestamptz) from dual;
 days_between_tmtz 
-------------------
  122.899305555556
(1 row)

select oracle.days_between_tmtz(NULL,NULL) from dual;
 days_between_tmtz 
-------------------
                  
(1 row)

```

## 10. add_days_to_timestamp

### 10.1 Purpose

    Add the number of days to the timestamp, the number of days can be a floating point number.

### 10.2 Parameter Description

|    Parameter or Type                 |  Description                                         |
|------------------------------------- | ---------------------------------------------------- |
| tz                                   | Need to change the timestamp                         |
| days                                 | Added days                                           |

### 10.3 Examples

```SQL
select oracle.add_days_to_timestamp('1009-09-15 09:00:00'::timestamp, '3267.123'::numeric) from dual;
 add_days_to_timestamp 
-----------------------
 1018-08-26 11:57:07.2
(1 row)

select oracle.add_days_to_timestamp(NULL, '3267.123'::numeric) from dual;
 add_days_to_timestamp 
-----------------------
 
(1 row)

```

## 11. subtract

### 11.1 Purpose

    The subtraction of the timestamp represents the number of days between the two timestamps. Or the timestamp minus a number to indicate the timestamp of the result, this number is the number of days, and the timestamp can be with or without time zone.

### 11.2 Parameter Description

|    Parameter or Type                            |  Description                                               |
|------------------------------------------------ | ---------------------------------------------------------- |
| days                                            | Need to change the timestamptz, timestamp or oracle.date   |
| value                                           | Subtracted timestamp or oracle.date or days                |

### 11.3 Examples

```SQL
select oracle.subtract('2019-11-25 16:51:20'::timestamptz,'3267.123'::numeric) from dual;
         subtract         
--------------------------
 2010-12-15 13:54:12.8+08
(1 row)

select oracle.subtract('2019-11-25 16:51:20'::timestamptz, '2018-11-25 16:51:12'::timestamp) from dual;
  subtract  
------------
 365.000093
(1 row)

select oracle.subtract('2019-11-25 16:51:20'::oracle.date,'3267.123'::numeric) from dual;
       subtract
-----------------------
 2010-12-15 13:54:12.8
(1 row)

 select oracle.subtract('2019-11-25 16:51:20'::oracle.date,'2017-02-21 13:51:20'::oracle.date) from dual;
 subtract
----------
 1007.125
(1 row)

```

## 12. next_day

### 12.1 Purpose

    next_day returns the date of the first weekday named by text that is later than the  date date. The return type is always DATE, regardless of the data type of date. The return value has the same hours, minutes, and seconds component as the argument date.

### 12.2 Parameter Description

|    Parameter or Type            |  Description                                                       |
|-------------------------------- | -------------------------------------------------------------------|
| value                           | This is the time, it can be timestamp, timestamptz and oracle.date |
| weekday                         | The day of the week, it can be "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" or 0,1,2,3,4,5,6,0 for Sunday                            |

### 12.3 Examples

```SQL

select oracle.next_day(to_timestamp('2020-02-29 14:40:50', 'YYYY-MM-DD HH24:MI:SS'), 'Tuesday') from dual;
      next_day       
---------------------
 2020-03-03 14:40:50
(1 row)

select oracle.next_day('2020-07-01 19:43:51 +8'::timestamptz, 1) from dual;
      next_day
---------------------
 2020-07-05 19:43:51
(1 row)

select oracle.next_day(oracle.date '2020-09-15 12:13:29', 6) from dual;
      next_day
---------------------
 2020-09-18 12:13:29
(1 row)

```

## 13. last_day

### 13.1 Purpose

    last_day returns the date of the last day of the month that contains date. 

### 13.2 Parameter Description

|    Parameter or Type            |  Description                                                       |
|-------------------------------- | ----------------------------------------------------               |
| value                           | This is a date, it can be timestamp, timestamptz and oracle.date   |

### 13.3 Examples

```SQL
select oracle.last_day(timestamp '2020-05-17 13:27:19') from dual;
      last_day       
---------------------
 2020-05-31 13:27:19
(1 row)

select oracle.last_day('2020-11-29 19:20:40 +08'::timestamptz) from dual;
      last_day       
---------------------
 2020-11-30 19:20:40
(1 row)

select oracle.last_day('-0004-2-1 13:27:19'::oracle.date) from dual;
       last_day       
----------------------
 -0004-02-29 13:27:19
(1 row)

```

## 14. add_months

### 14.1 Purpose

    add_months returns the date date plus integer months. The date argument can be a datetime value or any value that can be implicitly converted to DATE. The integer argument can be an integer or any value that can be implicitly converted to an integer. 

### 14.2 Parameter Description

|    Parameter or Type            |  Description                                                       |
|-------------------------------- | -------------------------------------------------------------------|
| day                             | This is the time, it can be timestamp, timestamptz and oracle.date |
| value                           | this is a integer,  representing the number of months increased    |

### 14.3 Examples

```SQL
select oracle.add_months(oracle.date '2020-02-15',7) from dual;
     add_months      
---------------------
 2020-09-15 00:00:00
(1 row)

select oracle.add_months(timestamp '2018-12-15 19:12:09',12) from dual;
     add_months      
---------------------
 2019-12-15 19:12:09
(1 row)

select oracle.add_months(timestamptz'2018-12-15 12:12:09 +08',120) from dual;
     add_months      
---------------------
 2028-12-15 12:12:09
(1 row)

```

## 15. months_between

### 15.1 Purpose

    months_between returns value of months between first date and second date.  If first date is later than second date, then the result is positive. If first date is earlier than second date, then the result is negative.

### 15.2 Parameter Description

|    Parameter or Type            |  Description                                                       |
|-------------------------------- | -------------------------------------------------------------------|
| day1                            | first date, it can be timestamp, timestamptz and oracle.date       |
| day2                            | second date,  it can be timestamp, timestamptz and oracle.date     |

### 15.3 Examples

```SQL
select oracle.months_between(oracle.date '2021-11-10 12:11:10', oracle.date '2020-05-20 19:40:21') from dual;
  months_between
------------------
 17.6673570041816
(1 row)

select oracle.months_between(timestamp '2022-05-15 20:20:20', timestamp '2020-01-20 19:20:20') from dual;
  months_between  
------------------
 27.8400537634409
(1 row)

select oracle.months_between(timestamptz '2020-01-10 01:00:00 +08', timestamptz '2028-05-19 16:25:20 +08') from dual;
  months_between   
-------------------
 -100.311051373955
(1 row)

```

## 16. sysdate

### 16.1 Purpose

    sysdate returns the operating system time of the database server.

### 16.2 Examples

```SQL
select sysdate;
  statement_sysdate
---------------------
 2021-12-09 16:20:34
(1 row)

select oracle.sysdate();
       sysdate
---------------------
 2021-12-09 16:21:39
(1 row)

```

## 17. new_time

### 17.1 Purpose

    Convert the time in the first time zone to the time in the second time zone. time zone include "ast", "adt", "bst", "bdt", "cst", "cdt", "est", "edt", "gmt", "hst", "hdt", "mst", "mdt", "nst", "pst", "pdt", "yst", "ydt".

### 17.2 Parameter Description

|    Parameter or Type            |  Description                                                       |
|-------------------------------- | -------------------------------------------------------------------|
| day                             | This is the date, it can be timestamp, timestamptz and oracle.date |
| tz1                             | first time zone                                                    |
| tz2                             | second time zone                                                   |

### 17.2 Examples

```SQL
select oracle.new_time(timestamp '2020-12-12 17:45:18', 'AST', 'ADT') from dual;
      new_time       
---------------------
 2020-12-12 18:45:18
(1 row)

select oracle.new_time(timestamp '2020-12-12 17:45:18', 'BST', 'BDT') from dual;
      new_time       
---------------------
 2020-12-12 18:45:18
(1 row)

select oracle.new_time(timestamp '2020-12-12 17:45:18', 'CST', 'CDT') from dual;
      new_time       
---------------------
 2020-12-12 18:45:18
(1 row)

```

## 18. trunc

### 18.1 Purpose

    The trunc function returns the date, truncated to the specified format, fmt include "Y", "YY", "YYY", "YYYY","YEAR", "SYYYY", "SYEAR", "I", "IY", "IYY", "IYYY", "Q", "WW", "Iw", "W", "DAY", "DY", "D", "MONTH", "MONn", "MM", "RM", "CC", "SCC", "DDD", "DD", "J", "HH", "HH12", "HH24", "MI".

### 18.2 Parameter Description

|    Parameter or Type            |  Description                                                       |
|-------------------------------- | -------------------------------------------------------------------|
| value                           | This is the date, it can be timestamp, timestamptz and oracle.date |
| fmt                             | The specified format, if omitted, the default is "DDD"             |

### 18.2 Examples

```SQL
select oracle.trunc(cast('2050-12-12 12:12:13' as oracle.date), 'SCC');
        trunc        
---------------------
 2001-01-01 00:00:00
(1 row)

select oracle.trunc(timestamp '2020-07-28 19:16:12', 'Q');
        trunc        
---------------------
 2020-07-01 00:00:00
(1 row)

select oracle.trunc(timestamptz '2020-09-27 18:30:21 + 08', 'MONTH');
         trunc          
------------------------
 2020-09-01 00:00:00+08
(1 row)

```

## 19. round

### 19.1 Purpose

    The round function returns the date, rounded to the specified format, fmt include "Y", "YY", "YYY", "YYYY","YEAR", "SYYYY", "SYEAR", "I", "IY", "IYY", "IYYY", "Q", "WW", "Iw", "W", "DAY", "DY", "D", "MONTH", "MONn", "MM", "RM", "CC", "SCC", "DDD", "DD", "J", "HH", "HH12", "HH24", "MI".

### 19.2 Parameter Description

|    Parameter or Type            |  Description                                                       |
|-------------------------------- | -------------------------------------------------------------------|
| value                           | This is the date, it can be timestamp, timestamptz and oracle.date |
| fmt                             | The specified format, if omitted, the default is "DDD"  

### 19.2 Examples

```SQL
select oracle.round(cast('2051-12-12 19:00:00' as oracle.date), 'SCC');
        round        
---------------------
 2101-01-01 00:00:00
(1 row)

select oracle.round(timestamp '2050-06-12 16:40:55', 'IYYY');
        round        
---------------------
 2050-01-03 00:00:00
(1 row)

select oracle.round(timestamptz '2020-02-16 19:16:12 + 08', 'Q');
         round          
------------------------
 2020-04-01 00:00:00+08
(1 row)

```

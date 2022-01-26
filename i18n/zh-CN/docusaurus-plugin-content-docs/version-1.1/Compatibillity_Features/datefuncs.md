---
sidebar_label: '兼容时间和日期函数'
sidebar_position: 11
title: 兼容时间和日期函数
Tags:
 - 兼容时间和日期函数
 - date function
 - time function
---

# 兼容时间和日期函数

## 1. from_tz

### 1.1 目的

    将给定的不带时区的时间戳转换为指定的带时区的时间戳，如果指定时区或者时间戳为NULL，则返回NULL。

### 1.2 参数描述

|              参数                        |     描述                                    |
|-----------------------------------------|---------------------------------------------|
| day                                     | 不带时区的时间戳                              |
| tz                                      |  指定的时区                                  |

### 1.3 例子

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

### 2.1 目的

    将给定数字转换为指定格式的时间，格式参数有：'day','hour','minute','second'。

### 2.2 参数描述

|    参数                               |  描述                                                             |
|------------------------------------- | ----------------------------------------------------------------- |
|value                                 | 要转化的数字                                                       |
|fmt                                   | 目标日期和时间类型, 包括 'day', 'hour', 'minute' 'second'           |

### 2.3 例子

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

### 3.1 目的

    将给定数字转换为指定格式的日期， 格式参数有：'year','month'。

### 3.2 参数描述

|    参数                              |  描述                                                 |
|------------------------------------- | ---------------------------------------------------- |
|value                                 | 要转化的数字                                          |
|fmt                                   | 目标日期 ('year' or 'month'）                         |

### 3.3 例子

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

### 4.1 目的

    获取当前数据库系统的时间戳。

### 4.2 例子

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

### 5.1 目的

    将给定的带时区的时间戳转换为不带时区的UTC时间。

### 5.2 参数描述

|    参数                              |  描述                                                |
|------------------------------------- | ----------------------------------------------------|
| day                                  | 需要转换带时区的时间戳                                |

### 5.3 例子

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

### 6.1 目的

    获取当前会话的时区。

### 6.2 例子

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

### 7.1 目的

    获取数据库服务器的时区。

### 7.2 例子

```SQL
select oracle.dbtimezone();
 dbtimezone
------------
 PRC
(1 row)

```

## 8. days_between

### 8.1 目的

    获取两个时间的天数差。

### 8.2 参数描述

|    参数                              |  描述                                                 |
|------------------------------------- | ---------------------------------------------------- |
| day1                                 | 第一个时间戳                                          |
| day2                                 | 第二个时间戳                                          |

### 8.3 例子

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

### 9.1 目的

    获取两个带有时区的时间戳之间相差的天数，如果时间戳为NULL，则返回NULL。

### 9.2 参数描述

|    参数                              |  描述                                                |
|------------------------------------- | ---------------------------------------------------- |
| tz1                                  | 第一个时间戳                                          |
| tz2                                  | 第一个时间戳                                          |

### 9.3 例子

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

### 10.1 目的

    给一个时间戳增加需要的天数，增加的天数可以为浮点型。

### 10.2 参数描述

|    参数                               |  描述                                                |
|------------------------------------- | ---------------------------------------------------- |
| tz                                   | 需要被改变的时间戳                                     |
| days                                 | 增加的天数                                            |

### 10.3 例子

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

### 11.1 目的

    时间戳的减法表示两个时间戳相减的天数，或者时间戳减去一个数字，结果为时间戳，这个数字就是天数，时间戳可以带时区也可以不带时区。

### 11.2 参数描述

|    参数                                         |  描述                                                       |
|------------------------------------------------ | ---------------------------------------------------------- |
| days                                            | 需要被改变的时间戳                                           |
| value                                           | 时间戳或者一个代表天数的数字                                  |

### 11.3 例子

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

### 12.1 目的

    next_day 返回由格式名相同的第一个工作日的日期，该日期晚于当前日期。 无论日期的数据类型如何，返回类型始终为 DATE。 返回值具有与参数日期相同的小时、分钟和秒部分。

### 12.2 参数描述

|    参数                         |  描述                                                               |
|-------------------------------- | -------------------------------------------------------------------|
| value                           | 开始时间戳                                                          |
| weekday                         | 星期几，可以是 "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" 或者 0,1,2,3,4,5,6,0代表星期天                            |

### 12.3 例子

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

### 13.1 目的

    last_day返回档期日期所在月份的最后一天。 

### 13.2 参数描述

|    参数                          |  描述                                                              |
|-------------------------------- | ----------------------------------------------------               |
| value                           | 指定的时间戳                                                        |

### 13.3 例子

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

### 14.1 目的

    add_months 返回日期加上整数月份。 date 参数可以是日期时间值或任何可以隐式转换为 DATE 的值。 整数参数可以是整数或任何可以隐式转换为整数的值。 

### 14.2 参数描述

|    参数                         |  描述                                                               |
|-------------------------------- | -------------------------------------------------------------------|
| day                             | oracle.date类型，需要被改变的时间戳                                  |
| value                           | 一个整形数据，需要增加的月数                                          |

### 14.3 例子

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

### 15.1 目的

    months_between 返回第一个日期和第二个日期之间的月份值, 如果第一个日期晚于第二个日期，则结果为正, 如果第一个日期早于第二个日期，则结果为负数。

### 15.2 参数描述

|    参数                         |  描述                                                              |
|-------------------------------- | -------------------------------------------------------------------|
| day1                            | 第一个时间戳                                                        |
| day2                            | 第二个时间戳                                                        |

### 15.3 例子

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

### 16.1 目的

    sysdate 返回数据库服务器的操作系统时间。

### 16.2 例子

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

### 17.1 目的

    转换第一个时区的时间到第二个时区的时间. 时区包括了 "ast", "adt", "bst", "bdt", "cst", "cdt", "est", "edt", "gmt", "hst", "hdt", "mst", "mdt", "nst", "pst", "pdt", "yst", "ydt".

### 17.2 参数描述

|    参数                         |  描述                                                               |
|-------------------------------- | -------------------------------------------------------------------|
| day                             | 需要被转换的时间戳                                                   |
| tz1                             | 时间戳的时区                                                         |
| tz2                             | 目标时区                                                            |

### 17.2 例子

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

### 18.1 目的

    trunc函数返回一个日期, 按照指定格式被截断, fmt包括 "Y", "YY", "YYY", "YYYY","YEAR", "SYYYY", "SYEAR", "I", "IY", "IYY", "IYYY", "Q", "WW", "Iw", "W", "DAY", "DY", "D", "MONTH", "MONn", "MM", "RM", "CC", "SCC", "DDD", "DD", "J", "HH", "HH12", "HH24", "MI".

### 18.2 参数描述

|    参数                         |  描述                                                               |
|-------------------------------- | -------------------------------------------------------------------|
| value                           | 指定的日期（oracle.date, timestamp, timestamptz）                   |
| fmt                             | 指定的格式, 如果被省略, 默认为 "DDD"                                  |

### 18.2 例子

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

### 19.1 目的

    round函数返回一个日期,按照指定的格式四舍五入, fmt 包括了 "Y", "YY", "YYY", "YYYY","YEAR", "SYYYY", "SYEAR", "I", "IY", "IYY", "IYYY", "Q", "WW", "Iw", "W", "DAY", "DY", "D", "MONTH", "MONn", "MM", "RM", "CC", "SCC", "DDD", "DD", "J", "HH", "HH12", "HH24", "MI".

### 19.2 参数描述

|    参数                         |  描述                                                               |
|-------------------------------- | -------------------------------------------------------------------|
| value                           | 被转换的日期（oracle.date, timestamp, timestamptz）                  |
| fmt                             | 指定的格式, 如果被省略, 默认为 "DDD"  

### 19.2 例子

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

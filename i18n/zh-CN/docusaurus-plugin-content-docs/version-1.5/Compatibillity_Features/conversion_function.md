---
sidebar_label: 兼容转换和比较以及与 NULL 相关的函数
sidebar_position: 12
---

# 转换函数

## TO_CHAR

### 目的
TO_CHAR（str,[fmt]） 根据给定的格式将输入参数转换为 TEXT 数据类型的值。 如果省略 fmt，则数据将转换为系统默认格式的 TEXT 值。 如果 str 为 null，则该函数返回 null。

### **参数**
```str```
	输入参数 （任意类型）。  
```fmt```
	输入格式参数,详见格式fmt。  

### 示例
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

### 目的
TO_NUMBER(str,[fmt1]) 根据给定的格式将输入参数 str 转换为 NUMREIC 数据类型的值。 如果省略 fmt1，则数据将转换为系统默认格式的 NUMERIC 值。 如果 str 是 NUMERIC，则该函数返回 str。如果 str 计算结果为 null，则该函数返回 null。 如果它不能转换为 NUMERIC 数据类型，则该函数返回错误。

### **参数**
```str```
	输入参数包括以下数据类型（double precision，numeric，text，integer等，但必须隐式转换为numeric）。  
```fmt1```
	输入格式参数，详见格式fmt1。  

### 示例
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

### 目的
HEX_TO_DECIMAL(str) 十六进制转十进制，如果转换的值超出返回类型bigint的范围，函数返回错误。

### **参数**
```str```
	输入参数（十六进制）。  

## 示例
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

### 目的
TO_BINARY_DOUBLE(str) 将输入参数 str 转换为双精度浮点数的值。 如果 str 的计算结果为 null，则该函数返回 null。 如果不能转换为双精度浮点数据类型或超出双精度浮点数的范围，则函数返回错误。

### **参数**
```str```
	输入参数（任意类型，但需要隐式转换为双精度浮点数类型）。  

### 示例
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

### 目的
TO_BINARY_FLOAT(str) 将输入参数 str 转换为单精度浮点数。 如果str计算结果为null，则函数返回null。 如果无法转换为单精度浮点数据类型或超出单精度浮点数的范围，则函数返回错误。

### **参数**
```str```
	输入参数（任意类型，但需要隐式转换为单精度浮点数类型）。  

### 示例
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

### 目的
BIN_TO_NUM(str) 将二进制数转换为十进制数。 如果 str 不能计算为二进制数，则函数返回错误。

### **参数**
```str```
	输入参数（任意类型，但必须可转换或计算为二进制数类型）。  

### 示例
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

### 目的
TO_MULTI_BYTE(str) 将输入参数 str 中的单字节字符转换为相应的多字节字符。 如果 str 无法转换为文本类型，则函数返回错误。

### **参数**
```str```
	输入参数（text，或可隐式转换为文本类型）。  

### 示例
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

### 目的
TO_SINGLE_BYTE(str) 将输入参数 str 中的多字节字符转换为相应的单字节字符。 如果 str 无法转换为文本类型，则函数返回错误。

### **参数** 
```str```
	输入参数（text，或可隐式转换为文本类型）。  

### 示例
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

### 目的
TO_DATE(str,[fmt]) 根据给定的格式将输入参数 str 转换为日期数据类型的值。 如果省略 fmt，则数据将转换为系统默认格式的日期值。 如果 str 为 null，则该函数返回 null。 如果 fmt 是 J，对于 Julian，则 char 必须是整数。 如果无法转换为 DATE，则该函数返回错误。

### **参数**
```str```
	输入参数（integer，text，可以隐式转换为上述类型，符合日期格式的字符串）。  
```fmt```
	输入格式参数，详见格式fmt。  

### 示例
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

### 目的
TO_TIMESTAMP(str,[fmt]) 根据给定的格式将输入参数 str 转换为不带时区的时间戳。 如果省略 fmt，则数据将转换为系统默认格式中不带时区值的时间戳。 如果 str 为 null，则该函数返回 null。 如果无法转换为不带时区的时间戳，则该函数返回错误。

### **参数**
```str```
	输入参数（double precision,text，可以隐式转换为上述类型）。  
```fmt```
	输入格式参数，详见格式fmt。  

### 示例
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

### 目的
INTERVAL_TO_SECONDS(str) 将输入参数str时间间隔转换为秒。输入参数包括：日、时、分、秒和微秒。 如果是年和月，则函数返回错误。

### **参数**
```str```
	输入参数（interval，但包括：日、时、分、秒、微秒）。  

### 示例
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

### 目的
TO_YMINTERVAL(str) 将输入参数 str 时间间隔转换为年到月范围内的时间间隔。 只处理年月，其他部分省略。 如果输入参数为NULL，函数返回NULL，如果输入参数格式错误，函数返回错误。

### **参数**
```str```
	输入参数（text，可以隐式转换为文本类型，必须是时间间隔格式。
	兼容 SQL 标准的 SQL 间隔格式，
	ISO 持续时间格式与 ISO 8601:2004 标准兼容）。  

### 示例
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

### 目的
TO_DSINTERVAL(str) 将输入参数 str 的时间间隔转换为天到秒范围内的时间间隔。 输入参数包括：日、时、分、秒和微秒。 如果输入参数为NULL，函数返回NULL，如果输入参数包含年月或格式错误，函数返回错误。

### **参数**
```str```
	输入参数（text，可以隐式转换为文本类型，必须是时间间隔格式。
	兼容 SQL 标准的 SQL 间隔格式，
	ISO 持续时间格式与 ISO 8601:2004 标准兼容）。  

### 示例
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

### 目的
TO_TIMESTAMP_TZ(str,[fmt]) 根据给定的格式将输入参数 str 转换为带时区的时间戳。 如果省略 fmt，则数据将转换为具有系统默认格式带时区值的时间戳。 如果 str 为 null，则该函数返回 null。 如果无法转换为带时区的时间戳，则该函数返回错误。

### **参数**
```str```
	输入参数（text，可以隐式转换为文本类型）。  
```fmt```
	输入格式参数，详见格式fmt。  

### 示例
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

# 比较函数

## GREATEST

### 目的
GREATEST(expr1,expr2,...) 获取一个或多个表达式的输入列表中的最大值。 如果任何 expr 的计算结果为 NULL，则该函数返回 NULL。

### **参数**
```expr1```
	输入参数（任意类型）。  
```expr2```
	输入参数（任意类型）。  
```...```

### 示例
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

### 目的
LEAST(expr1,expr2,...) 获取一个或多个表达式的输入列表中的最小值。 如果任何 expr 的计算结果为 NULL，则该函数返回 NULL。

### **参数**
```expr1```
	输入参数（任意类型）。  
```expr2```
	输入参数（任意类型）。  
```...```

### 示例
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

# 与 NULL 相关的函数

## NANVL

### 目的
NANVl(str1, str2) 当str2为NaN时，返回一个替代值str1（当str2和str1都为NaN时，返回NaN；当str2或str1为null时，返回null）。 如果输入参数不能转换为real或float8类型，则函数返回错误。

### **参数**
```str1```
	输入参数（real，float8，可以隐式转换为上述类型）。  
```str2```
	输入参数（float8，real，可以隐式转换为上述类型）。  

### 示例
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

### **fmt（日期/时间格式的模板模式）**
|模式    |描述                                                                     |
|:------|:-------------------------------------------------------------------------|
|HH	    |一天中的小时 （01-12）                                                    |
|HH12   |一天中的小时 （01-12）                                                    |
|HH24   |一天中的小时 （00-23）                                                    |
|MI		|分钟 （00-59）minute (00-59)                                              |
|SS		|秒（00-59）                                                               |
|MS		|毫秒（000-999）                                                           |
|US		|微秒（000000-999999）                                                     |
|SSSS	|午夜后的秒（0-86399）                                                     |
|AM, am, PM or pm		|	正午指示器（不带句号）                                 |
|A.M., a.m., P.M. or p.m.|	正午指示器（带句号）                                   |
|Y,YYY	|带逗号的年（4 位或者更多位）                                              |
|YYYY	|年（4 位或者更多位）                                                      |
|YYY	|年的后三位                                                                |
|YY		|年的后两位                                                                |
|Y		|年的最后一位                                                              |
|IYYY	|ISO 8601 周编号方式的年（4 位或更多位）                                   |
|IYY	|ISO 8601 周编号方式的年的最后 3 位                                        |
|IY		|ISO 8601 周编号方式的年的最后 2 位                                        |
|I		|ISO 8601 周编号方式的年的最后一位                                          |
|BC, bc, AD或者ad		|	纪元指示器（不带句号）                                 |
|B.C., b.c., A.D.或者a.d.|	纪元指示器（带句号）                                   |
|MONTH|全大写形式的月名（空格补齐到 9 字符）                                       |
|Month|全首字母大写形式的月名（空格补齐到 9 字符）                                 |
|month|全小写形式的月名（空格补齐到 9 字符）                                       |
|MON	|简写的大写形式的月名（英文 3 字符，本地化长度可变）                       |
|Mon	|简写的首字母大写形式的月名（英文 3 字符，本地化长度可变）                 |
|mon	|简写的小写形式的月名（英文 3 字符，本地化长度可变）                       |
|MM		|月编号（01-12）                                                           |
|DAY	|全大写形式的日名（空格补齐到 9 字符）                                     |
|Day	|全首字母大写形式的日名（空格补齐到 9 字符）                               |
|day	|全小写形式的日名（空格补齐到 9 字符）                                     |
|DY		|简写的大写形式的日名（英语 3 字符，本地化长度可变）                       |
|Dy		|简写的首字母大写形式的日名（英语 3 字符，本地化长度可变）                 |
|dy		|简写的小写形式的日名（英语 3 字符，本地化长度可变）                       |
|DDD	|一年中的日（001-366）                                                     |
|IDDD	|ISO 8601 周编号方式的年中的日（001-371，年的第 1 日时第一个 ISO 周的周一）|
|DD		|月中的日（01-31）                                                         |
|D		|周中的日，周日（1）到周六（7）                                            |
|ID		|周中的 ISO 8601 日，周一（1）到周日（7）                                  |
|W		|月中的周（1-5）（第一周从该月的第一天开始）                               |
|WW		|年中的周数（1-53）（第一周从该年的第一天开始）                            |
|IW		|ISO 8601 周编号方式的年中的周数（01 - 53；新的一年的第一个周四在第一周）  |
|CC		|世纪（2 位数）（21 世纪开始于 2001-01-01）                                |
|J		|儒略日（从午夜 UTC 的公元前 4714 年 11 月 24 日开始的整数日数）           |
|Q		|季度（to_date和to_timestamp会忽略）                                       |
|RM		|大写形式的罗马计数法的月（I-XII；I 是 一月）                              |
|rm		|小写形式的罗马计数法的月（i-xii；i 是 一月）                              |
|TZ		|大写形式的时区名称                                                        |
|tz		|小写形式的时区名称                                                        |
|OF		|时区偏移量                                                                |
### **fmt1（数字格式的模板模式）**
|模式		|描述                             |
|:----------|:--------------------------------|
|9			|带有指定位数的值                 |
|0			|带前导零的值                     |
|. (period)	|小数点                           |
|, (comma)	|分组（千）分隔符                 |
|PR			|尖括号内的负值                   |
|S			|带符号的数字（使用区域）         |
|L			|货币符号（使用区域）             |
|D			|小数点（使用区域）               |
|G			|分组分隔符（使用区域）           |
|MI			|在指定位置的负号（如果数字 < 0） |
|PL			|在指定位置的正号（如果数字 > 0） |
|SG			|在指定位置的正/负号              |
|RN			|罗马数字（输入在 1 和 3999 之间）|
|TH or th	|序数后缀                         |
|V			|移动指定位数（参阅注解）         |
|EEEE		|科学记数的指数                   |

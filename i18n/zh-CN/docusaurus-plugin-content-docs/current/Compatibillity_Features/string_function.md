---
sidebar_label: '字符串函数'
sidebar_position: 19
title: 兼容字符串函数
---

# 字符串函数

## 概述
支持oracle字符串函数，所有函数被创建再oracle模式下，调用这些函数时，应该把oracle模式加入SEARCH_PATH或显示的使用oracle模式。

## ASCII

### 目的
ASCII(str)返回字符串首个字符在数据库字符集中的编码的十进制形式。

### **参数**
```str```
	输入参数包括以下数据类型(varchar2，int，numeric，float，date，timestamp，interval)，可以隐式转换为上述类型。  

### 示例
```SQL
SELECT ascii(201912::int4) "ascii";
 ascii 
-------
    50
(1 row)
```

## VSIZE

### 目的
VSIZE(str)返回入参字符串的内部表示的字节数。

### **参数**
```str```
	输入参数包括任意数据类型。  

### 示例
```SQL
SELECT vsize('I 8O lIKE AlPH: a b c') "vsize";
 vsize 
-------
    21
(1 row)
```

## INSTRB

### 目的
INSTRB(str, [substr], [start], [nth])返回源字符串str中子串substr的字节位置。

### **参数**
```str```
	输入参数包括以下数据类型(int，numeric，float，char，text，date，timestamp，interval)，可以隐式转换为上述类型。  
```substr```
	输入参数，匹配字符串。  
```start```
	开始位置。  
```nth```
	出现第nth次。  

### 示例
```SQL
SELECT instrb(20121209,12) "instrb";
 instrb 
--------
      3
(1 row)

SELECT instrb(20121209,12, 1) "instrb";
 instrb 
--------
      3
(1 row)
```

## SUBSTR

### 目的
SUBSTR(str, start, [len])返回str从start位置开始的子串。

### **参数**
```str```
	输入参数包括以下数据类型(text, numeric, float, date, timestamp, interval)，可以隐式转换为上述类型。  
```start```
	子串开始位置。  
```len```
	子串长度。  

### 示例
```SQL
SELECT substr(21212, 2) "substr";
 substr 
--------
 1212
(1 row)

SELECT substr('201912', '2', '2') "substr";
 substr 
--------
 01
(1 row)
```

## SUBSTRB

### 目的
SUBSTRB(str, start, [len])返回str从start位置开始的子串，如果获取的字节数小于字符字节数，我们将不填充空格。

### **参数**
```str```
	输入参数包括以下数据类型(text, char, numeric, float, date, timestamp, interval)，可以隐式转换为上述类型。  
```start```
	子串开始位置。  
```len```
	子串长度。  

### 示例
```SQL
SELECT substrb('201912', '2', '4') "substrb";
 substrb 
---------
 0191
(1 row)
```

## STRPOSB

### 目的
STRPOSB(str, substr)返回子串substr在str中第一次出现的位置。

### **参数**
```str```
	输入参数包括以下数据类型(text, char, numeric, float, date, timestamp, interval)，可以隐式转换为上述类型。  
```substr```
	输入参数，匹配字符串。  

### 示例
```SQL
SELECT strposb(123456, 345) "pos in str";
 pos in str 
------------
          3
(1 row)
```

## LPAD

### 目的
LPAD(str, len, [lpad_str])从左边对str用lpad_str进行填充，使最终的长度为len。

### **参数**
```str```
	输入参数包括以下数据类型(char, text, numeric, float, date, timestamp, interval)，可以隐式转换为上述类型。  
```len```
	字符串长度。  
```lpad_str```
	填充字符串  

### 示列
```SQL
SELECT lpad('123', '20');
         lpad         
----------------------
                  123
(1 row)

SELECT lpad(123, 20, 0);
         lpad         
----------------------
 00000000000000000123
(1 row)
```

## RPAD

### 目的
RPAD(str, len, [rpad_str])从右边对str用rpad_str进行填充，使最终的长度为len。

### **参数**
```str```
	输入参数包括以下数据类型(text, numeric, float, date, timestamp, interval)，可以隐式转换为上述类型。  
```len```
	字符串长度。  
```rpad_str```
	填充字符串  

### Examples
```SQL
SELECT rpad('123', '20');
         rpad         
----------------------
 123                 
(1 row)

SELECT rpad(123, 20, 0);
         rpad         
----------------------
 12300000000000000000
(1 row)
```

## RTRIM

### 目的
RTRIM(str, [set])支持输入参数str从右边第一个字符开始，删除输入参数集中的字符，直到第一个不匹配的字符结束，返回剩余的字符。如果省略 set，则默认为单个空格。

### **参数**
```str```
	输入参数包括任意数据类型。  
```set```
	输入参数,匹配字符串。  

### 示列
```SQL
SELECT rtrim(1231232112, 21) "RTRIM Example";
 RTRIM Example 
---------------
 123123
(1 row)

SELECT rtrim('<=====>BROWNING<=====>', '<>=') "RTRIM Example";
  RTRIM Example  
-----------------
 <=====>BROWNING
(1 row)
```

## LTRIM

### 目的
LTRIM(str, [set])支持输入参数str从左边第一个字符开始，删除输入参数集中的字符，直到第一个不匹配的字符结束，返回剩余的字符。如果省略 set，则默认为单个空格。

### **参数**
```str```
	输入参数包括任意数据类型。  
```set```
	输入参数,匹配字符串。  

### 示例
```SQL
SELECT ltrim(121232112, 21) "LTRIM Example";
 LTRIM Example 
---------------
 32112
(1 row)

SELECT ltrim(121232112) "LTRIM Example";
 LTRIM Example 
---------------
 121232112
(1 row)

SELECT ltrim('<=====>BROWNING<=====>'::char(25), '<>='::char(3)) "LTRIM Example";
   LTRIM Example    
--------------------
 BROWNING<=====>   
(1 row)

SELECT ltrim(null,null);
 ltrim 
-------
 
(1 row)
```

## BTRIM

### 目的
LTRIM(str, [set])支持从输入参数str的两边删除输入匹配参数集中的字符（一一删除），直到第一个不匹配的值结束，函数返回剩余的字符。 如果省略 set，则将默认设置为单个空格。

### **参数**
```str```
	 输入参数包括任意数据类型。  
```set```
	输入参数，匹配字符串。  

### 示例
```SQL
SELECT btrim(121232112, 21) "BTRIM Example";
 BTRIM Example 
---------------
 3
(1 row)

SELECT btrim(121232112) "BTRIM Example";
 BTRIM Example 
---------------
 121232112
(1 row)

SELECT btrim('<=====>BROWNING<=====>'::char(25), '<>='::char(3)) "BTRIM Example";
   BTRIM Example    
--------------------
 BROWNING<=====>   
(1 row)

SELECT btrim(null,null);
 btrim 
-------
 
(1 row)
```

## LENGTH

### 目的
LENGTH(str, [src_encoding_name])计算输入参数str的字符长度，也将计算开头和结尾的空格。

### **参数**
```str```
	输入参数包括以下数据类型(integer, float, numeric, date, text, character, timestamp, timestamptz, interval)，或可隐式转换为上述类型。  
```src_encoding_name```
	输入参数，获取指定的编码。  

### 示例
```SQL
SELECT length(192);
 length 
--------
      3
(1 row)

SELECT length('Highgo DB!'::char(20));
 length 
--------
     20
(1 row)

SELECT length(null);
 length 
--------
       
(1 row)
```
	
## LENGTHB

### 目的
LENGTHB(str)计算输入参数str的字节长度，开头和结尾的空格也会计算在内。

### **参数**
```str```
	输入参数包含以下类型(integer, float, numeric, date, text, character, timestamp, timestamptz, interval)，可以隐式转换为以上类型。  

### 示例
```SQL
SELECT lengthb(192);
 lengthb 
---------
       3
(1 row)

SELECT lengthb('Highgo DB!'::nvarchar2(20));
 lengthb 
---------
      10
(1 row)

SELECT lengthb(null);
 lengthb 
---------
        
(1 row)
```

## BITAND

### 目的
BITAND(str1, str2)输入参数str1和str2是按位与，如果有任何参数为NULL，函数返回NULL，如果输入参数不能转换为bigint类型或超出范围，函数返回错误。

### **参数**
```str1```
	输入参数(numeric, integer等，必须可转换为 bigint 类型)。  
```str2```
	输入参数(numeric, integer等，必须可转换为 bigint 类型)。  
### 示例
```SQL
SELECT bitand(6, 3);
 bitand 
--------
      2
(1 row)

SELECT bitand(6.1, 4.1);
 bitand 
--------
      4
(1 row)

SELECT bitand(NULL, NULL);
 bitand 
--------
       
(1 row)

SELECT bitand(NULL, '4.1');
 bitand 
--------
       
(1 row)
```

## LISTAGG

### 目的
LISTAGG(str1, [str2])支持将多行记录聚合为一条记录。str2可以省略，如果输入参数类型无法转换为文本类型，则函数返回错误。

### **参数**
```str1```
	输入参数(text)，可以转换为文本类型。  
```str2```
	输入参数(text)，可以转换为文本类型，连接字符或字符串。  
	
### 示例
```SQL
SELECT listagg(i::text) from generate_series(1, 3) g(i);
 listagg 
---------
 123
(1 row)

SELECT listagg(i::text) from generate_series(1, 3) g(i) ;
 listagg 
---------
 123
(1 row)

SELECT listagg(i::text) from generate_series(1, 3) g(i) group by i;
 listagg 
---------
 1
 2
 3
(3 rows)

SELECT listagg(i::text) OVER (PARTITION BY i) from generate_series(1, 3) g(i);
 listagg 
---------
 1
 2
 3
(3 rows)
```

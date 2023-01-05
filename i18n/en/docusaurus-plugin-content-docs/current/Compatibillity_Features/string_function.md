---
sidebar_label: 'String Functions'
sidebar_position: 19
title: Compatible String Functions
---

# String function

## Overview
Oracle compatible string functions that help you manipulate character strings more effectively.
To use these functions you have to set the ```compatible_mode TO oracle```

## ASCII

### Purpose
ASCII(str) returns the decimal form of the encoding of the first character of the string in the database character set.

### **Parameters**
```str```
	Input parameter including the following data types(varchar2, int, numeric, float, date, timestamp, interval), can be implicitly converted to the above types.  

### Examples
```SQL
SELECT ascii(201912::int4) "ascii";
 ascii 
-------
    50
(1 row)
```

## VSIZE

### Purpose
VSIZE(str) returns the number of bytes in the internal of the input parameter string.

### **Parameters**
```str```
	Input parameter including any data types.  

### Examples
```SQL
SELECT vsize('I 8O lIKE AlPH: a b c') "vsize";
 vsize 
-------
    21
(1 row)
```

## INSTRB

### Purpose
INSTRB(str, [substr], [start], [nth]) returns the byte position of the substring in the source string.

### **Parameters**
```str```
	Input parameter including the following data types(int, numeric, float, char, text, date, timestamp, interval), can be implicitly converted to the above types.  
```substr```
	Input parameter, matched substring.  
```start```
	Start position.  
```nth```
	Nth position.  

### Examples
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

### Purpose
SUBSTR(str, start, [len]) returns the substring from start position in the source string.

### **Parameters**
```str```
	Input parameter including the following data types(text, numeric, float, date, timestamp, interval), can be implicitly converted to the above types.  
```start```
	Start position of substring.  
```len```
	Length of substring.  

### Examples
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

### Purpose
SUBSTRB(str, start, [len]) returns the substring from start position in the source string, if the number of bytes obtained is less than the number of character bytes, we will not to fill space.

### **Parameters**
```str```
	Input parameter including the following data types(text, char, numeric, float, date, timestamp, interval), can be implicitly converted to the above types.  
```start```
	Start position of substring.  
```len```
	Length of substring.  

### Examples
```SQL
SELECT substrb('201912', '2', '4') "substrb";
 substrb 
---------
 0191
(1 row)
```

## STRPOSB

### Purpose
STRPOSB(str, substr) returns the position of the first occurrence of substring in the source string.

### **Parameters**
```str```
	Input parameter including the following data types(text, char, numeric, float, date, timestamp, interval), can be implicitly converted to the above types.  
```substr```
	Input parameter, matched substring.  

### Examples
```SQL
SELECT strposb(123456, 345) "pos in str";
 pos in str 
------------
          3
(1 row)
```

## LPAD

### Purpose
LPAD(str, len, [lpad_str]) fill the string with lpad_str from the left to make the final length is len.

### **Parameters**
```str```
	Input parameter including the following data types(char, text, numeric, float, date, timestamp, interval), can be implicitly converted to the above types.  
```len```
	String length.  
```lpad_str```
	Fill string.  

### Examples
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

### Purpose
RPAD(str, len, [rpad_str]) fill the string with rpad_str from the right to make the final length is len.

### **Parameters**
```str```
	Input parameter including the following data types(text, numeric, float, date, timestamp, interval), can be implicitly converted to the above types.  
```len```
	String length.  
```rpad_str```
	Fill string.  

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

### Purpose
RTRIM(str, [set]) support the input parameter str starting from the first character from the right, delete the characters in the input parameter set, until the end of the first unmatched character, and return the remaining characters. if set is omitted, it defaults to a single space. 

### **Parameters**
```str```
	Input parameter including any data types.  
```set```
	Input parameter,match string.  

### Examples
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

### Purpose
LTRIM(str, [set]) support the input parameter str starting from the first character from the left, delete the characters in the input parameter set, until the end of the first unmatched character, and return the remaining characters. if set is omitted, it defaults to a single space. 

### **Parameters**
```str```
	Input parameter including any data types.  
```set```
	Input parameter,match string.  

### Examples
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

### Purpose
LTRIM(str, [set]) support deleting the characters in the input matching parameter set from both sides of the input parameter str (delete one by one), until the end of the first unmatched value, the function returns the remaining characters. if set is omitted, set defaults to a single space.

### **Parameters**
```str```
	Input parameter including any data types.  
```set```
	Input parameter,match string.  

### Examples
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

### Purpose
LENGTH(str, [src_encoding_name]) calculate the character length of the input parameter str, and the spaces at the beginning and end will be counted.

### **Parameters**
```str```
	Input parameter including the following data types(integer, float, numeric, date, text, character, timestamp, timestamptz, interval), can be implicitly converted to the above types.  
```src_encoding_name```
	Input parameter,get the specified encoding.  

### Examples
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

### Purpose
LENGTHB(str) calculate the byte length of the input parameter str, and the spaces at the beginning and end will also be counted.

### **Parameters**
```str```
	Input parameter including the following data types(integer, float, numeric, date, text, character, timestamp, timestamptz, interval), can be implicitly converted to the above type.  

### Examples
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

### Purpose
BITAND(str1, str2) the input parameters str1 and str2 are bitwise AND, if any parameter is NULL, the function returns NULL, if the input parameters cannot be converted to bigint type or out of the range, the function returns an error.

### **Parameters**
```str1```
	Input parameter(numeric, integer, etc) must be convertible to bigint type.  
```str2```
	Input parameter(numeric, integer, etc) must be convertible to bigint type.  

### Examples
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

### Purpose
LISTAGG(str1, [str2])supports aggregating multiple rows of records into one record. str2 can be omitted, if the input parameter type cannot be converted to text type, the function returns an error.

### **Parameters**
```str1```
	Input parameter(text) can be convertible to text type.  
```str2```
	Input parameter(text) can be convertible to text type, concatenating characters or strings.  
	
### Examples
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

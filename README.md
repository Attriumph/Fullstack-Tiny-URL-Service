<p align=""left>
<img src="https://img.shields.io/badge/License-MIT-orange.svg">
<img src="https://img.shields.io/badge/release--date-11%2F2017-green.svg">	
</p>

# Fullstack-Tiny-URL-Service
## Design steps：SNAKE principle —— crack a design in 5 steps
### 1. Scenario： use case/interface
* shortURL insert（longURL）   
* longURL lookup（shortURL）re-direct

### 2. Necessary: constraint /hypothesis 

 We assume daily active user： 1,000,000
  - (1) average estimate
    - for Insert： 
      - per day: 1,000,000*1%（function usage）*10(function frequencey) = 100,000 
      - RPS : 100,000/86400 = 1.2

    - for Lookup：
      - per day： 1,000,000*100%(function usage)*3(function frequency)= 3,000,000
      - RPS : 3000000/86400=35  

  - (2) peek estimate:

     - Assume peak traffic = 5* Average daily traffic
     - insert peek : 1.2 *5 = 6
     - lookup peek： 35 *5 = 175

     Therefore, we can deal with it by a single machine

### 3. Aplication: service/algorithm
1. In oder to design efficiently, we use map at the begin(ShortToLongMap， LongToShortMap)

```javascript
    map<longURL, shortURL> LongToShortMap;
    map<shortURL, longURL> ShortToLongMap;
    
    shortURL insert(longURL){
       if LongToShortMap not containsKey longURL:
           generate shortURL;
           put<longURL, shortURL> into LongToShortMap;
           put<shortURL, longURL> into ShortToLongMap;
           return LongToShortMap(longURL);
           }
       
       longURL lookup(shortURL){
       return ShortToLongMap.get(shortURL);
       }
```
2. how to generate shortURL？

The simplest way: return map.size()，but the size will increase too big, so we need add letters.
Therefore, we need to convert decimal into 62 hex. Here is the code:
 ```javascript   
    shortURL generateShortURL(){
           return convertTo62(ShortToLong.size());
    }
    
    shortURL convertTo62(mapSize){
        char encode[62] = {'a',...'z','A',...'Z','0',...'9'};
        shortURL = "";
        while(mapSize != 0){
            shortURL = encode[mapSize % 62] + shortURL;
            mapSize /= 62;
        }
      return shortURL;
    }
 ```
3. introduce a table to replace two maps                                                                                       

### 4. Kilobit: data 

According to experience, we can assume:

* Average size of long url = 100 byte

* Average size of short url = 4 bytes(int)

* Daily new URL = 104 * 100,000 = 104,000,000 byte = 104mb

* Year new URL = 104mb * 365 = 37960mb < 40GB

  Therefore, singe Machine can handle!

### 5. Evolve：update and modify

* How to support random? 
  - random(0,range)
* How to avoid conflicting?
  - try again
* How to implement time-limited service?
  - expire/state
* How to cache? 
  - pre-load  + replacement

## Summary：

  <img src="https://github.com/Attriumph/Fullstack-Tiny-URL-Service/blob/master/images/summary.png" alt="summary" width="800" style="display:inline" />


# Fullstack-Tiny-URL-Service

## (一)Design steps：SNAKE principle —— crack a design in 5 steps
### 1.scenario： use case/interface

>
· shortURL insert（longURL）  
· longURL lookup（shortURL）re-direct

### 2.Necessary: constraint /hypothesis 
    daily active user： 1,000,000
    (1)average estimate
    for Insert：
      per day： 1,000,000*1%（function usage）*10（fuction frequencey）= 100,000
      RPS ： 100,000/86400 = 1.2
    for Lookup：
      per day： 1,000,000*100%(function usage)*3(function frequency)= 3,000,000
      RPS : 3000000/86400=35  
     (2) peek estimate:
     Assume peak traffic = 5* Average daily traffic
     insert peek : 1.2 *5 = 6
     lookup peek： 35 *5 = 175
     Therefore, we can deal with it by a single machine

### 3.Aplication: service/algorithm
 
 *in oder to design efficiently, we use map at the begin（shortToLong， LongToShort）
 
  how to generate shortURL？-----generateShortURL();
  the simplest way---return map.size()，but the size will to big, so we need add letters
                                                                                         
                                                                                 
### 4.kilobit: data 

### 5.evolve：update and modify

  how to support random? random(0,range)
  how to avoid conflicting? try again
  how to implement time-limited service? expire/state
  how to cache? pre-load  + replacement


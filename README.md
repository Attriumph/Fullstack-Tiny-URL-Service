# Fullstack-Tiny-URL-Service

## (一)Design steps：SNAKE principle —— crack a design in 5 steps
> 1.scenario： use case/interface
>> shortURL insert（longURL）  
longURL lookup（shortURL）re-direct

> 2.Necessary: constraint /hypothesis 
>> daily active user： 1000000
>>> insert：
    
    per day： 10000*1%（function usage）*10（fuction frequencey）= 100000
    per day：10000*365 =
    per second ： 100000/86400=1.2
>>> Lookup：
     
     per day： 1000000*100%(function usage)*3(function frequency)= 3000000
     per second: 3000000/86400=35  
     
    
> 3.Aplication: service/algorithm
 
 *in oder to design efficiently, we use map at the begin（shortToLong， LongToShort）
 
  how to generate shortURL？-----generateShortURL();
  the simplest way---return map.size()，but the size will to big, so we need add letters
                                                                                         
                                                                                 
> 4.kilobit: data 

> 5.evolve：update and modify

  how to support random? random(0,range)
  how to avoid conflicting? try again
  how to implement time-limited service? expire/state
  how to cache? pre-load  + replacement


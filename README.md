# Fullstack-Tiny-URL-Service

## (一)系统设计思路：SNAKE 原则 —— crack a design in 5 steps
> 1.scenario： use case/interface
>> shortURL insert（longURL）  
longURL lookup（shortURL）重定向

> 2.Necessary: constraint /hypothesis 
>> daily active user： 1000000
>>> insert：
    
    per day： 10000*1%（function usage）*10（fuction frequencey）= 100000
    per day：10000*365 =
    per second ： 100000/86400=1.2(如果较大，需要继续算峰值什么的)
>>> Lookup：
     
     per day： 1000000*100%(function usage)*3(function frequency)= 3000000
     per second: 3000000/86400=35  (单机就可解决)
     都是输入
    
> 3.Aplication: service/algorithm
 
 *初期思路：存---map（两张，shortToLong， LongToShort）
 
  如何生成shortURL呢？-----generateShortURL（）;
  最简单---return map.size（），但是会原来越大,所以引入字母
                                                                                         
                                                                                 
> 4.kilobit: data 基于前面可以考虑到多大的数据数量级

> 5.evolve：升级，修改

how to support random? random(0,range)
how to avoid conflicting? try again
how to implement time-limited service? expire/state
how to cache? pre-load :把硬盘的数据全部读入内存，提高速度 + replacement

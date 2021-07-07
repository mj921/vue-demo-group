## 正 魔
## 1大 4小 4预备
## 资质 1-100
## xp 
``` javascript
Math.pow(10, Math.floor(lv / 10)) * (50 + 36 * (lv % 10 - 1)) + 168 * Math.pow(10, Math.floor(lv / 10))
```
## age
``` javascript
(Math.pow(10, Math.floor(lv / 10)) * (50 + 36 * (lv % 10 - 1)) + 168 * Math.pow(10, Math.floor(lv / 10)) / 2)
```


<!-- if (lv % 10 === 0) {
        a*=2
        item = a;
    } else {
        a += (lv%10) * item;
    }
    return a; -->
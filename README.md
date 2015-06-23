# xian-pub-bicycle

[![Circle CI](https://circleci.com/gh/JustinFeng/xian-pub-bicycle.svg?style=shield)](https://circleci.com/gh/JustinFeng/xian-pub-bicycle)

Xi'an Public Bicycle Data API

## API doc

API is serving at http://xian-pub-bicycle.herokuapp.com/api?query=QUERY_JSON, it supports 
3 ways to query public bicycle station information

### Search by keyword

Search with keyword, api will return station whose sitename or location contains the keyword.

**REQUEST:**

GET http://xian-pub-bicycle.herokuapp.com/api?query={"term":ANY_STRING}

**RESPONSE:**

```
[
    {
        emptynum: "24",
        latitude: "34.195246999999995",
        location: "锦业路与丈八三路十字向西100米路北",
        locknum: "30",
        longitude: "108.872969",
        siteid: "5535",
        sitename: "绿地世纪城西"
    }
    ...
]
```

### Search by location

Search with latitude, longitude and/or distance(meters), if distance is not provided, it will be set to 1000m
as default.

**REQUEST:**

GET http://xian-pub-bicycle.herokuapp.com/api?query={"lat":DECIMAL_FLOAT,"lng":DECIMAL_FLOAT,"distance":DECIMAL_FLOAT}

**RESPONSE:**

response is similar as Search by keyword, but with extra "distance" attribute.

```
[
    {
        emptynum: "24",
        latitude: "34.195246999999995",
        location: "锦业路与丈八三路十字向西100米路北",
        locknum: "30",
        longitude: "108.872969",
        siteid: "5535",
        sitename: "绿地世纪城西",
        distance: 318.8549314789219
    }
    ...
]
```

### Search by ids

Search with siteid, which can be found in previous response, accepts multiple ids in an array.

**REQUEST:**

GET http://xian-pub-bicycle.herokuapp.com/api?query={"ids":[ID_LIST]}

**RESPONSE:**

response is the same as Search by keyword

## Demo Site

Try [demo](http://xian-pub-bicycle.herokuapp.com) 
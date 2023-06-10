# Backend individuell examination

### Login to generate token:
Two users are available - BeratAdmin & Berat. 

For admin user you must include role: admin in req.body
```
{
  "username": "BeratAdmin",
  "password": "12345678",
  "role": "admin"
}
```

For regular user you exclude role in req.body
```
{
  "username": "Berat",
  "password": "12345678",
}
```

_____________________________

### Add menu item
```
{
  "title": "YourNewProduct",
  "desc": "Description",
  "price": 1337
}
```

### Add Deal
```
{
  "products": [
    {
      "id": "9XQAPoarvCkRUhz2"
    },
    {
      "id": "Env7zeTHBxyW7W1z"
    }
  ],
  "price": 55
}
```

### Update menu item :
```
// ID required + any of the props 'title', 'desc', 'price' are editable
{
  "id": "pUnAP4GlkDVuXfwZ",
  "title": "EditedTitle",
  "desc": "EditedDesc",
  "price": 100
}

// Or single properties
{
  "id": "pUnAP4GlkDVuXfwZ",
  "price": 500
}
```

### Delete menu item :
```
{"id": "pUnAP4GlkDVuXfwZ"}
```



## Created by:
### Berat Ukiqi

# Backend individuell examination

### Login to generate token for admin user :
Two users are available - BeratAdmin & Berat. 

Password for both users is: 12345678

```
{
  "username": "BeratAdmin",
  "password": "12345678"
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

### Update menu item :
```
// Any of the props 'title', 'desc', 'price' are editable
{
  "title": "EditedTitle",
  "desc": "EditedDesc"
  "price": 100,
}

// Or single properties
{"price": 500}
```

### Delete menu item :
```
{"id": "pUnAP4GlkDVuXfwZ"}
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

## Created by:
### Berat Ukiqi

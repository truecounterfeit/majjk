let url =
  "https://api.bigcommerce.com/stores/q2dar3yy52/v3/inventory/locations";
let options = {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    "X-Auth-Token": "b6lh1ab3dz7eegnqyj0ityjs0blj5jf",
  },
  body: `[
    {
        "code":"BIGC-1",
        "label":"Central store",
        "description":"Central shop of the world",
        "managed_by_external_source":false,
        "type_id":"PHYSICAL","enabled":true,
        "operating_hours":
            { 
            "sunday": 
                { 
                    "open": false,
                    "opening":"08:00",
                    "closing":"16:00"},
            "monday": 
                {
                    "open":false,"opening":"08:00",
                    "closing":"16:00"},
            "tuesday":
                {
                    "open":false,
                    "opening":"08:00",
                    "closing":"16:00"},
            "wednesday":
                {
                    "open":false,
                    "opening":"08:00",
                    "closing":"16:00"},
            "thursday":
                {
                    "open":false,
                    "opening":"08:00",
                    "closing":"16:00"},
            "friday":
                {
                    "open":false,
                    "opening":"08:00",
                    "closing":"16:00"},
            "saturday":
                {
                    "open":false,
                    "opening":"08:00",
                    "closing":"16:00"}
            },
        "time_zone":"Etc/UTC",
        "address":{
            "address1":"5th Ave","address2":"string","city":"New York","state":"NY","zip":"10021",
            "email":"test@example.com","phone":"800-555-0198",
            "geo_coordinates":{"latitude":40.774378,"longitude":-73.9653178},
            "country_code":"US"},
        "storefront_visibility":true,
        "special_hours":
            [{"label":"Thanksgiving","date":"2022-09-29","open":true,"opening":"09:00","closing":"09:00","all_day":false,"annual":false}]
        }]`
    }

fetch(url, options).then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));

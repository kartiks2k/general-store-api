# general-store-api
This is an api for a general store with the following functionality,

1.Login and register routes for users.

2.Login and register routes for vendors.

3.List of items available.

I started out by requiring the basic packages for a databse and backend, then i wrote the schemas for user, vendor and items. 
Then built the login routes for both vendor and useer.
After both these routes were built I created a databse in the mongo shell and entered some arbitrary users and checked their functionality with postman.
After their success I wrote the code for the register routes having the functionality to test for existing users in the database.
After that itested them on postman to verify their proper functionality.
Finally I built the get route to fetch available items and tested that with some arbitrary data and postman as well.

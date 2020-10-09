# Erp2

## Start the database

`docker stop pg-docker; docker run --rm --name pg-docker -e POSTGRES_PASSWORD=Coggel86 -e POSTGRES_DB=gt2 -d -p 5432:5432 postgres:12`


## Auth0

https://community.auth0.com/t/using-the-request-owner-password-endpoint-on-a-new-dev-account/12893/4

> ### Client Application settings:
>   The Client application who’s client ID you are using must be of type native and password must be checked within the Applications -> Settings -> Advanced Settings -> Grant Types pannel
  
>   ### Tenant Settings:
>   (Under tenant user account -> settings)
>   Set General -> API Authorization Settings ->Default Directory to Username-Password-Authentication

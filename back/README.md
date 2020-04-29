# Money Diary Backend

## Setting up and running local database

Make sure you have Docker installed and running.

Pull mongo image from docker
`docker pull mongo`

Run the docker mongo image

> on a Mac
> `docker run -p 27017:27017 -v ~/data:/data --name money-diary -d mongo`

> on Windows
> `docker run -p 27017:27017 -v /c/Users/<user>/data:/data --name money-diary -d mongo`

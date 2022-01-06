## About the challenge

The challenge is to build a simple API in Laravel (PHP) that allows you to Create, Read, Update and Delete 2 different entities of your choice, that is, it creates a list of movies, cars, games, etc.

Bonus challenge (optional): Make the API work only for logged in (authenticated) users.

## Goals:
- Have an ending point for each operation (CRUD); - Concluded ✔️
- Use a database to store data; - Concluded ✔️
- Display returned data in an organized way; - Concluded ✔️
- Have a README to explain how to run the project; - Concluded ✔️
- Build POSTMAN collection for testing; - Concluded ✔️
- Password reset and password change functionality; - Concluded ✔️
- Use Docker to run the system; - Concluído ✔️

## About development

API developed in a Docker environment, through a development environment created by the Laravel community called [Laradock](https://github.com/laradock/laradock) and tested through Postman, which is a client API that allows testing HTTP requests and HTTPs.

#### Technologies, software and tools used:
- [PHP 8.0](https://www.php.net/releases/8.0/en.php)
- [Laravel 8.0](https://laravel.com/docs/8.x/releases)
- [Nginx](https://www.nginx.com/)
- [MySQL](https://www.mysql.com/)
- [Phpmyadmin](https://www.phpmyadmin.net/)
- [Docker](https://www.docker.com/)
- [Postman](https://www.postman.com/)

## How to test the api?

- 1 - Clone the repository to a location of your choice, using the command:
```git clone --b PHP-Laravel-CRUD https://github.com/igorjcqs/Challenges.git```

- 2 - Clone the laradock repository into the project using the command:
```git clone https://github.com/laradock/laradock```

- 3 - Install composer dependencies, using the command:
```composer install```

- 4 - Access the docker environment;
```cd laradock```

- 5 - Open the ```laradock/.env.example``` file and copy the contents to your ```laradock/.env``` file (If not, create it);

- 6 - Configure all the ports you will use.

- 7 - Configure your database.

- 8 - Return to main directory.

- 9 - Open the ```.env.example``` file and copy the contents to your ```.env``` file (If not, create it);

- 10 - Open your ```.env``` file and configure your database and mail server.

- 11 - Start the docker environment using the command:
```docker-compose up -d nginx mysql phpmyadmin```

- 12 - Perform database migrations using the command:
```php artisan migrate```

- 13 - Run all database seeds using the command:
```php artisan db:seed```

- 14 - Ready! The project is already running in a docker environment and you can access it through the link: https://localhost:PORTA_CONFIGURADA_NO_ENV

- 15 - Download Postman and import the collection (Score - Backend Requests..postman_collection.json) of requests present in the project.

OBS¹: To run correctly you need to have [Docker Desktop](https://www.docker.com/get-started) installed on your computer.

OBS²: The first time you run the "docker-compose" command it will probably take a while as it will download all necessary dependencies.

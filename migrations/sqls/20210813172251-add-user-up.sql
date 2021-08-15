
create table users (
                      id SERIAL PRIMARY KEY,
                      username VARCHAR(128),
                      password_digest VARCHAR(1024)
);

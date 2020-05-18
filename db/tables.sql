    CREATE TABLE IF NOT EXISTS futbol (
        id SERIAL PRIMARY KEY,
        jugador VARCHAR,
        posicion VARCHAR,
        pierna VARCHAR,
        nacionalidad VARCHAR,
        club VARCHAR,
        media INTEGER CHECK (media > 45 and media <= 99),
        foto VARCHAR
    );

CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre_cat VARCHAR NOT NULL,
    img_cat BYTEA
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR NOT NULL,
    created_at VARCHAR NOT NULL,
    mean_time VARCHAR NOT NULL      -- (tiempo finLoggeo - tiempo iniLoggeo)
);
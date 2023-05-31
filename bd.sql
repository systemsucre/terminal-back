CREATE TABLE empresa (
  id int AUTO_INCREMENT,
  nombre varchar(400) ,
  telefono varchar(20) ,
  origen varchar(400),
  PRIMARY KEY (id)
)


create table tipo( id int primary key AUTO_INCREMENT, tipo text, numero int );
create table asientoubicacion( id int primary key AUTO_INCREMENT, ubicacion text );

create table vehiculo(
    id int PRIMARY key AUTO_INCREMENT,
    idtipo int,
	idempresa int,
    idusuario int,
    capacidad int,
    placa text,
    modelo text,
    estado boolean DEFAULT true,
    eliminado boolean DEFAULT false,
    obs text,
    creado datetime,
    modificado datetime,
    usuario int,
    FOREIGN key (idtipo) REFERENCES tipo(id),
    FOREIGN key (idempresa) REFERENCES empresa(id),
    FOREIGN key (idusuario) REFERENCES usuario(id)
)
create table asiento(
    id int PRIMARY key AUTO_INCREMENT,
    idasientoubi int,
	idvehiculo int,
    numero int,
    creado datetime, 
    modificado datetime,
    usaurio int,
    FOREIGN key (idasientoubi) REFERENCES asientoubicacion(id),
    FOREIGN key (idvehiculo) REFERENCES vehiculo(id)
);

create table ruta(
    id int PRIMARY key AUTO_INCREMENT,
    origen int,
	destino int,
    idempresa int,
    dia int,
    hora time,
    creado datetime, 
    modificado datetime,
    usuario int,
    FOREIGN key (origen) REFERENCES terminal(id),
    FOREIGN key (origen) REFERENCES terminal(id),
    FOREIGN key (idempresa) REFERENCES empresa(id)
);
create table viaje(
    id int PRIMARY key AUTO_INCREMENT,
    idruta int,
	fecha date,
    idvehiculo int,
    estado boolean DEFAULT true,
    creado datetime, 
    modificado datetime,
    usuario int,
    FOREIGN key (idruta) REFERENCES ruta(id),
    FOREIGN key (idvehiculo) REFERENCES vehiculo(id)
);
create table cliente(
    id int PRIMARY key AUTO_INCREMENT,
    nombre text,
	apellido1 text,
    apellido2 text,
    ci text,
    telefono text,
    direccion text,
    eliminado boolean DEFAULT false,
    creado datetime, 
    modificado datetime,
    usuario int
);
create table pasaje(
    id int PRIMARY key AUTO_INCREMENT,
    idviaje int,
    idasiento int,
    idcliente int,
    fechahora datetime,
    comprador int,
	FOREIGN key(idviaje)REFERENCES viaje(id),
	FOREIGN key(idasiento)REFERENCES asiento(id),
	FOREIGN key(idcliente)REFERENCES cliente(id),
	FOREIGN key(comprador)REFERENCES cliente(id)
);
create table encomienda(
    id int PRIMARY key AUTO_INCREMENT,
    idviaje int,
    emisor int,
    recepcion datetime,
    despachador int,
    entregador int,
    receptor int,
    contenido text,
    tarifa text,
    estado int DEFAULT 0,
    porpagar boolean,
    fechahora datetime,
    telefono text,
	FOREIGN key(idviaje)REFERENCES viaje(id),
	FOREIGN key(emisor)REFERENCES cliente(id),
	FOREIGN key(receptor)REFERENCES cliente(id)
);
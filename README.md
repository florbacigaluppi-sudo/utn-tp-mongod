**# Esta aplicación es un CLI desarrollada con TypeScript, Node.js, MongoDB y Mongoose.**

Su objetivo es permitir la gestión de una colección de libros guardados en MongoDB  directamente desde la terminal.

La aplicación permite realizar las operaciones principales de un CRUD:

* Crear libros.

* Consultar todos los libros.

* Buscar un libro por su ID.

* Actualizar la información de un libro.

* Eliminar un libro.

**## Ejecución**

La aplicación se ejecuta desde la terminal mediante Node.js:

```bash

node ./src/index.ts

```

**## Comandos disponibles**

**### 1. info**

Muestra los comandos disponibles. Los comandos se agregan después de la ruta del archivo.

node ./src/index.ts info

**### 2. show**

**#### Mostrar todos los libros**

Muestra todos los libros almacenados en la base de datos.

node ./src/index.ts show

En la terminal deberia aparecer un array de objetos, donde cada objeto es un libro con sus caracteristicas, en este caso, "title", "author", "price" y "stock".

Si no hay libros guardados en la base de datos aparecerá un array vacio.

**### 3. show ID**

**#### Buscar un libro por ID**

Para buscar un libro específico se debe indicar su ID:

node ./src/index.ts show <id>

Ejemplo:

node ./src/index.ts show 6ab2cf54d4ea78a0ff1f08c4

**### MANEJO DE ERRORES**

Al ingresar el ID de un libro, pueden aparecer distintos tratamientos de errores.

Si el ID tiene un formato inválido, es decir, no corresponde con un ObjectId, devolverá:

"invalid ID"

Por ejemplo:

node ./src/index.ts show hola

Si el ID tiene un formato válido pero el libro no existe, devolverá:

"Book not found"

Por ejemplo:

node ./src/index.ts show 111111111111111111111111

**### 4. create**

Crea un nuevo libro en la base de datos.

El campo title es obligatorio.

La aplicación solamente acepta:

title

author

stock

price

**#### Permite:**

Crear un libro solamente con título:

node ./src/index.ts create title="Harry Potter"

Crear un libro con todos los datos:

node ./src/index.ts create title=1984 author=GeorgeOrwell stock=10 price=5000

También se pueden utilizar solamente algunos campos:

node ./src/index.ts create title=1984 price=5000

**### Posibles ERRORES de create**

Si no se proporciona un título:

node ./src/index.ts create author=GeorgeOrwell

Devolverá:

Title is required

Si se envia un dato que no esta aceptado por la aplicación:

Por ejemplo:

node ./src/index.ts create title=1984 editorial=Planeta

El resultado será:

Invalid data to create a new book

**### 5. delete**

Permite eliminar un libro de la base de datos.

Para eliminar un libro específico se utiliza su ID:

node ./src/index.ts delete <id>

Ejemplo:

node ./src/index.ts delete 6ab2cf54d4ea78a0ff1f08c4

Trabaja con los mismos errores que "show". ("invalid ID", "Book not found")

****### 6. update****

Permite actualizar la información de un libro existente en la base de datos.

Para actualizar un libro se debe indicar su ID y luego los campos que se desean modificar:

title: node ./src/index.ts update <id> title="Dracula"

author: node ./src/index.ts update <id> author=Borges

stock: node ./src/index.ts update <id> stock=20

price:

****#### Permite:****

Actualizar solamente el título: node ./src/index.ts update <id> price=800

Actualizar solamente el precio: node ./src/index.ts update <id> precio=10000

Actualizar solamente el stock: node ./src/index.ts update <id> stock=20

Actualizar solamente el autor: node ./src/index.ts update <id> author=Borges

También se pueden actualizar varios campos al mismo tiempo:

node ./src/index.ts update <id> title="Dracula" author=BramStoker stock=10 price=8000

****### Posibles ERRORES de update****

Si no se proporciona un ID:

node ./src/index.ts update

Devolverá:

ID is required

Si el ID tiene un formato inválido, es decir, no corresponde con un ObjectId, devolverá:

"invalid ID"

Si el ID tiene un formato válido pero el libro no existe, devolverá:

"Book not found"

Por ejemplo:

node ./src/index.ts update 111111111111111111111111 title="Dracula"

Si se intenta actualizar un campo que no está permitido:

node ./src/index.ts update <id> editorial=Planeta

Devolverá:

Invalid data to update a new book

Si se proporciona un campo sin valor:

node ./src/index.ts update <id> title=

Devolverá:

Invalid data for title

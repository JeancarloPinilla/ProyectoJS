# Golden Store 🛒

Una tienda online moderna y responsiva desarrollada con HTML, CSS y JavaScript vanilla, que integra la API de FakeStore para mostrar productos reales.

## 🌟 Características

- **Interfaz moderna**: Diseño con gradientes, efectos de desenfoque y animaciones suaves
- **Catálogo de productos**: Integración con FakeStore API para productos reales
- **Sistema de carrito**: Funcionalidad completa de carrito de compras con persistencia
- **Filtros avanzados**: Búsqueda por nombre, categoría y rango de precios
- **Autenticación simple**: Sistema básico de login y registro
- **Responsive design**: Adaptado para dispositivos móviles y desktop
- **Navegación intuitiva**: Barra de navegación inferior estilo app móvil

## 🚀 Funcionalidades

### 🏪 Tienda Principal
- Visualización de productos en tarjetas con imagen, título y precio
- Búsqueda en tiempo real por nombre de producto
- Filtrado por categorías (electrónicos, joyería, ropa masculina/femenina)
- Filtros de precio mínimo y máximo
- Contador de productos encontrados

### 🛍️ Carrito de Compras
- Agregar productos al carrito con animación de confirmación
- Modificar cantidades de productos
- Eliminar productos del carrito
- Cálculo automático de subtotales y total
- Persistencia del carrito en localStorage
- Proceso de checkout con validación de datos

### 👤 Sistema de Usuario
- Pantalla de login con validación básica
- Registro de nuevos usuarios
- Configuración de perfil (email y dirección)
- Gestión de datos del usuario en localStorage

### 📱 Navegación
- Barra inferior con iconos para tienda, búsqueda y ajustes
- Modales para carrito y búsqueda avanzada
- Navegación fluida entre secciones

## 🏗️ Estructura del Proyecto

```
golden-store/
├── index.html                 # Página de login principal
├── assets/
│   └── compras.png           # Logo del carrito
├── index/
│   ├── styles.css            # Estilos del login
│   └── script.js             # Lógica del login
├── Registrar-Usuario/
│   ├── Registro.html         # Página de registro
│   └── styles.css            # Estilos del registro
└── tienda/
    ├── tienda.html           # Tienda principal
    ├── tienda.css            # Estilos de la tienda
    └── tienda.js             # Lógica principal de la tienda
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con Flexbox, Grid y gradientes
- **JavaScript ES6+**: Lógica de la aplicación y manipulación del DOM
- **FakeStore API**: Fuente de datos de productos
- **LocalStorage**: Persistencia de datos del usuario y carrito

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone [url-del-repositorio]
   cd golden-store
   ```

2. **Abrir en un servidor local**:
   - Usar Live Server en VS Code
   - O cualquier servidor HTTP local
   - O abrir `index.html` directamente en el navegador

3. **Navegar por la aplicación**:
   - Ingresar cualquier usuario y contraseña en el login
   - Explorar el catálogo de productos
   - Agregar productos al carrito
   - Configurar datos personales en ajustes
   - Realizar compras

## 🎯 Flujo de Usuario

1. **Login**: El usuario ingresa credenciales (cualquier valor es válido)
2. **Exploración**: Navega por el catálogo con filtros disponibles
3. **Selección**: Agrega productos al carrito
4. **Configuración**: Completa email y dirección en ajustes
5. **Compra**: Procesa el checkout y recibe confirmación

## 🔧 Funciones Principales

### JavaScript Core Functions

- `fetchProducts()`: Obtiene productos de la API
- `addToCart(productId)`: Agrega productos al carrito
- `filterProducts()`: Aplica filtros de búsqueda
- `processCheckout()`: Procesa la compra
- `saveCartToStorage()`: Persiste el carrito
- `renderProducts()`: Renderiza la vista de productos

### Gestión del Estado

- **Productos**: Array global con todos los productos
- **Carrito**: Array con productos seleccionados
- **Filtros**: Objeto con criterios de búsqueda activos
- **Usuario**: Datos almacenados en localStorage

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: Grilla de productos multi-columna
- **Tablet**: Ajuste automático del layout
- **Mobile**: Interfaz adaptada con navegación inferior

## 🎨 Características de Diseño

- **Gradientes**: Fondos y botones con transiciones de color
- **Glassmorphism**: Efectos de vidrio esmerilado en modales
- **Hover Effects**: Animaciones suaves en interacciones
- **Iconografía**: Emojis como iconos para mejor UX
- **Paleta de colores**: Combinación de dorados y grises

## 🔒 Almacenamiento de Datos

La aplicación utiliza localStorage para:
- Carrito de compras persistente
- Datos del usuario (nombre, email, dirección)
- Preferencias y configuraciones

## 🌐 API Integration

Integración con [FakeStore API](https://fakestoreapi.com/):
- Endpoint: `https://fakestoreapi.com/products`
- Datos: Productos con imagen, título, precio y categoría
- Categorías disponibles: electrónicos, joyería, ropa masculina/femenina

## 🎯 Mejoras Futuras

- Autenticación real con backend
- Base de datos para persistencia real
- Sistema de pagos
- Gestión de inventario
- Reviews y calificaciones
- Lista de deseos
- Histórico de compras

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para la feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit los cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👨‍💻 Autor

Jeancarlo Pinilla
Desarrollado como proyecto de demostración de una tienda online moderna con JavaScript vanilla.

---

**Golden Store** - Todo lo que necesitas en artículos de belleza ✨

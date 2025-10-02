-- =====================================================
-- SOLUCIÓN CONSIGNA 1 - BASE DE DATOS PEDIDOS
-- =====================================================
-- 
-- IMPLEMENTACIÓN DE REGLAS DE GESTIÓN:
-- 
-- RG1: Cada proveedor puede proveer a la empresa con artículos de Origen Nacional o Importado.
--      → Implementado con CHECK constraint en tabla productos: CHECK (origen IN ('nacional', 'importado'))
-- 
-- RG2: El sistema solo debe permitir crear un pedido para Clientes registrados.
--      → Implementado con FOREIGN KEY: id_cliente REFERENCES clientes(id)
-- 
-- RG3: Solo se pueden incorporar al detalle de pedido productos con stock suficiente.
--      → Implementado con trigger que valida stock disponible antes de insertar detalle
-- 
-- RG4: Se debe actualizar el stock de un producto una vez confirmado el pedido.
--      → Implementado en Consigna 2 con triggers y procedimientos almacenados
-- 
-- RG5: Cada renglón de pedido incorpora el precio unitario del producto.
--      → Implementado con campo precio_unitario en detalle_pedidos
-- 
-- RG6: Cada renglón totaliza en función del precio unitario y la cantidad.
--      → Implementado con campo total en detalle_pedidos
-- 
-- RG7: Solo se pueden eliminar de la base Clientes que nunca hayan realizado un pedido.
--      → Implementado con vista v_clientes_sin_pedidos para identificación
-- 
-- RG8: Al ingresar un nuevo producto, es obligatorio cargar la totalidad de los datos (no admite campos nulos).
--      → Implementado con NOT NULL en todos los campos obligatorios
-- 
-- RG9: Al ingresar un nuevo producto, se debe controlar que el stock se encuentre entre los límites de stock mínimo y máximo.
--      → Implementado con CHECK constraint: CHECK (stock >= stock_min AND stock <= stock_max)
-- 
-- RG10: El sistema debe permitir la anulación de un pedido.
--       → Implementado con estado 'anulado' en tabla pedidos
-- 
-- RG11: Todo pedido anulado debe ser auditado, grabando en la tabla de log, la información del pedido anulado, indicando la fecha de anulación.
--       → Implementado en Consigna 2 con tabla Log y triggers
-- 
-- RG12: El sistema debe recomponer el stock de cada pedido confirmado que es anulado.
--       → Implementado en Consigna 2 con procedimientos almacenados
-- 
-- =====================================================

-- 1. CREAR LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS PEDIDOS;
USE PEDIDOS;

-- 2. CREAR LAS TABLAS CON SUS RESTRICCIONES

-- Tabla Clientes
CREATE TABLE clientes (
    id         INT          PRIMARY KEY AUTO_INCREMENT,
    apellido   VARCHAR(50)  NOT NULL,
    nombres    VARCHAR(50)  NOT NULL,
    direccion  VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Proveedores
CREATE TABLE proveedores (
    id                INT           PRIMARY KEY AUTO_INCREMENT,
    nombre_proveedor  VARCHAR(100)  NOT NULL,
    direccion         VARCHAR(100)  NOT NULL,
    email             VARCHAR(100)  NOT NULL UNIQUE,
    created_at        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Vendedores
CREATE TABLE vendedores (
    id         INT           PRIMARY KEY AUTO_INCREMENT,
    apellido   VARCHAR(50)   NOT NULL,
    nombres    VARCHAR(50)   NOT NULL,
    email      VARCHAR(100)  NOT NULL UNIQUE,
    comision   DECIMAL(5,2)  NOT NULL DEFAULT 0.00,
    created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Productos
-- RG1: Origen Nacional o Importado → CHECK (origen IN ('nacional', 'importado'))
-- RG8: Todos los campos obligatorios → NOT NULL en campos requeridos
-- RG9: Stock entre límites → CHECK (stock >= stock_min AND stock <= stock_max)
CREATE TABLE productos (
    id              INT            PRIMARY KEY AUTO_INCREMENT,
    descripcion     VARCHAR(200)   NOT NULL,
    precio_unitario DECIMAL(10,2)  NOT NULL CHECK (precio_unitario > 0),
    stock           INT            NOT NULL DEFAULT 0,
    stock_max       INT            NOT NULL,
    stock_min       INT            NOT NULL,
    id_proveedor    INT            NOT NULL REFERENCES proveedores(id),
    origen          VARCHAR(20)    NOT NULL,
    created_at      DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CHECK (stock >= stock_min AND stock <= stock_max),
    CHECK (origen IN ('nacional', 'importado'))
);

-- Tabla Pedidos
-- RG2: Solo clientes registrados → FOREIGN KEY id_cliente REFERENCES clientes(id)
-- RG10: Anulación de pedidos → estado 'anulado' incluido en CHECK constraint
CREATE TABLE pedidos (
    id             INT           PRIMARY KEY AUTO_INCREMENT,
    numero_pedido  INT           NOT NULL UNIQUE,
    id_cliente     INT           NOT NULL REFERENCES clientes(id),
    id_vendedor    INT           NOT NULL REFERENCES vendedores(id),
    fecha          DATE          NOT NULL,
    estado         VARCHAR(20)   NOT NULL DEFAULT 'pendiente',
    created_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CHECK (estado IN ('pendiente', 'confirmado', 'anulado'))
);

-- Tabla Detalle Pedidos
-- RG3: Stock suficiente → Trigger que valida stock disponible
-- RG5: Precio unitario por renglón → campo precio_unitario
-- RG6: Totalización por renglón → campo total
CREATE TABLE detalle_pedidos (
    id              INT            PRIMARY KEY AUTO_INCREMENT,
    id_pedido       INT            NOT NULL REFERENCES pedidos(id),
    renglon         INT            NOT NULL,
    id_producto     INT            NOT NULL REFERENCES productos(id),
    cantidad        INT            NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2)  NOT NULL CHECK (precio_unitario > 0),
    total           DECIMAL(12,2)  NOT NULL,
    created_at      DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_pedido_renglon (id_pedido, renglon)
);

-- Trigger para validar stock suficiente antes de insertar detalle (RG3)
DELIMITER //
CREATE TRIGGER tr_validar_stock_before_insert
BEFORE INSERT ON detalle_pedidos
FOR EACH ROW
BEGIN
    DECLARE stock_disponible INT;
    
    -- Obtener stock disponible del producto
    SELECT stock INTO stock_disponible
    FROM productos
    WHERE id = NEW.id_producto;
    
    -- Validar que hay stock suficiente
    IF NEW.cantidad > stock_disponible THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock insuficiente para el producto seleccionado';
    END IF;
END//
DELIMITER ;

-- 3. POBLAR LA BASE DE DATOS

-- Insertar 5 Clientes
INSERT INTO clientes (apellido, nombres, direccion, email) VALUES
('García', 'María', 'Av. Corrientes 1234', 'maria.garcia@email.com'),
('López', 'Juan Carlos', 'Belgrano 567', 'juan.lopez@email.com'),
('Martínez', 'Ana Sofía', 'San Martín 890', 'ana.martinez@email.com'),
('Rodríguez', 'Carlos Alberto', 'Rivadavia 2345', 'carlos.rodriguez@email.com'),
('Fernández', 'Lucía', 'Sarmiento 678', 'lucia.fernandez@email.com');

-- Insertar 3 Proveedores
INSERT INTO proveedores (nombre_proveedor, direccion, email) VALUES
('TecnoPro S.A.', 'Av. Industrial 1000', 'contacto@tecnopro.com'),
('ImportTech Ltda.', 'Zona Franca 500', 'ventas@importtech.com'),
('NacionalElectronics', 'Parque Industrial 750', 'info@nacionalelectronics.com');

-- Insertar 3 Vendedores
INSERT INTO vendedores (apellido, nombres, email, comision) VALUES
('González', 'Roberto', 'roberto.gonzalez@empresa.com', 5.50),
('Silva', 'Patricia', 'patricia.silva@empresa.com', 6.00),
('Herrera', 'Miguel', 'miguel.herrera@empresa.com', 4.75);

-- Insertar al menos 10 productos
INSERT INTO productos (descripcion, precio_unitario, stock, stock_max, stock_min, id_proveedor, origen) VALUES
('Laptop HP Pavilion 15"', 85000.00, 25, 50, 10, 1, 'nacional'),
('Mouse inalámbrico Logitech', 2500.00, 100, 200, 30, 1, 'nacional'),
('Teclado mecánico RGB', 12000.00, 45, 80, 15, 2, 'importado'),
('Monitor Samsung 24" Full HD', 45000.00, 30, 60, 12, 1, 'nacional'),
('Disco SSD 500GB', 15000.00, 60, 120, 25, 3, 'nacional'),
('Memoria RAM 8GB DDR4', 8000.00, 80, 150, 20, 2, 'importado'),
('Webcam HD 1080p', 3500.00, 40, 70, 10, 3, 'nacional'),
('Auriculares gaming con micrófono', 18000.00, 35, 65, 15, 2, 'importado'),
('Tablet Samsung Galaxy Tab A', 35000.00, 20, 40, 8, 1, 'nacional'),
('Impresora multifunción HP', 28000.00, 15, 35, 5, 3, 'nacional'),
('Cable HDMI 2m', 800.00, 200, 400, 50, 1, 'nacional'),
('Adaptador USB-C a HDMI', 1200.00, 75, 150, 20, 2, 'importado');

-- Insertar 10 pedidos con diferentes renglones
INSERT INTO pedidos (numero_pedido, id_cliente, id_vendedor, fecha, estado) VALUES
(1001, 1, 1, '2024-01-15', 'confirmado'),
(1002, 2, 2, '2024-01-16', 'confirmado'),
(1003, 3, 1, '2024-01-17', 'confirmado'),
(1004, 4, 3, '2024-01-18', 'confirmado'),
(1005, 5, 2, '2024-01-19', 'confirmado'),
(1006, 1, 3, '2024-01-20', 'confirmado'),
(1007, 2, 1, '2024-01-21', 'confirmado'),
(1008, 3, 2, '2024-01-22', 'confirmado'),
(1009, 4, 1, '2024-01-23', 'confirmado'),
(1010, 5, 3, '2024-01-24', 'confirmado');

-- Insertar detalles de pedidos (1 a 3 renglones por pedido)
INSERT INTO detalle_pedidos (id_pedido, renglon, id_producto, cantidad, precio_unitario, total) VALUES
-- Pedido 1001 (1 renglón)
(1, 1, 1, 1, 85000.00, 85000.00),

-- Pedido 1002 (2 renglones)
(2, 1, 2, 2, 2500.00, 5000.00),
(2, 2, 3, 1, 12000.00, 12000.00),

-- Pedido 1003 (3 renglones)
(3, 1, 4, 1, 45000.00, 45000.00),
(3, 2, 5, 1, 15000.00, 15000.00),
(3, 3, 6, 2, 8000.00, 16000.00),

-- Pedido 1004 (1 renglón)
(4, 1, 7, 1, 3500.00, 3500.00),

-- Pedido 1005 (2 renglones)
(5, 1, 8, 1, 18000.00, 18000.00),
(5, 2, 9, 1, 35000.00, 35000.00),

-- Pedido 1006 (3 renglones)
(6, 1, 10, 1, 28000.00, 28000.00),
(6, 2, 11, 3, 800.00, 2400.00),
(6, 3, 12, 1, 1200.00, 1200.00),

-- Pedido 1007 (1 renglón)
(7, 1, 1, 1, 85000.00, 85000.00),

-- Pedido 1008 (2 renglones)
(8, 1, 3, 1, 12000.00, 12000.00),
(8, 2, 6, 1, 8000.00, 8000.00),

-- Pedido 1009 (3 renglones)
(9, 1, 4, 1, 45000.00, 45000.00),
(9, 2, 5, 2, 15000.00, 30000.00),
(9, 3, 7, 1, 3500.00, 3500.00),

-- Pedido 1010 (1 renglón)
(10, 1, 9, 1, 35000.00, 35000.00);

-- 4. CREAR LAS VISTAS SOLICITADAS

-- Vista 1: Detalle de Clientes que realizaron pedidos entre fechas
CREATE VIEW v_clientes_entre_fechas AS
SELECT 
    c.apellido, 
    c.nombres, 
    c.id, 
    c.email
FROM 
    clientes c
    INNER JOIN pedidos p ON c.id = p.id_cliente
WHERE 
    p.fecha BETWEEN '2024-01-15' AND '2024-01-24'
GROUP BY 
    c.id, c.apellido, c.nombres, c.email;

-- Vista 2: Detalle de Vendedores con cantidad de pedidos realizados
CREATE VIEW v_vendedores_con_pedidos AS
SELECT 
    v.apellido, 
    v.nombres, 
    v.id, 
    v.email, 
    COUNT(p.id) AS cantidad_pedidos
FROM 
    vendedores v
    LEFT JOIN pedidos p ON v.id = p.id_vendedor
GROUP BY 
    v.id, v.apellido, v.nombres, v.email;

-- Vista 3: Detalle de pedidos con total mayor a un valor umbral
CREATE VIEW v_pedidos_con_total_alto AS
SELECT 
    p.numero_pedido, 
    p.fecha, 
    SUM(dp.total) AS total_pedido
FROM 
    pedidos p
    INNER JOIN detalle_pedidos dp ON p.id = dp.id_pedido
GROUP BY 
    p.id, p.numero_pedido, p.fecha
HAVING 
    SUM(dp.total) > 50000;

-- Vista 4: Lista de productos vendidos entre fechas
CREATE VIEW v_productos_vendidos_entre_fechas AS
SELECT 
    pr.descripcion, 
    SUM(dp.cantidad) AS cantidad_total
FROM 
    productos pr
    INNER JOIN detalle_pedidos dp ON pr.id = dp.id_producto
    INNER JOIN pedidos p ON dp.id_pedido = p.id
WHERE 
    p.fecha BETWEEN '2024-01-15' AND '2024-01-24'
GROUP BY 
    pr.id, pr.descripcion;

-- Vista 5: Proveedor que realizó más ventas
CREATE VIEW v_proveedor_mas_ventas AS
SELECT 
    pv.nombre_proveedor, 
    COUNT(DISTINCT dp.id_pedido) AS cantidad_pedidos
FROM 
    proveedores pv
    INNER JOIN productos pr ON pv.id = pr.id_proveedor
    INNER JOIN detalle_pedidos dp ON pr.id = dp.id_producto
    INNER JOIN pedidos p ON dp.id_pedido = p.id
WHERE 
    p.estado = 'confirmado'
GROUP BY 
    pv.id, pv.nombre_proveedor
ORDER BY 
    cantidad_pedidos DESC
LIMIT 1;

-- Vista 6: Clientes registrados que nunca realizaron un pedido
-- RG7: Identificación de clientes que pueden ser eliminados (nunca realizaron pedidos)
CREATE VIEW v_clientes_sin_pedidos AS
SELECT 
    c.apellido, 
    c.nombres, 
    c.email
FROM 
    clientes c
    LEFT JOIN pedidos p ON c.id = p.id_cliente
WHERE 
    p.id IS NULL;

-- Vista 7: Clientes que realizaron menos de dos pedidos
CREATE VIEW v_clientes_menos_de_dos_pedidos AS
SELECT 
    c.apellido, 
    c.nombres, 
    c.email
FROM 
    clientes c
    INNER JOIN pedidos p ON c.id = p.id_cliente
GROUP BY 
    c.id, c.apellido, c.nombres, c.email
HAVING 
    COUNT(p.id) < 2;

-- Vista 8: Cantidad total vendida por origen de producto
CREATE VIEW v_ventas_por_origen AS
SELECT 
    pr.origen, 
    SUM(dp.cantidad) AS cantidad_total_vendida
FROM 
    productos pr
    INNER JOIN detalle_pedidos dp ON pr.id = dp.id_producto
    INNER JOIN pedidos p ON dp.id_pedido = p.id
WHERE 
    p.estado = 'confirmado'
GROUP BY 
    pr.origen;

-- =====================================================
-- CONSULTAS DE VERIFICACIÓN
-- =====================================================

-- Verificar datos insertados
SELECT 'clientes' AS tabla, COUNT(*) AS cantidad FROM clientes
UNION ALL
SELECT 'proveedores', COUNT(*) FROM proveedores
UNION ALL
SELECT 'vendedores', COUNT(*) FROM vendedores
UNION ALL
SELECT 'productos', COUNT(*) FROM productos
UNION ALL
SELECT 'pedidos', COUNT(*) FROM pedidos
UNION ALL
SELECT 'detalle_pedidos', COUNT(*) FROM detalle_pedidos;

-- Verificar vistas creadas
SELECT 'Vistas creadas:' AS mensaje;
SHOW TABLES LIKE 'v_%';

-- =====================================================
-- REGLAS DE GESTIÓN IMPLEMENTADAS EN CONSIGNA 2:
-- =====================================================
-- 
-- RG4: Actualización de stock al confirmar pedido
--      → Procedimiento almacenado con transacción
-- 
-- RG11: Auditoría de pedidos anulados
--       → Tabla Log + Trigger automático
-- 
-- RG12: Recomposición de stock al anular pedido
--       → Procedimiento almacenado de anulación
-- 
-- =====================================================
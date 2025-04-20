USE warehouse_db;

-- Insert categories
INSERT INTO categories (name) VALUES
('Electronics'),
('Furniture'),
('Groceries'),
('Toys'),
('Books'),
('Clothing'),
('Sports'),
('Tools'),
('Beauty'),
('Automotive');

-- Insert clients
INSERT INTO client (email) VALUES
('bob@client.com'),
('charlie@client.com'),
('diana@client.com'),
('edward@client.com'),
('fiona@client.com'),
('george@client.com'),
('hannah@client.com'),
('ian@client.com'),
('julia@client.com');

-- Insert suppliers
INSERT INTO supplier (email) VALUES
('fresh@supplier.com'),
('fasttech@supplier.com'),
('ecofoods@supplier.com'),
('homebase@supplier.com'),
('fabrica@supplier.com'),
('sporty@supplier.com'),
('beautyline@supplier.com'),
('autozone@supplier.com'),
('buildit@supplier.com');

-- Insert users (MANAGERS only)
INSERT INTO user (email, password, role, username) VALUES
('linda@manager.com', 'pass456', 'MANAGER', 'linda_mgr'),
('sam@manager.com', 'pass789', 'MANAGER', 'sam_mgr'),
('kate@manager.com', 'pass321', 'MANAGER', 'kate_mgr'),
('john@manager.com', 'pass654', 'MANAGER', 'john_mgr'),
('nina@manager.com', 'pass987', 'MANAGER', 'nina_mgr'),
('oliver@manager.com', 'pass147', 'MANAGER', 'oliver_mgr'),
('emma@manager.com', 'pass258', 'MANAGER', 'emma_mgr'),
('liam@manager.com', 'pass369', 'MANAGER', 'liam_mgr'),
('sophia@manager.com', 'pass741', 'MANAGER', 'sophia_mgr');

-- Insert products
INSERT INTO products (description, expiry_date, name, price, sku, stock_quantity, category_id) VALUES
('Smartphone - 128GB', '2026-01-01 00:00:00.000000', 'Smartphone', 599.99, 'ELEC-001', 100, 1),
('Dining Table - 6 Seater', NULL, 'Dining Table', 299.99, 'FURN-001', 25, 2),
('Organic Apples - 1kg', '2025-05-10 00:00:00.000000', 'Apples', 3.49, 'GROC-001', 300, 3),
('Action Figure', NULL, 'Superhero Toy', 14.99, 'TOYS-001', 120, 4),
('Fiction Novel', NULL, 'Mystery Book', 9.99, 'BOOK-001', 75, 5),
('T-shirt - Medium', NULL, 'T-shirt', 19.99, 'CLOTH-001', 200, 6),
('Football', NULL, 'Soccer Ball', 24.99, 'SPORT-001', 50, 7),
('Electric Drill', NULL, 'Cordless Drill', 89.99, 'TOOLS-001', 35, 8),
('Lipstick - Red', NULL, 'Lipstick', 12.49, 'BEAUTY-001', 60, 9),
('Car Battery', NULL, 'Battery 12V', 129.99, 'AUTO-001', 15, 10);

-- Insert orders
INSERT INTO orders (
    created_at, description, order_status, order_type,
    product_quantity, total_price, update_at,
    client_id, product_id, supplier_id, user_id
) VALUES
('2025-04-01 10:00:00.000000', 'Smartphone order', 'COMPLETED', 'SHIP', 2, 1199.98, '2025-04-01 11:00:00.000000', 1, 1, 1, 1),
('2025-04-02 12:30:00.000000', 'Dining Table bulk order', 'PENDING', 'RECEIVE', 5, 1499.95, '2025-04-02 13:00:00.000000', 2, 2, 5, 2),
('2025-04-03 14:00:00.000000', 'Fruit delivery', 'PROCESSING', 'RECEIVE', 50, 174.50, '2025-04-03 14:30:00.000000', 3, 3, 2, 3),
('2025-04-04 08:00:00.000000', 'Toy order', 'COMPLETED', 'SHIP', 10, 149.90, '2025-04-04 08:45:00.000000', 4, 4, 3, 4),
('2025-04-05 09:15:00.000000', 'Books shipment', 'PENDING', 'RECEIVE', 20, 199.80, '2025-04-05 10:00:00.000000', 5, 5, 4, 5),
('2025-04-06 11:30:00.000000', 'Shirt batch', 'PROCESSING', 'RECEIVE', 100, 1999.00, '2025-04-06 12:00:00.000000', 6, 6, 6, 6),
('2025-04-07 16:45:00.000000', 'Football gear', 'COMPLETED', 'SHIP', 15, 374.85, '2025-04-07 17:15:00.000000', 7, 7, 7, 7),
('2025-04-08 13:25:00.000000', 'Tools restock', 'PENDING', 'RECEIVE', 8, 719.92, '2025-04-08 14:00:00.000000', 8, 8, 8, 8),
('2025-04-09 10:20:00.000000', 'Lipstick shipment', 'PROCESSING', 'RECEIVE', 30, 374.70, '2025-04-09 11:00:00.000000', 9, 9, 9, 9),
('2025-04-10 09:10:00.000000', 'Battery bulk order', 'COMPLETED', 'RECEIVE', 5, 649.95, '2025-04-10 09:45:00.000000', 10, 10, 10, 10);

INSERT INTO orders (
    created_at, description, order_status, order_type,
    product_quantity, total_price, update_at,
    client_id, product_id, supplier_id, user_id
) VALUES
-- 📅 April 15
('2025-04-15 09:00:00.000000', 'Order 1 - Electronics', 'COMPLETED', 'SHIP', 2, 599.98, '2025-04-15 10:00:00.000000', 1, 1, 1, 1),
('2025-04-15 10:30:00.000000', 'Order 2 - Furniture', 'PENDING', 'RECEIVE', 4, 799.96, '2025-04-15 11:00:00.000000', 2, 2, 2, 2),
('2025-04-15 11:15:00.000000', 'Order 3 - Groceries', 'PROCESSING', 'RECEIVE', 20, 99.80, '2025-04-15 11:45:00.000000', 3, 3, 3, 3),
('2025-04-15 13:00:00.000000', 'Order 4 - Toys', 'COMPLETED', 'SHIP', 10, 149.90, '2025-04-15 14:00:00.000000', 4, 4, 4, 4),

-- 📅 April 16
('2025-04-16 09:30:00.000000', 'Order 5 - Books', 'PENDING', 'RECEIVE', 25, 249.75, '2025-04-16 10:30:00.000000', 5, 5, 5, 5),
('2025-04-16 11:00:00.000000', 'Order 6 - Apparel', 'PROCESSING', 'RECEIVE', 50, 999.50, '2025-04-16 11:30:00.000000', 6, 6, 6, 6),
('2025-04-16 13:15:00.000000', 'Order 7 - Sports gear', 'COMPLETED', 'SHIP', 8, 199.92, '2025-04-16 14:00:00.000000', 7, 7, 7, 7),
('2025-04-16 14:45:00.000000', 'Order 8 - Tools', 'PENDING', 'RECEIVE', 5, 449.95, '2025-04-16 15:15:00.000000', 8, 8, 8, 8),

-- 📅 April 17
('2025-04-17 08:30:00.000000', 'Order 9 - Cosmetics', 'PROCESSING', 'RECEIVE', 20, 249.80, '2025-04-17 09:00:00.000000', 9, 9, 9, 9),
('2025-04-17 09:45:00.000000', 'Order 10 - Batteries', 'COMPLETED', 'RECEIVE', 10, 1299.90, '2025-04-17 10:15:00.000000', 10, 10, 10, 10),
('2025-04-17 11:00:00.000000', 'Order 11 - Electronics B', 'PENDING', 'SHIP', 3, 899.97, '2025-04-17 11:30:00.000000', 1, 1, 2, 2),
('2025-04-17 12:15:00.000000', 'Order 12 - Groceries B', 'PROCESSING', 'RECEIVE', 15, 74.25, '2025-04-17 12:45:00.000000', 2, 3, 3, 3),

-- 📅 April 18
('2025-04-18 10:00:00.000000', 'Order 13 - Books B', 'COMPLETED', 'SHIP', 5, 49.95, '2025-04-18 10:30:00.000000', 3, 5, 4, 4),
('2025-04-18 11:30:00.000000', 'Order 14 - Apparel B', 'PENDING', 'RECEIVE', 30, 599.70, '2025-04-18 12:00:00.000000', 4, 6, 5, 5),
('2025-04-18 13:00:00.000000', 'Order 15 - Sports gear B', 'PROCESSING', 'RECEIVE', 12, 299.88, '2025-04-18 13:30:00.000000', 5, 7, 6, 6),
('2025-04-18 14:45:00.000000', 'Order 16 - Tools B', 'COMPLETED', 'SHIP', 6, 539.94, '2025-04-18 15:00:00.000000', 6, 8, 7, 7),

-- 📅 April 19
('2025-04-19 09:10:00.000000', 'Order 17 - Cosmetics B', 'PENDING', 'RECEIVE', 25, 312.25, '2025-04-19 09:45:00.000000', 7, 9, 8, 8),
('2025-04-19 10:20:00.000000', 'Order 18 - Batteries B', 'PROCESSING', 'RECEIVE', 4, 519.96, '2025-04-19 10:50:00.000000', 8, 10, 9, 9),
('2025-04-19 12:00:00.000000', 'Order 19 - Misc order', 'COMPLETED', 'SHIP', 3, 399.99, '2025-04-19 12:45:00.000000', 9, 4, 10, 10),
('2025-04-19 13:30:00.000000', 'Order 20 - Misc order 2', 'PENDING', 'RECEIVE', 7, 799.93, '2025-04-19 14:00:00.000000', 10, 2, 1, 1);

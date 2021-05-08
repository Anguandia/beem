`SELECT * FROM orders order ORDER BY total DESC LIMIT 3'

INNER JOIN payments pay ON pay.payment_id = order.order_payment_id
INNER JOIN users user ON user.user_id = order.user_id
INNER JOIN campaigns camp ON user.campaign_id = camp.campaign_id'`
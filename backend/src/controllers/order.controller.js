const OrderItem = require("../models/orderItem.schema");
const Order = require("../models/order.schema");
exports.createOrder = async (req, res) => {
  try {
    const {
      user_id,
      payment_id,
      total,
      first_name,
      last_name,
      country,
      phone,
      email,
      order_notes,
      address,
      payment_method,
      products
    } = req.body();

    const finalOrder = await Order.create({
      user_id,
      payment_id,
      total,
      first_name,
      last_name,
      country,
      phone,
      email,
      order_notes,
      address,
      payment_method,
    });
    const items=products.map(async(item)=>{
        return (
          await OrderItem.create({order_id:finalOrder._id,product_id:item.product_id,quantity:item.quantity, price:item.price}))
    })
    await Promise.all(items)
    return res.status(200).json({
      success: true,
      data: finalOrder,
      message: "order created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Order couldnot be created",
    });
  }
};

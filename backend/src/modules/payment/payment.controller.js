const paymentService = require("./payment.service");
const {
  createPaymentSchema,
  updatePaymentStatusSchema,
} = require("./payment.validation");

const createPayment = async (req, res) => {
  try {
    const data = createPaymentSchema.parse(req.body);

    const payment = await paymentService.createPayment(
      req.user.userId,
      data
    );

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyPayments = async (req, res) => {
  try {
    const payments = await paymentService.getMyPayments(req.user.userId);

    res.json({
      success: true,
      message: "My payments fetched successfully",
      data: payments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const paymentId = Number(req.params.id);

    if (!Number.isInteger(paymentId) || paymentId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment ID",
      });
    }

    const payment = await paymentService.getPaymentById(
      req.user.userId,
      paymentId
    );

    res.json({
      success: true,
      message: "Payment fetched successfully",
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getMyPayments,
  getPaymentById,
};


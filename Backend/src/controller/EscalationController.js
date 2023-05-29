const Escalation = require("../models/Escalation");

exports.create = async (req, res) => {
  const escalation = new Escalation(req.body);
  const response = await escalation.save();
  res.json(response);
};

exports.getById = async (req, res) => {
  const response = await Escalation.findById(req.query.id);
  return res.json(response);
};

exports.update = async (req, res) => {
  try {
    console.log(req.body);
    const response = await Escalation.update(req.body);
    res.json({ success: true, data: response });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

exports.getEscalationContacts = async (req, res) => {
  console.log("escalation received");
  const response = await Escalation.getAll();
  res.json(response);
};

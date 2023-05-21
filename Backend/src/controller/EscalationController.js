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
  const response = await Escalation.update(req.body);
  res.json(response);
};

exports.getEscalationContacts = async (req, res) => {
  const response = await Escalation.getAll();
  res.json(response);
};

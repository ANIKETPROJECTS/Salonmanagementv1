import { Router } from "express";
import { Service } from "../models/index.js";

const router = Router();

router.get("/services", async (_req, res) => {
  const services = await Service.find().sort({ category: 1, name: 1 });
  const categories = [...new Set(services.map((s) => s.category))];
  res.json({
    services: services.map((s) => ({ ...s.toObject(), id: s._id.toString() })),
    categories,
  });
});

router.post("/services", async (req, res) => {
  const { name, category, types, price, memberDiscount, memberPrice } = req.body;
  const computedMemberDiscount = memberDiscount ?? 20;
  const computedMemberPrice = memberPrice ?? Math.round((price ?? 0) * (1 - computedMemberDiscount / 100));
  const service = await Service.create({
    name,
    category,
    types: Array.isArray(types) ? types : [],
    price: price ?? 0,
    memberDiscount: computedMemberDiscount,
    memberPrice: computedMemberPrice,
  });
  res.status(201).json({ ...service.toObject(), id: service._id.toString() });
});

router.put("/services/:id", async (req, res) => {
  const { name, category, types, price, memberDiscount, memberPrice } = req.body;
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    {
      name,
      category,
      types: Array.isArray(types) ? types : [],
      price: price ?? 0,
      memberDiscount: memberDiscount ?? 20,
      memberPrice: memberPrice ?? 0,
    },
    { new: true }
  );
  if (!service) return res.status(404).json({ error: "Service not found" });
  res.json({ ...service.toObject(), id: service._id.toString() });
});

router.delete("/services/:id", async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ error: "Service not found" });
  res.json({ success: true });
});

export default router;

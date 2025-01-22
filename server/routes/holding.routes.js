import express from "express";
import holdingsController from "../controllers/holdings.controller.js";

const router = express.Router();


router.get('/all', holdingsController.getAllHoldings);
router.get('/:id', holdingsController.getHoldingById);
router.post('/create', holdingsController.addHolding);
router.put('/:id/update', holdingsController.updateHolding);
router.delete('/:id/delete', holdingsController.deleteHolding);


export default router;
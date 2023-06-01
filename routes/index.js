import { Router } from "express";

var router = Router();

router.get("/", (req, res) => {
	res.render("index", { title: "Homepage" });
});

export default router;
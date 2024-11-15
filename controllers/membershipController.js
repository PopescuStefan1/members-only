import db from "../db/queries.js";

export const membershipGet = (req, res) => {
  const errors = req.query.error;
  console.log(errors);
  res.render("membership", { errors });
};

export const membershipPost = (req, res) => {
  if (req.body.secret !== process.env.SECRET_KEY) {
    res.status(400).render("membership", {
      errors: [{ msg: "Invalid secret key" }],
    });
  } else {
    db.updateMembershipStatus(req.user.id, true);
    res.redirect("/");
  }
};

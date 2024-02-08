const verifyAdmin = (req, resp, next) => {
    const isAdmin = req?.user.role === "admin";
    if (!isAdmin) {
        resp.status(401);
        throw new Error("Authorized person only");
    }
    next();
};
module.exports = verifyAdmin;

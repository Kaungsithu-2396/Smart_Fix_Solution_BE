const verifyAdmin = (req, resp, next) => {
    const isAdmin = req?.user.role === "admin";
    if (!isAdmin) {
        resp.status(403);
        throw new Error("Authorized person only");
    }
    next();
};
const verifyTechnician = (req, resp, next) => {
    const isAuthority =
        req.user.role === "technician" || req.user.role === "admin";
    if (!isAuthority) {
        resp.status(403);
        throw new Error("Authorized person only");
    }
    next();
};
module.exports = { verifyAdmin, verifyTechnician };

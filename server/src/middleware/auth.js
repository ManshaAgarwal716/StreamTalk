import {getuserfromsession} from "./auth.js";
async function restricttologgedinusers(req, res, next) {
    const userid=req.cookies?.uid;
    if(!userid){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
    const user = await getuserfromsession(userid);
    if (!user) {
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
    req.user = user;
    next();
}
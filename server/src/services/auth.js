const setsessiontouser=new Map();
function setSessionToUser(sessionId, user) {
    setsessiontouser.set(sessionId, user);
}
function getUserIdFromSession(sessionId) {
    return setsessiontouser.get(sessionId);

}
module.exports = {  
    setSessionToUser,
    getUserIdFromSession,
};
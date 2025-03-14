export const signup = async (req, res) => {
    res.status(200).json({message: "user signup"});
}
export const login = async (req, res) => {
    res.status(200).json({message: "user login"});
}
export const logout = async (req, res) => {
    res.status(200).json({message: "user logout"});
}
export const me = async (req, res) => {
    res.status(200).json({message: "get me"});
}
export const isEnvVarsExist = () => {
    if (!process.env.JWT_REFRESH_SECRET) return false
    if (!process.env.JWT_ACCESS_SECRET) return false
    if (!process.env.DB_URL) return false
    return true
}
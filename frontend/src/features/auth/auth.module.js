import ky from "ky";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
const BASE_PATH = `${BACK_ENDPOINT}/api/login`;

const loginUser = async ({email, password}) => {
    const data = await ky.post(BASE_PATH, {json: {email, password}, credentials: 'include'}).json();
        return data;
}

const AuthModule = {loginUser};
export default AuthModule;
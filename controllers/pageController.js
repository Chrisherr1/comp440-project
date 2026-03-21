import { fileURLToPath } from 'url';
import path from 'path';

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to the views directory 
const viewsPath = path.join(__dirname,'..','views');

class PageController {
    constructor() {
    // Bind methods to preserve `this` context when used as route handlers
    this.getHomePage = this.getHomePage.bind(this);
    this.getLoginPage = this.getLoginPage.bind(this);
    this.getRegisterPage = this.getRegisterPage.bind(this);
    }
    // Handles request for the home page.
    getHomePage(req, res) {
        const filePath = path.join(viewsPath, 'home.html');
        res.sendFile(filePath);
    }
    // Handles request for the login page.
    getLoginPage(req, res) {
        const filePath = path.join(viewsPath, 'login.html');
        res.sendFile(filePath);
    }
    // Handles request for the registration page.
    getRegisterPage(req, res) {
        const filePath = path.join(viewsPath, 'register.html');
        res.sendFile(filePath);
    }

}

export default new PageController();
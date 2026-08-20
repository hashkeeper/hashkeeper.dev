export class ScrollManager {
    constructor (elementObj) {
        this.elementObj = elementObj;

        // Menus and subelements (tabs)
        this.navEl = document.querySelector('nav');
        this.navTab = document.querySelector('#navTab > div');
        this.themeEl = document.querySelector('#themePicker');
        this.themeTab = document.querySelector('#themeTab > div');
        // Menu element array
        this.menuArr = [navEl, themeEl];
        // Header elements
        this.bufferArr = document.querySelectorAll(".buffeR");
        this.header = document.querySelector('header');
        this.headerBuffer = document.querySelector('#bufferHeader');
        // Initial Splash Screen
        this.hkSplash = document.querySelector('#hkSplash');
        // FAQ Buttons
        this.faqDropdownArr = document.querySelectorAll(".faqDropdown");
    }
}
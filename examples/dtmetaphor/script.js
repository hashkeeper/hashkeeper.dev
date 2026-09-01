function init() {
    let mostRecSelect = null;

    const sButton = document.querySelector('#startButton');
    const sMenu = document.querySelector('#startMenu');
    let sBool = 1;

    const compButton = document.querySelector('#comP');
    const compExit = document.querySelector('#compWin > .windowRow:nth-child(1) > .exiT');
    const compMenu = document.querySelector('#compWin');
    let compBool = 1;

    const dirButton = document.querySelector('#diR');
    const dirExit = document.querySelector('#dirWin > .windowRow:nth-child(1) > .exiT');
    const dirMenu = document.querySelector('#dirWin');
    let dirBool = 1;

    const cellButton = document.querySelector('#celL');
    const cellExit = document.querySelector('#cellWin > .windowRow:nth-child(1) > .exiT');
    const cellMenu = document.querySelector('#cellWin');
    let cellBool = 1;

    const recyButton = document.querySelector('#recY');
    const recyExit = document.querySelector('#recyWin > .windowRow:nth-child(1) > .exiT');
    const recyMenu = document.querySelector('#recyWin');
    let recyBool = 1;

    sMenu.style.display = 'none';
    compMenu.style.display = 'none';
    dirMenu.style.display = 'none';
    cellMenu.style.display = 'none';
    recyMenu.style.display = 'none'; 

    function changeZindex() {
        sMenu.style.zIndex = 2;
        compMenu.style.zIndex = 2;
        dirMenu.style.zIndex = 2;
        cellMenu.style.zIndex = 2;
        recyMenu.style.zIndex = 2;
        mostRecSelect.style.zIndex = 3;
    }

    function toggleStart() {
        if(sBool == 1){
            sBool = 0;
            sMenu.style.display = 'flex';
            mostRecSelect = document.querySelector('#startMenu');
            changeZindex();
        } else if (sBool == 0){
            sBool = 1;
            sMenu.style.display = 'none';
        };
    };

    function compOn() {
        compMenu.style.display = 'flex';
        mostRecSelect = document.querySelector('#compWin');
        changeZindex();
    };

    function compOff() {
        compMenu.style.display = 'none';
    };

    function dirOn() {
        dirMenu.style.display = 'flex';
        mostRecSelect = document.querySelector('#dirWin');
        changeZindex();
    };

    function dirOff() {
        dirMenu.style.display = 'none';
    };

    function cellOn() {
        cellMenu.style.display = 'flex';
        mostRecSelect = document.querySelector('#cellWin');
        changeZindex();
    };

    function cellOff() {
        cellMenu.style.display = 'none';
    };

    function recyOn() {
        recyMenu.style.display = 'flex';
        mostRecSelect = document.querySelector('#recyWin');
        changeZindex();
    };

    function recyOff() {
        recyMenu.style.display = 'none';
    };

    sButton.addEventListener('click', toggleStart);

    compButton.addEventListener('click', compOn);
    compExit.addEventListener('click', compOff);

    dirButton.addEventListener('click', dirOn);
    dirExit.addEventListener('click', dirOff);

    cellButton.addEventListener('click', cellOn);
    cellExit.addEventListener('click', cellOff);

    recyButton.addEventListener('click', recyOn);
    recyExit.addEventListener('click', recyOff);
}

init();


const resizeOps = () => {
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  };

resizeOps();
window.addEventListener("resize", resizeOps);


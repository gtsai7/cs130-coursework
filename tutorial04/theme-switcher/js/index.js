const defaultTheme = () => {
   /*alert('switch to default theme');*/
   document.querySelector('#theme').className = "container";

};

const oceanTheme = () => {
   /*alert('switch to ocean theme');*/
   document.querySelector('#theme').className = "container ocean";
};

const desertTheme = () => {
   /*alert('switch to desert theme');*/
   document.querySelector('#theme').className = "container desert";

};


document.querySelector('#default').onclick = defaultTheme;
document.querySelector('#ocean').onclick = oceanTheme;
document.querySelector('#desert').onclick = desertTheme;

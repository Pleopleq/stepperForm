class Stepper {
    constructor(){
        this.step = document.querySelectorAll('.step');
        this.nextButton = document.querySelector('.blockForm__next');
        this.backButton = document.querySelector('.blockForm__back');
        this.submit = document.querySelector('.finishedForm');
        this.input = document.querySelectorAll('.blockForm__input');
        this.buttonsDiv = document.querySelector('.blockForm__buttons');
        this.currentTab = 0;
    }

    showNextInput(tab){
        let step = this.step;
        let backButton = this.backButton;
        let nextButton = this.nextButton;

        step[tab].style.display = "block";
        if (tab == 0) {
          backButton.style.display = "none";
        } else {
          backButton.style.display = "inline";
        }
        if (tab == (step.length - 1)) {
          nextButton.innerHTML = "Submit";
        } else {
          nextButton.innerHTML = "Next";
        }
    }
    nextBack(field) {
        let step = this.step;
        let input = this.input;
        
        if(input[this.currentTab].value === ''){ 
                this.showAlert("Please, fill all the inputs");
                return
        } else {  
        // Hide the current tab:
        step[this.currentTab].style.display = "none";  
        // Increase or decrease the current tab by 1:
        this.currentTab = this.currentTab + field;
        // if you have reached the end of the form... :
        if (this.currentTab >= step.length) {
          //...the form gets submitted:
          this.submit.submit();
        }
        this.showNextInput(this.currentTab)
        }
    }

    showAlert(text){
        const parentEl = this.buttonsDiv;
        const el = document.createElement('p');
        const alertText = document.createTextNode(text);
        el.appendChild(alertText);
        setTimeout( () =>  { 
			parentEl.removeChild(el);
		}, 2000);
        parentEl.appendChild(el);
    }

}




const stepper = new Stepper;

let currentTab = stepper.currentTab;

console.log(currentTab)

stepper.showNextInput(currentTab);

stepper.nextButton.addEventListener("click", () => {
    stepper.nextBack(1);
}, false);

stepper.backButton.addEventListener("click", () => {
    stepper.nextBack(-1);
}, false);



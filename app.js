class Stepper {
    constructor(){
        this.step = document.querySelectorAll('.step');
        this.nextButton = document.querySelector('.blockForm__next');
        this.backButton = document.querySelector('.blockForm__back');
        this.submit = document.querySelector('.finishedForm');
        this.inputEmail = document.querySelector('.blockForm__email');
        this.inputPassword = document.querySelector('.blockForm__password');
        this.buttonsDiv = document.querySelector('.blockForm__buttons');
        this.currentTab = 0;
    }

    showNextInput(tab){
        let step = this.step;
        const backButton = this.backButton;
        const nextButton = this.nextButton;
      
        step[tab].style.display = "block";
        if (tab == 0) {
          backButton.style.display = "none";
        } else {
          backButton.style.display = "inline";
        }

        if (tab == (step.length - 2)) {
          nextButton.innerHTML = "Submit";
        } else {
          nextButton.innerHTML = "Next";
        }
    }
    nextBack(field) {
        let step = this.step;
        const submitForm = this.submit;
        const nextButton = this.nextButton;
        const backButton = this.backButton;
        // Hide the current tab:
        step[this.currentTab].style.display = "none";  
        // Increase or decrease the current tab by 1:
        if(this.inputEmail.value === '' ){
          this.showAlert("Please enter an Email!");
        } else if (this.inputPassword.value.length < 9 && this.currentTab === 1){
          this.showAlert("Password must be 9 characters long");
        } else {
          this.currentTab = this.currentTab + field ;
        }

        this.showNextInput(this.currentTab)
        // if you have reached the end of the form... :
          if (this.currentTab >= step.length -1) {
            //...the form gets submitted and the buttons are hidden
            nextButton.style.display = "none";
            backButton.style.display = "none";
            setTimeout(  () => {
              submitForm.submit();
            },500)
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

stepper.showNextInput(currentTab);

stepper.nextButton.addEventListener("click", () => {
    stepper.nextBack(1);
}, false);

stepper.backButton.addEventListener("click", () => {
    stepper.nextBack(-1);
}, false);



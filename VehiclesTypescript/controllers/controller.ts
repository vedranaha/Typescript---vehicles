
/*function createCar(plate:string,brand:string,color:string){
    let car=new Car(plate,color,brand);
    car.addWheel(new Wheel(2,"SEAT"));
    document.body.innerText="CAR: PLATE: " + car.plate 
    + " COLOR: " +car.color + " BRAND: " + brand 
    + " WHEELS: " + JSON.stringify(car.wheels);
}*/

let car: Car;

// CREATE CAR
function createCar(plate:string,color:string,brand:string){
    car = new Car(plate,color,brand);
}

function submitCar() {
    let carPlate = (<HTMLInputElement>document.getElementById("plate")).value;
    let carBrand = (<HTMLInputElement>document.getElementById("brand")).value;
    let carColor = (<HTMLInputElement>document.getElementById("color")).value;
    let platePattern = /\b[0-9]{4}[A-Za-z]{3}\b/;
    let brandPattern = /[a-zA-Z]+/;

    if (carPlate == "" || carBrand == "" || carColor == "" ) {
        error(document.getElementById("carError"));
    } else if(carPlate != "" && !(carPlate.match(platePattern))){
        let carPlateField = document.getElementById("plate");
        let plateErrorTxt = document.getElementById("plateError");
        errorField(plateErrorTxt, carPlateField);
    } else if(carBrand !== "" && !(carBrand.match(brandPattern))) {
        let carBrandField = document.getElementById("brand");
        let brandErrorTxt = document.getElementById("brandError");
        errorField(brandErrorTxt, carBrandField);
    } else {
        let carInputs = document.getElementById("carInputs");
        let wheelsInputs = document.getElementById("wheelsInputs");
        displayContent(wheelsInputs, carInputs);
        createCar(carPlate, carColor, carBrand);
    }
}  


// ADD WHEELS
//wheels:Wheel[]=new Array();
function submitWheels(){
    if (validateWheels() == true)  {   
        for (let i=0; i<4; i++) {
            let brandWheel: any = document.getElementById("brandWheel" + i);
            let diameterWheel: any = document.getElementById("diameterWheel" + i);
            car.addWheel(new Wheel(diameterWheel.value, brandWheel.value));
        }
        let wheelsInputs: any = document.getElementById("wheelsInputs");
        let newCarInfo: any = document.getElementById("carInfo");
        let successText: any = document.getElementById("Title");
        successText.innerHTML = "New car created";
        displayContent(newCarInfo, wheelsInputs);
        showCarInfo(car.plate, car.brand, car.color);
        showWheels();
    }
} //end submitWheels()

function validateWheels() {
    let wheelCounter: number = 0;
    for (let i=0; i<4; i++) {
        let brandWheel: any = document.getElementById("brandWheel" + i);
        let diameterWheel: any = document.getElementById("diameterWheel" + i);
        let errorTxt: any =  document.getElementById("wheelErrorField" + i);
               
        if ((brandWheel.value == "") || (diameterWheel.value == "")) {
            error(document.getElementById("wheelError"));
        } else if ((diameterWheel.value < 0.4) || (diameterWheel.value > 2)) {
            errorField(errorTxt, diameterWheel);
            errorTxt.innerHTML = `Wheel ${i+1} diameter must be between 0.4 and 2.`;
                                        //template string EC6
        } else {
            resetErrorField(errorTxt, diameterWheel);
            wheelCounter = wheelCounter + 1;
        }
    } //end for 

    if (wheelCounter == 4) {
        return true;
    } else {
        return false;
    }
} //end validateWheels()


// show car info
function showCarInfo (plate: string, brand: string, color:string) {
    let newCarPlate: any = document.getElementById("newCarPlate");
    newCarPlate.innerHTML = "Plate: " + plate;

    let newCarBrand: any = document.getElementById("newCarBrand");
    newCarBrand.innerHTML = "Brand: " + brand;

    let newCarColor: any = document.getElementById("newCarColor");
    newCarColor.innerHTML = "Color: " + color;
}

// show wheels info
function showWheels() { 
    for (var i=0; i<4; i++) {
        let newWheel: any = document.getElementById("wheel"+ i);
        newWheel.innerHTML = `Wheel ${i+1}: Brand: <br> ${car.wheels[i].brand} diameter: ${car.wheels[i].diameter}`;
                                    //template string EC6
    }

}

//show and hide form
function displayContent(show: any, hide: any){
    show.classList.remove("d-none");
    hide.classList.add("d-none");
}

//error function
function error(text: any) {
    text.classList.remove("d-none");
}
function errorField(text: any, field: any) {
    text.classList.remove("d-none");
    field.style.border = "1px solid red";
    field.focus();
} 
function resetErrorField(text: any, field: any) {
    text.classList.add("d-none");
    field.style.border = "";
}
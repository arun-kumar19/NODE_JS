const productOfTwoNum=(num1, num2)=>num1*num2;

console.log(productOfTwoNum(2,3));

const student={

    name:"Arun Kumar",
    contactno:"8800453838",
    address:"Gurugram",
    printDetails(){
            console.log("Hello my name is "+this.name+
            ". Contact No- "+this.contactno+" and current address -"+this.address)
    }
}

console.log(student.printDetails())
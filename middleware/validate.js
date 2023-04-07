
function validate(req, res, next) {
    // validate full name age 
    const { fullname, age } = req.body
    console.log(validateName(fullname))
    if (validateName(fullname) && validateAge(age)) {
        return next()
    }
    else
        res.status(400).json("invalid data")

}
// 192 687

function validateName(name) {
    // Use regular expression to check if the name contains any numbers
    // const regex = /\d/;
    // return !regex.test(name);
    
  
    var pattern = /^[a-zA-ZÀ-ỹ\s]*$/;
    return pattern.test(name);
  }

    function validateAge(age) {
        if(age < 1){
            return false
        }
        else return true
    }


    module.exports=validate
        
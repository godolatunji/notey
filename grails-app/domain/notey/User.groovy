package notey

class User {
	static transients = ['confirmPassword']
	String firstName
	String lastName
	String userName
	String password
	String userEmail
	String confirmPassword
	
    static constraints = {
		firstName blank:false, null:false
		lastName blank:false, null:false
		userName blank:false, null:false
		password blank:false, null:false
		userEmail blank:false, null:false, email:true
    }
	
	String toString() {
		"$firstName $lastName"
	}
}

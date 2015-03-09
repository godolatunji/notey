package notey

class UserController {
	
	def index() {
		if(!session.user) {
			redirect(uri: "/")
			return
		}
		
		def user = session.user
		def res =  Note.findAllWhere([userID: user.id])
		render(view: "/user/index", model :["result": res])
		return
	}

    def login(){
		if(session.user) {
			redirect(uri: "/home")
			return
		}
		render(view: "/user/login")
	}
	
	def logout() {
		if(!session.user) {
			redirect(uri: "/")
			return
		}
		
		session.user = null
		redirect(uri: "/")
	}
	
	def postLogin() {
		if(session.user) {
			redirect(uri: "/home")
			return
		}
		if(request.method != "POST") {
			redirect(uri: "/")
			return
		}
		
		def user = User.findByUserNameAndPassword(params.username, params.password)
		if(!user) {
			flash.message = "Invalid Username or Password"
			redirect(uri: '/login')
			return
		} else {
			session.user = user
			redirect(uri: '/home')
		}
	}
	
	def register() {
		if(session.user) {
			redirect(uri: "/home")
			return
		}
		
		render(view: "/user/register")
	}
	
	def postRegister() {
		if(session.user) {
			redirect(uri: "/home")
			return
		}
		
		if(request.method != "POST") {
			redirect(uri: "/register")
			return
		}
		
		if(params.password.equals(params.confirmPassword)) {
			flash.message = "Passwords do not match"
			redirect(uri: '/register')
			return
		}
		
		def user = new User(firstName: params.firstname, lastName: params.lastname, userName: params.username,
			 password: params.password, userEmail: params.email)
//		if(!user.validate){
//			flash.message = "Errors in Form. Please fill form again"
//			redirect(uri: '/register')
//			return
//		} else {
			if(!user.save()) {
				flash.message = "Application could not save in database"
				redirect(uri: '/register')
				return
			} else {
				session.user = user
				redirect(uri: '/home')
			}
//		}
	}
}

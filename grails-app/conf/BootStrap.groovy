import notey.User

class BootStrap {

    def init = { servletContext ->
		new User(firstName: "User", lastName: "TestUser", userName: "user", password: "user", userEmail: "user@user.com").save()
		new User(firstName: "User1", lastName: "TestUser1", userName: "user1", password: "user1", userEmail: "user1@user.com").save()
    }
    def destroy = {
    }
}

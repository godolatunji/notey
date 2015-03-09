class UrlMappings {

	static mappings = {
        "/login"(controller: "User", action: "login")
		"/postLogin"(controller: "User", action:"postLogin")
		"/register"(controller: "User", action:"register")
		"/postRegister"(controller: "User", action:"postRegister")
		"/home"(controller: "User", action:"index")
		"/logout"(controller: "User", action: "logout")
		"/notes/create"(controller: "Note", action: "create")
		"/notes/store"(controller: "Note", action: "store")
		"/notes/show/$id?"(controller: "Note", action: "show")
		"/notes/edit/$id?"(controller: "Note", action: "edit")
		"/notes/update/$id?"(controller: "Note", action: "update")
		"/notes/delete/$id?"(controller: "Note", action: "delete")
        "/"(view:"/index")
        "500"(view:'/error')
	}
}

package notey

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class NoteController {

	@Transactional
	def create() {
		if(!session.user) {
			redirect(uri: "/")
			return
		}
		
		render(view: '/note/create')
	}
	
	@Transactional
	def store() {
		if(!session.user) {
			redirect(uri: "/")
			return
		}
		
		if(request.method != "POST") {
			redirect(uri: '/note/create')
			return
		}
		def user = session.user
		def note = new Note(title: params.title, content: params.content, userID: user.id)
		if(!note.validate()) {
			flash.message = "Invalid inputs, please fill again"
			redirect(uri: '/note/create')
			return
		} else {
			if(!note.save()) {
				flash.message = "Cannot add note to database"
				redirect(uri: '/note/create')
				return
			} else {
				flash.message = "New note created"
				redirect(uri: '/home')
				return
			}
		}
	}
	
	@Transactional
	def show() {
		if(!session.user) {
			redirect(uri: "/")
			return
		}
		def id = params.id
		def note = Note.findWhere([id: id.toLong()])
		if(note == null) {
			flash.message = "Note does not exist in database"
			redirect(url: '/home')
			return
		} else {
			render(view: "/note/show", model :["note": note])
			return
		}
	}
	
	@Transactional
	def edit() {
		if(!session.user) {
			redirect(uri: "/")
			return
		}
		
		def id = params.id
		def note = Note.findWhere([id: id.toLong()])
		if(note == null) {
			flash.message = "Note does not exist in database"
			redirect(url: '/home')
			return
		} else {
			render(view: "/note/edit", model :["note": note])
			return
		}
	}
	
	@Transactional
	def update() {
		if(!session.user) {
			redirect(uri: "/")
			return
		}
		
//		if(request.method != "PUT") {
//			redirect(params: [id: params.id], uri: '/notes/edit')
//			return
//		}
		
		def id = params.id
		def note = Note.get(id.toLong())
		note.title = params.title
		note.content = params.content
		note.save()
			
		flash.message = "Note successfully Updated"
		redirect(uri: '/home')
		return
			
		
	}
	
	@Transactional
	def delete() {
		if(!session.user) {
			redirect(uri: "/")
			return
		}
		
		def id = params.id
		def note = Note.findWhere([id: id.toLong()])
		if(note == null) {
			flash.message = "Note does not exist in database"
			redirect(url: '/home')
			return
		} else {
			note.delete()
			flash.message = "Note successfully deleted"
			redirect(url: '/home')
			return
		}
		
	}
	
}

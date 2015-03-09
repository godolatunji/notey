package notey

class Note {
	
	String title
	String content
	Long userID
	Date dateCreated
	Date lastUpdated
	
    static constraints = {
		title blank:false, null:false
		content blank:false, null:false, maxSize: 10000
		userID blank:false, null:false
    }
	
	def beforeInsert() {
		dateCreated = new Date()
		lastUpdated = new Date()
	}
	
	def beforeUpdated() {
		lastUpdated = new Date()
	}
	
	String toString(){
		title
	}
}

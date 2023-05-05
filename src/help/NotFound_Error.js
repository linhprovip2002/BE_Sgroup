module.exports  = class ValidationError extends Error {
	constructor(message) {
		super()
        this.status = 400
		this.messageObject = message;
	}
}
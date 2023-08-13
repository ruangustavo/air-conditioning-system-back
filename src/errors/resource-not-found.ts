export class ResourceNotFound extends Error {
  constructor (message: string = 'Resource not found') {
    super(message)
    this.name = 'ResourceNotFoundError'
  }
}

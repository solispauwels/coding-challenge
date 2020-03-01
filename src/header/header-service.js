class HeaderService {
  set title (value) {
    title = value
    this.setTitle && this.setTitle(value)
  }
}

export default new HeaderService()
